const db = require('../sql/db');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (!rows.length) return res.status(404).send('User not found');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const { email, password, first_name, last_name, country, city, phone_number, position } = req.body;
    try {
        const { rows } = await db.query('INSERT INTO users (email, password, first_name, last_name, country, city, phone_number, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
        [email, password, first_name, last_name, country, city, phone_number, position]);
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, first_name, last_name, country, city, phone_number, position } = req.body;
    try {
        const { rows } = await db.query('UPDATE users SET email = $1, first_name = $2, last_name = $3, country = $4, city = $5, phone_number = $6, position = $7 WHERE id = $8 RETURNING *', 
        [email, first_name, last_name, country, city, phone_number, position, id]);
        if (!rows.length) return res.status(404).send('User not found');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
