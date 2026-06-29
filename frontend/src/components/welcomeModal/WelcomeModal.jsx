import { useEffect, useState } from "react";
import updateGestData from "../../hooks/gest/updateGestData";
import Swal from "sweetalert2";
import BlockedScreen from "./BlockedScreen";

const GuestModal = ({ setShowUser }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const storedGuest = localStorage.getItem("guest");

    if (!storedGuest) setShowModal(true);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Name required",
        text: "Please enter your full name.",
        confirmButtonColor: "#e24b4a",
      });
    }

    if (!phone.trim() || phone.length !== 10) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid phone number",
        text: "Please enter a valid 10-digit phone number.",
        confirmButtonColor: "#e24b4a",
      });
    }

    try {
      setLoading(true);

      const { data } = await updateGestData({ name, phone });

      // success case
      localStorage.setItem(
        "guest",
        JSON.stringify({ name, phone, id: data?._id }),
      );
      setShowModal(false);
      setShowUser(true);
    } catch (error) {
      // 403 = blocked
      if (error.response?.status === 403 && error.response?.data?.blocked) {
        setShowModal(false);
        setIsBlocked(true);
        return;
      }

      // any other error
      setShowModal(false);
      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#e24b4a",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Show blocked screen instead of modal
  if (isBlocked) return <BlockedScreen />;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl z-[9999]">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-red-500 to-amber-400" />

        <div className="p-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="text-[17px] font-medium text-gray-900">
              CallBell
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[22px] font-medium text-gray-900 leading-snug mb-1">
            Welcome aboard
          </h2>
          <p className="text-sm text-gray-400 mb-7">
            Enter your details to start your session.
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Full name
            </label>
            <input
              type="text"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[46px] bg-white border-2 border-gray-300 rounded-xl px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
            />
          </div>

          {/* Phone */}
          <div className="mb-0">
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Phone number
            </label>
            <div className="flex gap-2">
              <div className="h-[46px] flex items-center gap-2 px-3.5 bg-gray-100 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-600 shrink-0">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 h-[46px] bg-white border-2 border-gray-300 rounded-xl px-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
              />
            </div>
          </div>

          <hr className="my-5 border-gray-100" />

          {/* Perks */}
          <ul className="space-y-2 mb-6">
            {[
              "Instant video calling — no downloads",
              "End-to-end encrypted calls",
              "No account or registration needed",
            ].map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-[13px] text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 bg-red-500 hover:bg-red-600 text-white text-[15px] font-medium rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60">
            {loading ? "Saving..." : "Get started"}
            {!loading && (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <p className="mt-4 text-center text-[12px] text-gray-400 flex items-center justify-center gap-1">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your information is private and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
