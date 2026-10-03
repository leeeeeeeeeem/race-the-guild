import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({ user, loggedIn, logout }) {
    const navigate = useNavigate();

    return (
        <Navbar expand variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img src="/favicon.svg" width="40" height="40" className="me-2" />
                    <strong>Race the Guild</strong>
                </Navbar.Brand>
                <Nav className="me-auto flex-row gap-3">
                    {loggedIn && (
                        <>
                            <Nav.Link as={Link} to="/play">Play</Nav.Link>
                            <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                        </>
                    )}
                </Nav>
                <Nav className="align-items-center flex-row gap-3">
                    {loggedIn ? (
                        <>
                            <Navbar.Text style={{ color: '#bac2de' }}>
                                User: <strong>{user?.username}</strong>
                            </Navbar.Text>
                            <Button variant="secondary" onClick={() => logout().then(() => navigate('/'))}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" as={Link} to="/">
                            Log in
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
