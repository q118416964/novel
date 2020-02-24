import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    label:['穿越','爽文','重生','热血','都市','暧昧','总裁','热血','搞笑','玄幻','升级','废柴'],
    search:[
      {
        title:'元尊',
        author:'天蚕土豆',
        _id:'59ba0dbb017336e411085a4e'
      },
      {
        title:'刀剑神皇',
        author:'乱世狂刀',
        _id:'518c6a9b1ddbe0e82e00002e'
      },
      {
        title:'观棋',
        author:'万古仙穹',
        _id:'552ce7b84a0b9d620ef590a9'
      },
      {
        title:'十国千娇',
        author:'西风紧',
        _id:'53ce038534c2ba3712201baa'
      },
      {
        title:'帝道至尊',
        author:'凌乱的小道',
        _id:'5090c76a133ae2e015000029'
      }
    ],
    history:[],
    bookshelf:[],
    catelog:[],
    name:'',
    firstlist:[],
    lastlist:[],
    latest:'',
    readcatelog:[],
    nexturl:[]
  },
  mutations: {
       addCatelog(state,val) {
        state.catelog = val
        state.firstlist = val.slice(0,5)
        state.lastlist = val.slice(-5).reverse()
        state.latest = val[val.length -1 ]
      },
      addName(state,val) {
        state.name = val
      },
      addread(state,val) {
        state.readcatelog = val
      },
      next(state,val) {
        state.nexturl = val
      },
      addbookshelf(state,val) {
        state.bookshelf.push(val)
      },
      delelabookshelf(state,val) {
          var index = state.bookshelf.findIndex(ele=>ele.bookurl = val)
          state.bookshelf.splice(index,1)
      }
  },
  actions: {
  },

  modules: {
  },
  getters: {
      
  }
})
