<template>
  <div id="app">
    <div class="head" v-if="$route.meta.flag">
      <div class="head-logo" ></div>
      <div class="right">
          <div class="icon" @click="$router.push('/home/search')"></div>
          <div class="text">客户端</div>
      </div>
    </div>
    <div id="nav" v-if="$route.meta.flag">
      <router-link to="/home" class="item">首页</router-link>
      <router-link to="/sort" class="item">分类</router-link>
      <router-link to="/rank" class="item">排行</router-link>
      <router-link to="/mine" class="item">我的</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
     
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {},
  methods: {
  },
  components: {
    
  }
};
</script>

<style lang="scss">
html,body {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
.head{
  width: 100%;
  height: 45px;
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;
  top:0;
  left:0;
  z-index:9999999;
  .head-logo{
    float: left;
    background-size: 150px;
    height: 28px;
    width: 150px;
    margin: 8px 10px;
    background-image: url('../src/assets/img/pics.png');
    background-repeat: no-repeat;
  }
  .right {
    position:absolute;
    width: 83px;
    height:25px;
    // background-color: pink;
    top:50%;
    transform: translateY(-50%);
    right:10px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 25px;
      height: 25px;
      // background-color: pink;
       background-image: url('../src/assets/img/pics.png');
       background-repeat: no-repeat;
       background-position: -25px -25px;
       background-size: 125px;
    }
    .text {
      font-size:14px;
      color:#666;
      width: 54px;
      border-left:1px solid #d3d3d3;
      text-align: center;
      height:16px;
      line-height:16px;
    }
  }
}
#nav {
  width: 100%;
  height: 40px;
  background-color: #333;
  font-size:16px;
  position:fixed;
  top:45px;
  z-index: 99999;
  line-height:40px;
  display:flex;
  .item{
    display:block;
    width: 25%;
    color:#a1a1a1;
  }
  .router-link-active{
    background-color: #454545;
    color: #f2f2f2;
  }
}
</style>
