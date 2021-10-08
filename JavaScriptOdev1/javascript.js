let a = setInterval(changeClock, 1)
let saat = document.getElementById("saat")
function changeClock(){
    let date = new Date()
    let hour = (date.getUTCHours() + 3) % 24  
    let minute = date.getUTCMinutes()
    let second = date.getUTCSeconds()
    saat.innerText = hour + " " + minute + " " + second
}