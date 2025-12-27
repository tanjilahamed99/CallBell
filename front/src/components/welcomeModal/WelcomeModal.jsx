import { useEffect } from "react";

const GuestModal = () => {
  useEffect(() => {
    const storedGuest = localStorage.getItem("guestName");
    if (!storedGuest) {
      document.getElementById("my_modal_1").showModal();
    }
  }, []);

  const handleOk = () => {
    const uniqueGuest = `Guest-${Date.now()}`;
    localStorage.setItem("guestName", uniqueGuest);
    document.getElementById("my_modal_1").close();
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="relative w-full max-w-md bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Decorative header */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>

          {/* Close button */}
          <button
            onClick={handleOk}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Welcome icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Welcome text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome to{" "}
                <span className="text-gradient bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  CallBell
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                We're excited to have you here. Start exploring our features!
              </p>
            </div>

            {/* Features highlight */}
            <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="font-semibold text-gray-900">
                  Get Started Quickly
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Instant video calling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>No sign-up required</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Privacy focused</span>
                </li>
              </ul>
            </div>

            {/* Action button */}
            <div className="text-center">
              <button
                onClick={handleOk}
                className="group relative w-full py-3.5 px-8 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Let's Get Started
                </span>
              </button>

              {/* Helper text */}
              <p className="mt-4 text-sm text-gray-500">
                Click "Let's Get Started" to begin your CallBell experience
              </p>
            </div>
          </div>

          {/* Footer decorative */}
          <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Your privacy and security are our top priority</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .text-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
          }

          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}</style>
      </dialog>
    </>
  );
};

export default GuestModal;
