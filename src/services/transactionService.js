import prisma from '../config/database.js';

class TransactionService {

  async createTransaction(userId, { accountId, amount, type, description, category }) {
 
    return await prisma.$transaction(async (tx) => {
      
      // 1. Criar a transação
      const transaction = await tx.transaction.create({
        data: {
          description,
          amount,
          type,
          // Conecta ao usuário dono da sessão
          user: {
            connect: { id: userId }
          },
          // Conecta à conta informada
          account: {
            connect: { id: accountId }
          },
          // Lógica Inteligente de Categoria:
          // Se a categoria com esse nome já existir para esse usuário, ele apenas conecta.
          // Se não existir, ele cria uma nova.
          category: {
            connectOrCreate: {
              where: {
                name_userId: {
                  name: category,
                  userId: userId
                }
              },
              create: {
                name: category,
                userId: userId
              }
            }
          }
        }
      });

      // 2. Lógica de atualização de saldo
      const valueChange = type === 'INCOME' ? amount : -amount;

      // 3. Atualizar o saldo da conta no banco de dados
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

  /**
   * Lista todas as transações do usuário com detalhes de Conta e Categoria
   */
  async listUserTransactions(userId) {
    return await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: {
          select: {
            name: true,
            balance: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
  }
}

export default new TransactionService();