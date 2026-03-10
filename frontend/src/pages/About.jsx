import React from 'react';

function About({ lang }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
          {lang === 'en' ? "Empowering Women's Stories" : ""}
        </h1>
        
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
          <p>
            {lang === 'en' 
              ? "Welcome to My platform dedicated to the voices that inspire, challenge, and shape our world. I believe that every woman's journey is a masterpiece of resilience and hope."
              : ""}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-bold text-pink-600 mb-2">
                {lang === 'en' ? "My Mission" : ""}
              </h3>
              <p className="text-sm">
                {lang === 'en' 
                  ? "To provide a safe, beautiful space for women to share their experiences and connect with a global community."
                  : ""}
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-purple-600 mb-2">
                {lang === 'en' ? "The Impact" : ""}
              </h3>
              <p className="text-sm">
                {lang === 'en' 
                  ? "By documenting these stories, I create a living archive of wisdom and courage for future generations."
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
