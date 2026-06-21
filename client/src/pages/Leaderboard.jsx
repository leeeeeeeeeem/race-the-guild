import { useState, useEffect } from 'react';
import { Table, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../API.js';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        API.getLeaderboard()
            .then(data => {
                setLeaderboard(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    return (
        <div className="container py-2" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Classifica</h2>
                <Button variant="secondary" as={Link} to="/">
                    Torna alla home
                </Button>
            </div>

            {error ? (
                <Alert variant="danger">{error}</Alert>
            ) : leaderboard === null ? (
                null
            ) : (
                <Card className="p-3">
                    {leaderboard.length === 0 ? (
                        <div className="text-center py-4 text-muted">Nessun punteggio registrato</div>
                    ) : (
                        <Table hover responsive className="mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>Posizione</th>
                                    <th>Username</th>
                                    <th className="text-end" style={{ width: '30%' }}>Miglior punteggio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td><strong>{row.username}</strong></td>
                                        <td className="text-end">
                                            <span className="text-primary font-monospace fw-bold">
                                                {row.best_score}
                                            </span> solari
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card>
            )}
        </div>
    );
}

export default Leaderboard;
