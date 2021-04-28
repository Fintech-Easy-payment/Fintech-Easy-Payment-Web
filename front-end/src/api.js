import axios from "axios";

const { applicationSettings } = window;
const { DB_ENDPOINT } = applicationSettings;

export const dbApi = {
    signup: (payload) => axios.post(`${DB_ENDPOINT}/api/signup`, payload),
    signin: (payload) => axios.post(`${DB_ENDPOINT}/api/signin`, payload),

}
