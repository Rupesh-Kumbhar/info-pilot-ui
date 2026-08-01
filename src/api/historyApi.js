import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

export const getHistory = () => {

    return axios.get(
        `${BASE_URL}/history`
    );
};