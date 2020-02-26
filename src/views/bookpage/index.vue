<template>
    <div class="page">
        <div class="top">
      <goback :title="bookname" @goback="back1" @getmenu="getcata" v-if="show1"></goback>
    </div>

    <div class="mini"></div>
        <div class="title">
            {{title}}
        </div>
        <div class="fat">
             <p v-for='(item,index) in content' :key="index" class="content">
            {{item}}
        </p>
        <p class="content1 bottom" @click="change" v-if="flag">点击观看下一章节</p>
        <p class="content1 bottom" v-if="flag1">已加载到最新章节</p>
        </div>
            <van-popup
  v-model="show"
  position="left"
  :lock-scroll='locks'
  :style="{ width: '85%',height:'100%'}"
><div class="innerbox">
    <div class="top">
        <h3>{{bookname}}</h3>
        <h3>目录</h3>
    </div>
    <div class="content2">
     <div class="item" v-for="(item,index) in catelog" :key="index" :class="[index == numb?'act':'']" @click="changeto(item.url)">
            {{index}}.{{item.num}}
        </div>
</div>
</div>
</van-popup>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import goback from '@/components/gobackcata.vue'
import axios from 'axios'
export default {
    props: {

    },
    data() {
        return {
            content:[],
            title:'',
            catelog:[],
            name1:'',
            url:'',
            nexturl:'',
            numb:0,
            flag:false,
            flag1:false,
            nexttitle:'',
            nextcontent:[],
            show:false,
            bookname:'',
            locks:true,
            left1:100,
            cover:'',
            top:0,
            show1:false,
        };
    },
    computed: {

    },
    beforeRouteLeave:function(to, from, next) {
          var yesorno = JSON.parse(localStorage.getItem('bookshelf'))
          console.log(this.sct(),'toptotptpo')
          var top = this.sct()
            console.log('toptopttppto')
             if(yesorno) {
                 var flag = yesorno.some(ele=>ele.bookurl == this.name1)
                 if(flag) {
                    var obj = yesorno.find(ele=>ele.bookurl == this.name1)
                    obj.url = this.catelog[this.numb].url
                    obj.top = top
                    localStorage.setItem('bookshelf',JSON.stringify(yesorno))
                    next()
                }else {
                    Dialog.confirm({
                    title: '追书提示',
                    message: '是否将本书加入到我的书架'
                    }).then(() => {
                    // on confirm
                        var obj = {
                            name:this.bookname,
                            url:this.catelog[this.numb].url,
                            bookurl:this.name1,
                            cover:this.cover,
                            top:top
                        }
                        console.log(this.sct(),'toptotptpo')
                        var list = JSON.parse(localStorage.getItem('bookshelf'))
                        list.push(obj)
                        localStorage.setItem('bookshelf',JSON.stringify(list))
                        next()
                    }).catch(() => {
                    // on cancel
                    next()
                    });
                }
                }else {
                     Dialog.confirm({
                    title: '追书提示',
                    message: '是否将本书加入到我的书架'
                    }).then(() => {
                    // on confirm
                        var obj = {
                            name:this.bookname,
                            url:this.catelog[this.numb].url,
                            bookurl:this.name1,
                            cover:this.cover,
                            top:top
                        }
                        var item = []
                        item.push(obj)
                        console.log(this.sct(),'toptotptpo')
                        localStorage.setItem('bookshelf',JSON.stringify(item))
                        console.log(this.$store.state)
                         next()
                    }).catch(() => {
                    // on cancel
                    next()
                    });

                }       	
    },
    beforeDestroy(){
          
    },
    created() {
        this.url = this.$route.query.url
        this.name1 = this.$route.query.name
        
        this.init()

    },
    mounted() {
        
    },
    updated() {
    },
    watch: {
        
    },
    methods: {
        change(){
            this.title = this.nexttitle
            this.content = this.nextcontent
            this.numb = this.numb +1
            this.nextchange()
            this.top = 0
            this.$nextTick(()=>{
                 window.scroll(0, 0)
            })
        },
        back1() {
            this.$router.go(-1)
        },
        getcata() {
            this.show = true
            setTimeout(()=>{
                var act = document.querySelector('.act')
                console.log(act.offsetTop,)
                var content2 =  document.querySelector('.content2')
                console.log(content2.scrollHeight,content2.scrollTop)
                content2.scrollTop=act.offsetTop - 97
            })
        },
        changeto(val) {
            this.show= false
            this.url = val
            this.init()
        },
        test() {
              console.log(this.sct(),'toptotptpo')
        },
        init() {
            this.$toast({
                duration: 0, 
                type:'loading',
                message: '加载中...',
                forbidClick: true,
            });
            axios.get('http://api.pingcc.cn/?xsurl2='+this.url+'').then(res=>{
            this.title =res.data.num
            this.content = res.data.content
            
            this.flag = true
            this.show1 = true
            var yesorno = JSON.parse(localStorage.getItem('bookshelf'))
            if(yesorno) {
                var obj = yesorno.find(ele=>ele.url == this.url)
                console.log(obj,'bobbjbjbjjbjb')
                if(obj) {
                    console.log(this.url)
                    console.log(obj.top)
                    this.top = obj.top
                    this.$nextTick(()=>{
                        window.scroll(0, this.top)
                        this.top = 0
                    })
                }else {
                    this.top =0
                    this.$nextTick(()=>{
                        window.scroll(0, 0)
                    })
                }
                
            }else {
                this.top =0
                this.$nextTick(()=>{
                        window.scroll(0, 0)
                })
            }
            this.getnext()
            this.$toast.clear()
        })
        },
        sct() {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        },
        getnext() {
             axios.get('http://api.pingcc.cn/?xsurl1='+this.$route.query.name+'').then(res=>{
            this.catelog = res.data.list
            this.bookname = res.data.data.name
            this.cover = res.data.data.cover
            this.$store.commit('addread',res.data.list)
            this.numb = res.data.list.findIndex(item=>this.url == item.url)
            // console.log(this.numb,'numb')
            if(this.numb == res.data.list.length - 1) {
                this.flag1 = true
                this.flag = false
            }else {
                axios.get('http://api.pingcc.cn/?xsurl2='+this.catelog[this.numb+1].url+'').then(res=>{
                this.nexttitle =res.data.num
                this.nextcontent = res.data.content
                // console.log(this.nextcontent,'hhhh')
            })
            }
           })
      
        },
        nextchange() {
            axios.get('http://api.pingcc.cn/?xsurl2='+this.catelog[this.numb+1].url+'').then(res=>{
            this.nexttitle =res.data.num
            this.nextcontent = res.data.content
        })
        }
    },
    components: {
        goback
    },
};
</script>

