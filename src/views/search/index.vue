<template>
  <div class="pageL">
    <div class="top">
      <goback :title="name" @goback="back"></goback>
    </div>

    <div class="mini"></div>
    <div class="searchtop">
      <div class="mid">
        <input type="text" v-model="text"/>
        <div class="search" @click="getlist(text)"></div>
      </div>
    </div>
    <div class="isshow" v-if="isshow == 1">
      <div class="history">
        <h3 class="h3">
          <div class="com">
            <span class="span1"></span>搜索历史
          </div>
          <div class="com" @click="deleteHistory">清除记录</div>
        </h3>
        <div class="historyitem"  v-if="flag1">
             <div class="item" v-for="(item,index) in history" :key="index" @click="getlist(item)">{{item}}</div>
        </div>
       <div class="item" v-else>
           无记录
       </div>
      </div>
      <div class="hot">
        <h3 class="h3">
          <div class="com">
            <span class="span1"></span>热搜作品
          </div>
        </h3>
        <div class="item" v-for="(item,index) in search" :key="index" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
          <div class="com">
            <div
              :class="[index == 0?'red':'',index == 1?'orange':'',index == 2?'blue':'','num']"
            >{{index+1}}</div>
            <div class="text">{{item.title}}</div>
          </div>
          <div class="com">
            <div class="num1" :style="{backgroundImage: 'url(' + pic + ')' }"></div>
            <div class="text">{{item.author}}</div>
          </div>
        </div>
      </div>
      <div class="label">
        <h3 class="h3">
          <div class="com">
            <span class="span1"></span>热搜标签
          </div>
        </h3>
        <div class="block">
          <div class="item" v-for="(item,index) in label" :key="index" @click="getlist(item)">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="bookslist" v-if="isshow == 2">
      <h3 class="h3">
        <div class="com">
          <span class="span1"></span>搜索结果
        </div>
      </h3>
      <div class="card" v-for="item in booklist" :key="item._id" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
        <img :src="item.fullurl" alt v-lazy="item.fullurl" />
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="author">作者:{{item.author}}</div>

          <div class="shortIntro">
            <span class="span">更新至:</span>
            {{item.lastChapter}}
          </div>
          <div class="shortIntro">
            <span class="span">简介:</span>
            {{item.shortIntro}}
          </div>
        </div>
      </div>
     
    </div>

    <div class="nothing" v-if="isshow == 3">
      <h3 class="h3">
        <div class="com">
          <span class="span1"></span>搜索结果
        </div>
      </h3>╮(╯_╰)╭ ~搜不到的说
    </div>

    <div class="foot1">
      <div class="top22">
        <div class="left">
          <span>登录</span>&nbsp;|&nbsp;
          <span>注册</span>
        </div>
        <div class="right">投诉建议</div>
      </div>
      <div class="mid">
        <input type="text" />
        <div class="search"></div>
      </div>
      <p class="bottom">©版权归纵横文学旗下纵横中文网所有</p>
    </div>
  </div>
</template>

