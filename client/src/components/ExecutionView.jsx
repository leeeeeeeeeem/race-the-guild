import { useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';

function ExecutionView({ submitResults, handleFinishExecution }) {
    const [currentIdx, setCurrentIdx] = useState(0);

    if (!submitResults) return null;

    const { valid, steps } = submitResults;

    if (!valid) {
        return (
            <Card className="p-4 text-center">
                <Card.Title as="h3" className="text-danger mb-3">Percorso non valido</Card.Title>
                <div className="h5 my-4">Punteggio ottenuto: <strong className="text-danger">0</strong> solari</div>
                <Button variant="primary" onClick={handleFinishExecution}>
                    Visualizza risultato
                </Button>
            </Card>
        );
    }

    const currentStep = steps[currentIdx];

    const handleNext = () => {
        if (currentIdx < steps.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
        } else {
            handleFinishExecution();
        }
    };

    return (
        <Card className="p-3">
            <Card.Title className="mb-3 text-center text-primary">Corsa in Esecuzione</Card.Title>

            <div className="p-3 mb-4 rounded" style={{ backgroundColor: '#1e1e2e', color: '#cdd6f4' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="small text-muted">Tappa {currentIdx + 1} di {steps.length}</div>
                    <div className="fw-bold font-monospace text-primary">
                        Saldo: {currentStep.coins} solari
                    </div>
                </div>

                <div className="h4 text-center mb-3">
                    {currentStep.from} - {currentStep.to}
                </div>

                <div className="p-3 rounded text-center" style={{ backgroundColor: '#11111b', color: '#cdd6f4' }}>
                    <div className="small text-muted mb-1">Evento Tratta</div>
                    <div className="fw-bold mb-2">{currentStep.event.description}</div>
                    <div className={`fw-bold ${currentStep.event.effect >= 0 ? 'text-success' : 'text-danger'}`}>
                        {currentStep.event.effect >= 0 ? `+${currentStep.event.effect}` : currentStep.event.effect} solari
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="small text-muted mb-2">Storico del Viaggio:</div>
                <Table hover responsive className="small">
                    <thead>
                        <tr>
                            <th>Da</th>
                            <th>A</th>
                            <th>Evento</th>
                            <th className="text-end">Impatto</th>
                            <th className="text-end">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps.slice(0, currentIdx + 1).map((step, idx) => (
                            <tr key={idx} className={idx === currentIdx ? 'table-active' : ''}>
                                <td>{step.from}</td>
                                <td>{step.to}</td>
                                <td>{step.event.description}</td>
                                <td className={`text-end ${step.event.effect >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {step.event.effect >= 0 ? `+${step.event.effect}` : step.event.effect}
                                </td>
                                <td className="text-end fw-bold">{step.coins}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex justify-content-center">
                <Button variant="primary" size="lg" onClick={handleNext} style={{ minWidth: '200px' }}>
                    {currentIdx < steps.length - 1 ? (
                        'Tappa Successiva'
                    ) : (
                        'Visualizza Risultato'
                    )}
                </Button>
            </div>
        </Card>
    );
}

export default ExecutionView;
