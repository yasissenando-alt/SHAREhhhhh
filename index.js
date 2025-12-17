const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/news', async (req, res) => {
  try {
    const query = req.query.q || 'manila';
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_0318d0b2916048e0914e48838720b00c&q=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, '0.0.0.0', () => {
  console.log('STARTCOPE NEWS running on port 5000');
});
