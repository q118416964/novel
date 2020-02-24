<template>
    <div class="page">
        <h3>男生</h3>
        <ul>
            <li v-for="item in male1" :key="item._id" @click="more(item)">
                <img :src='item.fullurl' alt="" v-lazy="item.fullurl">
                <span>{{item.title}}</span>
            </li>
        </ul>
        <h3>女生</h3>
        <ul>
            <li v-for="item in female1" :key="item._id" @click="more(item)">
                <img :src='item.fullurl' alt="" v-lazy="item.fullurl">
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import request from '@/api/request'
import utils from '@/utils/utils'
export default {
    props: {

    },
    data() {
        return {
            male1:[],
            male2:[],
            female1:[],
            female2:[],
            url:'',
            flag1:0,
            flag2:0
        };
    },
    computed: {

    },
    created() {
        this.getSort()
        console.log(utils.staticPath)
        this.url = utils.staticPath
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        getSort() {
           request.getRank().then(res=>{
               console.log(res.data)
               var data = res.data
               for(var obj in data) {
                   for(var i=0;i<data[obj].length;i++) {
                       
                       data[obj][i].fullurl = this.url + data[obj][i].cover
                   }
               }
               this.male1 = data.male.filter(ele => ele.collapse == false)
               this.male2 = data.male.filter(ele => ele.collapse == true)
                console.log(this.male1,this.male2)
                this.female1 = data.female.filter(ele => ele.collapse == false)
               this.female2 = data.female.filter(ele => ele.collapse == true)
                // console.log(this.female1,this.female2)
           })
        },
        more(val) {
            console.log(val)
            this.$router.push({
              path: `/rank/littlerank`,
              query:{name:val.title,
                     totalRank:val.totalRank,
                     monthRank:val.monthRank,
                     _id:val._id
                    },
           })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.page {
    position: relative;
    width: 100%;
    background-color: #f2f2f2;
    padding-top:85px;
}
h3,p {
    width:calc(100% - 30px);
    font-size:16px;
    margin:0 auto;
    text-align: left;
    height:50px;
    line-height:50px;
    border-bottom:1px solid #EBEEF5;
}
ul {
    width:calc(100% - 20px);
    margin:0 auto;
    li {
        width: 100%;
        height:55px;
        line-height:55px;
        border-bottom:1px solid #e9e9e9;
        font-size:16px;
        position: relative;
        img {
            position:absolute;
            width: 36px;
            height:36px;
            left:0;
            top:50%;
            transform: translateY(-50%);
        }
        span {
            display:block;
             position:absolute;
            height:100%;
             left:50px;
            top:50%;
            transform: translateY(-50%);
        }
    }
}
</style>



