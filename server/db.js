const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const url = process.env.MongoURL

const mongoCo = async() => {
    try {
        await mongoose.connect(url);
        console.log('Connected to database')

        const taskCategory = await mongoose.connection.db.collection("taskCategory");
        const catdata = await taskCategory.find({}).toArray();

        const taskData = await mongoose.connection.db.collection("taskdatas");
        const catdata1 = await taskData.find({}).toArray();
        // console.log(catdata1)

        global.data = catdata
        global.category = catdata1

    } catch (err) {
        console.error('Databse Connection Error', err)
    }
}

module.exports = mongoCo