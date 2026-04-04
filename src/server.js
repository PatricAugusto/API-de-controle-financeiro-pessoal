const express = require('express');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota de teste
app.get('/health', (req, res) => {
  return res.json({ message: "FinTrack API está online!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});