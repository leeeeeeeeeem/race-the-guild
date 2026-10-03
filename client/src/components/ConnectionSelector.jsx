import { Card, Button, Row, Col } from 'react-bootstrap';

function ConnectionSelector({ network, selectedConnections, handleToggleConnection, handleClear, startStation, endStation }) {
    if (!network) return null;

    const { stations, connections } = network;

    const getStationName = (id) => {
        const station = stations.find(s => s.id === id);
        return station ? station.name : '';
    };

    const uniqueConnections = connections.filter(c => c.station1_id < c.station2_id);

    return (
        <Card className="p-3 h-100">
            <Card.Title className="mb-3 text-center">Route planning</Card.Title>
            
            <div className="mb-3 p-2 rounded" style={{ backgroundColor: '#313244' }}>
                <div className="small text-muted mb-1">Departure: <strong className="text-success">{startStation?.name}</strong></div>
                <div className="small text-muted">Arrival: <strong className="text-danger">{endStation?.name}</strong></div>
            </div>

            <div className="mb-3" style={{ maxHeight: '220px', overflowY: 'auto', paddingRight: '5px' }}>
                <div className="small text-muted mb-2">Select the connections:</div>
                <Row className="g-2">
                    {uniqueConnections.map((conn) => {
                        const u = conn.station1_id;
                        const v = conn.station2_id;
                        const uName = getStationName(u);
                        const vName = getStationName(v);
                        const selectedIdx = selectedConnections.findIndex(sc => sc.id === conn.id);
                        const isSelected = selectedIdx !== -1;

                        return (
                            <Col xs={12} key={conn.id}>
                                <Button
                                    variant={isSelected ? "primary" : "outline-connection"}
                                    className="w-100 text-start d-flex align-items-center"
                                    onClick={() => handleToggleConnection(conn)}
                                >
                                    {isSelected && (
                                        <span className="badge bg-dark text-primary me-2 fw-bold" style={{ border: '1px solid #89b4fa' }}>
                                            {selectedIdx + 1}
                                        </span>
                                    )}
                                    <strong>{uName}</strong> - <strong>{vName}</strong>
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </div>

            <div className="mt-auto pt-3">
                <Button
                    variant="danger"
                    className="w-100"
                    disabled={selectedConnections.length === 0}
                    onClick={handleClear}
                >
                    Clear selection
                </Button>
            </div>
        </Card>
    );
}

export default ConnectionSelector;
