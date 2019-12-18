const express = require('express')
const router = new express.Router()
const Task = require('../model/tasks')
const auth = require('../middleware/auth')

// Task Post
router.post("/tasks",auth, async (req,res)=>{
   
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    // const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(500).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400)
    //     res.send(e)
    // })
})

// filtering
// Get/tasks?completed=true
// pagination
// Get /tasks?limit=10&skip=10
// Get /tasks?sortBy=createdAt_asc or createdAt:desc
router.get('/tasks',auth, async(req,res)=>{
    const match = {}
    const sort = {}
   
    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.split(':')
        // mhan yin desc ml -1 ka desc 
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const tasks = await Task.find({ owner : req.user._id    })
        await req.user.populate({
            path: 'tasks',
            match ,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort 
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    }catch (e){ 
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async(req,res) =>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id, owner: req.user._id} )
        if(!task) {
            return res.status(404).send()
        }

        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
    // Task.findById(req.params.id).then((task)=>{
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const fillables = ['description','fillables']
    const isValidate = updates.every((update)=>fillables.includes(update))

    if(!isValidate){
        return res.send({ Error : 'Invalide update'})
    }

    try{
        const task = await Task.findOne({_id : req.params.id, owner : req.user._id})
        // const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(400).send()
        }
        updates.forEach((update) => task[update] = req.body[update] );
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new : true,
        //     runValidators: true
        // })
       
        
        res.send(task)
    }catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({ _id : req.params.id, owner : req.user._id})
        // const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        }

        return res.send({info : "successfully deleted"})
    }catch(e){
        return res.status(500).send(e)
    }
})


module.exports = router