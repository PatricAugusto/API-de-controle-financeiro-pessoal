import prisma from '../config/database.js';

class TransactionService {
  async createTransaction(userId, { accountId, amount, type, description, category }) {
    // Usamos $transaction para garantir consistência
    return await prisma.$transaction(async (tx) => {
      // 1. Criar a transação
      const transaction = await tx.transaction.create({
        data: {
          amount,
          type, // "INCOME" ou "EXPENSE"
          description,
          category,
          accountId,
          userId
        }
      });

      // 2. Atualizar o saldo da conta
      const valueChange = type === 'INCOME' ? amount : -amount;

      await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: valueChange
          }
        }
      });

      return transaction;
    });
  }

  async listUserTransactions(userId) {
    return await prisma.transaction.findMany({
      where: { userId },
      include: { account: true }, // Traz os dados da conta junto
      orderBy: { createdAt: 'desc' }
    });
  }
}

export default new TransactionService();