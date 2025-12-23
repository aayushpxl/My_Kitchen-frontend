import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/useAuthHooks';
import { useAuth } from '../context/AuthContext';
import Interests from '../components/Profile/Interests';
import Navbar from '../components/common/Navbar';
import LogoutModal from '../components/ui/LogoutModal';

const Profile = () => {
  const { data: user, isLoading, isError } = useUserProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-400">
          Loading profile...
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          Please login to view profile.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* LEFT SIDEBAR */}
          <aside className="lg:w-72 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.username}&background=E5F0FF&color=1D4ED8&size=128`}
                className="w-24 h-24 mx-auto rounded-full mb-4"
                alt="avatar"
              />
              <h2 className="font-semibold text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-400">@{user.username}</p>

              <button className="mt-4 w-full text-sm font-medium text-gray-600 bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
                Change Photo
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Profile Tips
              </h4>
              <p className="text-xs text-gray-400">
                Keep your profile up to date to help others discover your recipes.
              </p>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-2"
            >
              ← Log-out
            </button>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="flex-1 space-y-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="text-sm text-gray-400 mb-8">
                Update your basic profile details
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" value={user.username} />
                <Input label="Username" value={user.username} />
                <Input label="Email Address" value={user.email} />
                <Input label="Phone Number" placeholder="+1 (555) 123-4567" />

                <div className="md:col-span-2">
                  <Label>Short Bio</Label>
                  <textarea
                    rows="3"
                    className="w-full p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Food lover sharing simple recipes 🍳"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Location</Label>
                  <input
                    className="w-full p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Nepal"
                  />
                </div>
              </div>
            </div>

            <Interests />

            <div className="flex justify-end gap-4">
              <button className="text-sm text-gray-500 hover:text-gray-800">
                Cancel
              </button>
              <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                Save Changes
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* LOGOUT MODAL */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          navigate('/login');
        }}
      />
    </div>
  );
};

const Label = ({ children }) => (
  <label className="block text-xs font-medium text-gray-400 mb-1">
    {children}
  </label>
);

const Input = ({ label, value, placeholder }) => (
  <div>
    <Label>{label}</Label>
    <input
      defaultValue={value}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
    />
  </div>
);

export default Profile;
