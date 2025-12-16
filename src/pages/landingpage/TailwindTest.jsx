export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Tailwind CSS Test
          </h1>
          <p className="text-sm text-gray-500">
            If this looks styled, Tailwind works 🚀
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg
                       hover:bg-blue-700 transition"
          >
            Primary
          </button>

          <button
            className="flex-1 border border-gray-300 py-2 rounded-lg
                       hover:bg-gray-100 transition"
          >
            Secondary
          </button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center">
            Card 1
          </div>
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
            Card 2
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          Resize screen to test responsiveness
        </p>

      </div>
    </div>
  );
}
