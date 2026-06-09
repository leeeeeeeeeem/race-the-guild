import db from './db.js';

export default class Game {
    saveGame(userId, score) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO games (user_id, score) VALUES (?, ?)';
            db.run(query, [userId, score], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    getLeaderboard() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT users.username, MAX(games.score) AS best_score
                FROM users
                JOIN games ON users.id = games.user_id
                GROUP BY users.id
                ORDER BY best_score DESC
            `;
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getEvents() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, description, effect FROM events';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
