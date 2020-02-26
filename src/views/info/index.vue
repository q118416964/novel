<template>
    <div>
        <div class="top">
      <goback :title="name" @goback="back"></goback>
    </div>
    <div class="mini"></div>
    <div class="card">
      <img :src="info.cover" alt v-lazy="info.cover"/>
      <div class="right">
        <div class="title">{{info.title}}</div>
        <div class="shortIntro">
          <span class="span">作者:</span>
          {{info.author}}
        </div>
        <div class="shortIntro">
          <span class="span">分类:</span>
          {{info.minorCate}}
        </div>
        <div class="shortIntro">
          <span class="span">字数:</span>
          {{info.wordCount}}
        </div>
       <div class="shortIntro">
          <span class="span">已有</span>
          {{info.totalFollower}}人次读过此书
        </div>
        
      </div>
    </div>
    <div class="infoblock">
            <div class="son" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:immediate.url,
                name:nexturl
            }
        })">立即阅读</div>
            <div class="son son1" @click="addbookshelf">{{before}}</div>
        </div>
    <div class="update" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:latest.url,
                name:nexturl
            }
        })">
        <div class="left"><span class="red">最新</span>{{latest.num}}</div>
    </div>
    <div class="prodect">
        <div class="top222">
            <div class="block"></div>
            <span>作品简介</span>
        </div>
        <div class="longIntro">
            {{info.longIntro}}
        </div>
        <div class="label">
            <div class="item" v-for="(item,index) in label" :key="index" @click="gosearch(item)">
                {{item}}
            </div>
        </div>
    </div>
    <div class="catelog">
        <div class="left">
            <div class="block"></div>
            <div class="text">作品目录</div>
        </div>
        <div class="right" @click="change">
            <div class="icon "  :style="{backgroundImage:'url('+pics+')'}"></div>
            <div class="text" v-if="flag == 0">正序</div>
            <div class="text" v-else>反序</div>
        </div>
    </div>
    <div class="catelogbottom1 catecom" v-if="flag == 0">
        <div class="paixu" v-for="(item,index) in firstlist" :key="index" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:item.url,
                name:nexturl
            }
        })">
           <span> {{item.num}}</span><div class="arr-right" :style="{backgroundImage:'url('+pics+')'}"></div>
        </div>
    </div>
    <div class="catelogbottom2 catecom" v-else >
        <div class="paixu" v-for="(item,index) in lastlist" :key="index" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:item.url,
                name:nexturl
            }
        })">
            <span> {{item.num}}</span><div class="arr-right" :style="{backgroundImage:'url('+pics+')'}"></div>
        </div>
    </div>
    <div class="gotocate" @click="show = true">
        进入目录查看更多
    </div>
     <foot @outSearch="buttonSearch"></foot>
        <van-popup
  v-model="show"
  position="left"
  :style="{ width: '85%',height:'100%'}"
><div class="innerbox">
    <div class="top">
        <h3>{{name}}</h3>
        <h3>目录</h3>
    </div>
    <div class="content">
        <div class="item" v-for="(item,index) in catelog" :key="index" @click="$router.push({
            path:'/novel/novellist/novelinfo/bookpage',query:{
                url:item.url,
                name:nexturl
            }
        })">
            {{index}}.{{item.num}}
        </div>
    </div>
    </div></van-popup>
    </div>
</template>

<script>

import goback from "@/components/goback";
import api from '@/api/request.js'
import baseurl from '@/utils/utils.js'
import axios from 'axios'
import pics from '@/assets/img/pics.png'
import foot from '@/components/foot.vue'

