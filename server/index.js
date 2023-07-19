
const express=require("express");
const cors = require("cors");

const UserRoute= require('./controllers/UserRoutes');
const BmiRoute = require('./controllers/BmiRoutes');

require("dotenv").config();


const app=express();
app.use(cors())
app.use(express.json());

const connection = require('./config/config');
app.use("/auth",UserRoute);
app.use("/bmi",BmiRoute)


app.get("/",(req,res)=>{
    return res.status(200).send("Test Route")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("DB Connected")
    }
    catch(err){
        console.log(err)

    }
    console.log(`DB Connected at port ${process.env.PORT}`)
})
