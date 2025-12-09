import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/config';

export const Article = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
      fetch(`${API_BASE_URL}/articles/${id}`)
        .then(res => res.json())
        .then(data => setArticle(data))
        .catch(err => console.error(err))
    
      return () => {
        setArticle(null)
      }
    }, [id])
    
    if (!article) return <div>Loading...</div>

    return (
        <div style={{ padding: 20, fontFamily: 'Arial' }}>
            <Link to="/">← Volver</Link>
            <h2>{article.title}</h2>
            <small>{new Date(article.created_at).toLocaleString()}</small>
            <hr />
            <div style={{ whiteSpace: 'pre-wrap' }}>{article.content}</div>
        </div>
    )
}
