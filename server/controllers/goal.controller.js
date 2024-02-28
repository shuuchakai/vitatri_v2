import Goal from './goal.model';

export const createGoal = async (req, res) => {
    const goal = new Goal({
        ...req.body,
        user: req.user._id, // Asegurarse de que el usuario esté autenticado
    });
    try {
        await goal.save();
        res.status(201).send(goal);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.send(goals);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
        if (!goal) {
            return res.status(404).send();
        }
        Object.keys(req.body).forEach(key => goal[key] = req.body[key]);
        await goal.save();
        res.send(goal);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!goal) {
            return res.status(404).send();
        }
        res.send(goal);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const completeGoal = async (req, res) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
        if (!goal) {
            return res.status(404).send();
        }
        goal.completed = true;
        await goal.save();

        req.user.points += 10; // Asume que cada goal vale 10 puntos
        await req.user.save();

        res.send(goal);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getCompletedGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id, completed: true });
        res.send(goals);
    } catch (error) {
        res.status(500).send(error);
    }
};