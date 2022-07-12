// 后台管理员
const mongoose = require('mongoose')


// 需要在使用mongoose.Schema 对于这个表的对应指定进行声明
var orderSchema = mongoose.Schema({
      type: String , // 房间类型
      price: Number, // 价格
      bookStartTime:Date , // 预定时间 的起点时间
      bookEndTime:Date, // 预定时间 的结束时间
      orderTime: Date, //下单时间
      payTime: Date, // 支付时间
      checkIn: Date,// 入住时间
      checkOut: Date, // 退房时间
      userid: String , //客户id
      checkInInfo:Array, // 入住人信息
      orderList: Array, // 其他消费
      roomid: String, // 入住的房间id
});


// mongoose.model(对应的是我们的数据库中哪个表，表的描述)
var Order = mongoose.model('order', orderSchema);


module.exports = Order;

