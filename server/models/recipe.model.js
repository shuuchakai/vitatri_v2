import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    nutrients: {
        calories: {
            type: Number,
            required: true,
            min: 0
        },
        protein: {
            type: Number,
            required: true,
            min: 0
        },
        carbs: {
            type: Number,
            required: true,
            min: 0
        },
        fat: {
            type: Number,
            required: true,
            min: 0
        }
    }
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    foods: [foodSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Recipe = model('Recipe', recipeSchema);
export default Recipe;