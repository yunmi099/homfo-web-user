import axios, { AxiosResponse, Method } from 'axios';

const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';

export const fetchFromApi = async (
    method: Method | undefined,
    url: string,
    data?: any
): Promise<any> => {
    return axios({
        method,
        url: SERVER_DEPOLY_URL + url,
        data,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};
