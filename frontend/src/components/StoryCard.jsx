import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import translations from '../translations';

function StoryCard({ story, lang }) {
  const t = translations[lang] || translations['en'];
  const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const baseUrl = rawBaseUrl.replace('/api/', '');
  
  const imageUrl = story.image 
    ? (story.image.startsWith('http') ? story.image : `${baseUrl}${story.image}`) 
    : 'https://via.placeholder.com/150';

  const title = lang === 'am' && story.title_am ? story.title_am : story.title_en;;
  const content = lang === 'am' && story.content_am ? story.content_am : story.content_en;

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/50 animate-fade-up hover:-translate-y-2 group">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-7 relative">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest">{story.category_name}</span>
          <span className="text-[10px] text-gray-400 font-medium">{new Date(story.created_at).toLocaleDateString()}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-pink-600 transition-colors duration-300 line-clamp-2 h-14">
          {title}
        </h3>
        <p className="mt-4 text-gray-600 line-clamp-3 font-serif italic text-sm leading-relaxed">
          "{content}"
        </p>
        <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
          <Link to={`/story/${story.id}`} className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-80 transition-opacity flex items-center gap-2 group/link">
            {t.home.readJourney}
            <ArrowRight size={16} className="text-pink-600 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
              {story.author_username ? story.author_username[0].toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;



