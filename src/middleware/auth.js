const jwt = require('jsonwebtoken')
const User = require('../model/users')

const auth = async(req,res,next)=>{
  try{
    const token = req.header('Authorization').replace('Bearer ','')
    console.log(token)
    const data = jwt.verify(token,process.env.JWT_SECRET)
    
    // koz server ka htoke tae user lr check tr
    const user = await User.findOne({ _id: data._id , 'tokens.token': token})
    console.log(user)

    if(!user){
        throw new Error()
    }

    req.token = token
    req.user = user    

    next()
  }catch(e) {
      res.status(401).send({
          error : 'Please authenticate'
      })
  }
}

module.exports = auth