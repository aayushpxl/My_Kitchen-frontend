import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import loginPageImage from '../assets/login/new.jpg';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for segmented OTP
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const otpRefs = useRef([]);

    useEffect(() => {
        if (step === 2 && otpRefs.current[0]) {
            otpRefs.current[0].focus();
        }
    }, [step]);

    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        if (!email) return toast.error("Please enter your email");

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length < 6) return toast.error("Please enter the 6-digit code");

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp: otpString });
            toast.success("OTP verified!");
            setStep(3);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid or expired OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (newPassword.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/reset-password', {
                email,
                otp: otp.join(''),
                newPassword
            });
            toast.success("Password reset successfully!");
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative overflow-y-auto h-full">
                <Link to="/login" className="absolute top-8 left-8 text-gray-400 hover:text-red-600 flex items-center gap-2 transition-colors font-medium">
                    <ArrowLeft size={20} /> Back to Login
                </Link>

                <div className="max-w-md mx-auto w-full py-12">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`h-1 w-12 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
                            <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
                            <div className={`h-1 w-12 rounded-full ${step >= 3 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Verification"}
                            {step === 3 && "Secure Account"}
                        </h2>
                        <p className="text-gray-500">
                            {step === 1 && "No worries! Enter your email and we'll send you reset instructions."}
                            {step === 2 && `Enter the 6-digit code sent to ${email}`}
                            {step === 3 && "Almost there! Create a new strong password for your account."}
                        </p>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="relative group">
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                                        <Mail size={20} />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <Button loading={loading} type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-100 transform active:scale-[0.98] transition-all">
                                SEND RESET CODE
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-8">
                            <div className="flex justify-between gap-2">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        ref={(el) => (otpRefs.current[index] = el)}
                                        value={data}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-16 text-center text-2xl font-bold bg-gray-50 rounded-xl border-2 border-transparent focus:border-red-500 focus:bg-white focus:outline-none transition-all text-red-600"
                                    />
                                ))}
                            </div>
                            <div className="space-y-4">
                                <Button loading={loading} type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-100 transform active:scale-[0.98] transition-all">
                                    VERIFY CODE
                                </Button>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="w-full text-center text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    Didn't receive code? Resend
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">New Password</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                                            <Lock size={20} />
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                                            <Lock size={20} />
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Button loading={loading} type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transform active:scale-[0.98] transition-all">
                                RESET PASSWORD
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
                <img
                    src={loginPageImage}
                    alt="Kitchen Illustration"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/40 to-black/20"></div>

                <div className="absolute bottom-20 left-12 text-white max-w-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                            <ShieldCheck className="text-red-400" size={28} />
                        </div>
                        <span className="text-white font-bold tracking-widest text-sm uppercase">Security First</span>
                    </div>
                    <h2 className="text-5xl font-black mb-6 leading-tight">
                        {step === 1 && "Don't lose your delicious recipes."}
                        {step === 2 && "Verifying your identity."}
                        {step === 3 && "Secure your culinary secrets."}
                    </h2>
                    <p className="text-white/80 text-lg font-medium leading-relaxed">
                        {step === 1 && "Retrieve access to your personal kitchen planner and get back to cooking."}
                        {step === 2 && "We've sent a unique code to your email. Enter it to confirm it's really you."}
                        {step === 3 && "Create a strong password to keep your meal plans and favorites protected."}
                    </p>
                </div>

                {/* Micro-interaction Decorative Elements */}
                <div className="absolute top-1/4 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default ForgotPassword;
