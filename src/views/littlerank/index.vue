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
    <div class="card" v-for="(item,index) in booklist" :key="index" @click="$router.push({
        path:'/novel/novellist/novelinfo',query:{
          id:item._id
        }
      })">
      <img :src="item.fullurl" alt v-lazy="item.fullurl"/>
      <div class="right">
        <div class="title"><span>{{item.title}}</span><span :class="[index == 0?'red':'',index == 1?'orange':'',index == 2?'blue':'','span']">{{index+1}}</span></div>
        <div class="author"><span>作者:{{item.author}}</span><span>{{item.minorCate}}</span></div>
        <div class="latelyFollower">关注:{{item.latelyFollower}}</div>
        <div class="shortIntro">
          <span class="span">简介:</span>
          {{item.shortIntro}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goback from "@/components/goback";
import api from "@/api/request";
import url from "@/utils/utils";
export default {
  props: {},
  data() {
    return {
      name: "",
      label: [],
      label1: ["总榜", "月榜", "周榜"],
      text1: "总榜",
      booklist: [],
      url: "",
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
    console.log(this.$route.query)
    this.url = url.staticPath;
    this.getlist();
  },
  mounted() {},
  watch: {},
  methods: {
    back() {
      this.$router.go(-1);
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
    getlist() {
        var randId = ''
        var obj = {}
        if(this.text1 == '总榜') {
            randId = this.$route.query.totalRank
        }else if(this.text1 == '月榜') {
            randId = this.$route.query.monthRank
        }else {
            randId = this.$route.query._id
        }
        api.getranklist(obj,randId).then(res=>{
            console.log(res.data.ranking.books)
            var list = res.data.ranking.books
            for(var obj in list) {
                
                list[obj].fullurl = this.url + list[obj].cover
                console.log(list[obj])
            }
            this.booklist = list
        })
    }
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
      display:flex;
      justify-content: space-between;
      .span {
          display:block;
          width: 20px;height: 20px;
          background-color: #fff;
          line-height:20px;
          color:#ccc;
          text-align: center;
          margin-right:5px;
      }
      .red {
          background:#ed5565;color:#fff
      }
      .orange {
          background:#e28d29;color:#fff
      }
      .blue {
          background:#9fc575;color:#fff
      }
    }
    .author,
    .span,.latelyFollower {
      font-size: 13px;
      color: #8f8f8f;
    }
    .author {
        display:flex;
        justify-content: space-between;
        span {
            margin-right:5px;
        }
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

</style>
