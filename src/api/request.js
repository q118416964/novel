import request from '@/api/http.js'
// import config from '@/api/config'
// es6 常用的两种导出模块的方式  
//     >  export xxx     import {xx} from 'xx'
//     > export default xx    import xx from 'xx'
function getSort(data) {
  return request({
    url: '/cats/lv2/statistics',  // 相对路径
    method: 'get',
    data
  })
}

function getRank(data) {
    return request({
      url: '/ranking/gender',  // 相对路径
      method: 'get',
      data
    })
  }

  function getMaleSix(data) {
    return request({
      url: '/book/by-categories?gender=male&type=hot&major=玄幻&minor=&start=0&limit=3',  // 相对路径
      method: 'get',
      data
    })
  }

  function getFemaleSix(data) {
    return request({
      url: '/book/by-categories?gender=female&type=hot&major=青春校园&minor=&start=0&limit=6',  // 相对路径
      method: 'get',
      data
    })
  }

  function getlittle(data) {
    return request({
      url: '/cats/lv2',  // 相对路径
      method: 'get',
      data
    })
  }

  function getlist(data) {
    return request({
      url: '/book/by-categories',  // 相对路径
      method: 'get',
      data
    })
  }

  function getranklist(data,id) {
    return request({
      url: '/ranking/'+id+'',  // 相对路径
      method: 'get',
      data
    })
  }

  function getsearch(data) {
    return request({
      url: '/book/fuzzy-search',  // 相对路径
      method: 'get',
      data
    })
  }

  function getbook(data,id) {
    return request({
      url: '/book/'+id+'',  // 相对路径
      method: 'get',
      data
    })
  }

  function getbook2(data,name) {
    return request({
      url: '/?xsname='+name+'',  // 相对路径
      method: 'get',
      data
    })
  }

export default {
    getSort,
    getRank,
    getMaleSix,
    getFemaleSix,
    getlittle,
    getlist,
    getranklist,
    getsearch,
    getbook,
    getbook2
    
}
