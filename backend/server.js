const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Fix 1: Only use this once
app.use(cors({
  origin: 'https://cashly-1-htfk.onrender.com',
  credentials: true,
}));

app.use(express.json()); // ✅ JSON body parser

// ✅ All API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/friends', require('./routes/friends'));
app.use('/api/splits', require('./routes/splits'));

// Optional: Ping route for testing
app.get('/ping', (req, res) => res.send('Backend is alive!'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
