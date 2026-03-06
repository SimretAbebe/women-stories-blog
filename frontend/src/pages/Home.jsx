import React, { useEffect, useState } from 'react';
import api from '../api';
import StoryCard from '../components/StoryCard';

function Home({ lang }) {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="px-4 max-w-7xl mx-auto">
      {/* Search and Filter Section */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Search stories..." : "ታሪኮችን ይፈልጉ..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white shadow-lg border-none focus:ring-2 focus:ring-pink-500 transition-all outline-none text-lg"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${!selectedCategory ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            {lang === 'en' ? 'All' : 'ሁሉም'}
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${selectedCategory === cat.id ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-purple-600 pl-4">
        {lang === 'en' ? 'Latest Inspirational Stories' : 'የቅርብ ጊዜ አነቃቂ ታሪኮች'}
      </h2>
      
      {stories.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {lang === 'en' ? "No stories found matching your criteria." : "ከእርስዎ ፍለጋ ጋር የሚዛመድ ታሪክ አልተገኘም።"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
