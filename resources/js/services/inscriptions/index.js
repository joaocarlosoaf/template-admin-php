import Api from "../api";

const InscriptionService = {
    loginApplicant: (credentials) => {
        return Api.post('/api/inscription/login', credentials);
    },
    saveNewForm: (form) => {
        return Api.post('/api/inscription', form);
    }
}

export default InscriptionService;