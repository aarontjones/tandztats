const app = document.getElementById("app") // Start app

if (!app) throw new Error("App container not found")

const container = document.createElement("div")
container.className = "container"

// Main Container
const mainContainer = document.createElement("div")
mainContainer.className = "main-container"

// Top Container
const topContainer = document.createElement("div")
topContainer.className = "top-container"

// Title Container
const titleContainer = document.createElement("div")
titleContainer.className = "title-container"

// Title and tagline

const mainTitle = document.createElement("h2")
mainTitle.className = "main-title"
mainTitle.innerText = "Tandz Tats"

const tagline = document.createElement("p")
tagline.className = "tagline"
tagline.innerText = "fineline tattoo artist"

// Navbar Container
const navbarContainer = document.createElement("div")
navbarContainer.className = "navbar-container"

// Navbar
const navbar = document.createElement("nav")
navbar.className = "navbar"

// Navbar Lists
function createNavItem(text: string, href: string): HTMLLIElement {
    const li = document.createElement("li")
    li.className = "navbar-list"

    const link = document.createElement("a")
    link.href = href
    link.innerText = text

    // Making navbar links work
    link.addEventListener("click", (e) => {
        e.preventDefault()
        window.history.pushState({}, "", href)
        renderPage()
    })

    li.appendChild(link)
    return li
}

// Create Nav items
const homeItem = createNavItem("Home", "#/")
const galleryItem = createNavItem("Gallery", "#/gallery")
const aftercareItem = createNavItem("Aftercare", "#/aftercare")
const bookingItem = createNavItem("Booking", "#/booking")

// Content Container
const contentContainer = document.createElement("div")
contentContainer.className = "content-container"

// Page Functions
// Home (default)
function homePage(): HTMLElement {
    // 3 randomly selected IG images
    const galleryWrapper = document.createElement("div")
    galleryWrapper.className = "carousel-wrapper"

    // Home Title
    const homeTitle = document.createElement("h2")
    homeTitle.className = "page-title"
    homeTitle.innerText = "Featured Work"

    // Temporary image list
    const images = [
        "./assets/images/place-holder-1.svg",
        "./assets/images/place-holder-2.png",
        "./assets/images/place-holder-3.png"
    ]

    // main image
    const mainImage = document.createElement("img")
    mainImage.className = "carousel-main"
    mainImage.src = images[0]! // sets first in array to main image

    // Thumbnail container
    const thumbnailContainer = document.createElement("div")
    thumbnailContainer.className = "carousel-thumbnails"

    // Indexing and showing main image
    let currentIndex = 0
    let autoScroll: ReturnType<typeof setInterval>

    function showImage(index: number) {
        // Removing 'selected' from all thumbnails
        const thumbnails = thumbnailContainer.querySelectorAll<HTMLImageElement>(".carousel-thumb");
        thumbnails.forEach((thumb) => thumb.classList.remove("selected"))

        // Adding 'selected' class to current thumbnail
        thumbnails[index]?.classList.add("selected")

        mainImage.style.opacity = "0" // Fade Out
        setTimeout(() => {
            mainImage.src = images[index]!
            mainImage.style.opacity = "1" // Fade In
            currentIndex = index
        }, 250) // Transition Duration
    }

    // Staring autoscroll for every 7 seconds
    function startAutoScroll() {
        autoScroll = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }, 7000); // Every 7 seconds, it scrolls
    }

    // Reseting auto scroll whenever clicking on thumbnail
    function resetAutoScroll() {
        clearInterval(autoScroll);
        startAutoScroll();
    }

    // Creating thumbnails
    images.forEach((src, index) => {
        const thumb = document.createElement("img")
        thumb.src = src
        thumb.className = "carousel-thumb"

        thumb.addEventListener("click", () => {
            showImage(index)
            resetAutoScroll()
        })

        thumbnailContainer.appendChild(thumb)
    })

    // Initial thumbnail border
    thumbnailContainer.querySelector(".carousel-thumb")?.classList.add("selected")

    galleryWrapper.appendChild(mainImage)
    galleryWrapper.appendChild(thumbnailContainer)

    // Pausing and resuming on mouse hover and exit
    mainImage.addEventListener("mouseenter", () => {
        clearInterval(autoScroll)
    })

    mainImage.addEventListener("mouseleave", () => {
        startAutoScroll()
    })

    // Initial Auto-scroll
    startAutoScroll()

    // Homewrapper
    const homeWrapper = document.createElement("div")
    homeWrapper.className = "home-wrapper"

    // Title ABOVE everything
    const aboutTitle = document.createElement("h3")
    aboutTitle.className = "about-title"
    aboutTitle.innerText = "About The Artist"

    // Main container (holds text + image)
    const homeContainer = document.createElement("div")
    homeContainer.className = "home-container"

    // Left Side - About text
    const aboutContainer = document.createElement("div")
    aboutContainer.className = "about-container"

    const aboutText = document.createElement("p")
    aboutText.className = "about-text"
    aboutText.innerText = `
    I am a Fineline artist

    Other stuff goes here.
    `

    aboutContainer.appendChild(aboutText)

    // Right Side - Image
    const imageContainer = document.createElement("div")
    imageContainer.className = "image-container"

    const portrait = document.createElement("img")
    portrait.src = "./assets/images/place-holder-1.svg"
    portrait.className = "portrait-image"

    imageContainer.appendChild(portrait)

    // Append both sides into container
    homeContainer.appendChild(aboutContainer)
    homeContainer.appendChild(imageContainer)

    // Name BELOW the container
    const nameCaption = document.createElement("p")
    nameCaption.className = "portrait-name"
    nameCaption.innerText = "Harry Tandy"

    // Assemble wrapper
    homeWrapper.appendChild(homeTitle)
    homeWrapper.appendChild(galleryWrapper)
    homeWrapper.appendChild(aboutTitle)
    homeWrapper.appendChild(homeContainer)
    homeWrapper.appendChild(nameCaption)

    return homeWrapper
}

