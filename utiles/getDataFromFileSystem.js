const fs = require("fs")
const getDataFromFileSystem = (data)=>{
    const jsonData = fs.readFileSync(__dirname + '/../data.json')
    return JSON.parse(jsonData)    
}
module.exports = getDataFromFileSystem