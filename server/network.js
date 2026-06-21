import db from './db.js';

export default class Network {
    getStations() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name FROM stations';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getLines() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, name, color FROM lines';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getConnections() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, station1_id, station2_id, line_id FROM connections';
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // ricerca in ampiezza (bfs) sul grafo delle connessioni rappresentato come lista delle adiacenze
    // per trovare la distanza minima, che serve per l'assegnazione delle due stazioni all'inizio della partita
    async getDistance(startId, endId) {
        const connections = await this.getConnections();
        const adj = {};
        for (const conn of connections) {
            const u = conn.station1_id;
            const v = conn.station2_id;
            if (!adj[u]) adj[u] = [];
            if (!adj[v]) adj[v] = [];
            adj[u].push(v);
            adj[v].push(u);
        }

        const queue = [[startId, 0]];
        const visited = new Set();
        visited.add(startId);

        while (queue.length > 0) {
            const [curr, dist] = queue.shift();
            if (curr === endId) {
                return dist;
            }

            const neighbors = adj[curr] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([neighbor, dist + 1]);
                }
            }
        }
        return -1;
    }
}
