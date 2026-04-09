import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api';
import StoryCard from '../components/StoryCard';
import translations from '../translations';

function MyStories({ lang }) {
  const [stories, setStories] = useState([]);
  const { tokens } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    api.get('stories/my_stories/')
      .then(response => {
        setStories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching my stories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 border-l-4 border-pink-600 pl-4">
          {t.myStories.title}
        </h1>
        <Link 
          to="/submit" 
          className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:opacity-90 transition-all"
        >
          {t.myStories.newStory}
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">
            {t.myStories.noStories}
          </p>
          <Link to="/submit" className="text-pink-600 font-bold hover:underline">
            {t.myStories.shareNow}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story.id} className="relative">
              <StoryCard story={story} lang={lang} />
              {!story.is_approved && (
                <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 shadow-sm">
                  {t.myStories.pending}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyStories;

