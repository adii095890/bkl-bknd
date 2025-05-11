const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// POST withdrawal
app.post('/api/withdraw', (req, res) => {
  const withdrawal = req.body;
  const file = 'withdrawals.json';

  let data = [];
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  }

  data.push({ ...withdrawal, status: 'pending' });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// GET withdrawals
app.get('/api/withdrawals', (req, res) => {
  const data = JSON.parse(fs.readFileSync('withdrawals.json', 'utf-8'));
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
