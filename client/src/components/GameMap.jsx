
const stationCoordinates = {
    1: { x: 94, y: 89 },
    2: { x: 276, y: 188 },
    3: { x: 406, y: 305 },
    4: { x: 578, y: 538 },
    5: { x: 81, y: 532 },
    6: { x: 119, y: 275 },
    7: { x: 748, y: 457 },
    8: { x: 219, y: 318 },
    9: { x: 514, y: 164 },
    10: { x: 416, y: 496 },
    11: { x: 344, y: 97 },
    12: { x: 738, y: 137 },
    13: { x: 585, y: 53 },
    14: { x: 222, y: 430 },
    15: { x: 608, y: 356 }
};

function GameMap({ network, phase, startStation, endStation, path, selectedConnections, submitResults }) {
    if (!network) return null;

    const { stations, lines, connections } = network;

    const getLineColor = (lineId) => {
        const line = lines.find(l => l.id === lineId);
        return line ? line.color : '#45475a';
    };

    const uniqueConnections = connections.filter(c => c.station1_id < c.station2_id);

    const showLines = phase === 'SETUP' || phase === 'EXECUTION' || phase === 'RESULT';

    const pathEdges = [];
    if (path && path.length > 1) {
        for (let i = 0; i < path.length - 1; i++) {
            pathEdges.push({
                from: path[i],
                to: path[i + 1]
            });
        }
    }

    return (
        <div style={{ backgroundColor: '#181825', borderRadius: '4px', padding: '10px' }}>
            <svg viewBox="0 0 800 600" width="100%" height="auto" style={{ userSelect: 'none' }}>

                {showLines && uniqueConnections.map((conn) => {
                    const fromCoord = stationCoordinates[conn.station1_id];
                    const toCoord = stationCoordinates[conn.station2_id];
                    if (!fromCoord || !toCoord) return null;
                    return (
                        <line
                            key={`line-${conn.id}`}
                            x1={fromCoord.x}
                            y1={fromCoord.y}
                            x2={toCoord.x}
                            y2={toCoord.y}
                            stroke={getLineColor(conn.line_id)}
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    );
                })}

                {(phase === 'EXECUTION' || phase === 'RESULT') && selectedConnections.map((conn, index) => {
                    const fromCoord = stationCoordinates[conn.station1_id];
                    const toCoord = stationCoordinates[conn.station2_id];
                    if (!fromCoord || !toCoord) return null;
                    return (
                        <line
                            key={`path-edge-${index}`}
                            x1={fromCoord.x}
                            y1={fromCoord.y}
                            x2={toCoord.x}
                            y2={toCoord.y}
                            stroke="#ffffff"
                            strokeWidth="6"
                            strokeLinecap="round"
                            style={{ filter: 'drop-shadow(0px 0px 8px #cdd6f4)' }}
                        />
                    );
                })}

                {stations.map((station) => {
                    const coord = stationCoordinates[station.id];
                    if (!coord) return null;

                    let fill = '#313244';
                    let stroke = '#585b70';
                    let strokeWidth = '2';
                    let radius = '10';

                    const isStart = startStation && startStation.id === station.id;
                    const isEnd = endStation && endStation.id === station.id;

                    const isInterchange = [2, 3, 9, 15].includes(station.id);

                    if (isStart) {
                        fill = '#a6e3a1';
                        stroke = '#cdd6f4';
                        strokeWidth = '3';
                        radius = '14';
                    } else if (isEnd) {
                        fill = '#f38ba8';
                        stroke = '#cdd6f4';
                        strokeWidth = '3';
                        radius = '14';
                    }


                    return (
                        <g key={`station-g-${station.id}`}>
                            <circle
                                cx={coord.x}
                                cy={coord.y}
                                r={radius}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={strokeWidth}
                            />
                            {isInterchange && !isStart && !isEnd && phase !== 'PLANNING' && (
                                <circle
                                    cx={coord.x}
                                    cy={coord.y}
                                    r={radius - 4}
                                    fill="none"
                                    stroke="#cdd6f4"
                                    strokeWidth="1.5"
                                />
                            )}
                            <text
                                x={coord.x}
                                y={coord.y - 18}
                                textAnchor="middle"
                                fill="#cdd6f4"
                                fontSize="12px"
                                fontWeight="bold"
                                style={{
                                    backgroundColor: '#181825',
                                    paintOrder: 'stroke',
                                    stroke: '#181825',
                                    strokeWidth: '4px',
                                    strokeLinejoin: 'round'
                                }}
                            >
                                {station.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export default GameMap;
