import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar.jsx';
import Home from './pages/Home.jsx';
import Play from './pages/Play.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import API from './API.js';

function App() {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [network, setNetwork] = useState(null);

    useEffect(() => {
        API.getUserInfo()
            .then(u => {
                setUser(u);
                setLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setLoggedIn(false);
            });
    }, []);

    useEffect(() => {
        API.getNetwork()
            .then(net => {
                setNetwork(net);
            })
            .catch(err => {
                console.error(err.message);
            });
    }, []);

    const handleLogin = async (credentials) => {
        const u = await API.logIn(credentials);
        setUser(u);
        setLoggedIn(true);
    };

    const handleLogout = async () => {
        try {
            await API.logOut();
            setUser(null);
            setLoggedIn(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#1e1e2e', color: '#cdd6f4' }}>
            <NavigationBar user={user} loggedIn={loggedIn} logout={handleLogout} />
            <Container fluid className="flex-grow-1 py-4">
                <Routes>
                    <Route path="/" element={<Home loggedIn={loggedIn} login={handleLogin} />} />
                    <Route path="/play" element={loggedIn ? <Play network={network} /> : <Navigate replace to="/" />} />
                    <Route path="/leaderboard" element={loggedIn ? <Leaderboard /> : <Navigate replace to="/" />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
