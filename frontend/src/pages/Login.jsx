import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import  { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import translations from '../translations';

function Login({ lang }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(t.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
        {t.login.title}
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center font-bold">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t.login.username}
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder={t.login.placeholderUser}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t.login.password}
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder={t.login.placeholderPass}
          />
        </div>
        <button 
  type="submit" 
  disabled={loading} 
  className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform active:scale-95'}`}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={20} />
      {t.login.loading}
    </>
  ) : (
    t.login.button
  )}
</button>
      </form>
     <p className="mt-8 text-center text-sm text-gray-500 font-medium">
  {t.login.noAccount} {' '}
  <Link to="/register" className="text-pink-600 font-bold hover:underline">
    {t.login.createAccount}
  </Link>
</p>

    </div>
  );
}

export default Login;

