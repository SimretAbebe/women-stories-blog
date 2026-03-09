import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import  { Loader2 } from 'lucide-react';

function Login({ lang }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(lang === 'en' ? 'Invalid username or password' : 'Wrong username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
        {lang === 'en' ? 'Welcome Back' : 'Welcome again'}
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center font-bold">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {lang === 'en' ? 'Username' : 'Name'}
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder={lang === 'en' ? 'Enter your username' : 'Your name'}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {lang === 'en' ? 'Password' : 'Key'}
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
          />
        </div>
        <button 
  type="submit" 
  disabled={loading} // 1. Disable button while loading
  className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform active:scale-95'}`}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={20} />
      {lang === 'en' ? 'Signing in...' : 'Waiting'}
    </>
  ) : (
    lang === 'en' ? 'Login' : 'Gatting In'
  )}
</button>

      </form>
    </div>
  );
}

export default Login;
