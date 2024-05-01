const express = require("express");
const mongoose = require('mongoose')
const model = require('../model/DataModal')
const router = express.Router();

// api = http://localhost:8000/data/taskdata
router.get("/taskData", async(req,res)=>{
    try {
        // console.log(global.data);
        const taskCategory = await mongoose.connection.db.collection("taskCategory");
        const catdata = await taskCategory.find({}).toArray();

        const taskData = await mongoose.connection.db.collection("taskdatas");
        const catdata1 = await taskData.find({}).toArray();
        res.send([catdata, catdata1])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})

// api = http://localhost:8000/data/insertdata
router.post('/insertdata', async(req, res) => {

    const title = req.body.title;
    // console.log(req.body)

    try {
        let userData = await model.findOne({title})
        if(!userData){
            await model.create({
                title: req.body.title,
                assignedTo: req.body.assigned,
                priority: req.body.priority,
                description: req.body.description,
                taskCategory: req.body.taskCategory,
            });
            res.json({success: true})
        }else{
            res.json({success: false, message: "Task already exist"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

// api = http://localhost:8000/data/updatedata
router.post('/updatedata', async (req, res) => {
    const taskId = req.body.taskId;
    const updateData = {
        title: req.body.title,
        assignedTo: req.body.assigned,
        priority: req.body.priority,
        taskCategory: req.body.taskCategory,
    };

    // console.log(taskId)
    // console.log(updateData)

    try {
        let userData = await model.findOne({ _id: taskId });
        // console.log(userData)
        if (userData) {
            userData.title = req.body.title;
            userData.assignedTo = req.body.assigned;
            userData.priority = req.body.priority;
            userData.taskCategory = req.body.taskCategory;
            await userData.save();
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

// api = http://localhost:8000/data/deletedata
router.post('/deletedata', async (req, res) => {
    const taskId = req.body.id;

    try {
        let deletedData = await model.findOneAndDelete({ _id: taskId });
        if (deletedData) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});



module.exports = router;
