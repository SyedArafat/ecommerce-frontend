<template>
    <Header />
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <h2>Update Product</h2>
    <div class="login">
        <Error v-if="errors.length" :errors="errors"/>
        <Alert v-if="response_done" :message="message" :success="success" />

        <input type="text" v-model="name" name="name" placeholder="Enter Product Name*">
        <textarea rows="4" placeholder="Product Description" name="description" v-model="description"> </textarea>
        <input type="number" v-model="price" name="price" placeholder="Enter Unit Price*">
        <input type="number" v-model="quantity" name="quantity" placeholder="Enter Product Quantity*">
        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()">
        <label>Image: {{ pastImage }} </label>
        <br>
        <button @click="submit"> Update </button>
        <br/> <br/>

    </div>
</template>

<script> 
import Header from './Header.vue';
import { productServices } from '../api/products';
import Error from './Error.vue';
import Alert from './Alert.vue';

const baseURL = "http://localhost:8186/ecommerce/public/";

export default {
    name: "ProductUpdate",
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
            "image": null,
            "pastImage": null,
            "id": null
        }
    },
    methods: {
        onChangeFileUpload(){
            this.image = this.$refs.file.files[0];
            this.pastImage = this.image.name;
            console.log(this.pastImage);
        },
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
            if (!this.errors.length) {
                this.update();
                return true;
            }
            e.preventDefault();
        },

        update() {
            let url = baseURL + "api/products/" + this.id + "/update";
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('price', this.price);
            formData.append('quantity', this.quantity);
            if(this.image)
                formData.append('image', this.image);

            productServices.post(url, formData).then(() => {
                this.$router.push('/?product_update=success');
            })
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        let url = baseURL + "api/products/" + this.id;
        productServices.getAll(url).then((result) => {
            let data = (result.data);
            this.name = data.name;
            this.description = data.description;
            this.quantity =data.quantity;
            this.price = data.price;
            this.pastImage = data.image;
        })
    }
}
</script>