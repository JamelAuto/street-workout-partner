const db = require('../db');

class WorkoutEntry {
  static async create(userId, { date, pushUps, pullUps, dips }) {
    const query = `
      INSERT INTO workout_entries (user_id, date, push_ups, pull_ups, dips)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [userId, date, pushUps, pullUps, dips];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const query = `
      SELECT * FROM workout_entries 
      WHERE user_id = $1 
      ORDER BY date DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async getLatestEntry(userId) {
    const query = `
      SELECT * FROM workout_entries 
      WHERE user_id = $1 
      ORDER BY date DESC 
      LIMIT 1
    `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = WorkoutEntry;
