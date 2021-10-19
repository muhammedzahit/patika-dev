const fs = require("fs")
// 1
fs.writeFile(__dirname + "/employees.json", '{"name": "Employee 1 Name", "salary": 2000}', (err) => {
    if(err) console.log(err)
    else console.log("Dosya başarıyla oluşturuldu.")
})

// 2,3
/*
let data_
data_ = JSON.parse(fs.readFileSync(__dirname + "/employees.json", "utf8", "r"))
data_["name"] = "ahmet"
data_["salary"] = 5000
fs.writeFile(__dirname + "/employees.json", JSON.stringify(data_), (err) => {
    if(err) console.log(err)
    else console.log("dosya güncellendi")
})*/

// 4
/*
fs.unlink(__dirname + "/employees.json", (err) => {
    if(err) console.log(err)
    else console.log("dosya silindi") 
})*/
