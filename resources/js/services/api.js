import axios from "axios";

const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_BACKEND
})


Api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


Api.interceptors.request.use(function (config) {
    let loggedInUser = JSON.parse(localStorage.getItem("user"));
    if(loggedInUser!=null) {
        let token = loggedInUser.token;
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});



Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default Api;

