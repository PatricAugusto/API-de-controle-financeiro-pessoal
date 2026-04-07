import dashboardService from '../services/dashboardService.js';

class DashboardController {
  async index(req, res) {
    try {
      const { month, year } = req.query;
      
      const summary = await dashboardService.getSummary(req.userId, {
        month: month ? parseInt(month) : new Date().getMonth() + 1,
        year: year ? parseInt(year) : new Date().getFullYear()
      });

      return res.json(summary);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new DashboardController();