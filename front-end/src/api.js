import axios from "axios";

const { applicationSettings } = window;
const { DB_ENDPOINT } = applicationSettings;


export const dbApi = {
    signup: (payload) => axios.post(`${DB_ENDPOINT}/api/signup`, payload),
    // signup: (payload) => axios.post(`${DB_ENDPOINT}/api/signup`, payload),
    signin: (payload) => axios.post(`${DB_ENDPOINT}/api/signin`, payload),
    test: () => axios.get(`${DB_ENDPOINT}/`),
    accountData: () => axios.get(`${DB_ENDPOINT}/api/account`),
    withdrawData: () => axios.post(`${DB_ENDPOINT}/api/withdraw`),
    // postToken: (payload) => axios.post(`https://testapi.openbanking.or.kr/oauth/2.0/token`,payload),
}
export const tokenApi = {
    testCertification: (payload) => axios.post('https://testapi.openbanking.or.kr/oauth/2.0/token', payload, {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }),
    // testCertification: (payload) => axios.post('http://localhost:3000/api/token', payload, {
    //     headers: {
    //         'Content-Type' : 'application/x-www-form-urlencoded'
    //     }
    // })

}
