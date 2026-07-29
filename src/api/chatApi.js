import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

export const askQuestion = (question) => {

    return axios.post(
        `${BASE_URL}/ask`,
        {
            question
        }
    );
};