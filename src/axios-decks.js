import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://deckofcardsapi.com/api/'
});

export default instance;