export default function DaySelector({ days, activeDay, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelect(day)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
            activeDay === day 
              ? "bg-[#00B488] text-white border-[#00B488] shadow-md" 
              : "bg-white text-gray-400 border-gray-200 hover:border-[#00B488]"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}