const express = require('express');
const  router = express.Router();

// 添加房间
router.post('/add' ,async (req,res)=>{
    const { Room }  = req.Model;
    let {
          floor,
          type,            // 关联房型表
          roomName,
          buildId ,        // 关联楼栋表
          phone4in='',        // 内线电话号码
          phone4out='',       // 外线电话号码
          imgs=[],
          direction ,   //东西南北
          isClose2Road,   // 是否靠近马路
          hasWindow,      // 是否有窗
          isSmoke,        // 是否允许吸烟
          isNoise,        // 是否是噪音房
          isHigh,        // 是否是高温房   
          sthintheroom=[],     // 房间内的资产  
      }  = req.body;
    
     // 数据过滤的操作 

     try {
        await Room.create({
          floor,
          type,          
          roomName,
          buildId ,       
          phone4in,     
          phone4out,     
          imgs,
          direction ,  
          isClose2Road,   
          hasWindow,     
          isSmoke,     
          isNoise,       
          isHigh,      
          sthintheroom,   
        })
        res.send({success:true,info:'添加成功'})


     } catch(e) {
      console.log('eeee',e)
        res.send({success:false,info:'添加失败'})
     }

        

})


router.post('/edit' ,async (req,res)=>{
  const { Room }  = req.Model;

     // 数据过滤的操作 
    const { roomid ,...updateData} = req.body;; 

   try {
      await Room.findByIdAndUpdate(roomid,updateData);
      res.send({success:true,info:'修改成功'})
   } catch(e) {
      res.send({success:false,info:'修改失败'})
   }

})


// 分页查询
router.post('/getAll', async (req,res)=>{

         const { Room} = req.Model;
         let { page=1,limit=30 ,buildId,type,roomName,floor} = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）


          // 初始化 查询条件      
         let where = {  }
  
          if(buildId)  where.buildId = buildId
          if(type)     where.type = type
          if(roomName) where.roomName = roomName 
          if(floor)    where.floor = floor
         
          
          try {

            let rooms = await Room.find(where,{},{skip,limit}) // 分页查询
            let count = await Room.count(where) // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:rooms,count});
            
          }catch(e){
        
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { Room} = req.Model;

  let { roomid } = req.body;

  if(!roomid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let room = await Room.findById(roomid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:room});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { Room} = req.Model;
  let { roomid } = req.body;

  if(!roomid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let room = await Room.findByIdAndRemove(roomid) // 分页查询
   
    res.send({success:true,info:'删除成功',data:room});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})





module.exports = router;