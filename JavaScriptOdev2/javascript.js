let closeDom = document.getElementsByClassName("close1")
for(let i=0; i<closeDom.length; i++){
    let parent_ = closeDom[i].parentElement
    closeDom[i].onclick = function(e){
        parent_.style.display = "none"
    }
}

let list = document.getElementsByTagName("UL")
let eklenecekDom = document.getElementById("eklenecek")

let ekle_button_dom = document.getElementById("ekleButton")
ekle_button_dom.addEventListener("click", function(){
    let new_list_element = document.createElement("li")
    let eklenecek = eklenecekDom.value
    new_list_element.innerHTML = ` ${eklenecek} <button style='margin-left: 250px;' class='close1 close'>X</button> <br> <br>`
    list[0].appendChild(new_list_element)
    let closeDom = new_list_element.getElementsByClassName("close1")
    let parent_ = closeDom[0].parentElement
    closeDom[0].onclick = function(e){
        parent_.style.display = "none"
    }

    parent_.addEventListener("click", function(){
        parent_.classList.add("checked")
    })
})