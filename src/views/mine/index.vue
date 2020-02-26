<template>
    <div class="page">
        <!-- <div class="header1">
            <span>未登录</span>
            <span class="span1" @click="$router.push('/mine/login')">登录</span>
        </div> -->
        <div class="recent">
                书架
        </div>
        <div class="bookstore" v-if="flag">
            还没有任何书籍...
        </div>
        <div class="star" v-else>
            <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:item.url,
                name:item.bookurl
            }
        })">
                <img :src="item.cover" alt="">
                <div>{{item.name}}</div>
            </div>
            <div class="item item1" ></div>
        </div>
         <foot @outSearch="buttonSearch"></foot>
    </div>
</template>

<script>
import foot from '@/components/foot.vue'
import img from '@/assets/img/0.png'
export default {
    props: {

    },
    data() {img
        return {
            img,
            flag:true,
            list:[],
        };
    },
    computed: {

    },
    created() {
        console.log(localStorage.getItem('bookshelf'))
        if(localStorage.getItem('bookshelf')) {
            this.flag = false
             this.list = JSON.parse(localStorage.getItem('bookshelf'))
        }else {
            this.flag = true
           
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
         buttonSearch(val) {
        if(!val) {
              this.$toast({
          message: "输入不能为空"
        });
        }else {
            this.$router.push({
          path:'/home/search',query:{
              value:val
          }
        })
        }
    },


    },
    components: {
        foot
    },
};
</script>

<style scoped lang="scss">
.page {
    background-color: #f2f2f2;
    padding-top:85px;
    width:100%;
    // height:100%;
    .header1 {
    width:100%;
    height:50px;
    background-color: #FAFAFA;
    box-sizing: border-box;
    padding:10px 12px;
    display:flex;
    justify-content: space-between;
    span {
        display:block;
        font-size:14px;
        line-height:30px;
        color:#4c4c4c;
    }
    .span1 {
        width: 55px;
        height: 30px;
        background-color: #ff4644;
        color:#fff;
    }
}
}
.recent {
    width: 100%;
    height: 33px;
    color: #ff4644;
    border-bottom: 3px solid #ff4644;
    font-size: 14px;
    line-height:33px;
}
.bookstore {
    width: 100%;
    height:200px;
    border-top:1px solid #dfdfdf;
    border-bottom:1px solid #dfdfdf;
    line-height:200px;
    color:#4c4c4c;
    font-size:14px;
}
.star {
    background-color: #fafafa;
    padding:18px 18px 0px;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
        width: 26%;
        height: 135px;
        margin-bottom:10px;
        img {
            width: 100%;
            height: 120px;
        }
    }
    .item1 {
        width: 26%;
        height:0;
    }
}
</style>
