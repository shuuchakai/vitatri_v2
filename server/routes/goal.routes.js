import express from 'express';

import { createGoal, getGoals, updateGoal, deleteGoal, completeGoal, getCompletedGoals } from '../controllers/goal.controller.js';
import auth from '../middlewares/auth.middleware.js';
import checkAchievements from '../middlewares/checkAchievements.middleware.js';

const router = express.Router();

router.post('/goals', auth, createGoal);

router.get('/goals', auth, getGoals);
router.get('/goals/completed', auth, getCompletedGoals);

router.patch('/goals/:id', auth, updateGoal);
router.patch('/goals/:id/complete', auth, completeGoal, checkAchievements);

router.delete('/goals/:id', auth, deleteGoal);

export default router;