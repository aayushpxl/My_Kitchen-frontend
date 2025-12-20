import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/home');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-600">
          ← Back
        </Link>

        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-red-600 mb-2">Login</h2>
          <p className="text-gray-600 text-sm mb-8">
            More than <span className="text-red-500 font-bold">1500+ recipes</span> around the world
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">✉️</span>
              <input
                type="email" name="email" placeholder="Enter Email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                type="password" name="password" placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-red-600">Forgot Password?</a>
            </div>

            <Button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 text-white shadow-red-200">
              LOGIN
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-gray-400 text-sm">Login With</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="flex justify-center">
            <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Dont have an account? <Link to="/register" className="text-blue-500 font-bold hover:underline">Create Account</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-amber-100 relative items-center justify-center overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        {/* Content */}
        <div className="relative z-10 text-center p-8">
          {/* Placeholder for Chef Illustration */}
          <div className="text-8xl mb-6 transform hover:scale-110 transition-transform cursor-pointer">
            👨‍🍳
          </div>
          <div className="space-y-2">
            <div className="inline-block bg-white px-4 py-1 rounded-full text-red-600 font-bold text-sm shadow-sm">
              Welcome Back!
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Master Your Kitchen</h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              Sign in to access your saved recipes and meal plans.
            </p>
          </div>

          {/* Floating Veggies */}
          <span className="absolute top-1/4 right-1/4 text-4xl animate-bounce">🥦</span>
          <span className="absolute bottom-1/4 left-1/4 text-4xl animate-pulse">🍳</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
