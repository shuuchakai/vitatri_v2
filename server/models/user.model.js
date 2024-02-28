import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'; // Nuevo: para encriptar la contraseña

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    height: {
        type: Number,
        required: true,
        min: 0,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogPost',
    }],
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
    points: {
        type: Number,
        default: 0,
    },
    achievements: [{
        type: Schema.Types.ObjectId,
        ref: 'Achievement',
    }],
    role: {
        type: String,
        enum: ['user', 'admin'], // Los roles disponibles
        default: 'user' // El rol por defecto
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
export default User;