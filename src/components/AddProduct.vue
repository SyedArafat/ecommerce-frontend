<template>
<div>
    <Header />
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h2>Add New Product</h2>
    <div class="login">
        <Error v-if="errors.length" :errors="errors"/>
        <Alert v-if="response_done" :message="message" :success="success" />

        <input type="text" v-model="name" name="name" placeholder="Enter Product Name*">
        <textarea rows="4" placeholder="Product Description" name="description" v-model="description"> </textarea>
        <input type="number" v-model="price" name="price" placeholder="Enter Unit Price*">
        <input type="number" v-model="quantity" name="quantity" placeholder="Enter Product Quantity*">
        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()">
        <button @click="submit"> Add Product </button>
        <br/> <br/>

    </div>
</div>
</template>
<script> 
import Header from './Header.vue';
import Error from './Error.vue';
import Alert from './Alert.vue';
import axios from 'axios';

export default {
    name: "AddProduct",
    components: {
        Header,
        Error,
        Alert
    },
    data() {
        return {
            "success": null,
            "response_done": false,
            "list": [],
            "message": '',
            "errors" : [],
            'name': null,
            "description": null,
            "price": null,
            "quantity": null,
            "image": null
        }
    },
    methods: {
        submit(e) {
            this.errors = [];
            if (!this.name) {
                this.errors.push("Name is required.");
            }

            if (!this.price) {
                this.errors.push('Price is required.');
            }

            if (!this.quantity) {
                this.errors.push('Product quantity is required.');
            }
            if(!this.image) {
                this.errors.push("Product Image is required");
            }
            if (!this.errors.length) {
                this.addProduct();
                return true;
            }
            e.preventDefault();
        },
        onChangeFileUpload(){
            this.image = this.$refs.file.files[0];
        },
        resetAllFields() {
            this.name = null,
            this.image = null,
            this.quantity = null,
            this.description = null,
            this.price =null
            
        },
        async addProduct() {
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('price', this.price);
            formData.append('quantity', this.quantity);
            formData.append('image', this.image);
            let token = localStorage.getItem('token');
            await axios.post("http://localhost:8186/ecommerce/public/api/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer `+ token,
                }

            }).then((result) => {
                if(result.status === 201) {
                    this.response_done = true;
                    this.success = true;
                    this.message = "Product added successfully";
                    this.resetAllFields();
                    this.$router.push('/?create=success');
                }
            }).catch(() => {
                this.response_done = true;
                this.success = false;
                this.message = "Something went wrong";
                
            });
        }

    }
}
</script>

<style> 
.login textarea {
    width: 300px; 
    padding-left: 20px;
    display: block;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid skyblue;
}
</style>