import React from 'react';
import { Eye, Edit3, Trash2, Clock, Flame } from "lucide-react";
import { getImageUrl } from "../../utils/imageUtils";

export default function WeeklyMealCard({ meal, onDelete, onEdit, onView, isHeader = false }) {
  // 1. Header Variant
  if (isHeader) {
    return (
      <div className="min-w-[200px] flex flex-col justify-center pr-4">
        <h2 className="text-3xl font-black text-gray-900 leading-tight">
          Your meals <br />
          <span className="text-orange-500 font-medium text-lg tracking-wide uppercase italic">
            For this week
          </span>
        </h2>
        <div className="w-12 h-1 bg-orange-500 rounded-full mt-4" />
      </div>
    );
  }

  // 2. Meal Card Variant
  const { recipe } = meal;

  return (
    <div className="group relative min-w-[320px] max-w-[320px] bg-white border border-gray-100 rounded-[2rem] p-3 flex items-center gap-4 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-orange-200/60 cursor-pointer">

      {/* Image: Compact & Squircle */}
      <div className="relative shrink-0 w-20 h-20 overflow-hidden rounded-[1.5rem] bg-gray-50 shadow-inner">
        <img
          src={getImageUrl(recipe?.image, "https://placehold.co/400x400?text=Meal")}
          alt={recipe?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Info: Clean & High Density */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[8px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
            {meal.mealType}
          </span>
          <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
            <Clock size={10} strokeWidth={3} />
            {recipe?.time || "20m"}
          </div>
        </div>

        <h4 className="font-bold text-gray-900 text-[13px] leading-tight truncate mb-1 group-hover:text-orange-600 transition-colors">
          {recipe?.title}
        </h4>

        {/* Nutrition Strip: Minimalist */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame size={10} className="text-orange-300" />
            <span className="text-[10px] font-bold text-gray-700">{recipe?.calories || "320"}</span>
            <span className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter">kcal</span>
          </div>
          <div className="w-[1px] h-2 bg-gray-200" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-gray-700">{recipe?.protein || "12"}g</span>
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">Pro</span>
          </div>
        </div>
      </div>

      {/* Hover Actions: Minimalist Floating Bar */}
      <div className="absolute inset-y-0 right-2 flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={(e) => { e.stopPropagation(); onView(recipe?._id); }}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 text-gray-400 hover:text-blue-500 hover:border-blue-100 rounded-full shadow-sm transition-all active:scale-90"
        >
          <Eye size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(meal); }}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 text-gray-400 hover:text-emerald-500 hover:border-emerald-100 rounded-full shadow-sm transition-all active:scale-90"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(meal._id); }}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 rounded-full shadow-sm transition-all active:scale-90"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Subtle Progress bar on the far right */}
      <div className="absolute right-0 inset-y-6 w-1 bg-gray-50 rounded-l-full group-hover:bg-orange-100 transition-colors" />
    </div>
  );
}