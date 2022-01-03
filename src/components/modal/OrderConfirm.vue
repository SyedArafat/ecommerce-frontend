<template>
    <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
        <span @click="close" class="close">&times;</span>
        <h2>Order Confirm</h2>
        </div>
        <div class="modal-body">
            <input type="hidden" name="product_id"/>
            <p>Product Name : <b>{{ productName }}</b></p>
            <p>Quantity     : <input v-model="quantity" name="quantity" type="number" /></p>
        </div>
        <div class="modal-footer">
            <button @click="submit" class="button blackish-button">Confirm</button>
        </div>
    </div>

    </div>
</template>

<script> 
import axios from 'axios';

export default {
    name: 'OrderModal',
    methods: {
        close() {
            this.$emit('close');
        },
        submit(e) {
            this.errors = [];
            if (!this.quantity) {
                this.errors.push("Quantity is required.");
            }
            if (!this.errors.length) {
                this.addOrder();
                return true;
            }
            e.preventDefault();
        },
        resetAllFields() {
            this.product_id = null,
            this.quantity = null
            
        },
        addOrder() {
            let formData = new FormData();
            formData.append('product_id', this.product_id);
            formData.append('quantity', this.quantity);
            let token = localStorage.getItem('token');
            axios.post("http://localhost:8186/ecommerce/public/api/products/order", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer `+ token,
                }

            }).then((result) => {
                if(result.status === 201) {
                    this.resetAllFields();
                    this.$emit('close');
                    alert("Order created successfully");
                }
            }).catch(() => {
                alert("Something went wrong");
            });
        }
    },
    data() {
        return {
            "product_id": this.productId,
            "quantity": null
        }
    },
    props: ['productName', 'productId']
};

</script>

<style>
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #1b334a;
  color: white;
}

.modal-body {padding: 2px 16px;}

.modal-footer {
    text-align: right;
    padding: 2px 16px;
    background-color: #265886;
    color: white;
}

input[type=number] {
  width: 30%;
  padding: 10px 16px;
  margin: 8px 0;
  box-sizing: border-box;
}

.blackish-button {
      background-color: #3a4a09; /* Green */
}
</style>