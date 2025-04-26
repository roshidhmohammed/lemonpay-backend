const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:true,
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = mongoose.model("Task", taskSchema);