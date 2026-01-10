// import React from 'react';
// import Button from '../ui/Button';
// import heroImage from '../../assets/home/herosectionimage.png'; 

// const HomeHeroSection = () => {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#fafafa]">
//       {/* 1. CSS Animations for Motion Graphics Effect */}
//       <style>{`
//         @keyframes float-plate {
//           0% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(2deg); }
//           100% { transform: translateY(0px) rotate(0deg); }
//         }
//         @keyframes float-info {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(10px); }
//           100% { transform: translateY(0px); }
//         }
//         .animate-float-plate {
//           animation: float-plate 6s ease-in-out infinite;
//         }
//         .animate-float-info {
//           animation: float-info 5s ease-in-out infinite;
//         }
//       `}</style>

//       {/* --- BACKGROUND BLOBS --- */}
//       <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] -z-0"></div>
//       <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#A7C957]/15 rounded-full blur-[150px] -z-0"></div>

//       <div className="container mx-auto px-6 lg:px-20 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between relative z-10">

//         {/* Text Content */}
//         <div className="md:w-[55%] space-y-6 text-left">
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight">
//             Healthy <span className="text-[#8B2323]">Eating</span> is <br />
//             <span className="text-[#C59D5F]">an Important</span> Part <br />
//             of Lifestyle
//           </h1>
//           <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed font-medium">
//             View recipe and start to make one. <br />
//             We have Complete recipes for your daily needs.
//           </p>
//           <div className="pt-4">
//             <Button className="bg-[#FF6B00] hover:bg-[#e65a00] text-white px-10 py-4 rounded-2xl transition-all font-bold text-lg shadow-xl shadow-orange-200/50 active:scale-95">
//               Start Now
//             </Button>
//           </div>
//         </div>

//         {/* 2. Image Area with Motion Graphics */}
//         <div className="md:w-[45%] relative mt-16 md:mt-0 flex justify-center md:justify-end">
//           <div className="relative w-full max-w-[480px]">

//             {/* The Main Plate Image: Floating & Slightly Rotating */}
//             <div className="animate-float-plate">
//               <img
//                 src={heroImage}
//                 alt="Healthy Food Plate"
//                 className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-10"
//               />
//             </div>

//             {/* 3. Floating Info Box: Bobbing in opposite direction */}
//             <div className="animate-float-info absolute bottom-[5%] -left-6 md:-left-16 bg-white/60 backdrop-blur-xl p-5 md:p-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/60 flex flex-col gap-5 min-w-[180px] md:min-w-[210px] z-20">
//               <div className="flex items-center gap-4">
//                 <div className="bg-white p-2.5 rounded-2xl shadow-sm">
//                   <span className="text-xl">⏱️</span>
//                 </div>
//                 <span className="font-bold text-gray-800 text-sm md:text-base">Less Time</span>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="bg-white p-2.5 rounded-2xl shadow-sm">
//                   <span className="text-xl">🏃</span>
//                 </div>
//                 <span className="font-bold text-gray-800 text-sm md:text-base">Healthy</span>
//               </div>
//             </div>

//             {/* Static Blur Decor */}
//             <div className="absolute -top-10 -right-4 w-32 h-24 bg-white/10 backdrop-blur-md rounded-[3rem] hidden md:block border border-white/20 z-0"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeHeroSection;



import React from 'react';
import Lottie from 'lottie-react';
import Button from '../ui/Button';
import cookingAnimation from '../../assets/home/Cooking.json';

const HomeHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafafa]">
      {/* 1. CSS Animations for UI Elements */}
      <style>{`
        @keyframes float-info {
          0% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-info {
          animation: float-info 5s ease-in-out infinite;
        }
      `}</style>

      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#A7C957]/15 rounded-full blur-[150px] -z-0"></div>

      <div className="container mx-auto px-6 lg:px-20 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* Text Content */}
        <div className="md:w-[50%] space-y-6 text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight">
            Healthy <span className="text-[#8B2323]">Eating</span> is <br />
            <span className="text-[#C59D5F]">an Important</span> Part <br />
            of Lifestyle
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed font-medium">
            View recipe and start to make one. <br />
            We have Complete recipes for your daily needs.
          </p>
          <div className="pt-4">
            <Button className="bg-[#FF6B00] hover:bg-[#e65a00] text-white px-10 py-4 rounded-2xl transition-all font-bold text-lg shadow-xl shadow-orange-200/50 active:scale-95">
              Start Now
            </Button>
          </div>
        </div>

        {/* 2. Animation Area */}
        <div className="md:w-[50%] relative mt-16 md:mt-0 flex justify-center md:justify-end">
          {/* Increased max-width to 580px for a larger presence */}
          <div className="relative w-full max-w-[580px]">

            {/* LOTTIE ANIMATION: Increased scale to 125% and kept the upward shift */}
            <div className="relative z-10 scale-110 md:scale-125 -mt-16 md:-mt-24">
              <Lottie
                animationData={cookingAnimation}
                loop={true}
                className="w-full h-auto"
              />
            </div>

            {/* 3. Floating Info Box: Positioned relative to the larger animation
            <div className="animate-float-info absolute bottom-[5%] -left-4 md:-left-12 bg-white/75 backdrop-blur-xl p-5 md:p-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/60 flex flex-col gap-5 min-w-[180px] md:min-w-[210px] z-20">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2.5 rounded-2xl shadow-sm">
                  <span className="text-xl">⏱️</span>
                </div>
                <span className="font-bold text-gray-800 text-sm md:text-base">Less Time</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white p-2.5 rounded-2xl shadow-sm">
                  <span className="text-xl">🏃</span>
                </div>
                <span className="font-bold text-gray-800 text-sm md:text-base">Healthy</span>
              </div>
            </div> */}

            {/* Decorative Background Element - Expanded to match size */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#FF6B00]/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;