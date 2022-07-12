const express = require('express');
const config = require('./config')
const app = express();
const Model = require('./model/index');

// 解析body传参
app.use(express.json());
app.use(express.urlencoded({extended:false}))


// 导入各个控制器

const RoomRouter = require('./routers/Room')
const AdminRouter = require('./routers/Admin')
const BuildRouter = require('./routers/Build')
const RtRouter = require('./routers/Roomtype')

// 通过一个全局中间件 把model全部挂载到 req上面
app.use((req,res,next)=>{
    req.Model = Model;
    next();
})

// 跨域 cors
const cors = require('cors')
app.use(cors()); // 解除cors跨域限制
const mongoose = require('./db')  // 把刚才配置的mongoose链接导入


app.use('/room',RoomRouter);
app.use('/admin',AdminRouter);
app.use('/build',BuildRouter);
app.use('/roomtype',RtRouter);


app.listen(config.appPort,()=>{
    console.log('srv is running at port '+ config.appPort)
})