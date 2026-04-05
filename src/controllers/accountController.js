import accountService from '../services/accountService.js';

class AccountController {
  async store(req, res) {
    try {
      const { name, balance } = req.body;
      // req.userId vem do middleware de autenticação!
      const account = await accountService.createAccount(req.userId, name, balance);
      return res.status(201).json(account);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const accounts = await accountService.listUserAccounts(req.userId);
      return res.json(accounts);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AccountController();