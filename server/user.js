import db from './db.js';
import crypto from 'crypto';

export default class User {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, username FROM users WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve({ error: 'Utente non trovato' });
                } else {
                    resolve(row);
                }
            });
        });
    }

    getUserByCredentials(username, password) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ?';
            db.get(query, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve(false);
                } else {
                    const user = { id: row.id, username: row.username };
                    crypto.scrypt(password, row.salt, 64, (err, hashedPassword) => {
                        if (err) {
                            reject(err);
                        } else {
                            const dbPasswordBuffer = Buffer.from(row.password, 'hex');
                            if (!crypto.timingSafeEqual(dbPasswordBuffer, hashedPassword)) {
                                resolve(false);
                            } else {
                                resolve(user);
                            }
                        }
                    });
                }
            });
        });
    }
}
