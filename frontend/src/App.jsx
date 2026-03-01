import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ background: '#333', color: '#fff', padding: '10px 20px' }}>
          <h1>Women's Stories Blog</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

