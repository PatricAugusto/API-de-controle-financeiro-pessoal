import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O formato comum é: "Bearer TOKEN_AQUI"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Injetamos o ID do usuário na requisição para usar nos controllers
    req.userId = decoded.id;
    
    return next(); // Pode seguir para a rota!
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};