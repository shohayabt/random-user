const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000;
const randomUserRoute = require("./routes/v1/random-user.route")

app.use(cors());
app.use(express());

app.use('/api/v1/users/random',randomUserRoute)



app.get('/', (req , res)=>{
res.send("HELLO WORLD FROM NODE JS || EXPRESS")
})

app.listen(port,()=>{
console.log(`SERVER IS UP AND RUNNING ${port}`)
})