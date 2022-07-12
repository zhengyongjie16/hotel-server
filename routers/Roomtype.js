const express = require('express');
const  router = express.Router();

// 添加房间
router.post('/add' ,async (req,res)=>{
    const { RoomType }  = req.Model;
    let {
       name,
       price,
       yaPrice,
       shortName,
       liveLimit,
       startLimit,
       couponNum,
       beds,
       imgs
      }  = req.body;
    
     // 数据过滤的操作 

     try {
        await RoomType.create({
          name,
          price,
          yaPrice,
          shortName,
          liveLimit,
          startLimit,
          couponNum,
          beds ,
          imgs
        })
        res.send({success:true,info:'添加成功'})


     } catch(e) {
        res.send({success:false,info:'添加失败'})
     }

        

})


router.post('/edit' ,async (req,res)=>{
  const { RoomType }  = req.Model;

     // 数据过滤的操作 
    const { typeid ,...updateData} = req.body;; 

   try {
      await RoomType.findByIdAndUpdate(typeid,updateData);
      res.send({success:true,info:'修改成功'})
   } catch(e) {
      res.send({success:false,info:'修改失败'})
   }

})


// 分页查询
router.post('/getAll', async (req,res)=>{

         const { RoomType} = req.Model;
         let { page=1,limit=30 ,name,price} = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）


          // 初始化 查询条件      
         let where = {  }
         if(price) where.price = price;
         if(name)  where.name = name;
 
          try {
            let types = await RoomType.find(where,{},{skip,limit}) // 分页查询
            let count = await RoomType.count(where) // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:types,count});
            
          }catch(e){
        
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { RoomType} = req.Model;

  let { typeid } = req.body;

  if(!roomid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let typeinfo = await RoomType.findById(typeid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:typeinfo});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { RoomType} = req.Model;
  let { typeid } = req.body;

  if(!typeid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let room = await RoomType.findByIdAndRemove(typeid) // 分页查询
   
    res.send({success:true,info:'删除成功',data:room});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})





module.exports = router;