import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useRecipes } from '../../hooks/useRecipes';
import { getImageUrl } from '../../utils/imageUtils';
import RecipeDetailsModal from './RecipeDetailsModal';

const DishCard = ({ _id, title, image, tags, timing, onCardClick }) => {
    // Ensure tags is an array
    const displayTags = Array.isArray(tags) ? tags.slice(0, 2) : [];

    return (
        <Card className="p-0 overflow-hidden group h-full flex flex-col">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
                {/* Image */}
                <img
                    src={getImageUrl(image)}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/400x300?text=No+Image"; }}
                />
                <div className="absolute top-3 right-3">
                    <div className="bg-white p-1.5 rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        ❤️
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {displayTags.map((tag, i) => (
                        <Badge key={i} color={tag === "Vegetarian" ? "green" : "orange"}>
                            {tag}
                        </Badge>
                    ))}
                    <span className="text-xs text-gray-400 flex items-center ml-auto">
                        ⏱️ {timing || '30 min'}
                    </span>
                </div>

                <div className="mt-auto">
                    <Button
                        variant="outline"
                        className="w-full text-sm py-2"
                        onClick={onCardClick}
                    >
                        View Recipe
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const PopularDishesSection = () => {
    const { data: recipes, isLoading, error } = useRecipes();
    const navigate = useNavigate();
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Get top 4 recipes or just the first 4 for now
    const displayRecipes = recipes ? recipes.slice(0, 4) : [];

    if (isLoading) return <div className="py-16 text-center">Loading popular dishes...</div>;
    if (error) return null; // Hide section on error or show empty state

    return (
        <section id="popular-recipes" className="pt-10 pb-16 px-6 bg-gray-50">
            <RecipeDetailsModal
                recipe={selectedRecipe}
                isOpen={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
            />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <p className="text-orange-500 font-medium mb-2">Popular dishes</p>
                    <h2 className="text-3xl font-bold text-gray-800">Discover Delicious Recipes</h2>
                    <p className="text-gray-500 mt-2">Explore our collection of mouth-watering dishes.</p>
                </div>

                {displayRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayRecipes.map((dish) => (
                            <DishCard
                                key={dish._id}
                                {...dish}
                                onCardClick={() => setSelectedRecipe(dish)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No recipes found.</div>
                )}

                <div className="text-center mt-12">
                    <div className="inline-block p-6 bg-white rounded-2xl shadow-sm max-w-lg">
                        <h3 className="font-bold text-gray-800 mb-2">Login to get full recipe</h3>
                        <p className="text-gray-500 text-sm mb-4">Unlock premium content, save favorites, and more.</p>
                        <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
                            Login Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularDishesSection;
