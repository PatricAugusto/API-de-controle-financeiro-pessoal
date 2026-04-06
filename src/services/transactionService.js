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
  async listUserTransactions(userId, { month, year }) {
  const where = { userId };

  // Se mês e ano forem fornecidos, calculamos o intervalo de datas
  if (month && year) {
    const startDate = new Date(year, month - 1, 1); // Primeiro dia do mês
    const endDate = new Date(year, month, 1);       // Primeiro dia do PRÓXIMO mês

    where.date = {
      gte: startDate, // Maior ou igual a 01/MM/AAAA
      lt: endDate     // Menor que 01/MM_seguinte/AAAA
    };
  }

  return await prisma.transaction.findMany({
    where,
    include: {
      account: { select: { name: true } },
      category: { select: { name: true } }
    },
    orderBy: { date: 'desc' }
  });
}
}

export default new TransactionService();