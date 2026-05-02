const Contact = require('../models/contactModel');

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const result = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Your message has been sent successfully!', id: result.insertId });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getContactSubmissions = async (req, res) => {
  try {
    const results = await Contact.getAll();
    res.json(results);
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
