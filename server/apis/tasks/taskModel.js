const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    taskId: { type: Number, default: 0 },
    trainerId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    customerId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },

    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "task/default.jpg" },


    createdAt: { type: Date, default: Date.now }

})


const task = module.exports = mongoose.model('task', taskSchema)
