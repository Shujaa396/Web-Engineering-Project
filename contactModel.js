const db = require('../db');

const Contact = {
    create: (data, callback) => {
        const query = 'INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.email, data.subject, data.message], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM contact_submissions ORDER BY created_at DESC';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Contact;