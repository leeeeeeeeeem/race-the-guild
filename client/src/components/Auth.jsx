import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function LoginForm({ login }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('Inserisci sia username che password');
            return;
        }

        login({ username, password })
            .catch(err => {
                setErrorMessage(err.message);
            });
    };

    return (
        <Card className="p-4 w-100 h-100 d-flex flex-column justify-content-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Card.Title className="text-center mb-4">Accedi</Card.Title>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Inserisci l'username" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Inserisci la password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Entra
                </Button>
            </Form>
        </Card>
    );
}

export { LoginForm };
