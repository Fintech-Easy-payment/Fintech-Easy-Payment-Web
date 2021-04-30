import axios from "axios";

const { applicationSettings } = window;
const { DB_ENDPOINT } = applicationSettings;


export const dbApi = {
    signup: (payload) => axios.post(`${DB_ENDPOINT}/api/signup`, payload),
    auth: (code) => axios.post(`${DB_ENDPOINT}/api/token`, {
        'code':code
    }, {
        headers: {
            'ourtoken' : sessionStorage.getItem('temporary-token')
        }
    }),
    signin: (payload) => axios.post(`${DB_ENDPOINT}/api/signin`, payload),
    test: () => axios.get(`${DB_ENDPOINT}/`),
    accountData: () => axios.post(`${DB_ENDPOINT}/api/account`, undefined, {
        headers: {
            'ourtoken' : sessionStorage.getItem('temporary-token')
        }
    }),
    withdrawData: (payload) => axios.post(`${DB_ENDPOINT}/api/withdraw`, payload, {
        headers: {
            'ourtoken' : sessionStorage.getItem('temporary-token')
        }
    }),
}
