# Exam #1: "Ultima Corsa"
## Student: s353334 LEMERLE STEFANO THOMAS 

## React Client Application Routes

- Route `/`: La pagina che si apre all'inizio, mostra le istruzioni del gioco e il form di login, una volta effettuato il login mostra le opzioni di vedere la classifica e iniziare una nuova partita.
- Route `/play`: La pagina principale del gioco, disponibile solo agli utenti che hanno effettuato il login, gestisce le 4 fasi del gioco, mostrando la mappa in maniera apposita. 
- Route `/leaderboard`: La pagina con la classifica, disponibile solo se l'utente ha effettuato il login.

## API Server

- GET `/api/sessions/current`
  - request parameters: Cookie di sessione
  - response status: `200 OK` (successo), `401 Unauthorized`
  - response body example: `{ "id": 1, "username": "PaulAtreides" }`

- POST `/api/sessions`
  - request parameters: nessuno
  - request body: `{ "username": "PaulAtreides", "password": "LisanAlGaib" }`
  - response status: `200 OK` (successo), `401 Unauthorized` (credenziali errate)
  - response body example: `{ "id": 1, "username": "PaulAtreides" }`

- DELETE `/api/sessions/current`
  - request parameters: Cookie di sessione
  - response status: `200 OK` (logout completato)
  - response body: empty.

- GET `/api/network`
  - request parameters: nessuno
  - response status: `200 OK` (successo), `500 Internal Server Error`
  - response body example: 
    ```
    {
      "stations": [
        { "id": 1, "name": "Caladan" },
        { "id": 2, "name": "Ginaz" }
      ],
      "lines": [
        { "id": 1, "name": "Linea Atreides", "color": "#a6e3a1" }
      ],
      "connections": [
        { "id": 1, "station1_id": 1, "station2_id": 2, "line_id": 1 }
      ]
    }
    ```

- GET `/api/leaderboard`
  - request parameters: Cookie di sessione
  - response status: `200 OK` (successo), `401 Unauthorized`, `500 Internal Server Error`.
  - response body example:
    ```
    [
      { "username": "PaulAtreides", "best_score": 24 },
      { "username": "BaronHarkonnen", "best_score": 22 }
    ]
    ```

- POST `/api/games`
  - request parameters: Cookie di sessione
  - response status: `200 OK` (partita creata), `401 Unauthorized` (utente non ha effettuato il login), `500 Internal Server Error`.
  - response body example:
    ```
    {
      "startStation": { "id": 1, "name": "Caladan" },
      "endStation": { "id": 15, "name": "Corrin" }
    }
    ```

- POST `/api/games/submit`
  - request parameters: Cookie di sessione
  - request body: `{ "path": [1, 2, 3, 15] }`
  - response status: `200 OK` (validazione fatta), `401 Unauthorized` (bisogna fare il login), `400 Bad Request` (nessuna partita in corso), `500 Internal Server Error`.
  - response body example:
    ```
    {
      "valid": true,
      "score": 18,
      "steps": [
        {
          "from": "Caladan",
          "to": "Ginaz",
          "event": { "id": 1, "description": "Viaggio tranquillo", "effect": 0 },
          "coins": 20
        },
        {
          "from": "Ginaz",
          "to": "Arrakis",
          "event": { "id": 8, "description": "Pattuglia dei Sardaukar", "effect": -2 },
          "coins": 18
        }
      ]
    }
    ```

## Database Tables

- Table `users` - Contiene credenziali e dati degli utenti registrati, cioe username, password hashata e salt
- Table `stations` - Contiene le stazioni con id e relativo nome
- Table `lines` - Contiene le linee, con id, nome e colore con cui vengono disegnate sulla mappa
- Table `connections` - Contiene tutti i collegamenti tra stazioni, salvati in modo bidirezionale (sia 2-1 che 1-2), ogni collegamento ha un suo id, l'id delle due stazioni e l'id della linea a cui appartiene
- Table `events` - Contiene gli eventi che possono capitare casualmente durante il viaggio, con id, descrizione ed effetto
- Table `games` - Contiene tutte le partite già terminata, con un id per ogni partita, id dell'utente che l'ha giocata e punteggio

## Main React Components

- `NavigationBar` (in `NavigationBar.jsx`): Barra di navigazione contenente logo del gioco, username dell'utente con annesso tasto di logout oppure un tasto di login, e tasti per cambiare pagina.
- `LoginForm` (in `Login.jsx`): Form di input per gestire il login dell'utente.
- `Play` (in `Play.jsx`): Componente principale per la gestione del gioco, la maggior parte degli stati e delle funzioni per gestire il gioco sono definiti qui e passati ai suoi sottocomponenti
- `GameMap` (in `GameMap.jsx`): Componente svg che renderizza la mappa del gioco in modi diversi in base alla fase del gioco
- `ConnectionSelector` (in `ConnectionSelector.jsx`): Lista di connessioni bidirezionali che possono essere selezionate dall'utente per costruire il suo percorso
- `GameTimer` (in `GameTimer.jsx`): Componente che gestisce il timer lato client per mostrarlo all'utente
- `ExecutionView` (in `ExecutionView.jsx`): Componente che mostra all'utente le tappe del suo viaggio con i relativi eventi nella fase di esecuzione.
- `ResultView` (in `ResultView.jsx`): Risultati della partita appena completata, con un bottone per iniziarne un altra.
- `Leaderboard` (in `Leaderboard.jsx`): Classifica generale tra tutti gli utenti che hanno giocato ad almeno una partita.

## Screenshot

![Screenshot](./img/screenshot1.png)
![Screenshot](./img/screenshot2.png)

## Users Credentials

- `PaulAtreides`, `LisanAlGaib`
- `BaronHarkonnen`, `Spice123`
- `DuncanIdaho`, `CantDie200`
- `LadyJessica`, `Sisterhood`
- `MilesTeg`, `MentatGeneral`

## Use of AI Tools
Ho utilizzato LLM per assistere allo sviluppo nei seguenti modi:
- Pianificazione di alcune parti della struttura dell'applicazione, principalmente per capire il modo migliore per renderizzare la mappa e successivamente per farmi spiegare come renderizzare svg in react.
- Controllo generale del codice per verificare che stessi seguendo le best practices dello sviluppo web e che non ci fossero errori che mi ero perso.
- Supporto per bug fix in alcuni casi in cui non riuscivo a capire quale fosse la causa.
