const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

let refreshTokens = [];

const authController = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Check user and email exist
            const usernameCheck = await User.findOne({ username });
            if (usernameCheck) {
                return res.json({
                    message:
                        'This username is already taken. Please choose another name',
                    type: 'username',
                    status: false,
                });
            }
            const emailCheck = await User.findOne({ email });
            if (emailCheck) {
                return res.json({
                    message: 'This email address is already being used',
                    type: 'email',
                    status: false,
                });
            }

            // Hash password
            const saltOrRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltOrRounds);

            // Save user_info to database
            const user = await User.create({
                username,
                email,
                password: passwordHash,
            });
            delete user._doc.password;

            return res.json({ status: true, user });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Generate access Token
    generateAccessToken: (user) => {
        return jwt.sign(
            { id: user.id, username: user.username, admin: user.isAdmin },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '20s',
            }
        );
    },

    //Generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign(
            { id: user.id, username: user.username, admin: user.isAdmin },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '7d',
            }
        );
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            const isPasswordInvalid = await bcrypt.compare(
                password,
                user.password
            );

            if (!username || !isPasswordInvalid) {
                return res.json({
                    message: 'Username or password are wrong!',
                    type: 'username',
                    status: false,
                });
            }
            delete user._doc.password;

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'none',
            });

            return res.json({ status: true, ...user._doc, accessToken });
        } catch (err) {
            console.log(err);
        }
    },

    //Refresh token
    refreshToken: async (req, res) => {
        //take refresh token from username
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken))
            return res.status(403).json('Refresh token is not valid');
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) console.log(err);
            refreshTokens = refreshTokens.filter(
                (token) => token !== refreshToken
            );
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
    },

    //LOGOUT
    logout: async (req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );
        res.status(200).json('Logout !!!');
    },
};

module.exports = authController;
