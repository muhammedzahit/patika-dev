const div_eklenecek = document.getElementById("eklenecek")
let p = []

function listele(){
    div_eklenecek.innerHTML = " "
    for(let i=0; i<p.length; i++){
        let s = p[i]
        div_eklenecek.innerHTML += `<p>${s}</p>`
    }
    
}

const promise = new Promise((resolve, reject) => {
    for(let i=0; i<20; i++){
        p.push("Deneme" + " " + (i+1))
    }
    resolve("listeye eklendi")
})
promise.then((value) => {
    console.log(value)
    listele()
})
