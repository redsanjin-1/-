var postsData = require("../../../data/posts-data.js");
Page({
  data: {
    iconCollection: "/images/icon/collection-anti.png"
  },
  onLoad: function (option) {
    const id = option.postId;
    const postData = postsData.postList[id];
    this.checkCollection(id);
    this.setData({
      postData: postData,
      id: id,
    })
  },
  // 收藏
  tapIconCollection: function () {
    const id = this.data.id;
    var self = this;
    wx.getStorage({
      key: 'postid-' + id,
      success: function (res) {
        if (res.data === true) {
          wx.setStorage({
            key: 'postid-' + id,
            data: false
          });
          self.postUncollect()
        } else {
          wx.setStorage({
            key: 'postid-' + id,
            data: true
          });
          self.postCollect()
        }
      }
    })
  },
  // 检查是否收藏
  checkCollection: function (id) {
    var self = this;
    wx.getStorage({
      key: 'postid-' + id,
      success: function (res) {
        if (res.data === true) {
          self.postCollect()
        }
      },
      fail: function () {
        wx.setStorage({
          key: 'postid-' + id,
          data: false
        })
      }
    })
  },
  postCollect: function () {
    this.setData({
      iconCollection: "/images/icon/collection.png"
    })
  },
  postUncollect: function () {
    this.setData({
      iconCollection: "/images/icon/collection-anti.png"
    })
  }
})