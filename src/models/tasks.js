const { default: mongoose } = require("mongoose")

const task = {
    description: {
        type: String,
        required:true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}

const Task = mongoose.model('Task', task);

module.exports = { Task }