const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../model/users')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
// User routes

router.post("/users", async (req, res)=>{
    const user = new User(req.body)
 
     try {
         
         await user.save()
         sendWelcomeEmail(user.email, user.name)
         const token = await user.generateAuthToken()
         res.status(201).send({user,token})
     }catch (e) {
         res.status(400).send(e)
     }
     
 
 //    user.save().then(()=>{
 //     res.status(201).send(user)
 //    }).catch((e)=>{
 //         res.status(400)
 //        res.send(e)
 //    })
 })


router.post('/users/login', async(req,res)=>{
    // first method
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }catch(e){
        res.status(400).send()
    }
})
 
router.get("/users/me", auth , async (req,res)=>{
 
     res.send(req.user).status()
 })
 


//  upload profile pictuer

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a image file'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width : 250, height:250 , radius: 100 }).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.status(200).send()
}, (error,req,res,next) => {
    res.status(400).send({
        error: error.message
    })
})

// delete profile

router.delete('/users/me/avatar',auth, async(req,res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.status(200).send()
})

// get profile
router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(500).send()
    }
})


 // Route parameter
// router.get("/users/:id", async(req,res)=>{
    
//      try{
//          const user = await User.findById(req.params.id)
//          if(!user){
//              return res.status(404).send()
//          } 
//          res.send(user)
 
//      }catch(e){
//          res.status(500).send(e)
//      }
 
//      // User.findById(req.params.id).then((user)=>{
//      //     res.send(user)
//      // }).catch(()=>{
//      //     res.status(500).send()
//      // })
//  })
 
// update
router.patch('/users/me', auth , async(req,res)=>{
     const updates = Object.keys(req.body)
     const fillables = ['name','email','password','age']
     const isValidate = updates.every((update)=>fillables.includes(update))
 
     if(!isValidate){
         return res.status(400).send({error: 'Invalid updates'})
     }
 
     try{


        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        //  const user = await User.findByIdAndUpdate(req.params.id, req.body ,{ new : true, runValidators:true})
         // no user with that id
        //  if(!user){
        //      return res.status(404).send()
        //  }
         res.status(201).send(req.user)
     }catch(e){
         res.status(400).send(e)
     }
 })
 
router.delete('/users/me',auth,async(req,res)=>{
     try{
        // auth use lo req.user so p use lo ya dr
        //  const user = await User.findByIdAndDelete(req.user._id)
        //  if(!user) {
        //      return res.status(404).send()
        //  }
        
         await req.user.remove()
         sendCancelEmail(req.user.email,req.user.name)
         res.send({ user : req.user, info : "scuessfully deleted"})
     }catch(e) {
         res.send(500).send(e)
     }
 })


//  logout from one sessoin
router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// remove all sessions
router.post('/users/logoutAll',auth , async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router