import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api';
import { Loader2 } from 'lucide-react';
import translations from '../translations';


function SubmitStory({ lang }) {
  const navigate = useNavigate();
  const { tokens } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

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
    setLoading(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await api.post('stories/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(t.submit.success);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(t.submit.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {t.submit.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.submit.category}</label>
          <select name="category" onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2">
            <option value="">{t.submit.selectCategory}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="border-l-4 border-pink-500 pl-4 space-y-4">
          <input type="text" name="title_en" placeholder={t.submit.titleEn} onChange={handleChange} required className="w-full border rounded-md p-2" />
          <textarea name="content_en" placeholder={t.submit.contentEn} onChange={handleChange} required rows="4" className="w-full border rounded-md p-2" />
        </div>

        {/* Amharic Inputs */}
        <div className="border-l-4 border-purple-500 pl-4 space-y-4">
          <input type="text" name="title_am" placeholder={t.submit.titleAm} onChange={handleChange}  className="w-full border rounded-md p-2" />
          <textarea name="content_am" placeholder={t.submit.contentAm} onChange={handleChange}  rows="4" className="w-full border rounded-md p-2" />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.submit.image}</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500" />
        </div>

       <button 
  type="submit" 
  disabled={loading}
  className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform active:scale-95'}`}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={20} />
      {t.submit.loading}
    </>
  ) : (
    t.submit.button
  )}
</button>

      </form>
    </div>
  );
}

export default SubmitStory;

