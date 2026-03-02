import React, { useEffect, useState } from 'react';
import api from '../api';
import StoryCard from '../components/StoryCard';

function Home() {
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
    <div className="home-page" style={{ padding: '20px' }}>
      <h2>Latest Inspirational Stories</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {stories.map(story => (
    <StoryCard key={story.id} story={story} />
  ))}
</div>

    </div>
  );
}

export default Home;
