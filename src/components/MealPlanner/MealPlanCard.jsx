// components/mealplanner/MealPlanCard.jsx
export default function MealPlanCard({ plan, onEdit, onDelete }) {
  return (
    <div className="relative group bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex gap-3">
        <img 
          src={plan.recipe.image} 
          className="w-12 h-12 rounded-xl object-cover" 
          alt={plan.recipe.title} 
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 truncate">{plan.recipe.title}</h4>
          <p className="text-[10px] text-gray-500 line-clamp-1">{plan.note || "No notes"}</p>
        </div>
      </div>
      
      {/* Actions Overlay */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(plan)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
          ✏️
        </button>
        <button onClick={() => onDelete(plan._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
          🗑️
        </button>
      </div>
    </div>  
  );
}