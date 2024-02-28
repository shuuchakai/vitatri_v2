import Achievement from '../models/achievement.model.js';

const checkAchievements = async (req, res, next) => {
    const achievements = await Achievement.find({ pointsRequired: { $lte: req.user.points } });
    achievements.forEach(achievement => {
        if (!req.user.achievements.includes(achievement._id)) {
            req.user.achievements.push(achievement._id);
        }
    });
    await req.user.save();
    next();
};

export default checkAchievements;