import AppError from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Se o erro não for uma instância do nosso AppError, tratamos como 500
  if (!err.isOperational) {
    statusCode = 500;
    message = 'Erro interno do servidor';
    
    // Logamos o erro real no console apenas para o desenvolvedor
    console.error('❌ ERRO NÃO ESPERADO:', err);
  }

  // Tratamento especial para erros comuns do Prisma (opcional e elegante)
  if (err.code === 'P2002') { // Violação de campo único
    statusCode = 400;
    message = 'Este registro (e-mail ou nome) já existe no sistema.';
  }

  return res.status(statusCode).json({
    status: 'error',
    message: message
  });
};