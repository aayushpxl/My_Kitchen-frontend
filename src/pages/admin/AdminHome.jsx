import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import { Users, Utensils, Trophy, Activity, Clock, PlusCircle, UserPlus, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format } from 'date-fns';

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes, activityRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getDashboardAnalytics(),
          adminService.getRecentActivity()
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (analyticsRes.success) setAnalytics(analyticsRes.data);
        if (activityRes.success) setActivity(activityRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const COLORS = ['#F97316', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="text-blue-600" size={20} />}
            color="bg-blue-50"
          />
          <StatsCard
            title="Total Recipes"
            value={stats.totalRecipes}
            icon={<Utensils className="text-orange-600" size={20} />}
            color="bg-orange-50"
          />
          <StatsCard
            title="Challenges"
            value={stats.totalChallenges}
            icon={<Trophy className="text-yellow-600" size={20} />}
            color="bg-yellow-50"
          />
          <StatsCard
            title="Active"
            value={stats.activeChallenges}
            icon={<Activity className="text-green-600" size={20} />}
            color="bg-green-50"
          />
          <StatsCard
            title="Pending"
            value={stats.pendingRecipes}
            icon={<Clock className="text-red-600" size={20} />}
            color="bg-red-50"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-orange-500" />
              User Growth (Last 7 Days)
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.userGrowth || []}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#F97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recipe Categories Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PieChartIcon size={20} className="text-orange-500" />
            Recipe Categories
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.recipeStats || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics?.recipeStats?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-orange-500" />
            Recent Activity
          </h3>
          <div className="space-y-6">
            {activity.length > 0 ? (
              activity.map((item, idx) => (
                <div key={item.id || idx} className="flex gap-4 group">
                  <div className="flex-shrink-0">
                    {item.type === 'user_joined' ? (
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <UserPlus size={18} className="text-blue-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                        <PlusCircle size={18} className="text-orange-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 border-b border-gray-50 pb-4 group-last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                      <span className="text-xs text-gray-400">{format(new Date(item.time), 'MMM d, h:mm a')}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No recent activity</div>
            )}
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Quick Insights</h3>
            <p className="text-orange-50 mb-6 opacity-90">
              Your community is growing! You have {stats?.pendingRecipes || 0} recipes waiting for approval.
              Take action now to keep the content fresh.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Active Challenges</p>
                <p className="text-2xl font-bold">{stats?.activeChallenges || 0}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">New Users (7d)</p>
                <p className="text-2xl font-bold">
                  {analytics?.userGrowth?.reduce((acc, curr) => acc + curr.users, 0) || 0}
                </p>
              </div>
            </div>
            <button className="mt-8 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-sm w-full">
              Review Pending Content
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