<style scoped lang="scss">
.page {
    font-size:18px;
    background-color: #C4B395;
    height:100%;
}
.top {
  position: fixed;
  width: 100%;
}
.mini {
  width: 100%;
  padding-top: 44px;
}
.fat {
    background-color: #C4B395;
    overflow: hidden;
    }
.title {
    font-weight: bold;
    text-align: center;
    font-size: 1em;
    height:20px;
    line-height:20px;
    padding:20px 10px;
    text-align: left;
    color:rgba(0,0,0,.85);
}
.content {
    text-align: left;
    color:rgba(0,0,0,.85);
    text-indent: 2em;
    margin: .5em 0;
    letter-spacing: 0;
    line-height: 1.8;
    padding:0 5px;
    
}
.content1 {
    text-align: left;
    color:rgba(0,0,0,.85);
    text-indent: 2em;
    margin: .5em 0;
    letter-spacing: 0;
    line-height: 1.8;
    padding:0 5px;
}
.bottom {
    color: blue;
    text-align: center;
    text-indent: 0;

}
.fixed {
    width: 100%;
    height: 100%;
}
.innerbox {
    width: 100%;
    height: 100%;
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
    .content2 {
        width: 100%;
        height:100%;
        padding-top:102px;
        box-sizing: border-box;
        overflow:auto;
        //  position:relative;
        .item {
            height:40px;
            line-height:40px;
            text-align: left;
            padding-left:8px;
            border-bottom:1px dashed #dfdfdf;
            background-color: #fafafa;
            font-size:13px;
            
        }
        .act {
            top:0;
            color:#ff4644;
        }
    }

}
</style>
