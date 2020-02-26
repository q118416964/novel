<template>
  <div class="page">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img
          src="https://static.zongheng.com/upload/recommend/3d/47/3d47f40e861241419d335e4c40501f63.jpeg"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://static.zongheng.com/upload/recommend/7a/3a/7a3a41b6c780ac1cd5e92844cc759efb.jpeg"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://static.zongheng.com/upload/recommend/e4/3b/e43b35949478d2c33d5760c5f4423149.jpeg"
          alt
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://static.zongheng.com/upload/recommend/62/06/620699fd69a72b55c1b760e5def89db5.jpeg"
          alt
        />
      </van-swipe-item>
    </van-swipe>
    <div class="commend">
      <div class="top">
        <div class="icon"></div>
        <div class="text">编辑立荐</div>
      </div>
      <div class="card" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:'5e0afb029a683760da004f62'
        }
      })">
        <img
          src="https://static.zongheng.com/upload/s_image/cover/9b/c2/9bc2bf236d451522bb5d802cc559c45f.jpeg"
          alt
          class="img1"
        />
        <div class="right">
          <div class="title">仗剑问仙</div>
          <div class="title1">破落巷里的孤儿，追寻身世之谜，却发现真相直指那位至高的存在</div>
          <div class="bottom">
            <div class="img1"></div>
            <div class="text1">傲娇的白猫</div>
            <span class="tag2">连载</span>
            <span class="tag1">古典仙侠</span>
          </div>
        </div>
      </div>
      <div class="card" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:'5260997b0a7b37274b0139c3'
        }
      })">
        <img
          src="https://static.zongheng.com/upload/s_image/cover/2015/11/1447743071882.jpg"
          alt
          class="img1"
        />
        <div class="right">
          <div class="title">大刁民</div>
          <div class="title1">困于昆仑山二十年的刁民持才入仕，踏上非比寻常的仕途，步步高升。</div>
          <div class="bottom">
            <div class="img1"></div>
            <div class="text1">仲星羽</div>
            <span class="tag2">连载</span>
            <span class="tag1">都市生活</span>
          </div>
        </div>
      </div>
      <div class="card" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:'5d0995cd035a4416961038cd'
        }
      })">
        <img
          src="https://static.zongheng.com/upload/s_image/cover/9f/76/9f76f8b48f6ee91f57aad0a24241101d.jpeg"
          alt
          class="img1"
        />
        <div class="right">
          <div class="title">大明正统</div>
          <div class="title1">少年因缘际会踏入朝堂，看他诛除叛逆，扫荡蛮荒，登顶权势巅峰。</div>
          <div class="bottom">
            <div class="img1"></div>
            <div class="text1">露尘</div>
            <span class="tag2">连载</span>
            <span class="tag1">架空历史</span>
          </div>
        </div>
      </div>
    </div>
    <img
      src="https://static.zongheng.com/upload/recommend/current/2020/1581862433081.jpg"
      alt
      class="imgBanner"
    />
    <div class="commend commend2">
      <div class="top">
        <div class="icon"></div>
        <div class="text">男生必看</div>
        <div class="block1">
          <div class="item" v-for="item in male" :key="item.fullurl"  @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
            <img :src="item.fullurl" alt v-lazy="item.fullurl" />
            <div class="text">{{item.title}}</div>
          </div>
          <div class="item1"></div>
        </div>
      </div>
    </div>
    <div class="commend commend2 commend3">
      <div class="top">
        <div class="icon"></div>
        <div class="text">女生爱看</div>
        <div class="block1">
          <div class="item" v-for="item in female" :key="item.fullurl"  @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
            <img :src="item.fullurl" alt v-lazy="item.fullurl"/>
            <div class="text">{{item.title}}</div>
          </div>
           <div class="item1"></div>
        </div>
      </div>
    </div>
    <div class="commend commend4">
      <div class="top">
        <div class="icon"></div>
        <div class="text">热门作品</div>
      </div>
      <div class="card" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:'5de0caa9e512409b419e65fa'
        }
      })">
        <img
          src="http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F3392412%2F3392412_e9c017c2de2242c6ba636fd5248da7f5.jpg%2F"
          alt="5de0caa9e512409b419e65fa"
          class="img1"
        />
        <div class="right">
          <div class="title">全球巨尊</div>
          <div class="title1">人可负我，但因果不负！\r\n他是个底层的不能再底层的小人物...</div>
          <div class="bottom">
            <div class="img1"></div>
            <div class="text1">西街许少</div>
            <span class="tag2">连载</span>
            <span class="tag1">都市生活</span>
          </div>
        </div>
      </div>
      <div class="mid4" v-for="item in obj" :key="item._id" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
          <div class="text">{{item.label}}{{item.text}}</div>
            <div class="arr-right" :style="{backgroundImage: 'url(' + head + ')' }"></div>
      </div>
    </div>
    <foot @outSearch="buttonSearch"></foot>
  </div>
