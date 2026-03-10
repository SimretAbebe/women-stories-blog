import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(lang === 'en' ? 'Passwords do not match' : 'No Matching');
      return;
    }
    setLoading(true);

    try {
      await api.post('register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert(lang === 'en' ? 'Registration successful! Please login.' : '');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(lang === 'en' ? 'Registration failed. Try a different username.' : '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
        {lang === 'en' ? 'Create Account' : ''}
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center font-bold">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Username' : ''}</label>
          <input name="username" type="text" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Email' : ''}</label>
          <input name="email" type="email" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Password' : ''}</label>
          <input name="password" type="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Confirm Password' : ''}</label>
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
      {lang === 'en' ? 'Creating account...' : ''}
    </>
  ) : (
    lang === 'en' ? 'Register' : ''
  )}
</button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
  {lang === 'en' ? 'Already have an account?' : ''} {' '}
  <Link to="/login" className="text-pink-600 font-bold hover:underline">
    {lang === 'en' ? 'Sign In' : ''}
  </Link>
</p>

    </div>
  );
}

export default Register;
