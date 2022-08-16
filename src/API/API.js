
import client from './axiosConfig';
import qs from "qs";


const getRequest = async (path, params) => {
    try {
        params = qs.stringify(params);
        const data = await client.get(path + params);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonReqest = async (path, body) => {
    try {
        const data = await client.post(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const putJsonReqest = async (path, body) => {
    try {
        const data = await client.put(path, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonReqest = async (path) => {
    try {
        const data = await client.delete(path, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return data;
    } catch (e) {
        console.log(e);
    }
};

const Api = {
    getUserData: async (obj) => {
        return await getRequest(`/users/`, {obj})
    }

};

export default Api;