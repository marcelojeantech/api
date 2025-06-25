const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors'); 
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://quick-win-finance-flow.vercel.app',
    'https://quick-win-finance-flow-git-main-marcelojean10s-projects.vercel.app/'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Endpoint básico
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express locally!' });
});

// Endpoint GET para consultar contas a receber da Omie com paginação
app.get('/api/omie/receivables', async (req, res) => {
  try {
    // Captura os parâmetros da query string ou usa valores padrão
    const pagina = parseInt(req.query.pagina) || 1;
    const registros_por_pagina = parseInt(req.query.registros_por_pagina) || 500;

    const response = await axios.post('https://app.omie.com.br/api/v1/financas/contareceber/', {
      call: 'ListarContasReceber',
      app_key: process.env.OMIE_APP_KEY,
      app_secret: process.env.OMIE_APP_SECRET,
      param: [
        {
          pagina,
          registros_por_pagina,
          apenas_importado_api: 'N'
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao chamar Omie:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da Omie' });
  }
});

// Inicia o servidor na porta 3001 (para não conflitar com o frontend)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
