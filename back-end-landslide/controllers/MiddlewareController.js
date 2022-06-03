const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const acessToken = token.split(' ')[1];
            jwt.verify(acessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is not valid!!!');
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated ");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            console.log(req.user);
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json("You're not allowed to delete others");
            }
        });
    },
};

module.exports = middlewareController;
