import axios from "axios";

const { applicationSettings } = window;
const { DB_ENDPOINT } = applicationSettings;


export const dbApi = {
    signup: (payload) => axios.post(`${DB_ENDPOINT}/api/signup`, payload),
    signin: (payload) => axios.post(`${DB_ENDPOINT}/api/signin`, payload),
    test: () => axios.get(`${DB_ENDPOINT}/`),
    userData: () => axios.get(`${DB_ENDPOINT}/api/`),
    accountData: () => axios.post(`${DB_ENDPOINT}/api/`),
    // postToken: (payload) => axios.post(`https://testapi.openbanking.or.kr/oauth/2.0/token`,payload),
}
export const tokenApi = {
    testCertification: (payload) => axios.post('https://testapi.openbanking.or.kr/oauth/2.0/token', payload, {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}
