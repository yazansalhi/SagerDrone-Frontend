import axios from './axios-auth'
export default {
    login({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.post('/login', {
                email: authData.email,
                password: authData.password,
            })
                .then(res => {
                  
                    let userObJ = {
                        token: res.data.data.api_token,
                        email: res.data.data.email,
                        userId: res.data.data.id,
                        name: res.data.data.name,
                    }
                    localStorage.setItem('token', res.data.data.api_token);
                    commit('authUser', userObJ);
                    resolve(true);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    register({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.post('/register', {
                name:authData.name,
                email: authData.email,
                password: authData.password,
            })
                .then(res => {
                  
                    let userObJ = {
                        token: res.data.data.api_token,
                        email: res.data.data.email,
                        userId: res.data.data.id,
                        name: res.data.data.name,
                    }
                    localStorage.setItem('token', res.data.data.api_token);
                    commit('authUser', userObJ);
                    resolve(true);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    resetPassword({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.post('/password/email', {
                email: authData.email,
            })
                .then(res => {
                  
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    setPassword({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.post('/password/reset', {
                email: authData.email,
                token: authData.token,
                password: authData.password,
                password_confirmation:authData.confirm_password,
            })
                .then(res => {
                  
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    getUsers({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.get('/users', {
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    getProducts({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.get('/products', {
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    getCategories({ commit, state, dispatch }, authData) {
    
        return new Promise((resolve, reject) => {
            axios.get('/categories', {
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    
    removeItem({ commit, state, dispatch }, data) {
    
        return new Promise((resolve, reject) => {
            axios.delete('/'+data.dispatchUrl+'/'+data.id, {
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },
    createUser({ commit, state, dispatch }, data) {
    
        return new Promise((resolve, reject) => {
            axios.post('/users',{
                name: data.name,
                email: data.email,
                password: data.password,
            },{
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data.data);
                });
        });
    },

    createProduct({ commit, state, dispatch }, data) {
    
        return new Promise((resolve, reject) => {
            axios.post('/products',{
                name:data.name,
                category_ids:data.category_ids,
            },{
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    createCategory({ commit, state, dispatch }, data) {
    
        return new Promise((resolve, reject) => {
            axios.post('/categories',{
                name:data.name
            },{
                headers: { 'Authorization': 'Bearer ' + state.token }
            })
                .then(res => {
            
                    resolve(res.data.data);
                
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
}
