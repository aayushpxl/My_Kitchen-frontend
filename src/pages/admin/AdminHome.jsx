import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import { Users, Utensils, Trophy, Activity, CheckCircle } from 'lucide-react';

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="text-blue-600" size={24} />}
            color="bg-blue-50"
          />
          <StatsCard
            title="Total Recipes"
            value={stats.totalRecipes}
            icon={<Utensils className="text-orange-600" size={24} />}
            color="bg-orange-50"
          />
          <StatsCard
            title="Total Challenges"
            value={stats.totalChallenges}
            icon={<Trophy className="text-yellow-600" size={24} />}
            color="bg-yellow-50"
          />
          <StatsCard
            title="Active Challenges"
            value={stats.activeChallenges}
            icon={<Activity className="text-green-600" size={24} />}
            color="bg-green-50"
          />
        </div>
      )}

      {/* We can add recent activity or charts here later */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="text-gray-500 text-sm">
          Select "Recipes" or "Challenges" from the sidebar to manage content.
        </div>
      </div>
    </div>
  );
}
