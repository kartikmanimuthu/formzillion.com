import React from "react";

function HeroRight() {
  return (
    <video className="relative z-50 bg-black w-full border-2 border-gray-600 rounded-xl mt-20 p-10 max-w-4xl" autoPlay muted loop playsInline>
      <source src="/home_demo_hero.mp4" type="video/mp4" />
    </video>
  );
}

export default HeroRight;