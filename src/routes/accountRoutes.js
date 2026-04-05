import { Router } from 'express';
import accountController from '../controllers/accountController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Aplicando o middleware em todas as rotas deste arquivo
router.use(authMiddleware);

router.post('/', accountController.store);
router.get('/', accountController.index);

export default router;