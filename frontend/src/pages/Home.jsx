import React, { useEffect, useState } from 'react';
import api from '../api';
import StoryCard from '../components/StoryCard';

function Home({ lang }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    api.get('stories/')
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.error("Error fetching stories:", error);
      });
  }, []);

  return (
    <div className="px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        {lang === 'en' ? 'Latest Inspirational Stories' : 'Latest Stories (Amharic Content)'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} lang={lang} />
        ))}
      </div>
    </div>
  );
}

export default Home;
