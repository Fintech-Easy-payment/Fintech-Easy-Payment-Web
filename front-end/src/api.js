import axios from "axios";

const { applicationSettings } = window;
const { DB_ENDPOINT } = applicationSettings;

export const dbApi = {
    login: (payload) => axios.post(`${DB_ENDPOINT}`, payload),

}
