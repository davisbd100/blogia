import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/config';


export const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${API_BASE_URL}/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(() => setError('No se pudo cargar el artículo.'))
      .finally(() => setLoading(false));
    return () => setArticle(null);
  }, [id]);


  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;


  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver
      </Link>
      <h2 className="text-4xl font-bold mb-2">{article.title}</h2>
      <small className="text-gray-500">{new Date(article.created_at).toLocaleString()}</small>
      <hr className="my-4" />
      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg bg-white p-6 rounded-xl shadow">
        {article.content}
      </div>
    </div>
  );
};