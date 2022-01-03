<template> 
    <div class="nav">
        <div v-if="isAdmin">
            <router-link to='/'>Home</router-link>
            <router-link to="/product/create">Add Product</router-link>
            <router-link to="">All Orders</router-link>
        </div>
        <div v-else>
            <router-link to='/'>Home</router-link>
            <router-link to="/customer-orders">My Orders</router-link>
        </div>
        <a class="right" @click="logout">Logout</a>

    </div>
</template>

<script> 
import {mapActions} from 'vuex';

export default {
    name: 'Header',
    methods: mapActions(['logout']),
    computed: {
        isAdmin() {
            return this.$store.getters.isAdmin
        }
    }
}

</script>

<style> 
.nav {
    background-color: #333;
    overflow: hidden;
}
.nav a {
    color: #f2f2f2;
    padding: 16px 14px;
    float: left;
    font-size: 16px;
    text-align: center;
    margin: 4px;
    cursor: pointer;
    text-decoration: none;
}

.nav .right {
    float: right;
}

.nav a:hover {
    background-color: #ddd;
    color: #222;
}
</style>