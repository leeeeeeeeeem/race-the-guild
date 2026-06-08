import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    }});

createTables();

function createTables() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            salt TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS lines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            color TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS connections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            station1_id INTEGER NOT NULL,
            station2_id INTEGER NOT NULL,
            line_id INTEGER NOT NULL,
            FOREIGN KEY (station1_id) REFERENCES stations (id),
            FOREIGN KEY (station2_id) REFERENCES stations (id),
            FOREIGN KEY (line_id) REFERENCES lines (id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            effect INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            score INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )`);
        
    });
}

export default db;
