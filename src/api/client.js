import axios from "axios";
import { authHeader } from './auth_header'
import store from "../store"

export const requestService = {
    getRequest,
    postRequest,
    deleteRequest
}

function getRequest($url) {
    const promise = axios.get($url, { 
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((e)=>{
        if(e.response.status === 401) {
            store.dispatch('logout');
        }
    });

    return promise;
}

function postRequest(url, data) {
    const promise = axios.post(url, data, {
        headers: authHeader(),
    }).then((response) => {
        return response.data;
    }).catch((e) => {
        if(e.response.status === 401) {
            store.dispatch('logout');
        }
    });

    return promise;
}

function deleteRequest(url) {
    const promise = axios.delete(url, {
        headers: authHeader(),
    }).then((response) => response.data).catch((e) => {
        if(e.response.status === 401) {
            store.dispatch('logout');
        }
    })

    return promise;
}