<script>
import goback from "@/components/goback";
import api from "@/api/request";
import url from "@/utils/utils";
import pic from "@/assets/img/pics.png";
export default {
  props: {},
  data() {
    return {
      name: "",
      booklist: [],
      url: "",
      pic,
      label: [],
      search: [],
      isshow: 1,
      text: "",
      middle: "",
      history:[],
    };
  },
  computed: {
    flag() {
      if (this.label.length == 1 || this.label.length == 0) {
        return false;
      } else {
        return true;
      }
    },
     flag1() {
         if(this.history.length == 0) {
             return false
         }else {
             return true
         }
    },
  },
  created() {
    window.scroll(0, 0);
    this.name = "搜索";
    console.log(this.$route.query)
    if(this.$route.query.value) {
      console.log(this.$route.query.value)
      this.text = this.$route.query.value
      this.getlist(this.text)
    }else {
      console.log('没有')
    }
    this.url = url.staticPath;
    this.label = this.$store.state.label;
    this.search = this.$store.state.search;
    console.log(this.label, this.search);
    if(localStorage.getItem('token')) {
        this.history = JSON.parse(localStorage.getItem('token'))
        console.log(this.history)
    }else {
        localStorage.setItem('token',[])
    }
  },
  mounted() {},
  watch: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    add() {
      this.limit = this.limit + 10;
      this.getlist();
    },
    deleteHistory() {
        if(this.history.length == 0) {
            this.$toast({
          message: "无任何记录可删除"
        });
        }else {
            this.history = []
        localStorage.removeItem('token')
        }
    },
    getlist(val) {
      this.text = val
      if (val.length == 0) {
          
      } else if (val == this.middle) {
          this.$toast({
          message: "输入不能重复哟"
        });
      } else {
        var obj = {
          query: val
        };
        api.getsearch(obj).then(res => {
          console.log(res);
          this.booklist = res.data.books;
          for (var i = 0; i < this.booklist.length; i++) {
            this.booklist[i].fullurl = this.url + this.booklist[i].cover;
            console.log(this.booklist[i]);
          }
          if (res.data.total == 0) {
            this.isshow = 3;
          } else {
            this.isshow = 2;
            this.middle = val;
            console.log(this.middle);
             if( !this.history.includes( this.middle) ) {//includes 检测数组是否有某个值
                this.history.push(this.middle);
                console.log(this.history)
                localStorage.setItem('token',JSON.stringify(this.history))
              }
          }
        });
      }
    }
  },
  updated() {
       window.scroll(0, 0);
  },
  components: {
    goback
  }
};
</script>

