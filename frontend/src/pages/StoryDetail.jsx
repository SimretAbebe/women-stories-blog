import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function StoryDetail({ lang }) {
  const { id } = useParams(); 
  const [story, setStory] = useState(null);

  useEffect(() => {
    api.get(`stories/${id}/`)
      .then(response => setStory(response.data))
      .catch(error => console.error("Error fetching story:", error));
  }, [id]);

  if (!story) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const imageUrl = story.image ? `http://127.0.0.1:8000${story.image}` : 'https://via.placeholder.com/800x400';
  const title = lang === 'en' ? story.title_en : story.title_am;
  const content = lang === 'en' ? story.content_en : story.content_am;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-purple-600 hover:text-purple-800 font-bold mb-6 inline-flex items-center gap-2 transition-colors">
        <span>&larr;</span> {lang === 'en' ? 'Back to Stories' : 'Back to Stories (AM)'}
      </Link>
      
      <div className="relative h-96 w-full mb-8 rounded-2xl overflow-hidden shadow-xl">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <span className="bg-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            {story.category_name}
          </span>
        </div>
      </div>
      
      <article className="prose prose-pink lg:prose-xl max-w-none">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          {title}
        </h1>
        <div className="text-gray-700 leading-relaxed font-serif text-lg md:text-xl whitespace-pre-line bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          {content}
        </div>
      </article>
    </div>
  );
}

export default StoryDetail;
