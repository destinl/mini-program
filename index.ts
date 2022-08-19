// index.ts
// 获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','崂山区'],
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      hunidity:0,
      pressure:0,
      vis:0,
      windDir:'未知',
      windSpeed:0,
      windScale:0
    }
  },

  regionChange:function(e){
    this.setData({region:e.detail.value});
    this.getWeather();
  },


 getWeather:function(){
    var that = this;

    wx.request({
      url:'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:that.data.region[1],
        adm:that.data.region[1],
        key:'在此输入你的个人KEY（和风官网申请）'
      },
      success:function(res){
        console.log(res.data);
        that.getinfo(res.data.location[0].id);
      }
    })
  },

  getinfo:function(id){
    var that = this;

    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:id,
        key:'在此输入你的个人KEY（和风官网申请'
      },

      success:function(res){
        console.log(res.data);
        that.setData({now:res.data.now});
      },
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
  }

  
})