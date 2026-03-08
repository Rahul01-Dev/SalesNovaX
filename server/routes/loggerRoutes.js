import express from 'express';
import { getLogs } from '../controllers/loggerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router()

router.use(protect);

router.get('/',getLogs);

export default router;