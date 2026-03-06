import { useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import SubmitStory from './pages/SubmitStory';
import Login from './pages/Login';
import Register from './pages/Register';
import MyStories from './pages/MyStories';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');
  const { tokens, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            Women's Stories
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/submit" className="text-sm font-bold text-gray-600 hover:text-pink-600 transition-colors">
              {lang === 'en' ? 'Submit Story' : 'Submit Story (AM)'}
            </Link>

            {tokens ? (
              <div className="flex items-center gap-6">
                <Link to="/my-stories" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition-colors">
                  {lang === 'en' ? 'My Stories' : 'የኔ ታሪኮች'}
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                >
                  {lang === 'en' ? 'Logout' : 'ውጣ'}
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors">
                  {lang === 'en' ? 'Login' : 'Login (AM)'}
                </Link>
                <Link to="/register" className="text-sm font-bold text-pink-600 hover:text-pink-800 transition-colors">
                  {lang === 'en' ? 'Register' : 'Register (AM)'}
                </Link>
              </div>
            )}
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-bold transition-colors"
            >
              {lang === 'en' ? 'Amharic' : 'English'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/story/:id" element={<StoryDetail lang={lang} />} />
          <Route path="/submit" element={<SubmitStory lang={lang} />} />
          <Route path="/login" element={<Login lang={lang} />} />
          <Route path="/register" element={<Register lang={lang} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
