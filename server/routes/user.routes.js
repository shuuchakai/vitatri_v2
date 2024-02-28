import express from 'express';

import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', loginUser);

router.get('/users/:id', auth, permit('admin'), getUser);
router.patch('/users/:id', auth, permit('admin'), updateUser);
router.delete('/users/:id', auth, permit('admin'), deleteUser);

export default router;