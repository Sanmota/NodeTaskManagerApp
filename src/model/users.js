const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task  = require('./tasks')
// Scheme
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required: true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error ('Enter Email')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('passowrd cannot contain password' )
            }
        }

    },
    age: {
        type : Number,
        default : 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    avatar: {
        type : Buffer
    }
},{
    timestamps : true
})

// relationship chate
UserSchema.virtual('tasks',{
    ref: 'tasks',
    localField: '_id',
    foreignField: 'owner'
})

// jwt instance method , object ko access ma ya woo
UserSchema.methods.generateAuthToken = async function() {
    // ho bat file ka lann khaw tae user ko use chin lo
    const user = this

    const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse',{ expiresIn : '2 days'})

    user.tokens = user.tokens.concat({
        token
    })
    await user.save()

    return token
}


// object ko access ya dl
UserSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('Different Credientials')
    }
    return user
}


// password ma pya chin lo
UserSchema.methods.toJSON =  function(){
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj

}

// use standard function hash the password before saving
UserSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

// Delete user tasks when user is removed
UserSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({ owner : user._id })

    next()
})

// User Model
const User = mongoose.model('users', UserSchema)
    

module.exports = User