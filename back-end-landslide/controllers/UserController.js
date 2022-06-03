const User = require('../models/User');

const UserController = {
    getAllUsers: async(req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({err})
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findById(req.params.id);
            res.status(200).json('User is deleted')
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController;