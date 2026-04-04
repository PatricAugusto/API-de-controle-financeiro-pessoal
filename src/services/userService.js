const prisma = require('../config/database');
const bcrypt = require('bcryptjs');

class UserService {
  async createUser(data) {
    // 1. Verificar se o e-mail já existe
    const userExists = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (userExists) {
      throw new Error('Este e-mail já está em uso.');
    }

    // 2. Criptografar a senha (salt de 10)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Salvar no banco
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: { // Não retornar a senha no JSON de resposta!
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  }
}

module.exports = new UserService();