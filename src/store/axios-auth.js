import axios from 'axios';

const instance = axios.create({
    baseURL: checkEnvironment(process.env.NODE_ENV),
    timeout: 30000,
  
});

function checkEnvironment(env) {
    switch (env) {
        case 'development':
        return 'http://127.0.0.1:8001/api/';
        case 'staging':
            return 'http://127.0.0.1:8001/api/';
        case 'production':
            return 'http://127.0.0.1:8001/api/';
    }
}

export default instance;
