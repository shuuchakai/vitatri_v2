import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Goal = model('Goal', goalSchema);
export default Goal;