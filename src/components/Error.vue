<template>
    <p>
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="(value, key) in errors" :key="key">{{ value  }}</li>
        </ul>
    </p>

    <!-- <div v-for="(v, k) in errors" :key="k">
        <p v-for="error in v" :key="error" class="text-sm">
      {{ error }}
        </p>
    </div> -->
</template>

<script> 
export default {
    name: "Error",
    props: ['errors']
}
</script>

<style scoped>
p {
    color: red;
    width: 350px;
    margin-left: auto;
    margin-right: auto;
}
</style>