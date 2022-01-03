<template>
    <div>
        <Header />
        <div class="product-list">
        <h2>My Orders</h2>
        <div class="search-section">
            <b>Search by name: </b>
            <input @input="onTermChange" v-model="productName" name="name"/>
        </div>
        <table v-if="data.length">
        <tr>
            <!-- <th class="text-center">Image</th> -->
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
        </tr>
        <tr v-for="order in data" :key="order.id">
            <!-- <td><img class="product-image" :src=" baseURL+ product.image "></td> -->
            <td>{{ order.product.name }}</td>
            <td>{{ order.product.description }}</td>
            <td>{{ order.product.price}}</td>
            <td>{{ order.product.quantity}}</td>
            <td class="text-center" v-if="isAdmin"><button class="edit-button"><router-link :to="'/product/update/' + order.id">Edit</router-link></button>
            <button @click="deleteProduct(order.id)" class="delete-button">Delete</button>
            </td>
            <td v-else>
                <button @click="showModal(order.id, order.product.name)" class="button green-button">Order</button>
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
                <td colspan="6" class="text-center">No Orders Found</td>
            </tr>
        </table>
<!-- 
        <OrderModal :productName = productName :productId = productId
            v-show="isModalVisible"
            @close="closeModal"
        >

        </OrderModal> -->
    </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import { requestService } from '../api/client';

const baseURL = "http://localhost:8186/ecommerce/public/";

export default {
    name: "CustomerOrders",
    components: {
        Header
    },
    data() {
        return {
            "data": [],
            "productName": null
        }
    },
    mounted() {
        let url = baseURL + "api/customer-orders";
        requestService.getRequest(url).then(data => {
            console.log(data);
            this.data = data.data;
        })
        
    }
}
</script>