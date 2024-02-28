import { Schema, model } from 'mongoose';

const achievementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pointsRequired: {
        type: Number,
        required: true
    }
});

const Achievement = model('Achievement', achievementSchema);

export default Achievement;