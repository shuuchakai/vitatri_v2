import express from 'express';

import { createRecipe, getRecipes, updateRecipe, deleteRecipe } from '../controllers/recipe.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/recipes', auth, createRecipe);

router.get('/recipes', auth, getRecipes);

router.patch('/recipes/:id', auth, updateRecipe);

router.delete('/recipes/:id', auth, deleteRecipe);

export default router;