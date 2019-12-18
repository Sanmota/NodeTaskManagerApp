const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify : false,
})
























// mongoose model
// const User = mongoose.model('user',{
//     name : {
//         type: String,
//         required: true,
//         trim : true
//     },
//     password:{
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes('password')) {
//                 throw new Error('passowrd cannot contain password' )
//             }
//         }

//     },
//     age: {
//         type : Number,
//         default : 0,
//         validate(value) {
//             if(value < 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email : {
//         type : String,
//         required: true,
//         trim : true,
//         lowercase : true,

//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error ('Enter Email')
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Es asdf',
//     email: 'HANMYATTHU111@gmail.com',
//     password : 'asd123!@#',
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('This is an error ', error)
// })


// Task model
// const Task = mongoose.model('tasks',{
//     description : {
//         type : String,
//         trim : true,
//         required : true,
//     },
//     completed : {
//         type : Boolean,
//         default : false,

//     }
// })
// const task = new Task({
//     description : '  adsf World'
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('This is an error',error)
// })



