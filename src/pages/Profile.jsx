import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getMyChallenges } from '../api/challengeApi';
import { Bookmark, LogOut } from 'lucide-react';
import { useUserProfile } from '../hooks/useAuthHooks';
import { useAuth } from '../context/AuthContext';
import Interests from '../components/Profile/Interests';
import MyRecipesList from '../components/Profile/MyRecipesList';
import SavedRecipesList from '../components/Profile/SavedRecipesList';
import Navbar from '../components/common/Navbar';
import LogoutModal from '../components/ui/LogoutModal';
import { updateProfile } from '../api/authApi';
import { toast } from 'react-toastify';

const ActiveChallengesList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: myChallenges, isLoading } = useQuery({
    queryKey: ['myChallenges'],
    queryFn: getMyChallenges
  });

  const handleUnjoin = async (challengeId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to unjoin this challenge?")) return;

    try {
      // Retrieve unjoinChallenge from api (will ensure import exists)
      const { unjoinChallenge } = await import('../api/challengeApi');
      await unjoinChallenge(challengeId);
      toast.success("Left the challenge.");
      queryClient.invalidateQueries(['myChallenges']);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave challenge");
    }
  };

  if (isLoading) return <div className="text-center py-4 text-gray-400">Loading challenges...</div>;

  if (!myChallenges || myChallenges.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You haven't joined any challenges yet.</p>
        <button
          onClick={() => navigate('/challenges')}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-medium"
        >
          Browse Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {myChallenges.map((item) => {
        const isCompleted = item.status === 'completed';
        const recipeId = item.challenge?.recipe?._id || item.challenge?.recipe;
        // The challenge object is populated, so ._id should work.
        // However, if population fails or structure is inconsistent, fallbacks are needed.
        const challengeId = item.challenge?._id || (typeof item.challenge === 'string' ? item.challenge : null);

        // Debug check (temporary, or just robust code)
        if (!challengeId) console.warn("Challenge ID missing for item:", item);

        return (
          <div key={item._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50 flex flex-col relative group">
            <button
              onClick={(e) => handleUnjoin(item._id, e)}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
              title="Unjoin Challenge"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>

            <div className="flex justify-between items-start mb-2 pr-6">
              <h4 className="font-bold text-gray-800 line-clamp-1">{item.challenge?.title || 'Unknown Challenge'}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {isCompleted ? 'Completed' : 'Active'}
              </span>
            </div>
            <div className="mt-2 mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: isCompleted ? '100%' : '10%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Progress</span>
                <span>{isCompleted ? '100%' : '0%'}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(recipeId ? `/challenges/recipe/${recipeId}` : '/challenges')}
              className="mt-auto w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isCompleted ? 'View Recipe' : 'Continue Cooking 🍳'}
            </button>
          </div>
        )
      })}
    </div>
  );
};

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
                  className="w-full h-full rounded-full object-cover"
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
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'saved' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                🔖 Saved Recipes
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'challenges' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                🏆 My Challenges
              </button>
            </nav>

            {/* LOGOUT BUTTON */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-red-200 group/logout"
              >
                <LogOut size={18} className="transition-transform group-hover/logout:-translate-x-1" />
                Logout Account
              </button>
            </div>
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

            {activeTab === 'saved' && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6 text-center lg:text-left">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Saved Recipes</h3>
                    <p className="text-sm text-gray-400">Your curated collection of favorite recipes.</p>
                  </div>
                </div>
                <SavedRecipesList />
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="space-y-6">
                {/* Achievements Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span>🏆</span> Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
                      <div className="text-3xl font-bold text-orange-600 mb-1">{user.points || 0}</div>
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Points</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{user.badges?.length || 0}</div>
                      <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Badges</div>
                    </div>
                  </div>

                  {user.badges?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Your Badges</h4>
                      <div className="flex flex-wrap gap-4">
                        {user.badges.map((badge, idx) => (
                          <div key={idx} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border border-gray-200 w-24">
                            <span className="text-2xl mb-1">{badge.icon}</span>
                            <span className="text-xs text-center font-medium leading-tight">{badge.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Challenges Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🔥</span> Active Challenges
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">Check progress on your ongoing challenges.</p>

                  <ActiveChallengesList />
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

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
