import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import translations from '../translations';

function Register({ lang }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const t = translations[lang];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t.register.matchError);
      return;
    }
    setLoading(true);

    try {
      await api.post('register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert(t.register.success);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(t.register.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
        {t.register.title}
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center font-bold">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{t.register.username}</label>
          <input name="username" type="text" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{t.register.email}</label>
          <input name="email" type="email" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{t.register.password}</label>
          <input name="password" type="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{t.register.confirmPassword}</label>
          <input name="confirmPassword" type="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        
        <button 
  type="submit" 
  disabled={loading}
  className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform active:scale-95'}`}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={20} />
      {t.register.loading}
    </>
  ) : (
    t.register.button
  )}
</button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
  {t.register.hasAccount} {' '}
  <Link to="/login" className="text-pink-600 font-bold hover:underline">
    {t.register.signIn}
  </Link>
</p>

    </div>
  );
}

export default Register;

