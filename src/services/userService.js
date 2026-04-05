import prisma from '../config/database.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
  async createUser(data) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (userExists) {
      throw new Error('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  }

  async login(email, password) {
    // 1. Buscar usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('E-mail ou senha inválidos.');
    }

    // 2. Comparar a senha digitada com o hash do banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('E-mail ou senha inválidos.');
    }

    // 3. Gerar o Token JWT (expira em 1 dia)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token
    };
  }
}

export default new UserService();