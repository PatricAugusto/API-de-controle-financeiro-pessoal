import prisma from '../config/database.js';

class DashboardService {
  async getSummary(userId, { month, year }) {
    const where = { userId };

    // Filtro de data (mesma lógica das transações)
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      where.date = { gte: startDate, lt: endDate };
    }

    // 1. Soma de Receitas (INCOME)
    const totalIncome = await prisma.transaction.aggregate({
      where: { ...where, type: 'INCOME' },
      _sum: { amount: true }
    });

    // 2. Soma de Despesas (EXPENSE)
    const totalExpense = await prisma.transaction.aggregate({
      where: { ...where, type: 'EXPENSE' },
      _sum: { amount: true }
    });

    // 3. Saldo Geral de todas as contas (opcional: pode ser filtrado ou não)
    const accounts = await prisma.account.findMany({
      where: { userId },
      select: { balance: true }
    });

    const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

    return {
      income: totalIncome._sum.amount || 0,
      expense: totalExpense._sum.amount || 0,
      balance: (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0),
      currentWallet: totalBalance // Saldo real somado de todas as contas
    };
  }
}

export default new DashboardService();