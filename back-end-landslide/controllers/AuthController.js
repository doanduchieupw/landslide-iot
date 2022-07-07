const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
let refreshTokens = [];
const MAX_AGE = 7*24*60*60*1000; //1 week

const authController = {
    // Generate access Token
    generateAccessToken: (user) => {
        return jwt.sign(
            { id: user.id, username: user.username, admin: user.isAdmin },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '7d',
            }
        );
    },

    //Generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign(
            { id: user.id, username: user.username, admin: user.isAdmin },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '1m',
            }
        );
    },

    // @POST:       api/auth/register
    // @desc:       Register user
    // @access:     Public
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
            console.log(err);
            return res.status(500).json({status: false, message: err});
        }
    },

    
    // @POST:       api/auth/login
    // @desc:       Login user
    // @access:     Public
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            
            //Check for existing user
            const user = await User.findOne({ username });
            
            if (!user) {
                return res.json({
                    message: 'Username or password are wrong!',
                    type: 'username',
                    status: false,
                });
            }
            const isPasswordInvalid = await bcrypt.compare(
                password,
                user.password
            );
            if(!isPasswordInvalid) {
                return res.json({
                    message: 'Username or password are wrong!',
                    type: 'username',
                    status: false,
                });
            }
            delete user._doc.password;

            const accessToken = authController.generateAccessToken(user);
            console.log("🚀 ~ file: AuthController.js ~ line 108 ~ login: ~ accessToken", accessToken)
            const refreshToken = authController.generateRefreshToken(user);
            console.log("🚀 ~ file: AuthController.js ~ line 110 ~ login: ~ refreshToken", refreshToken)
            refreshTokens.push(refreshToken);
            console.log("🚀 ~ file: AuthController.js ~ line 112 ~ login: ~ refreshTokens", refreshTokens)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
                expires: new Date(Date.now() + MAX_AGE)
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
        console.log("🚀 ~ file: AuthController.js ~ line 127 ~ refreshToken: ~ refreshToken", refreshToken)
        if (!refreshToken)
            return res.status(401).json("You're not authenticated");
            console.log("🚀 ~ file: AuthController.js ~ line 132 ~ refreshToken: ~ refreshTokens", refreshTokens)
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
                expires: new Date(Date.now() + MAX_AGE)
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
