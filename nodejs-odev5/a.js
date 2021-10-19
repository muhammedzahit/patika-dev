const http = require("http")
const PORT = 5000

const server = http.createServer((req, res) => {
    let url = req.url
    if(url == "/index"){
        res.writeHead(200, {"content-type" : "text/html"})
        res.write("<h2>index sayfasindasin</h2>")
    }
    else if(url == "/hakkimda"){
        res.writeHead(200, {"content-type" : "text/html"})
        res.write("<h2>Hakkimda sayfasindasin</h2>")
    }
    else if(url == "/iletisim"){
        res.writeHead(200, {"content-type" : "text/html"})
        res.write("<h2>iletisim sayfasindasin</h2>")
    }
    else{
        res.writeHead(404, {"content-type" : "text/html"})
        res.write("<h2>Uzgunum aradigin sayfayi bulamadim :(</h2>")
    }
    res.end()
})

server.listen(PORT, () => {
    console.log("Server dinlemede")
})