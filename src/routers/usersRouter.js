const express = require('express');
const router = new express.Router();
const { User } = require('../models/users');
const middleware = require('../middleware/user_middleware')


router.post('/users', middleware.hashPassword, async (req, res) => {
    // res.send('post user')
    // console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save();
        res.send({status: 'success'})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // new User(req.body)
    // .save()
    // .then(result => {
    //     res.send({status: 'success', data: result})
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.send(error)
    // })
})

router.get('/users', async (req, res) => {
    try {
        let result = await User.find({});
        res.send({status: 'success', data: result})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // User.find({})
    // .then(result => {
    //     res.send({status: 'success', data: result, data: result})
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.send(error)
    // })
})

router.get('/users/:id', async (req, res) => {
    try {
        const result = await User.findById(new mongoose.Types.ObjectId(req.params.id))
        if(!result) {
            return res.status(400).send()
        }
        else {
            res.send(result)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    // User.findById(new mongoose.Types.ObjectId(req.params.id))
    // .then(result => {
    //     if(!result) {
    //         return res.status(400).send()
    //     }
    //     else {
    //         res.send(result)
    //     }
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.send(error)
    // })
})

router.post('/user/login', async (req, res) => {
    try {
        let user = await User.findByCredentials(req.body.email, req.body.password)
        res.send({status: 'success', data: user})
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.patch('/updateuser/:id',middleware.hashPassword, async (req, res) => {
    let id = req.params.id;
    try {
        let result = await User.findByIdAndUpdate(id, req.body)
        res.send({status: 'success', data: result})
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        let result = await User.findByIdAndDelete(req.param.id)
        res.send({status: 'success', data: result})
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

module.exports = router