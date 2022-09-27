import axios from 'axios';
const instance = axios.create({ baseURL: 'https://localhost:7073/' });
export default instance