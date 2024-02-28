import Recipe from '../models/recipe.model.js';

export const createRecipe = async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
        user: req.user._id,
    });
    try {
        await recipe.save();
        res.status(201).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id });
        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });
        if (!recipe) {
            return res.status(404).send();
        }
        Object.keys(req.body).forEach(key => recipe[key] = req.body[key]);
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!recipe) {
            return res.status(404).send();
        }
        res.send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
};