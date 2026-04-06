import transactionService from '../services/transactionService.js';

class TransactionController {
  async store(req, res) {
    try {
      const transaction = await transactionService.createTransaction(req.userId, req.body);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
  try {
    const { month, year } = req.query;
    
    // Passamos os filtros para o service
    const transactions = await transactionService.listUserTransactions(req.userId, {
      month: month ? parseInt(month) : null,
      year: year ? parseInt(year) : null
    });

    return res.json(transactions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
}

export default new TransactionController();