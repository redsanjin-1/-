// pages/movies/more-movie/more-movie.js
var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:0,
    pageSize:20,
    hasMoreData:true,
    movies:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.url = app.globalData.doubanBase +this.chooseUrl(options.title);
    // 第一次请求数据
    this.requestData()
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.onUserPull(0)
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    this.onUserPull(1)
  },
  // 判断请求的 url
  chooseUrl:function(title){
    let url = "";    
    switch (title) {
      case "正在热映":
        url = "/v2/movie/in_theaters";        
        break;
      case "即将上映":
        url = "/v2/movie/coming_soon";        
        break;
      case "TOP250":
        url = "/v2/movie/top250";        
        break;
      default:
        url = "/v2/movie/in_theaters"        
    }
    // 设置标题
    wx.setNavigationBarTitle({
      title: title,
    });
    return url
  },
  // 请求数据 --- 参数 type
  // ( 请求类型 ：0——顶部下拉加载，数据添加再头部，1——底部上划加载，数据加载再尾部)
  requestData:function(type){
    var pageIndex = this.data.pageIndex;
    var pageSize = this.data.pageSize;
    var self = this;
    wx.request({
      url: self.data.url + "?start=" + pageIndex * pageSize + "&count=" + pageSize,
      method: "GET",
      success: function (res) {
        var data = utils._normalize(res.data.subjects);
        var movies;
        if(pageIndex===0){
          movies = data
        }else{
          if(type){
            movies = self.data.movies.concat(data)            
          }else{
            movies = data.concat(self.data.movies)                        
          }
        }
        if(data.length<pageSize){
          self.setData({
            hasMoreData:false
          })
        }
        self.setData({
          "movies": movies,
          "pageIndex": ++pageIndex
        });
        wx.hideNavigationBarLoading()
      }
    })
  },
  // 下拉加载 和 触底加载
  onUserPull:function(type){
    if (this.data.hasMoreData) {
      wx.showNavigationBarLoading();
      this.requestData(type)
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }
})