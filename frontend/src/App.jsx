import { useState, useEffect } from 'react'
import './App.css'
import { API_BASE_URL } from './utils/config';
import { Link } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => {
        console.error(err);
        setArticles([]);
      })
  
      return () => {
        setArticles([])
      }
  }, [])
  
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>Blogia</h1>
      <p>Lista de artículos:</p>
      <ul>
        {articles.map(a => (
          <li key={a.id}>
            <Link to={`/articles/${a.id}`}>{a.title}</Link>
            {' '}<small>({new Date(a.created_at).toLocaleDateString()})</small>
            <div><em>{a.summary}</em></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
