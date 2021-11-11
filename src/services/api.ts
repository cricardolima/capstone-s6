import axios from "axios";

const api = axios.create({
    baseURL: "https://conserta-meu-carro-api.herokuapp.com/",
});

export default api;