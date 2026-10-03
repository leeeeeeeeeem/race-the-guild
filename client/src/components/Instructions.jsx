import { Card, Row, Col } from 'react-bootstrap';

function Instructions() {
    return (
        <Card className="p-4 mb-2">
            <Card.Title className="mb-3 text-primary"> <strong>Rules</strong> </Card.Title>
            <Card.Text>
              You are a traveler who must reach a distant planet in the Dune universe. The Spacing Guild holds a monopoly over navigation routes and forbids any journey that does not follow the routes it has defined. Given a departure planet and an arrival planet, your goal is to plan a journey that complies with the Guild's rules, reaching your destination with the highest possible balance of Solaris.
            </Card.Text>
            <Row className="mt-3 g-3">
                <Col md={6}>
                    <Card.Subtitle className="mb-2 text-primary">Game phases</Card.Subtitle>
                    <ol className="ps-3 text-start " >
                        <li className="mb-2"><strong>Setup:</strong> Study the map of the space network and memorize the connections and lines. </li>
                        <li className="mb-2"><strong>Planning:</strong> The lines disappear from the map and you are given a departure and an arrival planet; select the connections in order to reach your destination in under 90 seconds. </li>
                        <li className="mb-2"><strong>Execution:</strong> The Guild checks your route; if it is valid you are shown each leg along with its events, otherwise the game ends with a balance of 0 Solaris. </li>
                        <li><strong>Result:</strong> See how many Solaris you have left at the end of the journey.</li>
                    </ol>
                </Col>
                <Col md={6}>
                    <Card.Subtitle className="mb-2 text-primary">Route constraints</Card.Subtitle>
                    <ul className="ps-3 text-start " >
                        <li className="mb-2">A route is valid when it starts and ends at the assigned stations. </li>
                        <li className="mb-2">Every connection must be served by one of the lines. </li>
                        <li className="mb-2">Line changes are only allowed at interchange stations.</li>
                        <li className="mb-2">You cannot travel the same connection more than once; a route may pass through the same station more than once if it appears in different connections.</li>
                    </ul>
                </Col>
            </Row>
        </Card>
    );
}

export default Instructions;
