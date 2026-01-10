import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRecipes } from '../../hooks/useRecipes';
import { getImageUrl } from '../../utils/imageUtils';

const ReviewCard = ({ user, content, rating, index }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group"
    >
        <div className="absolute top-6 right-8 text-orange-100 group-hover:text-orange-200 transition-colors">
            <Quote size={40} fill="currentColor" />
        </div>

        <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    fill={i < rating ? "#D98829" : "transparent"}
                    stroke={i < rating ? "#D98829" : "#e5e7eb"}
                />
            ))}
        </div>

        <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow">
            "{content}"
        </p>

        <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
            <img
                src={getImageUrl(user?.profilePic, `https://ui-avatars.com/api/?name=${user?.username || 'C'}&background=random`)}
                alt={user?.username}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-50"
            />
            <div>
                <h4 className="font-bold text-gray-900">{user?.username || 'Community Member'}</h4>
                <p className="text-sm text-gray-500 line-clamp-1">{user?.bio || 'no bio yet'}</p>
            </div>
        </div>
    </motion.div>
);

const ReviewsSection = () => {
    const { data: recipes, isLoading } = useRecipes();

    // Flatten recipes to get all reviews with user data
    const allReviews = recipes?.flatMap(recipe =>
        (recipe.reviews || []).map(review => ({
            ...review,
            recipeTitle: recipe.title
        }))
    ) || [];

    // Sort by newest and take top 4
    const displayReviews = allReviews
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    // Fallback static reviews if database is empty
    const fallbackReviews = [
        {
            user: { username: "Sarah Jenkins", profilePic: null, bio: "Home Chef & Foodie" },
            content: "My Kitchen has completely changed how I plan my meals. The step-by-step instructions are so clear!",
            rating: 5,
        },
        {
            user: { username: "Marcus Chen", profilePic: null, bio: "no bio yet" },
            content: "The smart shopping list is a game-changer. I just pick my recipes and my list is ready.",
            rating: 5,
        },
        {
            user: { username: "Elena Rodriguez", profilePic: null, bio: "Fitness Enthusiast" },
            content: "I love the healthy alternatives suggestions. It helps me stay on track with my fitness goals.",
            rating: 5,
        },
        {
            user: { username: "David Kim", profilePic: null, bio: "no bio yet" },
            content: "The variety of recipes is amazing. I've learned so many new techniques here!",
            rating: 5,
        }
    ];

    const finalReviews = displayReviews.length > 0
        ? displayReviews.map(r => ({ ...r, content: r.comment }))
        : fallbackReviews;

    if (isLoading) return null;

    return (
        <section id="reviews" className="py-24 px-6 bg-gradient-to-b from-white to-orange-50/30 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
                    >
                        What our community says
                    </motion.h2>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl"
                    >
                        Join thousands of happy home cooks who have upgraded their kitchen game with our smart cooking assistant.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {finalReviews.map((rev, i) => (
                        <ReviewCard key={i} {...rev} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ReviewsSection;
