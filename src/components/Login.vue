<template>
  <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h2>Login</h2>
    <div class="login">
        <Error v-if="errors.length" :errors="errors" />
        <Alert v-if="response_done" :success="success" :message="message"/>
        <input type="text" v-model="email" name="email" placeholder="Enter Email">
        <input type="password" v-model="password" name="password" placeholder="Enter Password">
        <button @click="login"> Login </button> <br> <br>
        <router-link to="/register"><button class="new-account"> New Account </button></router-link>

    </div>
</template>

<script> 
import axios from 'axios';
import Alert from './Alert.vue';
import Error from './Error.vue';

export default {
    name: "Login",
    components: {
        Alert,
        Error
    },
    data() {
        return {
            "response_done": false,
            "success": false,
            "message": '',
            "email": '',
            "password": '',
            errors: []
        }
    },
    methods: {
        async login() {
            this.errors = [];
            if (!this.email) {
                this.errors.push('Email is required.');
            }
            if (!this.password) {
                this.errors.push("Password is required.");
            }
            if(!this.errors.length) {
                await axios.post("http://localhost:8186/ecommerce/public/api/login", {
                    email: this.email,
                    password: this.password,
                }).then((result) => {
                    if(result.status === 200) {
                        this.response_done = true;
                        this.success = true;
                        this.$store.dispatch('login', result);
                        this.success = true;
                        this.$router.push({name: 'Home'});

                    }
                }).catch(() =>{
                    this.response_done = true;
                    this.success = false;
                    this.message = "Invalid email/password";
                });
            }
        }
    },
    mounted() {
        if (this.$route.query.register=== 'success') {
            this.response_done = true;
            this.success = true;
            this.message = "Registration Successful! Login using your crediantials"
        }
        if(this.$store.getters.isLoggedIn) {
            this.$router.push({name: 'Home'});
        }
    }
}
</script>

<style>
.logo {
    width: 100px;
}
.login input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}

.login button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: #2595c3;
    color: #fff;
    cursor: pointer;
}

.login .new-account {
    background: rgb(185, 51, 107);
}
</style>