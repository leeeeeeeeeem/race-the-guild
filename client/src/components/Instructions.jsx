import { Card, Row, Col } from 'react-bootstrap';

function Instructions() {
    return (
        <Card className="p-4 mb-4">
            <Card.Title className="mb-3 text-primary"> <strong>Regole</strong> </Card.Title>
            <Card.Text>
              Sei un viaggiatore che deve raggiungere un pianeta lontano nell'universo di Dune. La Gilda Spaziale detiene il monopolio sulle tratte di navigazione e non permette viaggi che non passano sulle tratte definite da loro. Il tuo obiettivo è pianificare una corsa conforme alle regole della Gilda, dati un pianeta di partenza e di arrivo, raggiungendo la destinazione con il saldo di Solari più alto possibile.
            </Card.Text>
            <Row className="mt-3 g-3">
                <Col md={6}>
                    <Card.Subtitle className="mb-2 text-primary">Fasi della partita</Card.Subtitle>
                    <ol className="ps-3 text-start small" >
                        <li className="mb-2"><strong>Setup:</strong> Studia la mappa della rete spaziale e memorizza le tratte e le linee. </li>
                        <li className="mb-2"><strong>Pianificazione:</strong> Le linee spariscono dalla mappa, ti vengono dati un pianeta di partenza e uno di arrivo, seleziona le tratte in ordine per arrivare alla destinazione in meno di 90 secondi. </li>
                        <li className="mb-2"><strong>Esecuzione:</strong> La Gilda controlla la tua rotta, se è valida ti vengono mostrate le varie tappe con gli eventi annessi, altrimenti finisce la partita con un saldo di 0 Solari. </li>
                        <li><strong>Risultato:</strong> Guarda il saldo di Solari rimasti alla fine del viaggio.</li>
                    </ol>
                </Col>
                <Col md={6}>
                    <Card.Subtitle className="mb-2 text-primary">Vincoli di percorso</Card.Subtitle>
                    <ul className="ps-3 text-start small" >
                        <li className="mb-2">Un percorso è valido quando inizia e termina nelle stazioni assegnate. </li>
                        <li className="mb-2">Ogni tratta deve essere raggiungibile con una delle linee. </li>
                        <li className="mb-2">I cambi di linea sono consentiti solamente nelle stazioni di interscambio.</li>
                        <li className="mb-2">Non puoi ripercorrere la stessa tratta più di una volta, un percorso può contenere la stessa stazione più di una volta se compare in tratte diverse .</li>
                    </ul>
                </Col>
            </Row>
        </Card>
    );
}

export default Instructions;
