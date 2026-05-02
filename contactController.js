const Contact = require('../models/contactModel');

exports.submitContactForm = (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    Contact.create({ name, email, subject, message }, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error while saving message.' });
        }
        res.status(201).json({ message: 'Message sent successfully!' });
    });
};

exports.getContactSubmissions = (req, res) => {
    Contact.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch messages.' });
        }
        res.json(results);
    });
};