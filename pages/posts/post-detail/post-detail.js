var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data: {
    isCollected: false //是否收藏
  },
  onLoad: function (option) {
    let id = option.postId;
    let postData = postsData.postList[id];
    let isPlayingMusic = this.checkMusicPlaying();
    app.globalData.g_currentMusicPostId = id;

    this.musicEventBind();
    this.checkCollection(id);
    this.setData({
      postData: postData,
      id: id,
      isPlayingMusic: isPlayingMusic
    });
  },
  // 点击音乐播放事件
  onPlayMusic: function () {
    let isPlayingMusic = this.data.isPlayingMusic;
    let music = postsData.postList[this.data.id].music;
    if (isPlayingMusic === true) {
      wx.pauseBackgroundAudio()
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg,
        success: function (res) {
          console.log(res);
          console.log('playing music')
        },
        fail: function () {
          console.log('fail')
        }
      })
    }
    this.setData({
      isPlayingMusic: !isPlayingMusic
    })
    app.globalData.g_isPlayingMusic = !app.globalData.g_isPlayingMusic
  },
  // 监听原生播放器的事件
  musicEventBind:function(){
    let self = this;
    wx.onBackgroundAudioPlay(function(){
      self.setData({
        isPlayingMusic:true
      })
    });
    wx.onBackgroundAudioPause(function(){
      self.setData({
        isPlayingMusic:false
      })
    })
    wx.onBackgroundAudioStop(function(){
      self.setData({
        isPlayingMusic: false
      })
    })
  },
  // 检查是否正在播放 (全局变量)
  checkMusicPlaying:function(id){
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===id){
      return true
    }else{
      return false
    }
  },
  // 收藏事件
  tapIconCollection: function () {
    const id = this.data.id;
    var self = this;
    wx.getStorage({
      key: 'collectedPostList',
      success: function (res) {
        if (res.data[id] === true) {
          res.data[id] = false;
          wx.setStorage({
            key: 'collectedPostList',
            data: res.data
          });
          self.postUncollect()
        } else {
          res.data[id] = true;
          wx.setStorage({
            key: 'collectedPostList',
            data: res.data
          });
          self.postCollect()
        }
      }
    })
  },
  // 检查是否收藏 (缓存)
  checkCollection: function (id) {
    var self = this;
    wx.getStorage({
      key: 'collectedPostList',
      success: function (res) {
        if (res.data[id] === true) {
          self.setData({
            isCollected: true
          })
        } else if (res.data[id] === false) {
          self.setData({
            isCollected: false
          })
        } else {
          res.data[id] = false
        }
      },
      fail: function () {
        wx.setStorage({
          key: "collectedPostList",
          data: {}
        })
      }
    })
  },
  postCollect: function () {
    this.setData({
      isCollected: true
    });
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  postUncollect: function () {
    this.setData({
      isCollected: false
    });
    wx.showToast({
      title: '取消收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 分享事件
  postShare: function () {
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到微博",
        "分享到QQ",
      ],
      success: function (res) {
        console.log(res)
      }
    })
  }
})