<style scoped lang="scss">
.pageL {
  // padding-top:50px;
  position: relative;
  width: 100%;
}
.top {
  position: fixed;
  width: 100%;
}
.mini {
  width: 100%;
  // background-color: pink;
  // margin-top:50px;
  padding-top: 44px;
}
.nav {
  background-color: #fafafa;
}
.minitop {
  width: calc(100% - 20px);
  text-align: left;
  font-size: 13px;
  margin: 0px auto 0;
  border-bottom: 1px solid #dfdfdf;
  // background-color: pink;
  padding-top: 10px;
  span {
    display: inline-block;
    padding: 5px 10px;
    //
    border-radius: 5px;
    margin-right: 23px;
    //
    margin-bottom: 10px;
    background-color: #f2f2f2;
    color: #4c4c4c;
  }
  .act {
    background-color: #ff4544;
    color: white;
  }
}
.card {
  width: 100%;
  height: 128px;
  padding: 14px 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  justify-content: start;
  text-align: left;
  img {
    height: 100px;
    width: 75px;
    margin-right: 10px;
  }
  .right {
    width: calc(100% - 80px);
    height: 100%;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: #4c4c4c;
    }
    .author,
    .span,
    .latelyFollower {
      font-size: 13px;
      color: #8f8f8f;
    }
    .shortIntro {
      font-size: 13px;
      color: #4c4c4c;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
}
.add {
  width: calc(100% - 16px);
  border: 1px solid #dfdfdf;
  background: #fafafa;
  font-size: 13px;
  line-height: 36px;
  color: #4c4c4c;
  display: block;
  text-align: center;
  border-radius: 3px;
  margin: 8px auto 0;
}
.foot1 {
  padding: 10px 5px;
  width: 100%;
  height: 130px;
  box-sizing: border-box;
  .top22 {
    height: 30px;
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .mid {
    width: 100%;
    height: 30px;
    background-color: pink;
    display: flex;
    margin-bottom: 15px;
    input {
      display: block;
      width: calc(100% - 32px);
    }
    .search {
      width: 30px;
      height: 30px;
      border-left: 1px solid #c0c0c0;
      background-color: #d8d6d7;
      // background-color: yellow;
      background-size: 125px;
      background-position: -25px -25px;
      // background-image: url("../../assets/img/pics.png");
      background-repeat: no-repeat;
    }
  }
  .bottom {
    text-align: left;
    font-size: 12px;
    color: #8f8f8f;
  }
}
.searchtop {
  height: 85px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  .mid {
    width: 100%;
    height: 30px;
    background-color: pink;
    display: flex;
    input {
      display: block;
      width: calc(100% - 32px);
    }
    .search {
      width: 30px;
      height: 30px;
      border-left: 1px solid #c0c0c0;
      background-color: #d8d6d7;
      background-color: #ff4643;
      background-size: 125px;
      background-position: -25px -73px;
      background-image: url("../../assets/img/pics.png");
      background-repeat: no-repeat;
    }
  }
}
.history {
  // padding:0 8px;
  background-color: #fafafa;
  .h3 {
    display: flex;
    justify-content: space-between;
    color: #4c4c4c;
    font-size: 14px;
    height: 25px;
    padding: 7px 8px 7px;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin: 0 !important;
    font-weight: 550;
    //   background-color: pink;
    .com {
      display: flex;
      align-items: center;
    }
    .span1 {
      display: inline-block;
      height: 14px;
      width: 8px;
      background: #5e5e5e;
      border-radius: 2px;
      margin-right: 4px;
    }
  }
  .item {
    padding-left: 10px;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    color: #8a8a8a;
    line-height: 40px;
    text-align: left;
  }
}
.hot {
  .h3 {
    display: flex;
    justify-content: space-between;
    color: #4c4c4c;
    font-size: 14px;
    height: 25px;
    padding: 7px 8px 7px;
    line-height: 30px;
    display: flex;
    align-items: center;
    margin: 0 !important;
    background-color: #f2f2f2;
    border-bottom: 1px solid #dfdfdf;
    //   background-color: pink;
    font-weight: 550;
    .com {
      display: flex;
      align-items: center;
    }
    .span1 {
      display: inline-block;
      height: 14px;
      width: 8px;
      background: #5e5e5e;
      border-radius: 2px;
      margin-right: 4px;
    }
  }
  .item {
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    line-height: 40px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;

    .com {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .num {
        width: 18px;
        height: 18px;
        background-color: #8f8f8f;
        line-height: 18px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        margin-right: 4px;
      }
      .num1 {
        width: 18px;
        height: 18px;
        margin-right: 4px;
        background-size: 150px;
        background-repeat: no-repeat;
        background-position: -123px -246px;
      }
      .red {
        background: #ed5565;
        color: #fff;
      }
      .orange {
        background: #e28d29;
        color: #fff;
      }
      .blue {
        background: #9fc575;
        color: #fff;
      }
      .text {
        box-sizing: border-box;
        padding-top: 1px;
        height: 40px;
        color: #4c4c4c;
        line-height: 40px;
      }
    }
  }
}
.label {
  .h3 {
    display: flex;
    justify-content: space-between;
    color: #4c4c4c;
    font-size: 14px;
    height: 25px;
    padding: 7px 8px 7px;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin: 0 !important;
    background-color: #f2f2f2;
    border-bottom: 1px solid #dfdfdf;
    //   background-color: pink;
    font-weight: 550;
    .com {
      display: flex;
      align-items: center;
    }
    .span1 {
      display: inline-block;
      height: 14px;
      width: 8px;
      background: #5e5e5e;
      border-radius: 2px;
      margin-right: 4px;
    }
  }
  .block {
    height: 176px;

    padding: 15px 8px 0;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 22%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background: #f2f2f2;
      border: 1px solid #dfdfdf;
      border-radius: 3px;
      color: #4c4c4c;
    }
  }
}
.bookslist {
  .h3 {
    display: flex;
    justify-content: space-between;
    color: #4c4c4c;
    font-size: 14px;
    height: 25px;
    padding: 7px 8px 7px;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin: 0 !important;
    background-color: #f2f2f2;
    //   border-bottom: 1px solid #dfdfdf;
    //   background-color: pink;
    font-weight: 550;
    .com {
      display: flex;
      align-items: center;
    }
    .span1 {
      display: inline-block;
      height: 14px;
      width: 8px;
      background: #5e5e5e;
      border-radius: 2px;
      margin-right: 4px;
    }
  }
}
.nothing {
  height: 200px;
  border-bottom: 1px solid #dfdfdf;
  line-height: 120px;
  .h3 {
    display: flex;
    justify-content: space-between;
    color: #4c4c4c;
    font-size: 14px;
    height: 25px;
    padding: 7px 8px 7px;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin: 0 !important;
    background-color: #f2f2f2;
    //   border-bottom: 1px solid #dfdfdf;
    //   background-color: pink;
    font-weight: 550;
    .com {
      display: flex;
      align-items: center;
    }
    .span1 {
      display: inline-block;
      height: 14px;
      width: 8px;
      background: #5e5e5e;
      border-radius: 2px;
      margin-right: 4px;
    }
  }
}
</style>
