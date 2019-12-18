// // CRUD create, read, update and delete

// // const mongodb = require('mongodb')
// // const MongoClient = mongodb.MongoClient
// // const ObjectId = mongodb.ObjectID


// // Object ID a kyaung
// // const id = new ObjectID()
// // console.log(id.getTimestamp())


// // Objec Destruction
// const { MongoClient,ObjectID} = require('mongodb')

// const connectionURL = "mongodb://127.0.0.1:27017"
// const database = 'task-manager'

// // Mongo nae connection chate
// MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error,client)=>{
//     if(error){
//         return console.log('Unable to connect database')
//     }

//     const db = client.db(database)

//      // DeleteOne
//      db.collection('user').deleteMany({ age: 22 }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

//     // deleteMany
//     db.collection('tasks').deleteOne({ description: 'Play'}).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

//     // Fetching Data from Database

//     // db.collection('user').findOne({ _id: new ObjectID('5ca33f861a2577218afa4f40')}, (error, user) =>{
//     //         if(error){
//     //             return console.log('Unable to fetch')
//     //         }

//     //         console.log(user)
//     // })

//     // find() returns cursor, thus use toArray()
//     // db.collection('user').find({ age: 22}).count((error,result)=> {
//     //     console.log(result)
//     // })

//     // // For task collection
//     // db.collection('tasks').findOne({ _id : new ObjectID('5ca33f861a2577218afa4f44')},(error,task) => {
//     //     console.log(task)
//     // })

//     // db.collection('tasks').find({ completed : false}).toArray((error,results) => {
//     //     console.log(results)
//     // })


//     // Update kya ml $set ko use dl update lote chin tae field ko
//     // db.collection('user').updateOne(
//     //     {
//     //         _id : new ObjectID('5ca33ebbdb2f59213e451baa')
//     //     },{
//     //     $inc : {
//     //         age : 1
//     //     }
//     // }).then((result)=>{
//     //     console.log(result)
//     // }).catch((error)=>{
//     //     console.log(error)
//     // })

//     // Updatemany
//     // db.collection('tasks').updateMany({ completed: false }, {
//     //     $set : {
//     //         completed : true
//     //     }
//     // }).then((result)=>{
//     //     console.log(result)
//     // }).catch((error) => {
//     //     consolg.log(error)
//     // })

//     // insert one method
//     // db.collection('user').insertOne({
//     //     name: 'John',
//     //     age: '22'
//     // }, (error,result)=> {
//     //     if(error){
//     //         return console.log('Unable to enter User')
//     //     }

//     //     console.log(result.ops)

//     // })

//     // db.collection('user').insertMany([
//     //     {
//     //         name : 'Es',
//     //         age : 22
//     //     },{
//     //         name: 'Draz',
//     //         age : 22
//     //     }
//     // ],(error, result) => {
//     //     if(error){
//     //         return console.log('Unable to enter User')
//     //     }

//     //     console.log(result.ops)
//     // })


//     // db.collection('tasks').insertMany([
//     //     {
//     //         description : 'Eat',
//     //         completed : false
//     //     }, {
//     //         description : 'Sleep',
//     //         completed : false
//     //     }, {
//     //         description : 'Play',
//     //         completed: false
//     //     }
//     // ], (error,result) => {
//     //     if(error) {
//     //         return console.log('Unable to insert')
//     //     }

//     //     console.log(result.ops)
//     // })


   
// })