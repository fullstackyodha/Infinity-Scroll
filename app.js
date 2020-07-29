// UNSPLASH API
const count = 30
const apiKey = 'YGjNcOjhxiHhyOi6cD8Tlv1aanAmSq3KdcJ_wAbEVOs'
const unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const imageContainer = document.querySelector(".image-container")
const loader = document.querySelector("#loader")

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

function setAttributes(element, attribute){
    for(const key in attribute){
        element.setAttribute(key,attribute[key])
    }
}

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready = true
        loader.hidden = true
        console.log("ready=", ready)
    }
}

function displayPhotos(){

    totalImages += photosArray.length
    console.log("Total Images", totalImages)

    photosArray.forEach(photoObject =>{
        const a = document.createElement("a")
        // a.setAttribute("href", photoObject.links.html)
        // a.setAttribute("target", "_blank")
        setAttributes(a, {href: photoObject.links.html, target: "_blank"})

        const img = document.createElement("img")
        // img.setAttribute("src", photoObject.urls.regular)
        // img.setAttribute("alt", photoObject.alt_description)
        // img.setAttribute("title", photoObject.alt_description)
        setAttributes(img, { src: photoObject.urls.regular,
                            alt: photoObject.alt_description,
                            title: photoObject.alt_description})
        

        img.addEventListener('load', imageLoaded)

        a.appendChild(img)
        imageContainer.appendChild(a)

    })
}

//  Get Photos from Unsplash Api
async function getPhotos(){

    try{
        const response = await fetch(unsplashAPI)
        photosArray = await response.json()

        displayPhotos()
    }catch(err){ 

    }
}


// Check if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
        // console.log("Window Inner Height",window.innerHeight)
        // console.log("Window Scroll Y",window.scrollY)
        // console.log("Window innerHeight + ScrollY",window.innerHeight +  window.scrollY)
        // console.log("Offset - 1000",document.body.offsetHeight - 1000)
    }
})


// onLoad
getPhotos()