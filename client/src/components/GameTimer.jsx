import { useEffect } from 'react';
import { Card } from 'react-bootstrap';

function GameTimer({ secondsLeft, setSecondsLeft, handleSubmit }) {
    useEffect(() => {
        if (secondsLeft <= 0) {
            handleSubmit();
            return;
        }

        const timerId = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [secondsLeft, handleSubmit, setSecondsLeft]);

    return (
        <Card className="p-3 text-center">
            <div className="small text-muted mb-1">Time left</div>
            <div className={`h2 mb-0 fw-bold font-monospace text-primary`}>
                {secondsLeft}s
            </div>
        </Card>
    );
}

export default GameTimer;
