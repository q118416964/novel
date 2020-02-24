<template>
    <div>
        <div class="foot">
        <div class="top">
            <div class="left"><span>登录</span>&nbsp;|&nbsp;<span>注册</span></div>
        <div class="right">投诉建议</div>
        </div>
        <div class="mid">
            <input type="text" v-model="text">
            <div class="search"  :style="{backgroundImage: 'url(' + pics + ')' }" @click="insearch"></div>
        </div>
        <p class="bottom">©版权归纵横文学旗下纵横中文网所有</p>
    </div>
    </div>
</template>

<script>
import pics from '@/assets/img/pics.png'
export default {
    props: {

    },
    data() {
        return {
            pics,
            text:''
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        insearch() {
            this.$emit('outSearch',this.text)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.foot {

    padding:10px 5px;
    width: 100%;
    height: 130px;
    box-sizing: border-box;
    .top {
        height:30px;
        // background-color: pink;
        display:flex;
        justify-content: space-between;
        font-size:16px;
        line-height:30px;
        margin-bottom:10px;
    }
    .mid {
        width: 100%;
        height:30px;
        background-color:pink;
        display:flex;
        margin-bottom:15px;
        input {
            display:block;
            width:calc(100% - 32px);
        }
        .search{
            width: 30px;
            height: 30px;
            border-left: 1px solid #c0c0c0;
             background-color: #d8d6d7;
            // background-color: yellow;
            background-size: 125px;
            background-position: -25px -25px;
            // background-image: url('../assets/img/pics.png');
            background-repeat: no-repeat;
        }
        
    }
    .bottom{
            text-align: left;
            font-size:12px;
            color:#8f8f8f;
    }
}
</style>
