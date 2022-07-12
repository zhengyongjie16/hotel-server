const express = require('express');
const  router = express.Router();

// 添加订单
router.post('/add' ,async (req,res)=>{
    const { Order }  = req.Model;
    let {
        type , // 房间类型
        price, // 价格
        bookTime, // 预定时间 [预定的开始 Date, 离开的 Date]
        orderTime, //下单时间
        payTime, // 支付时间
        checkIn,// 入住时间
        checkOut, // 退房时间
        userid , //客户id
        checkInInfo, // 入住人信息
        orderList, // 其他消费
        roomid, // 入住的房间id 
      }  = req.body;
    
     // 数据过滤的操作 

     try {
        await Order.create({
          type , // 房间类型
          price, // 价格
          bookStartTime, // 预定时间 [预定的开始 Date, 离开的 Date]
          bookEndTime,
          orderTime, //下单时间
          payTime, // 支付时间
          checkIn,// 入住时间
          checkOut, // 退房时间
          userid , //客户id
          checkInInfo, // 入住人信息
          orderList, // 其他消费
          roomid, // 入住的房间id   
        })
        res.send({success:true,info:'添加成功'})


     } catch(e) {
        res.send({success:false,info:'添加失败'})
     }

        

})


router.post('/edit' ,async (req,res)=>{
  const { Order }  = req.Model;

     // 数据过滤的操作 
    const { orderid ,...updateData} = req.body;; 

   try {
      await Order.findByIdAndUpdate(orderid,updateData);
      res.send({success:true,info:'修改成功'})
   } catch(e) {
      res.send({success:false,info:'修改失败'})
   }

})



// 分页查询
router.post('/getAll', async (req,res)=>{

         const { Order,Room } = req.Model;
         let { page=1,limit=30 ,bookStartTime, bookEndTime ,checkInStartTime,checkInEndTime,roomName,userName,userPhone} = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）


          // 初始化 查询条件      
         let where = {  }

         // 针对有时间区段的
         // 如果有开始时间没有结束时间
         if(bookStartTime && !bookEndTime)  where.bookStartTime = {$gte:bookStartTime }
          // 如果有结束时间没有开始时间
         if(!bookStartTime && bookEndTime)  where.bookStartTime = {$lte:bookEndTime }
         // 如果有开始时间也有结束时间
         if(bookStartTime && bookEndTime)  where.bookStartTime = { $and: [
             {$gte:bookStartTime },
             {$lte:bookEndTime }
          ] }


          if(checkInStartTime && !checkInEndTime)  where.checkIn = {$gte:checkInStartTime }
          // 如果有结束时间没有开始时间
         if(!checkInStartTime && checkInEndTime)  where.checkIn = {$lte:checkInEndTime }
         // 如果有开始时间也有结束时间
         if(checkInStartTime && checkInEndTime)  where.checkIn = { $and: [
             {$gte:checkInStartTime },
             {$lte:checkInEndTime }
          ]}

          // todo
          let user = null;

          if(userName||userPhone) {
              // 如果有用户名 或者 手机号码传递的话 我们就需要先去查询是否有对应的用户
          }

          let roominfo = null
          if(roomName){
              roominfo = await Room.find({
                roomName,
              })
              where.roomid = { $in:roominfo.map(item=> item._id) }
          }

          
          try {

            let orders = await Order.find(where,{},{skip,limit}) // 分页查询
            let count = await Order.count(where) // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:orders,count});
            
          }catch(e){
        
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { Order} = req.Model;

  let { orderid } = req.body;

  if(!orderid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let order = await Order.findById(orderid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:order});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { Order} = req.Model;
  let { orderid } = req.body;

  if(!orderid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    await Order.findByIdAndRemove(orderid) 
   
    res.send({success:true,info:'删除成功'});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})


module.exports = router;