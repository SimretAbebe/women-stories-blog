import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../api';
import StoryCard from '../components/StoryCard';
import translations from '../translations';

function Home({ lang }) {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[lang];

  useEffect(() => {
    // Fetch categories
    api.get('categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let url = 'stories/';
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    api.get(url)
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.error("Error fetching stories:", error);
      });
  }, [selectedCategory, searchQuery]);


  return (
    <div className="relative min-h-screen">
      {/* Decorative Background Blobs */}
      <div className="fixed top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none delay-700" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 mb-20">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-pink-100">
            {t.home.badge}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-8 tracking-tighter">
            {t.home.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">{t.home.heroTitleJourney}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12">
            {t.home.heroSubtitle}
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <input 
              type="text" 
              placeholder={t.home.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-2xl border-2 border-white focus:ring-4 focus:ring-pink-500/20 transition-all outline-none text-xl font-medium placeholder:text-gray-300"
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-600 transition-colors duration-300">
              <Search size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="glass p-3 rounded-full inline-flex gap-2 mb-12 shadow-inner">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-2.5 rounded-full text-xs font-black transition-all tracking-widest ${!selectedCategory ? 'bg-white text-pink-600 shadow-xl scale-105' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {t.home.allJourneys}
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-2.5 rounded-full text-xs font-black transition-all tracking-widest ${selectedCategory === cat.id ? 'bg-white text-pink-600 shadow-xl scale-105' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {t.home.featuredStories}
          </h2>
          <div className="h-px bg-gray-100 flex-grow mx-8" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {stories.length} {t.home.results}
          </p>
        </div>
        
        {stories.length === 0 ? (
          <div className="text-center py-32 glass rounded-[3rem] border-dashed border-2 border-gray-200">
            <p className="text-xl text-gray-400 font-bold italic">
              {t.home.noResults}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((story, index) => (
              <div key={story.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-up">
                <StoryCard story={story} lang={lang} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default Home;

