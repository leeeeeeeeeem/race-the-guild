import { Card, Button } from 'react-bootstrap';

function ResultView({ submitResults, handleRestart }) {
    if (!submitResults) return null;

    const { valid, score } = submitResults;

    return (
        <Card className="p-4 text-center">
            <Card.Title className="mb-4 h3">Risultato della partita</Card.Title>
            
            {valid ? (
                <div className="mb-4">
                    <div className="text-success h2 mb-2">
                        Corsa completata con successo
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <div className="text-danger h2 mb-2">
                        Corsa fallita
                    </div>
                </div>
            )}

            <div className="my-4 p-3 rounded d-inline-block mx-auto" style={{ minWidth: '250px', backgroundColor: '#313244' }}>
                <div className="small text-muted mb-1">Punteggio finale</div>
                <div className="h1 mb-0 text-primary">
                    {score} solari
                </div>
            </div>

            <div className="mt-3">
                <Button variant="primary" size="lg" onClick={handleRestart}>
                    Gioca ancora
                </Button>
            </div>
        </Card>
    );
}

export default ResultView;
