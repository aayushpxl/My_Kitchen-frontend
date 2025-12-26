import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUserProfile } from '../hooks/useAuthHooks';
import { useAuth } from '../context/AuthContext';
import Interests from '../components/Profile/Interests';
import MyRecipesList from '../components/Profile/MyRecipesList';
import Navbar from '../components/common/Navbar';
import LogoutModal from '../components/ui/LogoutModal';

const Profile = () => {
  const { data: user, isLoading, isError } = useUserProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

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

            {/* TAB NAVIGATION */}
            <nav className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'info' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                👤 Personal Information
              </button>
              <button
                onClick={() => setActiveTab('recipes')}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'recipes' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                🍳 My Recipes
              </button>
            </nav>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-2 pl-2"
            >
              ← Log-out
            </button>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="flex-1 space-y-10">
            {activeTab === 'info' && (
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

                <div className="mt-8 flex justify-end gap-4">
                  <button className="text-sm text-gray-500 hover:text-gray-800">
                    Cancel
                  </button>
                  <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                    Save Changes
                  </button>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-10">
                  <Interests />
                </div>
              </div>
            )}

            {activeTab === 'recipes' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Recipes</h3>
                    <p className="text-sm text-gray-400">Manage your submitted recipes and check their status.</p>
                  </div>
                </div>
                <MyRecipesList />
              </div>
            )}
          </section>
        </div>
      </main>

      {/* LOGOUT MODAL */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          queryClient.removeQueries(); // Clear all cache to prevent stale data
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
