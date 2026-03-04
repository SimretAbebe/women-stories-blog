import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register({ lang }) {
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
      setError(lang === 'en' ? 'Passwords do not match' : 'የይለፍ ቃሎቹ አይዛመዱም');
      return;
    }

    try {
      await api.post('register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert(lang === 'en' ? 'Registration successful! Please login.' : 'ምዝገባው ተሳክቷል! እባክዎ ይግቡ።');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(lang === 'en' ? 'Registration failed. Try a different username.' : 'ምዝገባው አልተሳካም። ሌላ የተጠቃሚ ስም ይሞክሩ።');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
        {lang === 'en' ? 'Create Account' : 'አካውንት ይፍጠሩ'}
      </h2>
      
      {error && <p className="text-red-500 text-sm mb-4 text-center font-bold">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Username' : 'የተጠቃሚ ስም'}</label>
          <input name="username" type="text" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Email' : 'ኢሜል'}</label>
          <input name="email" type="email" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Password' : 'የይለፍ ቃል'}</label>
          <input name="password" type="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Confirm Password' : 'የይለፍ ቃሉን ያረጋግጡ'}</label>
          <input name="confirmPassword" type="password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
        
        <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg">
          {lang === 'en' ? 'Register' : 'ተመዝገብ'}
        </button>
      </form>
    </div>
  );
}

export default Register;
