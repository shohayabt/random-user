const express = require('express')
const app = express()
const cors = require("cors")
const fs = require("fs")
const port = process.env.PORT || 5000;
const randomUserRoute = require("./routes/v1/user.route");

app.use(cors());
app.use(express());
app.use(express.json())

//GET USER DATA FROM FILE SYSTEM
const getUserData = () => {
    const jsonData = fs.readFileSync('data.json')
    return JSON.parse(jsonData)    
}


// GET A RANDOM USER API
app.get('/api/v1/user/random', (req, res) => {
       fs.readFile("data.json",(err,data)=>{
        if(err) {
           res.write("Faild To Read File ")
           res.end()
        }else{
           const allUsers = getUserData()
           const randomUser =Math.floor(Math.random()*allUsers.length)
           res.json(allUsers[randomUser])
        }
    })
})
app.use('/api/v1/user',randomUserRoute)
app.get('/', (req, res) => {
    res.send('SERVER IS UP AND RUNNING')
})
app.listen(port,()=>{
console.log(`SERVER IS UP AND RUNNING ${port}`)
})