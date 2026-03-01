import React from 'react';

function StoryCard({ story }) {
  // Bonus: Django stores image paths, but we need the full URL for the frontend
  const imageUrl = story.image ? `http://127.0.0.1:8000${story.image}` : 'https://via.placeholder.com/150';

  return (
    <div className="story-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10px' }}>
      <img src={imageUrl} alt={story.title_en} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{story.title_en}</h3>
      <p>{story.content_en.substring(0, 100)}...</p>
    </div>
  );
}

export default StoryCard;
