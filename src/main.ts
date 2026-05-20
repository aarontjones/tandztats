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
mainTitle.innerText = "Tandz-Tat"

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

// Content Container - container for all different pages
const contentContainer = document.createElement("div")
contentContainer.className = "content-container"

// Page Functions
// Home (default)
async function homePage(): Promise<HTMLElement> {
    // 3 randomly selected IG images
    const galleryWrapper = document.createElement("div")
    galleryWrapper.className = "carousel-wrapper"

    // Home Title
    const homeTitle = document.createElement("h2")
    homeTitle.className = "page-title"
    homeTitle.innerText = "Featured Work"

    // Temporary image list
    let images: string[] = []
    try {
        const res = await fetch("./data/featured.json")
        const data = await res.json()
        images = data.images
    } catch {
        console.error("Could not load featured.json")
    }
 
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

    // Starting Initial Auto-scroll
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
    I am Harry Tandy, a Bristol and Exeter based tattoo artist.

    I specialise in ________

    I began tattoing ________
    `

    aboutContainer.appendChild(aboutText)

    // Right Side - Image
    const imageContainer = document.createElement("div")
    imageContainer.className = "image-container"

    const portrait = document.createElement("img")
    portrait.src = "./assets/images/portrait.jpg"
    portrait.className = "portrait-image"

    imageContainer.appendChild(portrait)

    // Append both sides into container
    homeContainer.appendChild(aboutContainer)
    homeContainer.appendChild(imageContainer)

    // Name BELOW the container
    const nameCaption = document.createElement("p")
    nameCaption.className = "portrait-name"
    nameCaption.innerText = "Harry Tandy"

    // Add Name below portrait
    imageContainer.appendChild(nameCaption)

    // Assemble wrapper
    homeWrapper.appendChild(homeTitle)
    homeWrapper.appendChild(galleryWrapper)
    homeWrapper.appendChild(aboutTitle)
    homeWrapper.appendChild(homeContainer)
    

    return homeWrapper
}

// Blog Gallery
interface BlogEntry {
    id: number
    date: string
    blurb: string
    imageFilenames: string[]
    description: string[]
}

function createBlogEntry(
    id: number,
    date: string,
    blurb: string,
    imageFilenames: string[],
    description: string[],
): BlogEntry {
    return {id, date, blurb, imageFilenames, description}
}

function parseBlogDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/").map(Number)
    return new Date(year!, month! - 1, day!)
}

// Building blog card
function buildBlogCard(entry: BlogEntry): HTMLElement {
    const card = document.createElement("div")
    card.className = "blog-entry"

    const header = document.createElement("div")
    header.className = "blog-entry-header"

    const blurb = document.createElement("span")
    blurb.className = "blog-entry-blurb"
    blurb.innerText = entry.blurb

    const date = document.createElement("span")
    date.className = "blog-entry-date"
    date.innerText = entry.date

    header.appendChild(blurb)
    header.appendChild(date)

    // Image grid
    const imageGrid = document.createElement("div")
    imageGrid.className = "blog-entry-images"

    entry.imageFilenames.forEach((filename, index) => {
        const img = document.createElement("img")
        img.src = `assets/blogs/${entry.id}/${filename}`
        img.alt = `${entry.blurb} - ${filename}`
        img.className = "blog-entry-img"

        // Clickable images
        img.addEventListener("click", () => {
            modalImage.src = img.src
            modalCaption.innerText = entry.description[index] ?? ""
            modalImage.style.display = "block"
            modalOverlay.classList.add("active")
        })
        imageGrid.appendChild(img)
    })

    card.appendChild(header)
    card.appendChild(imageGrid)
    return card
}

const blogEntries: BlogEntry[] = [
    // Format - ID, Date, Blurb, Image(s)
    createBlogEntry(1, "19/5/2026", "Hand & Machine Poke Designs", ["1000003029.jpg", "1000003030.jpg"], ["Experimenting with hand poke and machine poke designs - These smaller designs are to be used ", "Experimenting with hand poke and machine poke designs."])

]

// Gallery
function galleryPage(): HTMLElement {
    const galleryContainer = document.createElement("div")
    galleryContainer.className = "gallery-container"

    const galleryTitle = document.createElement("h2")
    galleryTitle.className = "page-title"
    galleryTitle.innerText = "Gallery"

    const subtext = document.createElement("p")
    subtext.className = "subtext"
    subtext.innerText = "Here is a collection of my flashes. Tap on any of them to get a closer look, and press CNTRL on your keyboard to zoom in."

    galleryContainer.appendChild(galleryTitle)
    galleryContainer.appendChild(subtext)

    // sort newest first
    const sorted = [...blogEntries].sort(
        (a, b) => parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime()
    )

    sorted.forEach((entry) => {
        galleryContainer.appendChild(buildBlogCard(entry))
    })

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

    // Aftercare Information
    // Intro
    const aftercareIntro = document.createElement("p")
    aftercareIntro.className = "aftercare-para"
    aftercareIntro.innerText = "After our session, there are a few rules you will have to follow, to ensure that your fresh tattoo heals in properly."

    // 1
    const aftercareOne = document.createElement("h2")
    aftercareOne.className = "aftercare-separate"
    aftercareOne.innerText = "One"

    // First Para
    const aftercareParaOne = document.createElement("p")
    aftercareParaOne.className = "aftercare-para"
    aftercareParaOne.innerText = `
    Take off the second skin 2 days after our session, and wash gently with warm water and unscented soap. 
    
    If you use a Loofah in the shower, be careful not to rub on the area.`

    // 2
    const aftercareTwo = document.createElement("h2")
    aftercareTwo.className = "aftercare-separate"
    aftercareTwo.innerText = "Two"

    // Second para
    const aftercareParaTwo = document.createElement("p")
    aftercareParaTwo.className = "aftercare-para"
    aftercareParaTwo.innerText = `
    Moisturise the area twice a day for 1 week, after the second skin is removed: Once in the morning and once in the evening. 

    I recommend using Natural Cocoa Butter. If the tattoo gets itchy at all - Do not itch, or else some of the ink will peel off. 
    
    Same as before, do not rub too harshly with a Loofah or any other shower brush.`

    // 3
    const aftercareThree = document.createElement("h2")
    aftercareThree.className = "aftercare-separate"
    aftercareThree.innerText = "Three"

    // Third para
    const aftercareParaThree = document.createElement("p")
    aftercareParaThree.className = "aftercare-para"
    aftercareParaThree.innerText = `
    After the week of moisturising, be sure to protect the tattoo from the sun with either sun cream, or covering it up. Do this for at least a month.

    In due time, I will ask for pictures or checkups for how the tattoo is healing. If bits are fading, or the tattoo has completely failed to heal in, I can provide free touch-up sessions
    
    If needed, there is a downloadable version of this page below.
    `

    // Printing Page
    const printPage = document.createElement("a")
    printPage.href = "#"
    printPage.className = "centered-link"

    const printIcon = document.createElement("img")
    printIcon.src = "./assets/icons/print.svg"
    printIcon.className = "centered-icon"

    printPage.appendChild(printIcon)

    // Allow Printing of the page
    printPage.addEventListener("click", (e) => {
        e.preventDefault() // Prevent Default Link Behaviour
        window.print()
    })

    aftercareContainer.appendChild(aftercareTitle)

    // Appending all my stupid aftercare info bits
    aftercareContainer.appendChild(aftercareIntro)
    aftercareContainer.appendChild(aftercareOne)
    aftercareContainer.appendChild(aftercareParaOne)
    aftercareContainer.appendChild(aftercareTwo)
    aftercareContainer.appendChild(aftercareParaTwo)
    aftercareContainer.appendChild(aftercareThree)
    aftercareContainer.appendChild(aftercareParaThree)

    aftercareContainer.appendChild(printPage) // Print Symbol

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
    instagramLink.className = "centered-link"

    const instagramIcon = document.createElement("img")
    instagramIcon.src = "./assets/icons/instagram.svg"
    instagramIcon.className = "centered-icon"

    instagramLink.appendChild(instagramIcon)

    bookingContainer.appendChild(bookingTitle)
    bookingContainer.appendChild(bookingInfo)
    bookingContainer.appendChild(instagramLink)
    
    return bookingContainer
}

// Router - Switches between pages, sharing title and navbar
async function router(path: string): Promise<HTMLElement> {
    switch (path) {
        case "/":
            return await homePage()
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

// Instagram Link for footer for every page - in contentcontainer
const footerInstagramLink = document.createElement("a")
footerInstagramLink.href = "https://www.instagram.com/tandz.tat/"
footerInstagramLink.target = "_blank"
footerInstagramLink.className = "footer-link"

const instagramIcon = document.createElement("img")
instagramIcon.src = "./assets/icons/instagram.svg"
instagramIcon.className = "footer-icon"

footerInstagramLink.appendChild(instagramIcon)

// Gallery Disclaimer - message that disclaims all photos are original / inspired pieces
const galleryDisclaimer = document.createElement("p")
galleryDisclaimer.className = "gallery-disclaimer"
galleryDisclaimer.innerText = "ALL IMAGES DISPLAYED ARE INTELLECTUAL PROPERTY OF HARRY TANDY / TANDZ TAT. ALL PIECES ARE ORIGINAL OR INSPIRED."

// Modal for gallery images
const modalOverlay = document.createElement("div")
modalOverlay.className = "modal-overlay"

// Modal wrapper
const modalContent = document.createElement("div")
modalContent.className = "modal-content"

// Modal image
const modalImage = document.createElement("img")
modalImage.className = "modal-image"

// Likes and Descriptions
const modalInfoContainer = document.createElement("div")
modalInfoContainer.className = "modal-info"

// Description container
const modalDescContainer = document.createElement("div")
modalDescContainer.className = "modal-desc-container"

const modalCaption = document.createElement("p")
modalCaption.className = "modal-caption"

modalDescContainer.appendChild(modalCaption)

// Appending info container with both sides
modalInfoContainer.appendChild(modalDescContainer)

// Dots for gallery carousel modal overlay
const modalCounter = document.createElement("div")
modalCounter.className = "modal-counter"

modalContent.appendChild(modalImage)
modalContent.appendChild(modalInfoContainer)

modalOverlay.appendChild(modalContent)

// Adding zoom onto modal overlay
const zoomLens = document.createElement("div")
zoomLens.className = "zoom-lens"
document.body.appendChild(zoomLens)

const ZOOM_FACTOR = 1.55
const LENS_SIZE = 180
let ctrlHeld = false

document.addEventListener("keydown", (e) => {
    if (e.key === "Control") {
        ctrlHeld = true
        if (modalOverlay.classList.contains("active")) {
            zoomLens.classList.add("active")
        }
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key === "Control") {
        ctrlHeld = false
        zoomLens.classList.remove("active")
    }
})

// Adding movement to mouse
modalImage.addEventListener("mousemove", (e) => {
    if (!ctrlHeld) return

    const rect = modalImage.getBoundingClientRect()
    const xRatio = (e.clientX - rect.left) / rect.width
    const yRatio = (e.clientY - rect.top) / rect.height

    const bgW = rect.width * ZOOM_FACTOR
    const bgH = rect.height * ZOOM_FACTOR
    const bgX = -(xRatio * bgW - LENS_SIZE / 2)
    const bgY = -(yRatio * bgH - LENS_SIZE / 2)

    zoomLens.style.backgroundImage = `url('${modalImage.src}')`
    zoomLens.style.backgroundSize = `${bgW}px ${bgH}px`
    zoomLens.style.backgroundPosition = `${bgX}px ${bgY}px`
    zoomLens.style.left = `${e.clientX}px`
    zoomLens.style.top = `${e.clientY}px`
})

modalImage.addEventListener("mouseleave", () => {
    zoomLens.classList.remove("active")
})

modalImage.addEventListener("mouseenter", () => {
    if (ctrlHeld) zoomLens.classList.add("active")
})

document.body.appendChild(modalOverlay)

// Closing modal on click anywhere
modalOverlay.addEventListener("click", () => {
    modalOverlay.classList.remove("active")
    zoomLens.classList.remove("active")
    ctrlHeld = false
})

// Rendering Page
async function renderPage() {
    contentContainer.innerHTML = ""
    const path = window.location.hash.slice(1) || "/"
    const page = await router(path)
    contentContainer.appendChild(page)
    // If Page is booking, dont show footer ig link - do this cause link in booking goes directly to DM's
    if (path !== "/booking") {
        contentContainer.appendChild(footerInstagramLink)
    } 
    // If page is gallery, show gallery disclaimer
    if (path === "/gallery") {
        contentContainer.appendChild(galleryDisclaimer)
    }
}

// Footer
const footer = document.createElement("div")
footer.className = "footer"
footer.innerText = "© Intellectual property of Harry Tandy"

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

// Wrapping footer in for better layour
const footerContainer = document.createElement("div")
footerContainer.className = "footer-container"

footerContainer.appendChild(footer)

mainContainer.appendChild(footerContainer)

// Assemble Page
container.appendChild(mainContainer)

// Assemble App
app.appendChild(container)
window.addEventListener("popstate", renderPage)
renderPage() // Initial render of page