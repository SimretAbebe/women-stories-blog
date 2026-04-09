import React from 'react';
import translations from '../translations';

function About({ lang }) {
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
          {t.about.title}
        </h1>
        
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
          <p>
            {t.about.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-bold text-pink-600 mb-2">
                {t.about.missionTitle}
              </h3>
              <p className="text-sm">
                {t.about.missionDesc}
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-purple-600 mb-2">
                {t.about.impactTitle}
              </h3>
              <p className="text-sm">
                {t.about.impactDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

