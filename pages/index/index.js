Page({
  start:function(){
    // 不能使用 navigateTo , redirectTo
    wx.switchTab({
      url: '/pages/posts/post',
    })
  }
})