 //先引入mongoose模块 这个模块是为了方便我们对于mongodb进行操作的一个类库
 let mongoose = require("mongoose");
 const config = require('./config')
 const { host,port,dbname } = config;

 //连接数据库服务器
 // mongodb:// 协议头
 // 127.0.0.1 mongodb服务器的地址
 // 27017 mongodb的端口
 // bus 数据库名称

 mongoose.connect(`mongodb://${host}:${port}/${dbname}`, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
 }, function (error) {
     if (error) {
         console.log("数据库连接失败")
     } else {
         console.log("数据库连接成功")
     }
 })
 
 //导出
 module.exports = mongoose;