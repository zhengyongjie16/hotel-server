// 后台管理员
const mongoose = require('mongoose')


// 需要在使用mongoose.Schema 对于这个表的对应指定进行声明
const RoomSchema = mongoose.Schema({
       floor: String,
       type: String,            // 关联房型表
       roomName: String,
       buildId: String ,        // 关联楼栋表
       phone4in: String,        // 内线电话号码
       phone4out: String,       // 外线电话号码
       imgs: Array,
       direction:String ,   //1东2西3南4北
       isClose2Road: Boolean,   // 是否靠近马路
       hasWindow: Boolean,      // 是否有窗
       isSmoke: Boolean,        // 是否允许吸烟
       isNoise: Boolean,        // 是否是噪音房
       isHigh: Boolean,        // 是否是高温房   
       sthintheroom: Array,     // 房间内的资产        
});


// mongoose.model(对应的是我们的数据库中哪个表，表的描述)
const Room = mongoose.model('room', RoomSchema);


module.exports = Room;

