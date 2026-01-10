import React from 'react';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon, title, desc, index }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex flex-col items-center text-center p-6 hover:bg-white hover:shadow-lg rounded-2xl transition-all duration-300 group"
    >
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
);

const FeaturesSection = () => {
    const features = [
        {
            icon: "🔍",
            title: "Ingredient-Based Search",
            desc: "Find recipes using what's already in your kitchen."
        },
        {
            icon: "📖",
            title: "Step-by-Step Guidance",
            desc: "Cook confidently with detailed instructions."
        },
        {
            icon: "🛒",
            title: "Smart Shopping List",
            desc: "Automatically add ingredients to your list."
        },
        {
            icon: "🌱",
            title: "Healthy Alternatives",
            desc: "Get smart suggestions for substitutes."
        },
        {
            icon: "⭐",
            title: "Review & Feedback",
            desc: "Share your cooking experience and tips."
        }
    ];

    return (
        <section id="features" className="pt-20 pb-10 px-6 max-w-7xl mx-auto">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-12"
            >
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="text-3xl font-bold text-gray-800"
                >
                    Why Choose Us?
                </motion.h2>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
                {features.map((f, i) => (
                    <FeatureItem key={i} {...f} index={i} />
                ))}
            </motion.div>
        </section>
    );
};

export default FeaturesSection;
