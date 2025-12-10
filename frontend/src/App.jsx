import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './utils/config';


export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${API_BASE_URL}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => setError('No se pudo cargar la lista.'))
      .finally(() => setLoading(false));


    return () => setArticles([]);
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Blogia</h1>
      <p className="text-lg mb-6 text-gray-600">Lista de artículos:</p>
      {loading && <div className="text-gray-500">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul className="space-y-4">
        {articles.map(a => (
          <li
            key={a.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <Link to={`/articles/${a.id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {a.title}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(a.created_at).toLocaleDateString()}
            </div>
            <div className="mt-2 text-gray-700 italic">{a.summary}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}