// Gallery
function galleryPage(): HTMLElement {
    // Same as booking page, so ill reuse CSS elements
    const galleryContainer = document.createElement("div")
    galleryContainer.className = "booking-container"

    // Gallery Title
    const galleryTitle = document.createElement("h2")
    galleryTitle.className = "page-title"
    galleryTitle.innerText = "Gallery"

    // Temp Gallery Information
    const tempText = document.createElement("p")
    tempText.innerText = `
    Soon, there will be different sections of image split between a few groups.

    Group 1: Flash Art

    Group 2: Tattoos on People

    Group 3: Healed Tattoos

    just need instagram API key and write an algorithm that separates them into groups automatically.
    `

    galleryContainer.appendChild(galleryTitle)
    galleryContainer.appendChild(tempText)

    return galleryContainer
}

// Aftercare
function aftercarePage(): HTMLElement {
    // Same as booking page, so ill reuse CSS elements
    const aftercareContainer = document.createElement("div")
    aftercareContainer.className = "booking-container"

    // Aftercare Title
    const aftercareTitle = document.createElement("h2")
    aftercareTitle.className = "page-title"
    aftercareTitle.innerText = "Aftercare"

    // Aftercare Info
    const aftercareInfo = document.createElement("p")
    aftercareInfo.className = "booking-info"
    aftercareInfo.innerText = `
    Placeholder Aftercare Information
    `

    aftercareContainer.appendChild(aftercareTitle)
    aftercareContainer.appendChild(aftercareInfo)

    return aftercareContainer
}

// Booking
function bookingPage(): HTMLElement {
    // For booking, I want a simple box with information about booking, including an Instagram link
    const bookingContainer = document.createElement("div")
    bookingContainer.className = "booking-container"

    // Booking Title
    const bookingTitle = document.createElement("h2")
    bookingTitle.className = "page-title"
    bookingTitle.innerText = "Booking"

    // Booking Info
    const bookingInfo = document.createElement("p")
    bookingInfo.className = "booking-info"
    bookingInfo.innerText = // booking information
    `
    Currently, all booking goes directly through my Instagram DM's.
    
    If you would be interested in booking a tattoo, you can click on the Instagram logo below to be taken to my Instagram account, where we can discuss appointment times.
    `

    // Instagram link
    const instagramLink = document.createElement("a")
    instagramLink.href = "https://www.instagram.com/tandz.tat/"
    instagramLink.target = "_blank"
    instagramLink.className = "instagram-link"

    const instagramIcon = document.createElement("img")
    instagramIcon.src = "./assets/icons/instagram.svg"
    instagramIcon.className = "instagram-icon"

    instagramLink.appendChild(instagramIcon)

    bookingContainer.appendChild(bookingTitle)
    bookingContainer.appendChild(bookingInfo)
    bookingContainer.appendChild(instagramLink)
    
    return bookingContainer
}

// Router - Switches between pages, sharing title and navbar
function router(path: string): HTMLElement {
    switch (path) {
        case "/":
            return homePage()
        case "/gallery":
            return galleryPage()
        case "/aftercare":
            return aftercarePage()
        case "/booking":
            return bookingPage()
        default:
            const div = document.createElement("div")
            div.innerText = "404 Not Found"
            return div
    }
}

// Rendering Page
function renderPage() {
    contentContainer.innerHTML = ""
    const path = window.location.hash.slice(1) || "/"
    const page = router(path)
    contentContainer.appendChild(page)
}

// Footer
const footer = document.createElement("div")
footer.className = "footer"
footer.innerText = "© Property of Tandz Tats"

// Appending items to navbar
navbar.appendChild(homeItem)
navbar.appendChild(galleryItem)
navbar.appendChild(aftercareItem)
navbar.appendChild(bookingItem)

// Navbarcontainer appending navbar
navbarContainer.appendChild(navbar)

// Appending title and tagline to titlecontainer
titleContainer.appendChild(mainTitle)
titleContainer.appendChild(tagline)

// Appending all divs
topContainer.appendChild(titleContainer)
topContainer.appendChild(navbarContainer)

mainContainer.appendChild(topContainer)
mainContainer.appendChild(contentContainer)
mainContainer.appendChild(footer)

// Assemble Page
container.appendChild(mainContainer)

// Assemble App
app.appendChild(container)
window.addEventListener("popstate", renderPage)
renderPage() // Initial render of page