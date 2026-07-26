import axios from "axios";

const BASE_URL = "http://localhost:8080/api/documents";

export const uploadDocument = (formData) => {
    return axios.post(
        `${BASE_URL}/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export const getDocuments = () => {
    return axios.get(BASE_URL);
};

export const deleteDocument = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};