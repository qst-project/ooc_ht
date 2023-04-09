import axios from 'axios';

import { API_URL } from '@/consts';

export const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        '+Access-Control-Allow-Origin': API_URL,
        'Content-Type': 'application/json',
    },
    auth: {
        username: 'admin',
        password: 'admin',
    },
});
