import prisma from '../config/database.js';

class AccountService {
  async createAccount(userId, name, balance = 0) {
    return await prisma.account.create({
      data: {
        name,
        balance,
        userId
      }
    });
  }

  async listUserAccounts(userId) {
    return await prisma.account.findMany({
      where: { userId }
    });
  }
}

export default new AccountService();