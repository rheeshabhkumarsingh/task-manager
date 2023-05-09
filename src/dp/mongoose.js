const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const userModel = {
    name: {
        type: String,
    },
    age: {
        type: Number
    }
}

const user = mongoose.model('User', userModel)

const taskModel = {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
}


const Task = mongoose.model('Task', taskModel)

let sampleTask = new Task({
    description: 'test description',
    completed: false
})

sampleTask.save()
.then(result => {
    console.log(result)
})
.catch(error => {
    console.log(error)
})
