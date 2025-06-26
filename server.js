const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors'); 
const nodemailer = require('nodemailer');
const { 
  generateCollectionEmailTemplate, 
  generateReminderEmailTemplate 
} = require('./template');
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Endpoint básico
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express locally!' });
});

// Endpoint para envio de email
app.post('/api/email/send', async (req, res) => {
  try {
    const {
      to = 'marcelo.jean@brandlovers.ai',
      type = 'collection',
      clientName = 'Marcelo Jean',
      invoiceId = '1234567890',
      amount = '1000',
      dueDate = '2023-01-01',
      daysOverdue = '10',
      responsiblePerson,
      invoiceLink
    } = req.body;

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    let subject;
    let html;

    if (type === 'collection') {
      if (!daysOverdue || daysOverdue <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Para cobrança, daysOverdue é obrigatório e deve ser maior que 0'
        });
      }

      subject = `🚨 COBRANÇA OFICIAL - Fatura ${invoiceId} - ${daysOverdue} dias em atraso`;
      html = generateCollectionEmailTemplate({
        clientName: 'Marcelo Jean',
        invoiceId: '1234567890',
        amount: '1000',
        dueDate: '2023-01-01',
        daysOverdue: '10',
        responsiblePerson: 'Marcelo Jean',
        invoiceLink: 'https://www.google.com'
      });
    } else {
      const isOverdue = daysOverdue && daysOverdue > 0;
      subject = isOverdue 
        ? `Lembrete de Pagamento - Fatura ${invoiceId}`
        : `Aviso de Vencimento - Fatura ${invoiceId}`;
      
      html = generateReminderEmailTemplate({
        clientName: 'Marcelo Jean',
        invoiceId: '1234567890',
        amount: '1000',
        dueDate: '2023-01-01',
        isOverdue: !!isOverdue,
        daysOverdue: '10',
        responsiblePerson: 'Marcelo Jean',
        invoiceLink: 'https://www.google.com'
      });
    }

    // Configurar opções do email
    const mailOptions = {
      from: `"Quick Win Finance" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado:', info.messageId);
    
    res.json({
      success: true,
      message: 'Email enviado com sucesso',
      messageId: info.messageId,
      type,
      recipient: to
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
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
