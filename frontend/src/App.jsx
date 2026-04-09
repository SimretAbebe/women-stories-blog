import { useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import StoryDetail from './pages/StoryDetail';
import SubmitStory from './pages/SubmitStory';
import Login from './pages/Login';
import Register from './pages/Register';
import MyStories from './pages/MyStories';
import AuthContext from './context/AuthContext';
import translations from './translations';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');
  const { tokens, logout } = useContext(AuthContext);
  const t = translations[lang] || translations['en'];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            {t.nav.title}
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/submit" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-all">
              {t.nav.submit}
            </Link>
            <Link to="/about" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-all">
              {t.nav.about}
            </Link>

            {tokens ? (
              <div className="flex items-center gap-6">
                <Link to="/my-stories" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-all">
                  {t.nav.myStories}
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
  <div className="flex items-center gap-4">
    <Link 
      to="/register" 
      className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-all"
    >
      {t.nav.getStarted}
    </Link>
  </div>
)}

                        <button 
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-all"
            >
              {t.nav.toggleLang}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 text-left min-h-screen">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/story/:id" element={<StoryDetail lang={lang} />} />
          <Route path="/submit" element={<SubmitStory lang={lang} />} />
          <Route path="/my-stories" element={<MyStories lang={lang} />} />
          <Route path="/login" element={<Login lang={lang} />} />
          <Route path="/register" element={<Register lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
        </Routes>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            {t.nav.title}
          </div>
          <div className="text-sm text-gray-400 font-medium">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

