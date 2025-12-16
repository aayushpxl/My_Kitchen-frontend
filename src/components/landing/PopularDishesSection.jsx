import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const DishCard = ({ title, image, tags, timing }) => (
    <Card className="p-0 overflow-hidden group">
        <div className="h-48 bg-gray-100 relative overflow-hidden">
            {/* Image Placeholder */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                {image}
            </div>
            <div className="absolute top-3 right-3">
                <div className="bg-white p-1.5 rounded-full shadow-sm">
                    ❤️
                </div>
            </div>
        </div>

        <div className="p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                    <Badge key={i} color={tag === "Vegetarian" ? "green" : "orange"}>
                        {tag}
                    </Badge>
                ))}
                <span className="text-xs text-gray-400 flex items-center ml-auto">
                    ⏱️ {timing}
                </span>
            </div>

            <Button variant="outline" className="w-full text-sm py-2">
                View Recipe
            </Button>
        </div>
    </Card>
);

const PopularDishesSection = () => {
    const dishes = [
        { title: "Blueberry Pancakes", image: "🥞", tags: ["Breakfast", "Sweet"], timing: "20 min" },
        { title: "Margherita Pizza", image: "🍕", tags: ["Lunch", "Vegetarian"], timing: "45 min" },
        { title: "Fresh Garden Salad", image: "🥗", tags: ["Healthy", "Vegan"], timing: "10 min" },
        { title: "Buddha Bowl", image: "🍲", tags: ["Dinner", "Healthy"], timing: "30 min" },
    ];

    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <p className="text-orange-500 font-medium mb-2">Popular dishes</p>
                    <h2 className="text-3xl font-bold text-gray-800">Discover Delicious Recipes</h2>
                    <p className="text-gray-500 mt-2">Explore our collection of mouth-watering dishes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dishes.map((dish, i) => (
                        <DishCard key={i} {...dish} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="inline-block p-6 bg-white rounded-2xl shadow-sm max-w-lg">
                        <h3 className="font-bold text-gray-800 mb-2">Login to get full recipe</h3>
                        <p className="text-gray-500 text-sm mb-4">Unlock premium content and more.</p>
                        <Button variant="primary" className="w-full">Login Now</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularDishesSection;
