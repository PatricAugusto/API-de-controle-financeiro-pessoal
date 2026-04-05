import { Router } from 'express';
import transactionController from '../controllers/transactionController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', transactionController.store);
router.get('/', transactionController.index);

export default router;