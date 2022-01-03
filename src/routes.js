import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import AddProduct from './components/AddProduct';
import ProductUpdate from './components/ProductUpdate';
import CustomerOrders from './components/CustomerOrders';

import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/register'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'AddProduct',
        component: AddProduct,
        path: '/product/create'
    },
    {
        name: 'ProductUpdate',
        component: ProductUpdate,
        path: '/product/update/:id'
    },
    {
        name: 'CustomerOrders',
        component: CustomerOrders,
        path:'/customer-orders'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;