const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: 'grok',
      messages: [{ role: 'user', content: req.body.message }]
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY', // ここにxAIのAPIキーを設定
        'Content-Type': 'application/json'
      }
    });
    console.log('APIレスポンス:', response.data); // デバッグ用
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('バックエンドエラー:', error.message, error.response?.data);
    res.status(500).json({ error: 'APIエラー' });
  }
});

app.listen(3000, () => console.log('サーバー起動: http://localhost:3000'));
