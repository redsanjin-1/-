var app = getApp();
var utils = require("../../utils/utils.js");
Page({
  data: {
    "in_theaters": {},
    "coming_soon": {},
    "top250": {}
  },
  onLoad: function () {
    let url0 = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    let url1 = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3";
    let url2 = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3";
    this.requestData(url0, "正在热映", "in_theaters");
    this.requestData(url1, "即将上映", "coming_soon");
    this.requestData(url2, "TOP250", "top250");
  }, 
  requestData: function (url, title, key) {
    var self = this;
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        // 正确实例
        var obj = {};
        obj[key] = {
          title: title,
          movies: utils._normalize(res.data.subjects)
        };
        self.setData(obj)
        // 错误实例
        // self.setData({
        //   key:{
        //     title: title,
        //     movies: utils._normalize(res.data.subjects)
        //   }
        // })
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  // 跳转更多电影
  viewMore: function (event) {
    wx.navigateTo({
      url: '/pages/movies/more-movie/more-movie?title=' + event.currentTarget.dataset.title,
    })
  }
})