import { useState } from 'react';
import { Row, Col, Button, Card, Alert } from 'react-bootstrap';
import GameMap from '../components/GameMap.jsx';
import ConnectionSelector from '../components/ConnectionSelector.jsx';
import GameTimer from '../components/GameTimer.jsx';
import ExecutionView from '../components/ExecutionView.jsx';
import ResultView from '../components/ResultView.jsx';
import API from '../API.js';

// funzione per mettere il percorso dell'utente le formato richiesto
// dal backend (lista di id di stazioni)
const reconstructPath = (selectedConns, startId, endId) => {
    if (!startId || !endId || selectedConns.length === 0) return null;

    const path = [];

    const first = selectedConns[0];
    if (first.station1_id === startId) {
        path.push(first.station1_id, first.station2_id);
    } else if (first.station2_id === startId) {
        path.push(first.station2_id, first.station1_id);
    } else {
        path.push(first.station1_id, first.station2_id);
    }

    for (let i = 1; i < selectedConns.length; i++) {
        const conn = selectedConns[i];
        const last = path[path.length - 1];

        if (conn.station1_id === last) {
            path.push(conn.station2_id);
        } else if (conn.station2_id === last) {
            path.push(conn.station1_id);
        } else {
            path.push(conn.station1_id, conn.station2_id);
        }
    }

    return path;
};

function Play({ network }) {
    const [phase, setPhase] = useState('SETUP');
    const [startStation, setStartStation] = useState(null);
    const [endStation, setEndStation] = useState(null);
    const [selectedConnections, setSelectedConnections] = useState([]);
    const [path, setPath] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(90);
    const [submitResults, setSubmitResults] = useState(null);
    const [error, setError] = useState('');

    const handleStartGame = () => {
        setError('');
        API.startNewGame()
            .then(res => {
                setStartStation(res.startStation);
                setEndStation(res.endStation);
                setSelectedConnections([]);
                setPath([]);
                setSecondsLeft(90);
                setPhase('PLANNING');
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const handleToggleConnection = (conn) => {
        setSelectedConnections(prev => {
            const exists = prev.some(sc => sc.id === conn.id);
            if (exists) {
                return prev.filter(sc => sc.id !== conn.id);
            } else {
                return [...prev, conn];
            }
        });
    };

    const handleClear = () => {
        setSelectedConnections([]);
    };

    const executeSubmit = (currentPath) => {
        setError('');
        API.submitGame(currentPath)
            .then(res => {
                setPath(currentPath);
                setSubmitResults(res);
                setPhase('EXECUTION');
            })
            .catch(err => {
                setError(err.message);
            });
    };

    const handleSubmit = () => {
        const finalPath = reconstructPath(selectedConnections, startStation?.id, endStation?.id) || [];
        executeSubmit(finalPath);
    };

    const handleFinishExecution = () => {
        setPhase('RESULT');
    };

    const handleRestart = () => {
        setStartStation(null);
        setEndStation(null);
        setSelectedConnections([]);
        setPath([]);
        setSubmitResults(null);
        setPhase('SETUP');
        setError('');
    };

    return (
        <div className="container-fluid">
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            <Row className="g-4">
                <Col lg={8} md={12}>
                    <GameMap
                        network={network}
                        phase={phase}
                        startStation={startStation}
                        endStation={endStation}
                        path={path}
                        selectedConnections={selectedConnections}
                    />
                </Col>

                <Col lg={4} md={12} className="d-flex flex-column">
                    {phase === 'SETUP' && (
                        <Card className="p-4 text-center flex-grow-1 d-flex flex-column justify-content-center">
                            <Card.Title className="mb-3">Preparazione</Card.Title>
                            <Card.Text className="small text-muted mb-4">
                                Esamina la mappa per memorizzare le linee e le tratte, quando sei pronto a giocare clicca qui:
                            </Card.Text>
                            <Button variant="primary" size="lg" onClick={handleStartGame}>
                                Inizia partita
                            </Button>
                        </Card>
                    )}

                    {phase === 'PLANNING' && (
                        <div className="d-flex flex-column gap-3 flex-grow-1">
                            <GameTimer
                                secondsLeft={secondsLeft}
                                setSecondsLeft={setSecondsLeft}
                                handleSubmit={handleSubmit}
                            />
                            <div className="flex-grow-1">
                                <ConnectionSelector
                                    network={network}
                                    selectedConnections={selectedConnections}
                                    startStation={startStation}
                                    endStation={endStation}
                                    handleToggleConnection={handleToggleConnection}
                                    handleClear={handleClear}
                                />
                            </div>
                            <Button
                                variant="success"
                                size="lg"
                                className="w-100 py-3"
                                disabled={selectedConnections.length === 0}
                                onClick={handleSubmit}
                            >
                                Invia percorso
                            </Button>
                        </div>
                    )}

                    {phase === 'EXECUTION' && (
                        <div className="flex-grow-1">
                            <ExecutionView
                                submitResults={submitResults}
                                handleFinishExecution={handleFinishExecution}
                            />
                        </div>
                    )}

                    {phase === 'RESULT' && (
                        <div className="flex-grow-1">
                            <ResultView
                                submitResults={submitResults}
                                handleRestart={handleRestart}
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Play;
