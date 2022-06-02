const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
    register: async (req, res) => {
        try {
            console.log(req.body);
            const { username, password, email } = req.body;
            
            // Check user and email exist
            const usernameCheck = await User.findOne({ username });
            console.log(usernameCheck);
            if (usernameCheck) {
                return res.json({
                    msg: 'This username is already taken. Please choose another name',
                    status: false,
                });
            }
            const emailCheck = await User.findOne({ email });
            if (emailCheck) {
                return res.json({
                    msg: 'This email address is already being used',
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
            }).then(() => {
                console.log('Saved in DB!!');
            });
            delete user.password;

            return res.json({ status: true, user });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authController;
