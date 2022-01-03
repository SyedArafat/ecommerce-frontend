<template>
    <div class="product-list">
        <h2>Products</h2>
        <div class="search-section">
            <b>Search by name: </b>
            <input @input="onTermChange" v-model="name" name="name"/>
        </div>
        <div class="filter-section">
            Filter By Price : 
            <select @input="onTermChange" v-model="filter_by_price" name="filter_by_price">
                <option selected value="desc"> Low To Heigh</option>
                <option value="asc"> Heigh To Low</option>
            </select>
        </div>
        <table v-if="products.length">
        <tr>
            <th class="text-center">Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
        <tr v-for="product in products" :key="product.id">
            <td><img class="product-image" :src=" baseURL+ product.image "></td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price}}</td>
            <td>{{ product.quantity}}</td>
            <td class="text-center" v-if="isAdmin"><button class="edit-button"><router-link :to="'/product/update/' + product.id">Edit</router-link></button>
            <button @click="deleteProduct(product.id)" class="delete-button">Delete</button>
            </td>
            <td v-else>
                <button @click="showModal(product.id, product.name)" class="button green-button">Order</button>
            </td>
        </tr>
        </table>
        <table v-else>
            <tr>
                <th class="text-center">Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
            <tr>
                <td colspan="6" class="text-center">No Products Found</td>
            </tr>
        </table>

        <OrderModal :productName = productName :productId = productId
            v-show="isModalVisible"
            @close="closeModal"
        >

        </OrderModal>
    </div>
</template>

<script> 
import { productServices } from '../api/products';
import OrderModal from './modal/OrderConfirm.vue';

const baseURL = "http://localhost:8186/ecommerce/public/";

export default {
    name: "ProductList",
    components: {
        OrderModal
    },
    computed: {
        baseURL() {
            return  baseURL;
        },
        isAdmin() {
            return this.$store.getters.isAdmin
        }
    },
    methods: {
        onTermChange() {
            if(!(this.filter_by_price)) this.filter_by_price = 'asc'
            let url = baseURL + 'api/products?name='+this.name+'&filter_by_price='+this.filter_by_price;
            productServices.getAll(url).then(data => {
                this.products = (data.data);
            });
        },
        deleteProduct(id) {
            if(confirm("Do you really want to delete?")){
                let url = baseURL + "api/products/delete/"+id;
                productServices.deleteProduct(url).then(() => {
                    this.$router.push('/?product_delete=success');
                })
            }
        },
        orderProduct(id) {
            if(confirm("Do you really want to make this order?")){
                let url = baseURL + "api/products/order"+id;
                alert("Order placed successful"+ id);
                productServices.getAll(url).then(() => {

                })
                // let url = baseURL + "api/products/delete/"+id;
                // productServices.deleteProduct(url).then(() => {
                //     this.$router.push('/?product_delete=success');
                // })
            }
        },
        showModal(id, name) {
            this.productName = name,
            this.productId = id,
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    mounted() {
        let url = baseURL + "api/products"
        productServices.getAll(url).then(data => { 
            this.products = (data.data);
        })
    },
    data() {
        return {
            'products': [],
            'name': null,
            'filter_by_price': 'asc',
            'isModalVisible': false,
            'productName': "Default",
            'productId': 1
        }
    },
}
</script>

<style>
.product-list {
    text-align: left;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.product-image {
    width: 100px;
    image-rendering: auto;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    border: 1px solid bisque;
}

.product-list {
    padding: 20px;
    margin: 10px;
}
.filter-section {
    float: right;
    padding-bottom: 10px;
}

.search-section {
    float: left;
}

.text-center {
    text-align:center;
}

.delete-button {
    background: red;
    margin-left: 20px;
    border-radius: 1px;
    color: aliceblue;
    cursor: pointer;
}

.edit-button {
    color: #2c3e50;
    border-radius: 1px;
    background: cadetblue;
    cursor: pointer;
}

.edit-button:hover {
    background: cornsilk;
}

.delete-button:hover {
    color: #2c3e50;
    background-color: cornsilk;
}
.button {
  border: none;
  color: white;
  padding: 12px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.green-button {
      background-color: #4CAF50; /* Green */
}

.green-button:hover {
  background-color: rgb(147, 202, 43);
  color: black;
}
</style>