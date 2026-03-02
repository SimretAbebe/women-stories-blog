function StoryCard({ story }) {
  const imageUrl = story.image ? `http://127.0.0.1:8000${story.image}` : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="h-48 overflow-hidden">
        <img src={imageUrl} alt={story.title_en} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-pink-600 uppercase tracking-wide">{story.category_name}</span>
        <h3 className="mt-2 text-xl font-bold text-gray-900 leading-tight">{story.title_en}</h3>
        <p className="mt-3 text-gray-600 line-clamp-3 font-serif italic text-sm">
          "{story.content_en}"
        </p>
        <button className="mt-4 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
          Read Full Story →
        </button>
      </div>
    </div>
  );
}

export default StoryCard;


