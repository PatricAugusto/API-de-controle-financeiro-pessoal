import userService from '../services/userService.js';

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos!' });
      }

      const user = await userService.createUser({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await userService.login(email, password);
      return res.json(data);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UserController();