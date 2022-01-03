import axios from "axios";
import { authHeader } from './auth_header'

export const userService = {
    Logout: logout
}

function logout() {
    axios.post("http://localhost:8186/ecommerce/public/api/logout", {'token': authHeader().token}, 
    { 
        headers: authHeader(),
    }).then(() => {
    }).catch(() => {});
}