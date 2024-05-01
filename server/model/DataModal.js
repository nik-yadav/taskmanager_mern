const mongoose = require('mongoose')

const {Schema} = mongoose;

const DataSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    assignedTo:{
        type: String,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: true
    },
    taskCategory:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('taskData', DataSchema)