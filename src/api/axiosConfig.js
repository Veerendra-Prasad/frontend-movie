import axios from 'axios';

export default axios.create({
    baseURL:'https://backend-movie-q7lp.onrender.com',
    headers: {"ngrok-skip-browser-warning": "true"}
});