import axios from 'axios';

export default axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {"ngrok-skip-browser-warning": "true"}
});
