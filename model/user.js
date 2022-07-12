// 后台管理员
const mongoose = require('mongoose')


// 需要在使用mongoose.Schema 对于这个表的对应指定进行声明
const UserSchema = mongoose.Schema({
       name:String,
       pwd: String,
       phone: String,
       openid: String,
});


// mongoose.model(对应的是我们的数据库中哪个表，表的描述)
const User = mongoose.model('user', UserSchema);


module.exports = User;

