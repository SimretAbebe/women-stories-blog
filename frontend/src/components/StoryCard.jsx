import { Link } from 'react-router-dom';

function StoryCard({ story, lang }) {
  const imageUrl = story.image ? `http://127.0.0.1:8000${story.image}` : 'https://via.placeholder.com/150';

  const title = lang === 'en' ? story.title_en : story.title_am;
  const content = lang === 'en' ? story.content_en : story.content_am;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-pink-600 uppercase tracking-wide">{story.category_name}</span>
        <h3 className="mt-2 text-xl font-bold text-gray-900 leading-tight">{title}</h3>
        <p className="mt-3 text-gray-600 line-clamp-3 font-serif italic text-sm">
          "{content}"
        </p>
        <Link to={`/story/${story.id}`} className="mt-4 inline-block text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
          {lang === 'en' ? 'Read Full Story \u2192' : 'Read Full Story (AM) \u2192'}
        </Link>
      </div>
    </div>
  );
}

export default StoryCard;


