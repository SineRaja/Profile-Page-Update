const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';

/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
            FROM users s
            WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw new Error('Bad credentials');
  } catch (error) {
    throw new Error('Bad credentials');
  }
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};
const createUser = async (userData) => {
  const { firstName, lastName, country, city, email, phoneNumber, profilePicture } = userData;

  const query = `
    INSERT INTO users (first_name, last_name, country, city, email, phone_number, profile_picture)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [firstName, lastName, country, city, email, phoneNumber, profilePicture];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

const updateUser = async (id, userData) => {
  const { firstName, lastName, country, city, email, phoneNumber, profilePicture } = userData;

  const query = `
    UPDATE users
    SET first_name = $1, last_name = $2, country = $3, city = $4, email = $5, phone_number = $6, profile_picture = $7, updated_at = NOW()
    WHERE id = $8
    RETURNING *;
  `;

  const values = [firstName, lastName, country, city, email, phoneNumber, profilePicture, id];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

module.exports = {
  authenticateUser,
  getUserById,
  createUser,
  updateUser,
};