export default {
    props: {
       
    },
    data() {
        return {
             novelid:'',
             name:'',
             info:{},
             url:'',
             liuge:'',
             catelog:[],
             latest:{},
             label:[],
             firstlist:[],
             lastlist:[],
             flag:0,
             pics,
             nexturl:'',
             show:false,
             before:'',
             immediate:{}
        };
    },
    computed: {
        first() {
            return this.$store.getter.first
        },
        last() {
            return this.$store.getter.last
        },
        late() {
            return this.$store.getter.late
        },
    },
    created() {
        console.log(this.$route.query.id)
        this.url = baseurl.staticPath
        this.novelid = this.$route.query.id
        this.getbook()
    },
    destroyed(){
        //  this.$toast.clear()
    },
    beforeRouteLeave(to,from,next) {
        this.$toast.clear()
        next()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        back() {
      this.$router.go(-1);
    },
    change() {
        if(this.flag == 0) {
            this.flag = 1
        }else {
            this.flag = 0
        }
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
    gosearch(val) {
          this.$router.push({
          path:'/home/search',query:{
              value:val
          }
        })
    },
    addbookshelf() {
        if(this.before == '加入书架') {
            var obj = {
            name:this.info.title,
            url:this.catelog[0].url,
            bookurl: this.nexturl,
            cover:this.info.cover,
            top:0,
            }
            // console.log(obj,'oooobbbjj')
            // this.$store.commit('addbookshelf',obj)
            // var bookshelf = this.$store.state.bookshelf
            var list = JSON.parse(localStorage.getItem('bookshelf'))
            if(list) {
                list.push(obj)
                localStorage.setItem('bookshelf',JSON.stringify(list))
            }else {
                var item = []
                item.push(obj)
                 localStorage.setItem('bookshelf',JSON.stringify(item))
            }
            this.before = '移除书架'
        }else {
            var list = JSON.parse(localStorage.getItem('bookshelf'))
            var index1 = list.findIndex(ele=> ele.bookurl == this.nexturl)
            list.splice(index1,1)
            localStorage.setItem('bookshelf',JSON.stringify(list))
            this.before = '加入书架'
        }
        
    },
    getbook() {
        var obj = {}
        api.getbook(obj,this.novelid).then(res=>{
            this.$toast({
             duration: 0, 
            type:'loading',
            message: '加载中...',
            forbidClick: true,
            overlay:true
            });
            console.log(res.data.title)
            this.info = res.data
            var yesorno = JSON.parse(localStorage.getItem('bookshelf'))
            if(yesorno) {
                console.log(yesorno,'yesorno')
                var flag = yesorno.some(ele=>ele.name == this.info.title)
                if(flag) {
                    this.before = '移除书架'
                    console.log(this.info,'this.info')
                    var obj = yesorno.find(ele=>ele.name == this.info.title)
                    obj.cover = baseurl.staticPath + this.info.cover
                    console.log(obj.cover,'cover',this.info.cover)
                    localStorage.setItem('bookshelf',JSON.stringify(yesorno))
                    console.log('111')
                }else {
                    this.before = '加入书架'
                }
            }else {
                this.before = '加入书架'
            }

            this.label = this.info.tags
            this.name = this.info.title
            this.info.cover = this.url + this.info.cover
            if(this.$store.state.catelog.length != 0 && this.$store.state.name == this.name) {
                this.catelog = this.$store.state.catelog
                this.firstlist = this.$store.state.firstlist
                this.lastlist = this.$store.state.lastlist
                this.latest = this.$store.state.latest
                this.nexturl = this.$store.state.nexturl
                this.immediate = this.catelog[0]
                this.$toast.clear()
            }else {
                    axios.get('http://api.pingcc.cn/?xsname='+this.name+'').then(res=>{
            console.log(res.data.list,'2222')
            if(res.data.list) {
                var numberone = res.data.list.find(ele=> ele.name == this.name && ele.author == this.info.author)
                
            if(numberone) {
                this.$toast({
             duration: 0, 
            type:'loading',
            message: '正在获取最优小说源...',
            forbidClick: true,
            overlay:true
            });
                // console.log(numberone)
            this.liuge = numberone
            this.nexturl = this.liuge.url
            this.$store.commit('next',this.nexturl)
            console.log(this.liuge,'333',this.nexturl)
            axios.get('http://api.pingcc.cn/?xsurl1='+numberone.url+'').then(res=>{
                console.log(res.data.list)
                this.catelog = res.data.list
                console.log(this.catelog,'ccc')
                this.$store.commit('addCatelog',this.catelog)
                this.$store.commit('addName',this.name)
                console.log(this.$store.state,'state')
                this.firstlist = this.catelog.slice(0,5)
                this.immediate = this.catelog[0]
                console.log(this.immediate,'immediate')
                this.lastlist = this.catelog.slice(-5).reverse()
                this.latest = this.catelog[this.catelog.length-1]
                console.log(this.latest,this.firstlist,this.lastlist)
                this.$toast.clear()
            })
            }else {
                this.$toast({
                 duration: 2000, 
                type:'fail',
                message: '找不到阅读资源',
                forbidClick: true,
                overlay:true
            });
            this.$router.go(-1)
            }
            }else {
                 this.$toast({
                 duration: 2000, 
                type:'fail',
                message: '找不到阅读资源',
                forbidClick: true,
                overlay:true
            });
            this.$router.go(-1)
            } 
        })  
            }
              
        })
    }
    },
    components: {
        goback,
        foot,
    },
};
</script>

<style scoped lang="scss">
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
.infoblock {
    display:flex;
    justify-content: space-between;
    padding:0 8px;
    .son {
        width: 168px;
        height:38px;
        background-color: #b33836;
        line-height:36px;
        font-size: 16px;
        color:#fff;
    }
    .son1 {
        box-sizing: border-box;
        color:#b33836;
         background-color: #fff;
         border: 1px solid #b33836;
    }
}
.update {
    display:flex;
    justify-content: space-between;
    padding:0 8px;
    height:35px;
    line-height:35px;
    marign:5px 0;
    font-size:14px;
    
overflow:hidden; //超出的文本隐藏
text-overflow:ellipsis; //溢出用省略号显示
white-space:nowrap; //溢出不换行

    .red {
        color:#b33836;
        border: 1px solid #b33836;
        margin-right:5px;

    }
}
.prodect {
    // width: 100%;
    padding:11px 8px;
    background-color:#fafafa;
    .top222 {
        display:flex;
        justify-content: flex-start;
        font-size:14px;
        color:#4c4c4c;
        line-height:16px;
        height:16px;
        .block {
            width: 8px;
            height: 14px;
            margin-right:5px;
            background-color: #5e5e5e;
            border-radius: 2px;
        }
        
    }
    .longIntro {
            text-align: left;
            margin-top:10px;
            margin-bottom:10px;
                color: #5e5e5e;
    font-size: 13px;
    line-height: 20px;
        }
    .label {
        display:flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        font-size:12px;
        .item {
            padding:0 10px;
            height: 22px;
            background: #f2f2f2;
            margin-right:5px;
            margin-bottom:5px;
            line-height:22px;
        }
    }
}
.catelog {
    padding:0px 8px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:14px;
    height:40px;
    .left {
        display:flex;
    justify-content: space-between;
    align-items: center;
    color:#4c4c4c;
        .block {
            width: 8px;
            height: 14px;
            margin-right:5px;
            background-color: #5e5e5e;
            border-radius: 2px;
        }
      
    }
    .right {
        display:flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 20px;
            height: 20px;
            // background-color: pink;
                background-size: 125px;
    background-position: -32px -153px;
    background-repeat: no-repeat;
        }
    }
}
.catecom {
    .paixu {
        padding:0 0 0 8px;
        height:40px;
        line-height:40px;
         background-color:#fafafa;
        font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
    color: #4c4c4c;
    display:flex;
    justify-content: space-between;
    align-items: center;
        .arr-right {
            width: 20px;
            height: 20px;
            // background-color:pink;
            margin-right:1px;
            background-size: 138px;
            background-position-x: right;
    background-position-y: -59px;
    background-repeat: no-repeat;
        }
    }

}
.gotocate {
    width:360px;
    height:38px;
    margin: 1px auto 5px;
    border: 1px solid #dfdfdf;
    background: #fafafa;
    font-size: 13px;
    line-height: 36px;
    color: #4c4c4c;
    display: block;
    text-align: center;
    border-radius: 3px;
}
.innerbox {
    width: 100%;
    height: 100%;
    // background-color: pink;
    position: relative;
    .top {
        width: 100%;
        height: 100px;
        background-color: #fafafa;
        display:flex;
        flex-direction: column;
        text-align: left;
        text-indent:8px;
        justify-content: space-between;
        font-size:14px;
        border-bottom:1px solid #dfdfdf;
    }
    .content {
        width: 100%;
        height:100%;
        padding-top:102px;
        box-sizing: border-box;
        // background-color: blue;
        overflow:auto;
        .item {
            height:40px;
            line-height:40px;
            text-align: left;
            padding-left:8px;
            border-bottom:1px dashed #dfdfdf;
            background-color: #fafafa;
            font-size:13px;
        }
    }
}

</style>
