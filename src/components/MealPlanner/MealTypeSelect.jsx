export default function MealTypeSelect({ types, activeType, onSelect }) {
  return (
    <div className="mb-12">
      <label className="block text-sm font-semibold text-gray-700 mb-3">Select Meal Type</label>
      <select 
        value={activeType}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-500 focus:ring-2 focus:ring-[#00B488]/20 capitalize"
      >
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
    </div>
  );
}