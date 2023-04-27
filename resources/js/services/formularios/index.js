import Api from "../api";

const EmecService = {
    saveNewForm: (form) => {
        return Api.post('/emec', form);
    }
}