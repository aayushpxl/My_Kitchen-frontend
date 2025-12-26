import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUserProfile } from '../hooks/useAuthHooks';
import { useAuth } from '../context/AuthContext';
import Interests from '../components/Profile/Interests';
import MyRecipesList from '../components/Profile/MyRecipesList';
import Navbar from '../components/common/Navbar';
import LogoutModal from '../components/ui/LogoutModal';
import { updateProfile } from '../api/authApi';
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: user, isLoading, isError } = useUserProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [isUpdating, setIsUpdating] = useState(false);

  // Profile fields state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    bio: '',
    location: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
        location: user.location || ''
      });
      setPreviewUrl(user.profilePic ? `http://localhost:5000${user.profilePic}` : null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large! Maximum size allowed is 10MB.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setIsUpdating(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (selectedFile) {
        if (selectedFile.size > 10 * 1024 * 1024) {
          toast.error("File is too large! Maximum size allowed is 10MB.");
          setIsUpdating(false);
          return;
        }
        data.append('profilePic', selectedFile);
      }

      const response = await updateProfile(data);
      if (response.data.success) {
        toast.success("Profile updated successfully! ✨");
        queryClient.invalidateQueries(['userProfile']);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

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
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <img
                  src={previewUrl || `https://ui-avatars.com/api/?name=${user.username}&background=E5F0FF&color=1D4ED8&size=128`}
                  className="w-full h-full rounded-full object-cover border-2 border-orange-100"
                  alt="avatar"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <p className="text-[10px] text-white font-medium">Change Photo</p>
                </div>
              </div>
              <h2 className="font-semibold text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-400">@{user.username}</p>

              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 w-full text-sm font-medium text-gray-600 bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
              >
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
                  <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="+1 (555) 123-4567"
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    placeholder="Nepal"
                    onChange={handleInputChange}
                  />

                  <div className="md:col-span-2">
                    <Label>Short Bio</Label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Food lover sharing simple recipes 🍳"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setFormData({
                        username: user.username || '',
                        email: user.email || '',
                        phoneNumber: user.phoneNumber || '',
                        bio: user.bio || '',
                        location: user.location || ''
                      });
                      setPreviewUrl(user.profilePic ? `http://localhost:5000${user.profilePic}` : null);
                      setSelectedFile(null);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    disabled={isUpdating}
                    className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
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

const Input = ({ label, value, placeholder, name, onChange }) => (
  <div>
    <Label>{label}</Label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
    />
  </div>
);

export default Profile;
