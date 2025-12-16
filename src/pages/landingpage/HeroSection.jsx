// src/components/HeroSection.jsx (Revised)

// --- External Image Imports (Use your actual paths in a real project) ---
// Note: You must place your actual image/avatar files in your project's public or assets folder
// For demonstration, these are placeholders for the visual structure.
const friedRiceImage = "placeholder_fried_rice.jpg"; 
const avatar1 = "placeholder_avatar_1.jpg"; 
const avatar2 = "placeholder_avatar_2.jpg";
const avatar3 = "placeholder_avatar_3.jpg";
// ------------------------------------------------------------------------

const HeroSection = () => {
  return (
    // Main Section: Adjusted height and padding to accommodate the full design
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 px-12 overflow-hidden">
      
      {/* 1. Left Content Area */}
      <div className="w-1/2 z-10 pr-10"> 
        <p className="text-gray-600 font-serif italic mb-4 text-xl">
          Your smart cooking companion
        </p>

        {/* Main Heading: Requires a custom/serif font (like Playfair Display) to match the screenshot */}
        <h1 className="text-7xl font-['Playfair_Display',serif] font-extrabold leading-tight mb-6 text-gray-800">
          Taste the joy of <br />
          homemade <span className="text-lime-600">cooking.</span>
        </h1>

        <p className="text-gray-600 max-w-lg mb-12 text-lg leading-relaxed">
          My Kitchen is your personal cooking assistant designed to make meal
          preparation easier and more inspiring. Browse thousands of curated
          recipes, search by ingredients you already have, and discover healthy,
          quick, and budget-friendly meal ideas.
        </p>

        {/* CTA + Users Section */}
        <div className="flex items-center gap-10">
          {/* CTA Button: Softer orange, larger padding, full rounded corners */}
          <button className="bg-amber-500 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-xl hover:bg-amber-600 transition duration-300">
            Visit now
          </button>

          {/* Happy Users Section: Avatars and Rating */}
          <div className="flex items-center gap-4">
            {/* Avatar Group */}
            <div className="flex -space-x-2">
              <img src={avatar1} alt="User 1" className="w-10 h-10 object-cover bg-gray-300 rounded-full border-2 border-white" />
              <img src={avatar2} alt="User 2" className="w-10 h-10 object-cover bg-gray-300 rounded-full border-2 border-white" />
              <img src={avatar3} alt="User 3" className="w-10 h-10 object-cover bg-gray-300 rounded-full border-2 border-white" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-800">Our Happy Users</p>
              {/* Rating Stars: Yellow color is prominent */}
              <span className="text-yellow-500 text-base tracking-wider">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Optional: Subtle background graphic on the left */}
        <div className="absolute left-0 bottom-0 h-full w-1/2 opacity-30 z-0" 
             style={{ 
                 backgroundImage: 'url(placeholder_background_texture.png)', 
                 backgroundSize: 'contain',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'left bottom'
             }}
        ></div>

      </div>

      {/* 2. Right Image Section with Background Shape */}
      {/* The background is an absolute element covering the right side with a custom shape */}
      <div className="absolute right-0 top-0 h-full w-[55%] bg-lime-200 z-0" 
           style={{ 
             // Custom clip-path to create the large, rounded-diagonal cut-off shape from the screenshot
             clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
             backgroundColor: '#C8E6C9', // Specific light green color
           }}>
      </div>
      
      {/* Main Food Image Container */}
      {/* Positioned to slightly overlap the green background and stand out */}
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-[50%] flex justify-end z-10">
        {/* The image is a round plate, cropped by a circular container */}
        <div className="w-[500px] h-[500px] rounded-full overflow-hidden shadow-2xl relative">
          <img 
            src={friedRiceImage} 
            alt="Delicious Fried Rice on a Plate" 
            // Ensures the image fills the circular container
            className="w-full h-full object-cover scale-105" 
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
