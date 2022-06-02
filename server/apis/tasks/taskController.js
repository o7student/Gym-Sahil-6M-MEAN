const Task = require('./taskModel')


exports.getAll = async (req, resp) => {
    await Task.find(req.body)
        .populate("trainerId")
        .populate("customerId")
        .then(res => {
            resp.send({ success: true, status: 200, message: "All Tasks loaded", data: res })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Task.findOne(query)
            .populate("trainerId")
            .populate("customerId").then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Task loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Task Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addTask = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.title)
        validation += "title is required,"
    if (!formData.description)
        validation += "description is required,"
    if (!formData.trainerId)
        validation += "trainerId is required,"
    if (!formData.customerId)
        validation += "customerId is required,"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Task.countDocuments()
        let taskData = {
            taskId: total + 1,
            title: formData.title,
            description: formData.description,
            trainerId: formData.trainerId,
            customerId: formData.customerId,
            image: "task/" + formData.image
        }
        let task = new Task(taskData)

        task.save().then(res => {
            resp.send({ success: true, status: 200, message: "Task added Successfully", data: res })

        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}



exports.updateTask = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Task.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.title)
                    res.title = formData.title
                if (!!formData.image)
                    res.image = "task/" + formData.image
                if (!!formData.description)
                    res.description = formData.description
                if (!!formData.trainerId)
                    res.trainerId = formData.trainerId
                if (!!formData.customerId)
                    res.customerId = formData.customerId

                res.save().then(res => {
                    resp.send({ success: true, status: 200, message: "Task updated Successfully", data: res })

                }).catch(err => {
                    resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                })
            }
            else
                resp.send({ success: false, status: 404, message: "No Task Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}

