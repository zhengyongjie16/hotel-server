const express = require('express');
const  router = express.Router();
const util = require('utility')

// 添加管理员
router.post('/add' ,async (req,res)=>{
    const { Admin }  = req.Model;
    let {
          name ,   // 管理员用户名
          pwd  ,   // 管理员密码
          phone ,  // 用户手机
      }  = req.body;
      console.log(req.body);
    
     // 数据过滤的操作 

     try {
        await Admin.create({
          name,
          pwd:util.md5(pwd), // 使用md5加密用户传进来的明文的密码
          phone
        })
        res.send({success:true,info:'添加成功'})


     } catch(e) {
        res.send({success:false,info:'添加失败'})
     }

        

})


router.post('/edit' ,async (req,res)=>{
  const { Admin }  = req.Model;

     // 数据过滤的操作 
    const { adminid , pwd, ...updateData} = req.body;; 

   try {
      await Admin.findByIdAndUpdate(adminid,{
        ...updateData,
        pwd:util.md5(pwd)
      });
      res.send({success:true,info:'修改成功'})
   } catch(e) {
      res.send({success:false,info:'修改失败'})
   }

})



// 分页查询
router.post('/getAll', async (req,res)=>{

         const { Admin} = req.Model;
         let { page=1,limit=30 ,phone,name} = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）


          // 初始化 查询条件      
         let where = {  }
  
          if(phone)  where.phone = phone
          if(name)     where.name = name
 
          
          try {

            let admins = await Admin.find(where,{},{skip,limit}) // 分页查询
            let count = await Admin.count(where) // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:admins,count});
            
          }catch(e){
        
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { Admin} = req.Model;

  let { adminid } = req.body;

  if(!adminid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let admin = await Admin.findById(adminid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:admin});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { Admin} = req.Model;
  let { adminid } = req.body;

  if(!adminid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let admin = await Admin.findByIdAndRemove(adminid) // 分页查询
   
    res.send({success:true,info:'删除成功',data:admin});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})

router.post('/login', async (req,res)=>{
  const { Admin} = req.Model;
  let { name,pwd } = req.body;
  console.log(req.body)
  try {

    let admin = await Admin.findOne({name}) 
    console.log('admin ', admin)

    if(!admin) return  res.send({success:false,info:'用户名或者密码错误'})

    const md5pwd = util.md5(pwd)
    if(admin.pwd !== md5pwd)  return  res.send({success:false,info:'用户名或者密码错误'})


    res.send({success:true,info:'登录成功',data:{
       id: admin._id,
       name:admin.name,
       phone:admin.phone 
    }});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }
  

})



module.exports = router;