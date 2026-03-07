import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Share2 } from 'lucide-react';

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

  const imageUrl = story.image 
    ? (story.image.startsWith('http') ? story.image : `http://127.0.0.1:8000${story.image}`) 
    : 'https://via.placeholder.com/800x400';
  const title = lang === 'en' ? story.title_en : story.title_am;
  const content = lang === 'en' ? story.content_en : story.content_am;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-up">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-gray-500 hover:text-pink-600 transition-all mb-10 group">
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> 
        {lang === 'en' ? 'BACK TO JOURNEYS' : 'Let Us Back'}
      </Link>
      
      <div className="relative h-[500px] w-full mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-pink-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl mb-4 inline-block">
            {story.category_name}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 drop-shadow-lg">
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-bold text-lg">
              {story.author_username ? story.author_username[0].toUpperCase() : 'U'}
            </div>
            <div className="text-white">
              <p className="text-sm font-bold opacity-100">{story.author_username || 'Contributor'}</p>
              <p className="text-xs opacity-70 font-medium">{new Date(story.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-10 md:p-16 rounded-[2.5rem] border border-white/40 mb-12">
        <div className="prose prose-pink lg:prose-2xl max-w-none">
          <p className="text-gray-800 leading-[1.8] font-serif italic text-xl md:text-2xl first-letter:text-5xl first-letter:font-black first-letter:text-pink-600 first-letter:mr-3 first-letter:float-left whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3 active:scale-95">
          <Share2 size={20} />
          {lang === 'en' ? 'SHARE THIS JOURNEY' : 'SHARE'}
        </button>
      </div>
    </div>
  );
}

export default StoryDetail;
