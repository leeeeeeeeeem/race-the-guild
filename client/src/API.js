const SERVER_URL = 'http://localhost:3001/api';

const logIn = async (credentials) => {
    return await fetch(SERVER_URL + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

const getUserInfo = async () => {
    return await fetch(SERVER_URL + '/sessions/current', {
        credentials: 'include'
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

const logOut = async () => {
    return await fetch(SERVER_URL + '/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    }).then(handleInvalidResponse);
};

const getNetwork = async () => {
    return await fetch(SERVER_URL + '/network', {
        credentials: 'include'
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

const getLeaderboard = async () => {
    return await fetch(SERVER_URL + '/leaderboard', {
        credentials: 'include'
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

const startNewGame = async () => {
    return await fetch(SERVER_URL + '/games', {
        method: 'POST',
        credentials: 'include'
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

const submitGame = async (path) => {
    return await fetch(SERVER_URL + '/games/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ path }),
    }).then(handleInvalidResponse)
    .then(response => response.json());
};

async function handleInvalidResponse(response) {
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw Error(err.error || response.statusText);
    }
    return response;
}

const API = { logIn, getUserInfo, logOut, getNetwork, getLeaderboard, startNewGame, submitGame };
export default API;
