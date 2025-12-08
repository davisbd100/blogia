const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const pool = req.app.locals.pool;
  const result = await pool.query('SELECT id, title, summary, created_at FROM articles ORDER BY created_at DESC');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const pool = req.app.locals.pool;
  const { id } = req.params;
  const result = await pool.query('SELECT id, title, content, summary, created_at FROM articles WHERE id=$1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

module.exports = router;
