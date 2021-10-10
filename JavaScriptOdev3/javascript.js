const elektronikInfo = {
    "links" : [
        "https://cdn.cimri.io/image/1200x1200/appledizstbilgisayarfiyatlar_301029036.jpg",
    "https://cdn.cimri.io/image/1200x1200/ceptelefonufiyatlar_178953831.jpg",
    "https://cdn.cimri.io/image/1000x1000/appleipadgbinwifimylftuatabletpcaltn_292591573.jpg",
    "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/125016302/125016302_2_MC/54245013.jpg"
    ],
    "names": [
        "Laptop 2000$",
        "Mobile Phone 500$",
        "Tablet 200$",
        "All In One PC 1000$"
    ]   
}

const evInfo = {
    "links" : [
    "https://productimages.hepsiburada.net/s/22/1500/9957339988018.jpg",
    "https://ii1.pepperfry.com/media/catalog/product/l/a/568x284/ladybug-3-seater-sofa-in-blue-colour-by-febonic-ladybug-3-seater-sofa-in-blue-colour-by-febonic-ifrala.jpg",
    "https://media.istockphoto.com/photos/turkish-carpet-picture-id486167735?s=612x612",
    "https://cdn.shopify.com/s/files/1/0494/8049/9366/t/3/assets/istanbul-bed-4-(1)-1611652427289.jpeg?v=1611652430"
    ],
    "names": [
        "Coffee Machine 500$",
        "Sofa 2000$",
        "Turkish Carpet 20000$",
        "Bed 1000$"
    ]   
}

const superMarket = {
    "links" : [
    "https://www.balparmak.com.tr/suzme-cicek-yayla-bali-850-g-yayla-cicek-bali-balparmak-kavanoz-555-25-K.jpg",
    "https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30095762/30095762_0_MC/8796963274802_1588615699780.jpg",
    "https://cdnsta.avansas.com/mnresize/900/-/urun/72100/eti-tutku-biskuvi-100-gr-zoom-1.jpg",
    "https://petx.com.tr/Resim/Minik/1500x1500_thumb_01139.jpg"
    ],
    "names": [
        "Honey 50$",
        "Chocalate 5$",
        "Biscuit 5$",
        "Cat Formula 20$"
    ]   
}

const selections = {
    "elektronik" : elektronikInfo,
    "ev" : evInfo,
    "supermarket" : superMarket
}

function changeInfos(selection){
    let photos = document.getElementsByClassName("photo")
    let info = selections[selection]
    for(let i = 0; i<photos.length; i++){
        photos[i].src = info["links"][i]
        parent_ = photos[i].parentElement
        new_p = parent_.getElementsByTagName("p")[0]
        new_p.innerHTML = info["names"][i]
        parent_.appendChild(new_p)
    }
}


selection_button_group_dom = document.getElementsByClassName("secenek_degistir")
for(let i=0; i<selection_button_group_dom.length; i++){
    selection_button_group_dom[i].addEventListener("click", function(e){
        changeInfos(e.target.dataset.info)
    })
}

changeInfos("elektronik")