// 转换 星级评价 数组
function convertToStarsArray(stars){
  var arr = [];
  var num = stars.toString().substring(0,1);
  for(let i=0;i<5;i++){
    if(i<num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr
}
// 转换 主演姓名 字符串
function convertToCastsStr(casts){
  let castsStr = "";
  casts.map(function (item) {
    castsStr += item.name + "/";
  });
  castsStr = castsStr.slice(0, castsStr.length - 1);
  return castsStr
}
// 转换 主演照片 数组
function convertToCastsArr(casts) {
  let castsArr = [];
  casts.map(function (item) {
    castsArr.push({
      id: item.id,
      name: item.name,
      avatar: item.avatars.large
    });
  });
  return castsArr
}
// 格式化数据
function normalize(data){
  var movie = [];
  var self = this;
  data.map(function (item, index) {
    movie.push({
      movieId: item.id,
      title: item.title,
      average: item.rating.average,
      stars: self.convertToStarsArray(item.rating.stars),
      images: item.images.large
    })
  });
  return movie
}
// 请求数据
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
module.exports={
  convertToCastsArr: convertToCastsArr,
  convertToCastsStr: convertToCastsStr,
  convertToStarsArray: convertToStarsArray,
  normalize: normalize,
  http: http
}