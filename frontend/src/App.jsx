import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              Women's Stories
            </h1>
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-bold transition-colors"
            >
              {lang === 'en' ? 'Amharic' : 'English'}
            </button>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/story/:id" element={<StoryDetail lang={lang} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
