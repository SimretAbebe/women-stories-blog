import React from 'react';

function Contact({ lang }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50 text-left">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
          {lang === 'en' ? "Get in Touch" : "ያግኙን"}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              {lang === 'en' 
                ? "Have a story to share or a question about our platform? We'd love to hear from you."
                : "የሚያጋሩት ታሪክ ወይም ስለ መድረካችን ጥያቄ አለዎት? ከእርስዎ መስማት እንወዳለን።"}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-2xl">📧</span>
                <span>hello@womenstories.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-2xl">📍</span>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
          
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder={lang === 'en' ? "Your Name" : "ስምዎ"}
              className="w-full px-6 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <input 
              type="email" 
              placeholder={lang === 'en' ? "Email Address" : "ኢሜል አድራሻ"}
              className="w-full px-6 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <textarea 
              rows="4"
              placeholder={lang === 'en' ? "Your Message" : "መልእክትዎ"}
              className="w-full px-6 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all">
              {lang === 'en' ? "Send Message" : "መልእክት ላክ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
