const db = require('../db');
const bcrypt = require('bcrypt');

class User {
  static async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    const values = [username, email, hashedPassword];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async authenticate(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    return validPassword ? user : null;
  }
}

module.exports = User;
