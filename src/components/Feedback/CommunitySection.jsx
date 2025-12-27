import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { addReview, deleteReview as deleteReviewApi } from '../../api/recipeApi';
import { getImageUrl } from '../../utils/imageUtils';

const CommunitySection = ({ recipeId, reviews = [] }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const handleReviewSubmit = async () => {
        if (!user) {
            toast.error("Please login to review");
            navigate("/login");
            return;
        }
        if (rating === 0) {
            toast.error("Please select a star rating");
            return;
        }

        setSubmitting(true);
        try {
            await addReview(recipeId, { rating, comment });
            toast.success("Review shared!");
            setComment('');
            setRating(0);
            queryClient.invalidateQueries(["recipe", recipeId]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to share review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-white py-12">
            {/* Added container with max-width and horizontal padding to match "Your meal for this week" layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="max-w-2xl"> {/* Narrower width for the form itself */}
                    
                    {/* Rating Stars - Top Right Alignment */}
                    <div className="flex justify-end mb-2">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star 
                                        size={22} 
                                        className={`${(hoverRating || rating) >= star ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Textarea - Matches the screenshot border and background */}
                    <div className="relative mb-6">
                        <textarea
                            placeholder="Share your experience......."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 p-4 rounded-xl border border-orange-300 bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-400 text-sm resize-none"
                        />
                    </div>

                    {/* Main Action Button - Exact orange from screenshot */}
                    <button
                        onClick={handleReviewSubmit}
                        disabled={submitting}
                        className="w-full bg-[#EA6A12] hover:bg-[#cf5d0f] text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-70 text-base"
                    >
                        {submitting ? "Sharing..." : "Share with Community"}
                    </button>

                    {/* Community Highlights Header */}
                    <div className="mt-12 mb-6">
                        <h3 className="text-xl font-semibold text-gray-500">
                            Community Highlights
                        </h3>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <div key={rev._id} className="bg-gray-50/50 rounded-2xl p-5 flex items-start gap-4 border border-gray-100 group">
                                    <img
                                        src={getImageUrl(rev.user?.profileImage, "https://placehold.co/150x150")}
                                        alt={rev.user?.username}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-800">{rev.user?.username || 'User'}</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star 
                                                            key={star} 
                                                            size={14} 
                                                            className={`${rev.rating >= star ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}`} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-[11px] text-gray-400 font-medium">
                                                {formatDistanceToNow(new Date(rev.createdAt))} ago
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{rev.comment}</p>
                                    </div>
                                    
                                    {(user?._id === rev.user?._id || user?.role === 'admin') && (
                                        <button
                                            onClick={() => handleDeleteReview(rev._id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                                <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CommunitySection;