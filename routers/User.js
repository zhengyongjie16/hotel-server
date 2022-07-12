const express = require('express');
const  router = express.Router();
const util = require('utility')

// 注册用户
router.post('/reg' ,async (req,res)=>{
    const { User }  = req.Model;
    let {
          name ,   // 用户名
          pwd  ,   // 密码
          phone ,  // 用户手机
      }  = req.body;
    
     // 数据过滤的操作 

     try {
        await User.create({
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
  const { User }  = req.Model;

     // 数据过滤的操作 
    const { userid , pwd, ...updateData} = req.body;; 

   try {
      await User.findByIdAndUpdate(userid,{
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

         const { User} = req.Model;
         let { page=1,limit=30 ,phone,name} = req.body;
        
         const skip =  (page - 1 ) * limit; // 查询的起点（偏移量）


          // 初始化 查询条件      
         let where = {  }
  
          if(phone)  where.phone = phone
          if(name)     where.name = name
 
          
          try {

            let users = await User.find(where,{},{skip,limit}) // 分页查询
            let count = await User.count(where) // 获取符合条件的总数
            res.send({success:true,info:'查询成功',data:users,count});
            
          }catch(e){
        
            res.send({success:false,info:'获取失败'})
          }

})

// 查询单个房间信息

router.post('/getOne', async (req,res)=>{
  const { User} = req.Model;

  let { userid } = req.body;

  if(!userid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let user = await User.findById(userid) // 分页查询
   
    res.send({success:true,info:'查询成功',data:user});
    
  }catch(e){

    res.send({success:false,info:'获取失败'})
  }

})


router.post('/del', async (req,res)=>{
  const { User} = req.Model;
  let { userid } = req.body;

  if(!userid) return res.send({success:false,info:'请传入一个正确的id'})

  try {

    let user = await User.findByIdAndRemove(userid) // 分页查询
   
    res.send({success:true,info:'删除成功',data:user});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }

})

router.post('/login', async (req,res)=>{
  const { User} = req.Model;
  let { name,pwd } = req.body;
  try {

    let user = await User.findOne({name}) 

    if(!user) return  res.send({success:false,info:'用户名或者密码错误'})

    const md5pwd = util.md5(pwd)
    if(user.pwd !== md5pwd)  return  res.send({success:false,info:'用户名或者密码错误'})


    res.send({success:true,info:'登录成功',data:{
       id: user._id,
       name:user.name,
       phone:user.phone 
    }});
    
  }catch(e){

    res.send({success:false,info:'删除失败'})
  }
  

})



module.exports = router;