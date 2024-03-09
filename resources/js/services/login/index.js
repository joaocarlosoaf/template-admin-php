import Api from "../api";

const LoginService = {
  login: (credentials) => {
    return Api.post('/api/admin/login', credentials);
  },
}

export default LoginService;