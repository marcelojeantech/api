const express = require('express');

const app = express();

// Importe a lógica da API de index.js
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express locally!' });
});

// Inicia o servidor localmente na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
