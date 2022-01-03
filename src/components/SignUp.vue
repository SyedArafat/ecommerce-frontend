<template>
  <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h2>Sign Up</h2>
    <div class="login">
        <Error v-if="errors.length" :errors="errors"/>
        <Alert v-if="response_done" :message="message" :success="success" />

        <input type="text" v-model="name" name="name" placeholder="Enter Name*" required>
        <input type="text" v-model="email" name="email" placeholder="Enter Email*">
        <input type="password" v-model="password" name="password" placeholder="Enter Password*">
        <input type="password" v-model="password_confirmation" name="password_confirmation" placeholder="Confirm Password*">
        <button @click="signUp"> Sign Up </button>
        <br/> <br/>
        <router-link to="/login"><button class="new-account"> Login </button></router-link>

    </div>
</template>

<script> 
import axios from 'axios';
import Error from './Error.vue';
import Alert from './Alert.vue';

export default {
    name: "SignUp",
    components: {
        Error, Alert
    },
    data() {
        return {
            "success": null,
            "response_done": false,
            "list": [],
            "message": '',
            "errors" : [],
            "name": null,
            "email": null,
            "password": null,
            "password_confirmation": null
        }
    },
    methods: {
        signUp(e) {
            this.errors = [];

            if (!this.name) {
                this.errors.push("Name is required.");
            }
            if (!this.email) {
                this.errors.push('Email is required.');
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Valid email is required.');
            }

            if (!this.errors.length) {
                this.createUser();
                return true;
            }
            if (!this.password) {
                this.errors.push("Password is required.");
            }
            if (!this.password_confirmation) {
                this.errors.push("Password confirmation is required.");
            }

            e.preventDefault();
            
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        createUser: async function() {
            await axios.post("http://localhost:8186/ecommerce/public/api/register", {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then((result) => {
                if(result.status === 201) {
                    this.response_done = true;
                    this.success = true;
                    this.message = "Customer created successfully ! Login to use customer features.";
                    this.$router.push('/login?register=success');
                }
            }).catch((error) => {
                this.response_done = false;
                let server_errors = JSON.parse(error.response.data);
                if(server_errors['email']) this.errors.push(server_errors['email']);
                if(server_errors['password']) this.errors.push(server_errors['password']);
            });

        },
    },
    mounted() {
        // console.log(this.success, this.response_done);
        let user = localStorage.getItem('user-info');
        if(user) {
            this.$router.push({name: 'Home'});
        }
    }
}
</script>

<style scoped>
.logo {
    width: 100px;
}
.register {
    margin-right: auto;
    margin-left: auto;
    width: 400px;
}
.register input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}

.register button {
    width: 320px;
    height: 40px;
    border: 1px solid skyblue;
    background: #2595c3;
    color: #fff;
    cursor: pointer;
}

</style>