import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import loginPageImage from '../assets/login/new.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await login(formData.email, formData.password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative overflow-y-auto h-full">
        <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-600">
          ← Back
        </Link>

        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold text-red-600 mb-2">Login</h2>
          <p className="text-gray-600 text-sm mb-6">
            More than <span className="text-red-500 font-bold">1500+ recipes</span> around the world
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Mail size={20} />
              </span>
              <input
                type="email" name="email" placeholder="Enter Email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="hover:text-red-600 font-medium">Forgot Password?</Link>
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

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
        <img
          src={loginPageImage}
          alt="Kitchen Illustration"
          className="w-full h-full object-cover bg-gray-50"
        />
        {/* Gradle Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

        <div className="absolute bottom-10 left-10 text-white p-8">
          <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white font-bold text-sm mb-4 border border-white/30">
            Welcome Back!
          </div>
          <h2 className="text-4xl font-bold mb-2">Master Your Kitchen</h2>
          <p className="text-white/90 max-w-sm">
            Sign in to access your saved recipes and meal plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
