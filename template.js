// Template de e-mail de cobrança moderno
function generateCollectionEmailTemplate(data) {
  const { clientName, invoiceId, amount, dueDate, daysOverdue, responsiblePerson, invoiceLink } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cobrança - Quick Win Finance</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f9fafb;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }
        
        .header h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
        }
        
        .header .subtitle {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
          position: relative;
        }
        
        .warning-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 8px 16px;
          margin-top: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .greeting {
          font-size: 18px;
          color: #1f2937;
          margin-bottom: 24px;
          font-weight: 500;
        }
        
        .urgent-notice {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border: 1px solid #fecaca;
          border-left: 4px solid #dc2626;
          border-radius: 8px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .urgent-notice h3 {
          color: #dc2626;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .invoice-details {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 16px 0;
        }
        
        .invoice-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .invoice-row:last-child {
          border-bottom: none;
          font-weight: 700;
          font-size: 18px;
          color: #dc2626;
        }
        
        .invoice-row .label {
          color: #6b7280;
          font-weight: 500;
        }
        
        .invoice-row .value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .consequences {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 16px;
          margin: 24px 0;
          font-size: 12px;
          color: #64748b;
        }
        
        .consequences h4 {
          color: #475569;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .consequences ul {
          list-style: none;
          padding: 0;
        }
        
        .consequences li {
          padding: 3px 0;
          color: #64748b;
          font-weight: 400;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .consequences li::before {
          content: '•';
          font-size: 10px;
          color: #94a3b8;
        }
        
        .payment-methods {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        
        .payment-methods h4 {
          color: #166534;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .payment-methods ul {
          list-style: none;
          padding: 0;
        }
        
        .payment-methods li {
          padding: 6px 0;
          color: #15803d;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .payment-methods li::before {
          content: '✅';
          font-size: 12px;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 700;
          text-align: center;
          margin: 24px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        .signature {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
        
        .signature .name {
          font-weight: 700;
          color: #1f2937;
        }
        
        .signature .title {
          color: #6b7280;
          font-size: 14px;
        }
        
        .footer {
          background: #f9fafb;
          padding: 24px 30px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer p {
          color: #6b7280;
          font-size: 12px;
          margin: 4px 0;
        }
        
        .footer .urgent-footer {
          color: #dc2626;
          font-weight: 700;
          font-size: 13px;
          margin-top: 12px;
        }
        
        @media (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
          }
          
          .content, .header, .footer {
            padding-left: 20px;
            padding-right: 20px;
          }
          
          .invoice-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Quick Win Finance</h1>
          <p class="subtitle">Sistema de Gestão Financeira</p>
          <div class="warning-badge">
            ⚠️ Cobrança Oficial
          </div>
        </div>
        
        <div class="content">
          <div class="greeting">
            Prezado(a) ${clientName},
          </div>
          
          <div class="urgent-notice">
            <h3>🚨 Fatura Vencida - Ação Imediata Necessária</h3>
            <div class="invoice-details">
              <div class="invoice-row">
                <span class="label">Número da Fatura:</span>
                <span class="value">${invoiceId}</span>
              </div>
              <div class="invoice-row">
                <span class="label">Data de Vencimento:</span>
                <span class="value">${new Date(dueDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div class="invoice-row">
                <span class="label">Dias em Atraso:</span>
                <span class="value">${daysOverdue} ${daysOverdue === 1 ? 'dia' : 'dias'}</span>
              </div>
              <div class="invoice-row">
                <span class="label">Valor Total:</span>
                <span class="value">R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          <p style="margin: 20px 0; font-weight: 500;">
            Solicitamos a <strong>regularização imediata</strong> do pagamento. 
            Você tem <strong>48 horas</strong> para evitar inconvenientes adicionais.
          </p>
          
          <div class="consequences">
            <h4>Informações Adicionais</h4>
            <ul>
              <li>Possível inclusão do nome nos órgãos de proteção ao crédito</li>
              <li>Cobrança de juros e multa por atraso conforme contrato</li>
              <li>Possível suspensão dos serviços contratados</li>
              <li>Encaminhamento para procedimentos de cobrança</li>
            </ul>
          </div>
          
          <div class="payment-methods">
            <h4>Formas de Pagamento Disponíveis</h4>
            <ul>
              <li><strong>PIX:</strong> Pagamento instantâneo e sem taxas</li>
              <li><strong>Transferência Bancária:</strong> Processamento em até 1 dia útil</li>
              <li><strong>Boleto Bancário:</strong> Solicite uma nova via se necessário</li>
              <li><strong>Cartão de Crédito:</strong> Parcelamento disponível</li>
            </ul>
          </div>
          
          ${invoiceLink ? `
            <a href="${invoiceLink}" class="cta-button">
              📄 Visualizar Nota Fiscal Completa
            </a>
          ` : ''}
          
          <p style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 24px 0; font-weight: 500;">
            <strong>Importante:</strong> Se o pagamento já foi efetuado, envie o comprovante imediatamente 
            para evitar constrangimentos e cancelar este processo de cobrança.
          </p>
          
          <p style="margin: 20px 0;">
            Para dúvidas ou negociação, entre em contato conosco <strong>imediatamente</strong> 
            através do e-mail de resposta ou telefone disponível em nosso rodapé.
          </p>
          
          <div class="signature">
            <p class="name">Equipe Financeira</p>
            <p class="title">Quick Win Finance - Departamento de Cobrança</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Este é um e-mail oficial de cobrança do sistema Quick Win Finance</p>
          ${responsiblePerson ? `<p><strong>Responsável:</strong> ${responsiblePerson}</p>` : ''}
          <p>📧 financeiro@quickwinfinance.com | 📞 (11) 9999-9999</p>
          <p class="urgent-footer">⚠️ COBRANÇA OFICIAL - RESPONDA ESTE E-MAIL ⚠️</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Template de e-mail de lembrete moderno
function generateReminderEmailTemplate(data) {
  const { clientName, invoiceId, amount, dueDate, isOverdue, daysOverdue, responsiblePerson, invoiceLink } = data;
  
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lembrete de Pagamento - Quick Win Finance</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #374151;
          background-color: #f9fafb;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .header {
          background: ${isOverdue ? 
            'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 
            'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
          };
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }
        
        .header h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
        }
        
        .header .subtitle {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
          position: relative;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 8px 16px;
          margin-top: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .greeting {
          font-size: 18px;
          color: #1f2937;
          margin-bottom: 24px;
          font-weight: 500;
        }
        
        .notice {
          background: ${isOverdue ? 
            'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : 
            'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
          };
          border: 1px solid ${isOverdue ? '#fed7aa' : '#bfdbfe'};
          border-left: 4px solid ${isOverdue ? '#f59e0b' : '#3b82f6'};
          border-radius: 8px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .notice h3 {
          color: ${isOverdue ? '#d97706' : '#1d4ed8'};
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .invoice-details {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 16px 0;
        }
        
        .invoice-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .invoice-row:last-child {
          border-bottom: none;
          font-weight: 700;
          font-size: 18px;
          color: ${isOverdue ? '#d97706' : '#1d4ed8'};
        }
        
        .invoice-row .label {
          color: #6b7280;
          font-weight: 500;
        }
        
        .invoice-row .value {
          font-weight: 600;
          color: #1f2937;
        }
        
        .info-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 20px;
          margin: 24px 0;
        }
        
        .info-box h4 {
          color: #166534;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .cta-button {
          display: inline-block;
          background: ${isOverdue ? 
            'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 
            'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
          };
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 700;
          text-align: center;
          margin: 24px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px ${isOverdue ? 
            'rgba(245, 158, 11, 0.3)' : 
            'rgba(59, 130, 246, 0.3)'
          };
        }
        
        .signature {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
        
        .signature .name {
          font-weight: 700;
          color: #1f2937;
        }
        
        .signature .title {
          color: #6b7280;
          font-size: 14px;
        }
        
        .footer {
          background: #f9fafb;
          padding: 24px 30px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer p {
          color: #6b7280;
          font-size: 12px;
          margin: 4px 0;
        }
        
        @media (max-width: 600px) {
          .email-container {
            margin: 0;
            border-radius: 0;
          }
          
          .content, .header, .footer {
            padding-left: 20px;
            padding-right: 20px;
          }
          
          .invoice-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Quick Win Finance</h1>
          <p class="subtitle">Sistema de Gestão Financeira</p>
          <div class="status-badge">
            ${isOverdue ? '⚠️ Pagamento em Atraso' : '📅 Lembrete Amigável'}
          </div>
        </div>
        
        <div class="content">
          <div class="greeting">
            Prezado(a) ${clientName},
          </div>
          
          <div class="notice">
            <h3>
              ${isOverdue ? '⚠️ Fatura em Atraso' : '📋 Lembrete de Vencimento'}
            </h3>
            <div class="invoice-details">
              <div class="invoice-row">
                <span class="label">Número da Fatura:</span>
                <span class="value">${invoiceId}</span>
              </div>
              <div class="invoice-row">
                <span class="label">Data de Vencimento:</span>
                <span class="value">${new Date(dueDate).toLocaleDateString('pt-BR')}</span>
              </div>
              ${isOverdue ? `
                <div class="invoice-row">
                  <span class="label">Dias em Atraso:</span>
                  <span class="value">${daysOverdue} ${daysOverdue === 1 ? 'dia' : 'dias'}</span>
                </div>
              ` : ''}
              <div class="invoice-row">
                <span class="label">Valor Total:</span>
                <span class="value">R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          ${isOverdue ? `
            <p style="margin: 20px 0; font-weight: 500;">
              Identificamos que sua fatura está em atraso há <strong>${daysOverdue} ${daysOverdue === 1 ? 'dia' : 'dias'}</strong>. 
              Para evitar qualquer inconveniente, solicitamos que regularize o pagamento o mais breve possível.
            </p>
            
            <div class="info-box">
              <h4>💡 Como regularizar seu pagamento</h4>
              <p>• <strong>PIX:</strong> Pagamento instantâneo</p>
              <p>• <strong>Transferência bancária:</strong> Processamento rápido</p>
              <p>• <strong>Boleto:</strong> Solicite uma nova via se necessário</p>
              <p>• <strong>Parcelamento:</strong> Entre em contato para negociar</p>
            </div>
          ` : `
            <p style="margin: 20px 0; font-weight: 500;">
              Este é um lembrete amigável sobre o vencimento de sua fatura. 
              Agradecemos sua pontualidade e relacionamento conosco!
            </p>
            
            <div class="info-box">
              <h4>✅ Formas de Pagamento Disponíveis</h4>
              <p>• <strong>PIX:</strong> Instantâneo e sem taxas</p>
              <p>• <strong>Transferência bancária:</strong> Até 1 dia útil</p>
              <p>• <strong>Cartão de crédito:</strong> À vista ou parcelado</p>
              <p>• <strong>Débito automático:</strong> Configure para não esquecer</p>
            </div>
          `}
          
          ${invoiceLink ? `
            <a href="${invoiceLink}" class="cta-button">
              📄 Visualizar Nota Fiscal
            </a>
          ` : ''}
          
          <p style="background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 24px 0; font-weight: 500;">
            <strong>Pagamento já efetuado?</strong> Se você já realizou o pagamento, 
            pode desconsiderar este e-mail. Caso contrário, entre em contato conosco.
          </p>
          
          <p style="margin: 20px 0;">
            Em caso de dúvidas ou para negociação de parcelamento, nossa equipe está à disposição 
            para ajudá-lo da melhor forma possível.
          </p>
          
          <div class="signature">
            <p class="name">Equipe Financeira</p>
            <p class="title">Quick Win Finance - Atendimento ao Cliente</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Este é um e-mail automático do sistema Quick Win Finance</p>
          ${responsiblePerson ? `<p><strong>Responsável:</strong> ${responsiblePerson}</p>` : ''}
          <p>📧 financeiro@quickwinfinance.com | 📞 (11) 9999-9999</p>
          <p>💬 Atendimento de segunda a sexta, das 8h às 18h</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = {
  generateCollectionEmailTemplate,
  generateReminderEmailTemplate
};
