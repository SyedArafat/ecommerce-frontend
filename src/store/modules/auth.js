import router from '../../routes';
import { userService } from '../../api/authentication';

const state = {
    token: window.localStorage.getItem('token'),
    user_info: window.localStorage.getItem('user-info')
};

const getters = {
    isLoggedIn: state => !!state.token,
    isAdmin: (state) => {
        return ((JSON.parse(state.user_info) && (JSON.parse(state.user_info).role === 'admin')));
    }
    
};

const actions = {
    login: ({commit}, result) => {
        localStorage.setItem("user-info", JSON.stringify(result.data.info.original));
        localStorage.setItem('token', result.data.token);
        commit('setToken', result.data.token);
        commit('setUserInfo', JSON.stringify(result.data.info.original))
    },
    logout: ({ commit }) => {
        userService.Logout();
        commit('setToken', null);
        commit('setUserInfo', null);
        localStorage.removeItem('user-info');
        localStorage.removeItem('token');
        router.push({name: 'Login'});
    }

};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUserInfo: (state, user_info) => {
        state.user_info = user_info;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}