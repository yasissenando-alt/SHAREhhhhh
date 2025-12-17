const express = require('express');
const axios = require('axios');
const path = require('path');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/api/news', async (req, res) => {
  try {
    const query = req.query.q || 'manila';
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_0318d0b2916048e0914e48838720b00c&q=${encodeURIComponent(query)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are CHATGPT HELPER, a friendly and helpful AI assistant for STARTCOPE NEWS website. You help users with news, answer questions, and provide assistance. Be concise and helpful. Respond in the user's language (Filipino or English)."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('ChatGPT error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, '0.0.0.0', () => {
  console.log('STARTCOPE NEWS running on port 5000');
});
