var app = getApp();
import { Movie } from '../Class/Movie.js';
Page({
  data: { 

  },
  onLoad: function (options) {
    var id = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + id;
    var movie = new Movie(url);
    
    movie.requestData((movie) => {
      this.setData({
        movie: movie
      })
    })
    wx.setNavigationBarTitle({
      title: '电影详情'
    })
  },
  // 查看电影海报
  onMoviePostTap: function (event) {
    var url = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [url],
    })
  },
  // 查看主演图片
  onMovieCastsTap: function (event) {
    var url = event.target.dataset.src,
      urls = [];
    this.data.movie.castsArr.map(function (item) {
      urls.push(item.avatar)
    });
    wx.previewImage({
      current: url,
      urls: urls,
    })
  }
})