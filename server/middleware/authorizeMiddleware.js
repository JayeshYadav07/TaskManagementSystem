const authorize = (req, res, next) => {
    const user_role = req.user.isAdmin;
    if (user_role) {
        next();
    } else {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
module.exports = authorize;
