import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

export default db;