</template>

<script>
import head from '@/assets/img/head.png'
import foot from '@/components/foot.vue'
import request from "@/api/request";
import url from "@/utils/utils";
export default {
  props: {},
  data() {
    return {
      male: [],
      female: [],
      url: "",
      obj:[],
      head
    };
  },
  computed: {},
  created() {
    console.log(history,'hishsishishishishsihsihsihs')
    console.log(this.$store.state,'state')
     window.scroll(0, 0);
    this.getMaleSix();
    this.getFemaleSix();
    this.url = url.staticPath;
    this.obj = url.obj
    console.log(this.$store.state,'sssssssssssssstttttttt')
  },
  mounted() {},
  watch: {},
   updated() {
       window.scroll(0, 0);
  },
  methods: {
    getMaleSix() {
      request.getMaleSix().then(res => {
        console.log(res);
        this.male = res.data.books;
        console.log(this.male);
        this.male.forEach(res => {
          res.fullurl = this.url + res.cover;
          console.log(res);
        });
      });
    },
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
    getFemaleSix() {
      request.getFemaleSix().then(res => {
        console.log(res);
        this.female = res.data.books;
        console.log(this.female);
        this.female.forEach(res => {
          res.fullurl = this.url + res.cover;
          console.log(res);
        });
      });
    }
  },
  components: {
    foot
  }
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  background-color: #f2f2f2;
  padding-top: 85px;
}
.my-swipe {
  height: 146px;
  width: 100%;
  
}
.van-swipe-item {
  height: 146px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.commend {
  padding: 20px 18px 0 18px;
  height: 412px;
  background-color: #fff;
  margin-bottom: 10px;
  .top {
    height: 19px;
    // background-color: pink;
    .icon {
      background-color: #e95e56;
      width: 6px;
      height: 19px;
      display: inline-block;
      border-radius: 0.1rem;
      float: left;
    }
    .text {
      float: left;
      font-size: 18px;
      line-height: 20px;
      margin-left: 10px;
    }
  }
  .card {
    width: 100%;
    height: 90px;
    // background-color: pink;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    justify-content:start;
    .img1 {
      height: 100%;
      width: 68px;
      margin-right:8px;
    }
    .right {
      width: calc(100% - 80px);
      height: 100%;
      // background-color: pink;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      .title {
        font-size: 16px;
        color: #333;
      }
      .title1 {
        font-size: 12.5px;
        color: #888;
      }
      .bottom {
        width: 100%;
        height: 18px;
        // background-color: pink;
        .img1 {
          width: 18px;
          height: 18px;
          background-size: 250px;
          background-image: url(https://static.zongheng.com/h5/v2016/images/icon.png);
          background-repeat: no-repeat;
          background-position: -92px 0;
          margin-right: 4px;
          float: left;
        }
        .text1 {
          font-size: 12.5px;
          float: left;
          line-height: 18px;
        }
        .tag1 {
          float: right;
          margin: 0 3px;
          color: #fff;
          background-color: #d1acd8;
        }
        .tag2 {
          float: right;
          margin: 0 3px;
          color: #fff;
          background-color: #a1d0d2;
        }
      }
    }
  }
}
.imgBanner {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 10px;
}
.commend2 {
  height: 345px;
  .top {
    // background-color: pink;
    padding-bottom: 20px;
  }
  .block1 {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 85px;
      height: 140px;
      // background-color: pink;
      margin-bottom: 19px;
      img {
        width: 100%;
        height: auto;
      }
      .text {
        display: block;
        width: 100%;
        text-align: left;
        color: #555;
        font-size: 12.5px;
        margin-left: 0;
        padding-top: 5px;
      }
    }
    .item1 {
         width: 85px;
         height:0;
    }
  }
}
.commend3 {
  height: 365px;
  .item {
    margin-bottom: 24px;
  }
   .item1 {
         width: 85px;
         height:0;
    }
}
.commend4 {
    height:335px;
    .mid4 {
      border-top:1px solid #f2f2f2;
      width: 100%;
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    //   background-color: pink;
      .text{
          width: 316px;
overflow:hidden; //超出的文本隐藏
text-overflow:ellipsis; //溢出用省略号显示
white-space:nowrap; //溢出不换行
height:47px;
line-height:47px;
font-size:16px;
color:#333;
      }
      .arr-right{
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-size: 250px;
          background-position: -140px 0;
      }
    }
}
</style>


