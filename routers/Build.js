const express = require('express');
const  router = express.Router();

// 添加房间
router.post('/add' ,async (req,res)=>{
    const { Build }  = req.Model;
    let {
       name,
       floorInfo
      }  = req.body;
    
     // 数据过滤的操作 

     try {
        await Build.create({
          name,
          floorInfo
        })
        res.send({success:true,info:'添加成功'})


     } catch(e) {
       console.log('eeee',e)
        res.send({success:false,info:'添加失败'})
     }

        

})


router.post('/edit' ,async (req,res)=>{
  const { Build }  = req.Model;

     // 数据过滤的操作 
    const { buildid ,...updateData} = req.body;; 

   try {
      await Build.findByIdAndUpdate(buildid,updateData);
      res.send({success:true,info:'修改成功'})
   } catch(e) {
      res.send({success:false,info:'修改失败'})
   }

})


// 分页查询
router.post('/getAll', async (req,res)=>{

         const { Build} = req.Model;
         let { page=1,limit=30 } = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）

          try {

            let build = await Build.find({},{},{skip,limit}) // 分页查询
            let count = await Build.count() // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:build,count});
            
          }catch(e){
            console.log('e',e)
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { Build} = req.Model;

  let { buildid } = req.body;

  if(!buildid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let build = await Build.findById(buildid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:build});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { Build} = req.Model;
  let { buildid } = req.body;

  if(!buildid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    await Build.findByIdAndRemove(buildid) 
   
    res.send({success:true,info:'删除成功'});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})





module.exports = router;