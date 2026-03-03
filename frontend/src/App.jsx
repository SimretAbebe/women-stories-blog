import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import SubmitStory from './pages/SubmitStory';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <Router>
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
