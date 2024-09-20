// author: Heli Desai

import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-half h-[70vh] md:h-[80vh] lg:70% bg-cover bg-center flex items-center justify-start text-white pl-8" style={{ backgroundImage: "url('/assets/beachimage.avif')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start">
        <div className="max-w-lg p-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            Life is either a daring adventure or nothing at all
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4">
            Progressively innovate corporate systems through technically sound functionalities. Credibly productive seamless data.
          </p>
          <div className="flex flex-col md:flex-row text-base md:text-lg lg:text-xl">
            <p>01-06-2024</p>
            <p className="md:ml-4">Maldives</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;