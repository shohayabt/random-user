const fs = require("fs")
const saveDataToFileSystem = (data)=>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(__dirname + '/../data.json', stringifyData)
}
module.exports = saveDataToFileSystem