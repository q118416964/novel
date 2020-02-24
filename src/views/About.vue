<template>
    <div>
        <van-button type="default">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>

<script>
import axios from 'axios'
import request from '../api/request'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {
        this.getSort()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        getSort() {
           request.getRand().then(res=>{
               console.log(res)
           })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>

