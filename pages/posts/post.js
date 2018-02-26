var postData = require("../../data/posts-data.js");
Page({ 
  data: {
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '文章'
    })
  },
  onReady:function(){
    var swiperList = [];
    postData.postList.forEach(function (item) {
      swiperList.push({
        postId: item.postId,
        imgSrc: item.imgSrc
      });
    });
    this.setData({
      swiperList: swiperList,
      postList: postData.postList
    })
  },
  goDetail:function(event){
    const postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?postId='+postId
    })
  }
})