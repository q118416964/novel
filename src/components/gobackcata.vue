<template>
    <div>
        <div class="goback">
            <div class="left" @click="goback">
                <div class="icon"  :style="{backgroundImage: 'url(' + pics + ')' }"></div>
                <div class="text">返回</div>
            </div>
            <div class="mid">
               {{title}}
            </div>
            <div class="right" @click="getmenu">
                 <div class="icon " :style="{backgroundImage: 'url(' + menu + ')' }"></div>
                 <div class="text">目录</div>
            </div>
        </div>
    </div>
</template>

<script>
import menu from '@/assets/img/rd_menu.png'
import pics from '@/assets/img/pics.png'
export default {
    props: {
        title: '',
    },
    data() {
        return {
            pics,
            menu
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
        goback() {
            this.$emit('goback')
        },
        getmenu() {
            this.$emit('getmenu')
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.goback {
    width: 100%;
    height: 44px;
    background-color: #333;
    color:#fff;
    display:flex;
    justify-content: space-between;
    .left{
        width: 60px;
        height: 100%;
        // background-color: pink;
        display:flex;
        justify-content: center;
        align-items: center;
        .icon {
            width: 20px;
            height: 25px;
            background-size: 125px;
            background-repeat: no-repeat;
            background-position: -100px -75px;
            margin-right:3px;
        }
        .text {
            height:25px;
            font-size:16px;
            line-height:25px;
        }
    }
    .mid {
        width: calc(100% - 120px);
        height:44px;
        font-size:18px;
        line-height:44px;
    }
    .right {
         width: 60px;
         height: 100%;
        //  background-color: pink;
          display:flex;
        justify-content: center;
        align-items: center;
        .icon {
            width: 20px;
            height: 25px;
            background-size: 15px;
            background-repeat: no-repeat;
            // background-position: -100px -100px;
            //  margin-right:3px;
            background-position: center;

           
        }
        .text {
            height:25px;
            font-size:16px;
            // padding-bottom:10px;
            line-height:25px;
            
        }
    }
}
</style>
