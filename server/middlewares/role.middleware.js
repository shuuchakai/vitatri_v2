const permit = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).send({ message: 'Forbidden' });
        }
        next();
    };
};

export default permit;