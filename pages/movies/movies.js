var app = getApp();
var utils = require("../../utils/utils.js");
Page({
  data: {
    "in_theaters": {},
    "coming_soon": {},
    "top250": {},
    "isSearching": false,
    "searchMovies": {},
    "searchValue":""
  },
  onLoad: function () {
    let url0 = app.globalData.doubanBase + "/v2/movie/in_theaters?start=0&count=3";
    let url1 = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3";
    let url2 = app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3";
    wx.setNavigationBarTitle({
      title: '豆瓣电影',
    });
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
        wx.hideNavigationBarLoading();
        // 正确实例
        var obj = {};
        obj[key] = {
          title: title,
          movies: utils.normalize(res.data.subjects)
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
  },
  // 搜索框 
  onInputFocus: function () {
    this.changeSerachStatus(1)
  },
  onInputBlur: function (event) {
    if (event.detail.value === "") {
      this.changeSerachStatus(0)
    }
  },
  onInputConfirm: function (event) {
    let str = event.detail.value;
    let url = app.globalData.doubanBase + "/v2/movie/search?q=" + str;
    if (str === "") {
      this.changeSerachStatus(0)
    } else if (str === this.data.searchValue){
      // nothing to do
    } else {
      wx.showNavigationBarLoading();
      this.requestData(url, "搜索", "searchMovies");
      this.setData({
        searchValue: str
      });
      this.changeSerachStatus(1);
      wx.setNavigationBarTitle({
        title: str,
      })
    }
  },
  changeSerachStatus: function (type) {
    this.setData({
      isSearching: type
    })
  },
  onCloseSearch:function(){
    this.setData({
      "searchValue":"",
      "isSearching": 0,
      "searchMovies":{}
    })
    wx.setNavigationBarTitle({
      title: '豆瓣电影',
    })
  },
  // 文章详情页
  onMovieTap:function(event){
    var id = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: "/pages/movies/movie-detail/movie-detail?id="+id,
    })
  }
})