<template>
  <div class="pageL">
    <div class="top">
      <goback :title="name" @goback="back"></goback>
    </div>

    <div class="mini"></div>
    <div class="nav">
      <div class="minitop" v-if="flag">
        <span
          v-for="(item,index) in label"
          :key="index"
          @click="change(item)"
          :class="[item == text?'act':'']"
        >{{item}}</span>
      </div>
      <div class="minitop">
        <span
          v-for="(item,index) in label1"
          :key="index"
          @click="change1(item)"
          :class="[item == text1?'act':'']"
        >{{item}}</span>
      </div>
    </div>
    <div class="card" v-for="item in booklist" :key="item._id" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
      <img :src="item.fullurl" alt v-lazy="item.fullurl"/>
      <div class="right">
        <div class="title">{{item.title}}</div>
        <div class="author">作者:{{item.author}}</div>
        <div class="latelyFollower">关注:{{item.latelyFollower}}</div>
        <div class="shortIntro">
          <span class="span">更新至:</span>
          {{item.lastChapter}}
        </div>
      </div>
    </div>
    <div class="add" @click="add()">查看更多</div>
    <foot @outSearch="buttonSearch"></foot>
  </div>
</template>

<script>
import foot from '@/components/foot.vue'
import pics from '@/assets/img/pics.png'
import goback from "@/components/goback";
import api from "@/api/request";
import url from "@/utils/utils";
export default {
  props: {},
  data() {
    return {
      name: "",
      label: [],
      label1: ["热门", "新书", "完结"],
      gender: "",
      text: "全部",
      text1: "热门",
      start: 0,
      limit: 10,
      booklist: [],
      url: "",
      pics
    };
  },
  computed: {
    flag() {
      if (this.label.length == 1 || this.label.length == 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.name = this.$route.query.name;
    this.gender = this.$route.query.gender;
    this.url = url.staticPath;
    console.log(this.name, this.$route.query);
    this.getlittle();
    this.getlist();
  },
  mounted() {},
  watch: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    getlittle() {
      api.getlittle().then(res => {
        console.log(res);
        var lists = res.data[this.gender];
        console.log(lists);
        lists.find(i => {
          console.log(i.major);
          if (i.major == this.name) {
            console.log(i);
            this.label = i.mins;
            this.label.unshift("全部");
            console.log(this.label);
          }
        });
      });
    },
    change(val) {
      this.text = val;
      console.log(this.text);
      this.getlist();
    },
    change1(val) {
      this.text1 = val;
      console.log(this.text1);
      this.getlist();
    },
    add() {
        this.limit = this.limit + 10
         this.getlist();
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
    getlist() {
      var text3 = "";
      if (this.text == "全部") {
        text3 = "";
      } else {
        text3 = this.text;
      }
      var text4 = "";
      if (this.text1 == "热门") {
        text4 = "hot";
      } else if (this.text1 == "新书") {
        text4 = "new";
      } else if (this.text1 == "完结") {
        text4 = "over";
      }
      var obj = {
        gender: this.gender,
        type: text4,
        major: this.name,
        minor: text3,
        start: this.start,
        limit: this.limit
      };
      api.getlist(obj).then(res => {
        this.booklist = res.data.books;
        // console.log(this.booklist)
        this.booklist.forEach(res => {
          res.fullurl = this.url + res.cover;
          console.log(res);
        });
      });
    }
  },
  components: {
    goback,
    foot
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
    .span,.latelyFollower {
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
    width:calc(100% - 16px);
      border: 1px solid #dfdfdf;
  background: #fafafa;
  font-size: 13px;
  line-height: 36px;
  color: #4c4c4c;
  display: block;
  text-align: center;
  border-radius: 3px;
  margin:8px auto 0;
  
}
</style>
