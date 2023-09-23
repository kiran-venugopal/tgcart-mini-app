

const express = require("express");


const app = express()



app.use(express.json())



app.post("/", (req, res) => {
    console.log(req.body)
    res.json({success:true})
})

app.listen(5000, ()=>{
    console.log("listening")
})