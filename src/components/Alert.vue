<template>
    <div>
        <div v-show="!success" class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
            <strong>UPS!</strong> {{message}} .
        </div>
        <div v-show="success" class="alert success">
            <span class="closebtn"  onclick="this.parentElement.style.display='none';">&times;</span>  
            <strong>Success!</strong> {{message}}
        </div>
        <br>
    </div>
</template>

<script> 
export default {
    name: 'Alert',
    props: ['success', 'message']
}
</script>

<style scoped>
.alert {
    padding: 20px;
    background-color: #f44336;
    color: white;
    /* width: 400px; */
    margin-left: auto;
    margin-right: auto;
}

.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

.closebtn:hover {
    color: black;
}
.alert.success {background-color: #04AA6D;}

</style>