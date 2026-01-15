import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';
import { useAuth } from '../../context/AuthContext';
import { useToggleSaveRecipe } from '../../hooks/useRecipes';
import { toast } from 'react-toastify';

const TopChoices = ({ recipes }) => {
  const { user } = useAuth();
  const toggleSaveMutation = useToggleSaveRecipe();

  if (!recipes || recipes.length === 0) return null;

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const handleToggleSave = (id) => {
    if (!user) {
      toast.error("Please login to save recipes");
      return;
    }
    toggleSaveMutation.mutate(id, {
      onSuccess: (data) => {
        toast.success(data.isSaved ? "Saved to your list!" : "Removed from your list!");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    });
  };

  const isRecipeSaved = (id) => {
    return user?.savedRecipes?.some(r => r === id || r._id === id);
  };

  return (
    <section className="relative container mx-auto px-6 md:px-12 lg:px-24 py-20 bg-[#FBFBFA] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-green-50 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative flex items-end justify-between mb-24 z-10">
        <div>
          <span className="text-orange-500 font-black uppercase tracking-[0.2em] text-[11px] bg-orange-50 px-3 py-1 rounded-full">
            Staff Picks
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 tracking-tight">
            Top <span className="text-orange-600">Choices</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium italic">Handpicked recipes for your next meal</p>
        </div>
        <Link
          to="/recipes"
          className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-green-500 transition-all border-b-2 border-transparent hover:border-green-500 pb-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Grid of Dynamic Recipes - Compact spacing */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-28 z-10">
        {recipes.slice(0, 4).map((recipe) => (
          <div
            key={recipe._id}
            className="relative bg-white rounded-[3rem] px-6 pb-6 pt-40 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col items-center group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-3"
          >


            {/* Circular Image - Positioned Absolutely - BIGGER AND BORDERLESS */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-white p-0 shadow-2xl z-10 group-hover:scale-110 transition-transform duration-700 overflow-hidden">
              <img
                src={getImageUrl(recipe.image)}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Content Section */}
            <div className="text-center w-full mb-4">
              <div className="flex justify-center gap-2 mb-3">
                {recipe.tags?.slice(0, 1).map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-black text-orange-400 bg-orange-50 px-3 py-1 rounded-lg uppercase tracking-tight">
                    #{tag}
                  </span>
                ))}
                <span className="text-[11px] font-black text-blue-400 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-tight">
                  🍽️ {recipe.servings || 4}
                </span>
              </div>

              <h3 className="text-[1.15rem] font-black text-gray-800 mb-1 line-clamp-1 px-2 tracking-tight group-hover:text-orange-600 transition-colors">
                {recipe.title}
              </h3>

              {/* Star Rating */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex text-[#FFC107] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(getAverageRating(recipe.reviews)) ? 'fill-current' : 'text-gray-200 fill-current'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-bold tracking-tight">
                  {recipe.reviews?.length || 0} Reviews
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Time</span>
                <span className="text-xs font-black text-gray-500">
                  {recipe.cookingTime || "20 mins"}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Level</span>
                <span className={`text-[11px] font-black ${recipe.difficulty === 'Easy' ? 'text-green-500' :
                  recipe.difficulty === 'Medium' ? 'text-orange-500' :
                    'text-red-500'
                  }`}>
                  {recipe.difficulty || "Easy"}
                </span>
              </div>
            </div>

            <div className="mt-4 w-full flex items-center gap-2">
              <Link
                to={`/recipes/${recipe._id}`}
                className="flex-1 bg-[#E8F8F0] text-[#10B981] text-[11px] font-black py-3 rounded-2xl hover:bg-[#10B981] hover:text-white transition-all duration-300 active:scale-95 text-center shadow-sm hover:shadow-md"
              >
                Start Cooking
              </Link>
              <button
                onClick={() => handleToggleSave(recipe._id)}
                className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm ${isRecipeSaved(recipe._id)
                  ? 'text-red-500 bg-red-50 shadow-red-100'
                  : 'text-gray-400 bg-gray-50 hover:text-red-400'
                  } active:scale-90`}
              >
                <svg className={`w-5 h-5 ${isRecipeSaved(recipe._id) ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopChoices;
