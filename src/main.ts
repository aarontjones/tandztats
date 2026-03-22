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
    galleryWrapper.className = "short-gallery-wrapper"

    // Large image
    const featuredImage = document.createElement("img")
    featuredImage.className = "featured-image"
    featuredImage.src = "./assets/images/place-holder-1.svg"

    // Carousel Container
    const carouselContainer = document.createElement("div")
    carouselContainer.className = "carousel-container"

    // Temporary image list
    const images = [
        "./assets/images/place-holder-1.svg",
        "./assets/images/place-holder-2.png",
        "./assets/images/place-holder-3.png"
    ]

    // Creating thumbnails
    images.forEach((src) => {
        const thumb = document.createElement("img")
        thumb.src = src
        thumb.className = "carousel-thumb"

        thumb.addEventListener("click", () => {
            featuredImage.src = src // changes big image to whatever selected
        })

        carouselContainer.appendChild(thumb)
    })

    // Assembling first section
    galleryWrapper.appendChild(featuredImage)
    galleryWrapper.appendChild(carouselContainer)

    const homeWrapper = document.createElement("div")
    homeWrapper.className = "home-wrapper"

    // Title ABOVE everything
    const aboutTitle = document.createElement("h2")
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
    Placeholder Text

    Harry Tandy
    `

    aboutContainer.appendChild(aboutText)

    // Right Side - Image
    const imageContainer = document.createElement("div")
    imageContainer.className = "image-container"

    const portrait = document.createElement("img")
    portrait.src = "./assets/images/place-holder.svg"
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
    homeWrapper.appendChild(galleryWrapper)
    homeWrapper.appendChild(aboutTitle)
    homeWrapper.appendChild(homeContainer)
    homeWrapper.appendChild(nameCaption)

    return homeWrapper
}

// Gallery
function galleryPage(): HTMLElement {
    const div = document.createElement("div")
    div.innerText = `
    Soon, there will be different sections of image split between a few groups.

    Group 1: Flash Art

    Group 2: Tattoos on People

    Group 3: Healed Tattoos

    just need instagram API key and write an algorithm that separates them into groups automatically.
    `
    return div
}

// Aftercare
function aftercarePage(): HTMLElement {
    // Same as booking page, so ill reuse CSS elements
    const aftercareContainer = document.createElement("div")
    aftercareContainer.className = "booking-container"

    // Aftercare Info
    const aftercareInfo = document.createElement("p")
    aftercareInfo.className = "booking-info"
    aftercareInfo.innerText = `
    Placeholder Aftercare Information
    `

    aftercareContainer.appendChild(aftercareInfo)

    return aftercareContainer
}

// Booking
function bookingPage(): HTMLElement {
    // For booking, I want a simple box with information about booking, including an Instagram link
    const bookingContainer = document.createElement("div")
    bookingContainer.className = "booking-container"

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