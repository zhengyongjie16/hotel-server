// 后台管理员
const mongoose = require('mongoose')


// 需要在使用mongoose.Schema 对于这个表的对应指定进行声明
const RoomTypeSchema = mongoose.Schema({
       name:String,
       price: Number,
       yaPrice:Number,
       shortName:String,
       liveLimit: Number,
       startLimit: Number,
       couponNum: Number,
       beds:Number,
       imgs: Array

});


// mongoose.model(对应的是我们的数据库中哪个表，表的描述)
const RoomType = mongoose.model('roomtype', RoomTypeSchema);


module.exports = RoomType;

