import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Instructions from '../components/Instructions.jsx';
import { LoginForm } from '../components/Login.jsx';

function Home({ loggedIn, login }) {
    return (
        <div className="container py-2">
            <Row className="g-4">
                <Col lg={loggedIn ? 12 : 8}>
                    <Instructions />
                </Col>
                {!loggedIn ? 
					(
                    <Col lg={4} className="d-flex flex-column mb-4">
                        <LoginForm login={login} />
                    </Col>
                ) : (
                    <Col lg={12}>
                        <Card className="p-4 text-center">
                            <div className="d-flex justify-content-center gap-3">
                                <Button variant="primary" size="lg" as={Link} to="/play">
                                    Nuova partita
                                </Button>
                                <Button variant="secondary" size="lg" as={Link} to="/leaderboard">
                                    Classifica
                                </Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Home;
