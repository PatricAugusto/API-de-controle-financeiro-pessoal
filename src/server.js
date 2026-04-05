import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  return res.json({ message: "FinTrack API está online!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});