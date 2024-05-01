const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoCo = require('./db')
mongoCo();
const cors = require('cors')
cors();
dotenv.config();
const port = process.env.PORT;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/user', require('./Routes/userRoute.js'))
app.use('/data', require('./Routes/DisplayData.js'))

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, ()=> {
    console.log("App is listening on port: ", port )
})
