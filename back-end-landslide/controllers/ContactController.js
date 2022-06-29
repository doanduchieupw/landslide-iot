const Contact = require('../models/Contact');
const Message = require('../models/Message');

const ContactController = {
    createContact: async (req, res) => {
        const newContact = new Contact({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const result = await newContact.save();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    userContact: async (req, res) => {
        try {
            const contact = await Contact.find({
                members: { $in: req.params.userId },
            });
            return res.status(200).json(contact);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    findContact: async (req, res) => {
        try {
            const contact = await Contact.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] },
            });
            return res.status(200).json(contact);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    addMessage: async (req, res) => {
        const { chatId, senderId, mess } = req.body;
        const message = new Message({
            chatId,
            senderId,
            mess,
        });
        try {
            const result = await message.save();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getMessages: async (req, res) => {
        const { chatId } = req.params;
        try {
            const result = await Message.find({ chatId });
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = ContactController;
