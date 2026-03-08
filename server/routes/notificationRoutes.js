import express from 'express';
import { getNotifications,markRead } from '../controllers/notificationController';
import { protect } from '../middleware/authMiddleware';

const router=express.Router();

router.use(protect);

router.get('/',getNotifications);
router.put('/:id/read',markRead);

export default router;
