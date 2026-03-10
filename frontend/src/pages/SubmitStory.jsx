import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api';

function SubmitStory({ lang }) {
  const navigate = useNavigate();
  const { tokens } = useContext(AuthContext);

  useEffect(() => {
    if (!tokens) {
      navigate('/login');
    }
  }, [tokens, navigate]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    title_en: '',
    title_am: '',
    content_en: '',
    content_am: '',
    image: null
  });

  useEffect(() => {
    api.get('categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await api.post('stories/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(lang === 'en' ? 'Story submitted! Awaiting approval.' : 'Story sent');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error submitting story');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {lang === 'en' ? 'Submit a New Story' : 'አዲስ ታሪክ ላክ'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{lang === 'en' ? 'Category' : 'Section'}</label>
          <select name="category" onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2">
            <option value="">{lang === 'en' ? 'Select Category' : 'Select any property'}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="border-l-4 border-pink-500 pl-4 space-y-4">
          <input type="text" name="title_en" placeholder="English Title" onChange={handleChange} required className="w-full border rounded-md p-2" />
          <textarea name="content_en" placeholder="English Content" onChange={handleChange} required rows="4" className="w-full border rounded-md p-2" />
        </div>

        {/* Amharic Inputs */}
        <div className="border-l-4 border-purple-500 pl-4 space-y-4">
          <input type="text" name="title_am" placeholder="Amharic LIst" onChange={handleChange}  className="w-full border rounded-md p-2" />
          <textarea name="content_am" placeholder="Amharic Section" onChange={handleChange}  rows="4" className="w-full border rounded-md p-2" />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{lang === 'en' ? 'Story Image' : 'የታሪኩ ምስል'}</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500" />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-2 rounded-md hover:opacity-90 transition-opacity">
          {lang === 'en' ? 'Submit Story' : 'Tariku Telkuwale'}
        </button>
      </form>
    </div>
  );
}

export default SubmitStory;
