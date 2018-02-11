var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  data: {

  },
  onLoad: function (options) {
    var id = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + id;
    this.requestData(url);
  },
  requestData: function (url) {
    let self = this;
    wx.request({
      url: url,
      success: function (res) {
        self._normalize(res.data)
      }
    })
  },
  _normalize: function (data) {
    var title = data.title,
      country = data.countries.join(','),
      year = data.year,
      ratings_count = data.ratings_count || data.wish_count,
      comments_count = data.comments_count,
      image_post = data.images.large,
      originalTitle = data.original_title,
      stars = {
        stars: utils.convertToStarsArray(data.rating.stars),
        average: data.rating.average
      },
      directors = data.directors,
      casts = "",
      castsArr = [],
      genres = data.genres.join('、'),
      summary = data.summary || '空';
    data.casts.map(function (item) {
      castsArr.push({
        id: item.id,
        name: item.name,
        avatar: item.avatars.large
      });
      casts += item.name + "/";
    });
    casts = casts.slice(0, casts.length - 1);
    this.setData({
      title: title,
      country: country,
      year: year,
      ratings_count: ratings_count,
      comments_count: comments_count,
      image_post: image_post,
      originalTitle: originalTitle,
      stars: stars,
      directors: directors,
      casts: casts,
      castsArr: castsArr,
      genres: genres,
      summary: summary
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
    this.data.castsArr.map(function (item) {
      urls.push(item.avatar)
    });
    wx.previewImage({
      current: url,
      urls: urls,
    })
  }
})