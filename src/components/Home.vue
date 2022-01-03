<template>
    <Header />
    <Alert class="home-alert" v-if="response_done" :success="success" :message="message"/>
    <ProductList />
</template>

<script> 
import Header from './Header';
import ProductList from './ProductList.vue'
import Alert from './Alert.vue'

export default {
    name: "Home",
    data() {
        return {
            'products': [],
            'response_done': false,
            'success': false,
            'message': '' 
        }
    },
    components: {
        Header,
        ProductList,
        Alert
    },
    mounted() {
        if(!this.$store.getters.isLoggedIn) {
            this.$router.push({name: 'Login'});
        }
        if (this.$route.query.product_update === 'success') {
            this.response_done = true;
            this.success = true;
            this.message = "Product updated!"
        }
        else if (this.$route.query.create === 'success') {
            this.response_done = true;
            this.success = true;
            this.message = "Product Created!"
        }
        else if (this.$route.query.product_delete === 'success') {
            this.response_done = true;
            this.success = true;
            this.message = "Product Deleted!"
        }
    }
}

</script>

<style>
.home-alert {
    padding: 10px;
    margin-top: 20px;
}
</style>