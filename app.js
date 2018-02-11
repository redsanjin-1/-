App({
    globalData:{
        g_isPlayingMusic:false,
        g_currentMusicPostId:null,
        // doubanBase: "https://api.douban.com",
        doubanBase: "http://t.yushu.im",        
        baseUrl:"https://easy-mock.com/mock/5a7ad6ed5f3d592912db684f/douban"
    },
    onLaunch: function () {
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息");
            console.log(res.code)
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
})