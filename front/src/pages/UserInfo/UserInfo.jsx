import React, { Suspense, useEffect, useState } from "react";
import getUser from "../../hooks/users/getUserData";
import CallManager from "../../components/CallManager/CallManager";
import { useSearchParams } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Shield,
  Clock,
  Calendar,
  Star,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  let userID = searchParams.get("userId");
  let userName = searchParams.get("name");

  // initials
  const initials = userName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  useEffect(() => {
    setLoading(true);
    if (userID && userName) {
      const fetch = async () => {
        const { data } = await getUser({ id: userID });
        if (data.success) {
          setUser(data.data);
          setLoading(false);
        }
        setLoading(false);
      };
      fetch();
    }
  }, [userID, userName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      {loading ? (
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-600 to-red-700 animate-pulse mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Loading user profile...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              User <span className="text-red-600">Profile</span>
            </h1>
            <p className="text-gray-600 mt-2">CallBell user information</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
              <div className="relative">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-white/20 to-white/10 border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-white">
                    {initials}
                  </div>
                )}
                <div className="absolute bottom-2 right-1/4 w-8 h-8 rounded-full bg-green-500 border-4 border-white shadow-lg"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
              </div>

              {/* User Stats */}

              {/* Call Manager Section */}
              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ready to Connect?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Start a secure call with {user?.name}
                    </p>
                  </div>
                </div>

                <Suspense
                  fallback={
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    </div>
                  }>
                  <div className="flex justify-center">
                    <CallManager userId={userID} userName={userName} />
                  </div>
                </Suspense>

                <div className="mt-6 pt-6 border-t border-red-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span>All calls are end-to-end encrypted</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-red-500" />
                    About This Profile
                  </h4>
                  <p className="text-sm text-gray-600">
                    This is a verified CallBell user profile. You can connect
                    securely using the call button above.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-red-500" />
                    Privacy Note
                  </h4>
                  <p className="text-sm text-gray-600">
                    Profile information is only visible to authorized users. All
                    communications are private and secure.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-red-50 to-white border-t border-red-100 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      CallBell Secure
                    </p>
                    <p className="text-xs text-gray-500">
                      Instant communication platform
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  User ID:{" "}
                  <span className="font-mono text-gray-700">
                    {userID?.substring(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Previous Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
