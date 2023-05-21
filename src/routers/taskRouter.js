const express = require('express');
const router = new express.Router();
const { Task } = require("../models/tasks");


router.post('/task',async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send({status: 'success'})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // new Task(req.body)
    // .save()
    // .then(result => {
    //     res.send({status: 'success', data: result})
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.send(error)
    // })
})

router.get('/task', async (req, res) => {
    try {
        let result = await Task.find({});
        if(!result) {
            res.status(400).send()
        }
        else {
            res.send({status: 'success', data: result})
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    // Task.find({})
    // .then(result => {
    //     if(!result) {
    //         res.status(400).send()
    //     }
    //     else {
    //         res.send({status: 'success', data: result})
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.send(error)
    // })
})

router.get('/task/:id', async (req, res) => {
    try {
        const result = Task.findById({_id: req.params.id});
        if(!result) {
            res.status(400).send()
        }
        else {
            res.send({status: 'success', data: result})
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
    // Task.findById({_id: req.params.id})
    // .then(result => {
    //     if(!result) {
    //         res.status(400).send()
    //     }
    //     else {
    //         res.send({status: 'success', data: result})
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.send(error)
    // })
})

router.patch('/updatetask/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await Task.findByIdAndUpdate(id, req.body)
        res.send({status: 'success', data: result})
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})

router.delete('/deletetask', async (req, res) => {
    try {
        let { id } = req.body;
        deleteTask(id).then(result => {
            res.send({status: 'success', data: result})
        }).catch(error => {
            console.log(error);
            res.send(error)    
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


async function deleteTask (id) {
    await Task.deleteOne({_id: id})
    const count = await Task.countDocuments({})
    return count;
}

module.exports = router;