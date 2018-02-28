# 微信小程序开发实例
***  

# 目录
* [预览](#预览)
* [项目简介](#项目简介)
* [功能介绍](#功能介绍)  

## 预览
**文章预览：**  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/1.gif)  

**电影预览：**  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/2.gif)

## 项目简介
项目介绍：入门编写一个微信小程序，使用 [豆瓣api](https://developers.douban.com/wiki/?title=api_v2) 获取 数据，由于接口调用次数有限,  
         可更换成 [http://t.yushu.im](http://t.yushu.im)、[https://douban.uieee.com](https://douban.uieee.com )，且用且珍惜  
主要功能：文章首页、文章详情、文章收藏、音乐播放、电影首页、电影详情  
工具：微信开发者工具 v1.02.1802021  

## 功能介绍
### 文章首页
文章首页由两部分组成：轮播图（ 使用小程序内置组件 [swiper](https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html)）、文章列表（ 由多个文章项目 post-item 组成 ）  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/article-index.jpg)
### 文章详情
文章详情由文章图片、作者、标题、收藏及分享按钮、正文组成  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/article-detail.jpg)
### 文章收藏
点击文章收藏按钮，使用 [wx.setStorage](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstorageobject) 将文章收藏在本地  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/article-collect.jpg)
### 音乐播放
点击文章banner的中心图片，使用 [wx.playBackgroundAudio](https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-background-audio.html#wxplaybackgroundaudioobject) 播放音乐  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/music-play.jpg)
### 电影首页
电影首页由四部分组成：搜索框、正在热映电影列表、即将上映电影列表、TOP250电影列表  

![](http://p4v5t5a1b.bkt.clouddn.com/wechat/movie-index.jpg)
### 电影详情
![](http://p4v5t5a1b.bkt.clouddn.com/wechat/movie-detail.jpg)

***
**:sunglasses: 以下是鄙人的微信，有兴趣加我一起交流学习前端的心得，**  
**:kissing_heart: 我可以提供 ES6、VUE、小程序、Nodejs 等珍藏的视频给你**  
**:eyes: 其他小程序知识学习请到[隔壁观望](https://github.com/justjavac/awesome-wechat-weapp)**  

![](http://p4v5t5a1b.bkt.clouddn.com/myWeChat.jpg)
