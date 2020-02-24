<template>
  <div class="page">
    <div class="sidebar">
      <div :class="[act == 1 ? 'act' : '']" @click="change1">男频</div>
      <div :class="[act == 2 ? 'act' : '']" @click="change2">女频</div>
      <div :class="[act == 3 ? 'act' : '']" @click="change3">出版</div>
    </div>
    <div class="sidebar2 wrapper" ref="wrapper" >
      <div class="content">
        <div class="box1 box" v-if="act ==1">
            <!-- <img :src="item" alt="" v-for="item in img1" :key="item"> -->
            <div class="book" v-for="(item,index) in male" :key="index" @click="$router.push({
          path: `/sort/littlesort`,query:{name:item.name,gender:'male'},
        })">
                <div class="top">{{item.name}}</div>
                <img :src="item.fullurl" alt="" v-lazy="item.fullurl">
            </div>
            <div class="book1"></div>
        </div>
        <div class="box2 box" v-if="act ==2">
            <div class="book" v-for="(item,index) in female" :key="index" @click="$router.push({
          path: `/sort/littlesort`,query:{name:item.name,gender:'female'},
        })">
                <div class="top">{{item.name}}</div>
                <img :src="item.fullurl" alt="" v-lazy="item.fullurl">
            </div>
            <div class="book1"></div>
        </div>
        <div class="box3 box" v-if="act ==3">
            <div class="book" v-for="(item,index) in press" :key="index" @click="$router.push({
          path: `/sort/littlesort`,query:{name:item.name,gender:'press'},
        })">
                <div class="top">{{item.name}}</div>
                <img :src="item.fullurl" alt="" v-lazy="item.fullurl">
            </div>
            <div class="book1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";
import utils from "@/utils/utils";
import BScroll from "better-scroll";
export default {
  props: {},
  data() {
    return {
      act: 1,
      male:[],
      female:[],
      press:[],
      url:''
    };
  },
  computed: {},
  created() {
    this.getSort();
    this.url = utils.staticPath
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
        
      });
     
    });
  },
  watch: {},
  methods: {
    getSort() {
      request.getSort().then(res => {
        var data = res.data
        for(var obj in data) {
            for(var i=0;i<data[obj].length;i++) {
                data[obj][i].fullurl = this.url + data[obj][i].bookCover[0]
            }
        }
        this.male = data.male
        this.female = data.female
        this.press = data.press
        console.log(this.press);
      });
    },
    change1() {
      this.act = 1;
    },
    change2() {
      this.act = 2;
    },
    change3() {
      this.act = 3;
    },
    onScroll(pos) {
      console.log(`Now position is x: ${pos.x}, y: ${pos.y}`)
    },
    onScroll1() {
      this.scroll.on('scroll', this.onScroll)
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
  height: 100%;
}
.sidebar {
  position: absolute;
  left: 0;
  top: 85px;
  width: 75px;
  height: calc(100% - 85px);
  background-color: #fff;
  font-weight: 420;
  div {
    width: 100%;
    height: 63px;
    background-color: #fff;
    border-bottom: 1px solid #f2f6fc;
    line-height: 63px;
    font-size: 18px;
    font-weight: 500;
  }
  .act {
    background-color: #f2f2f2;
  }
}
.sidebar2 {
  position: absolute;
  left: 90px;
  top: 85px;
  width: calc(100% - 105px);
 height: calc(100% - 85px);
//   background-color: #fff;
  overflow: hidden;
    .box {
        padding-top:15px;
        width: 100%;
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .book{
           width: 80px;
            height:110px;
            background-color: #F7F7F7;
            margin-bottom:15px;
            box-shadow: 2px 0px 2px #888888;
            overflow: hidden;
            .top {
                width: 100%;
                height:30px;
                background-color: #fff;
                line-height:30px;
                margin-bottom:5px;
            }
            img {
                height:70px;
                width: auto;
            }
        }
        .book1 {
            width: 80px;
            height: 0;
        }
    }
}

</style>



