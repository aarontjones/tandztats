const app = document.getElementById("app"); // Start app
if (!app)
    throw new Error("App container not found");
const container = document.createElement("div");
container.className = "container";
// Main Container
const mainContainer = document.createElement("div");
mainContainer.className = "main-container";
// Top Container
const topContainer = document.createElement("div");
topContainer.className = "top-container";
// Title Container
const titleContainer = document.createElement("div");
titleContainer.className = "title-container";
// Title and tagline
const mainTitle = document.createElement("h2");
mainTitle.className = "main-title";
mainTitle.innerText = "Tandz Tats";
const tagline = document.createElement("p");
tagline.className = "tagline";
tagline.innerText = "fineline tattoo artist";
// Navbar Container
const navbarContainer = document.createElement("div");
navbarContainer.className = "navbar-container";
// Navbar
const navbar = document.createElement("nav");
navbar.className = "navbar";
// Navbar Lists
function createNavItem(text, href) {
    const li = document.createElement("li");
    li.className = "navbar-list";
    const link = document.createElement("a");
    link.href = href;
    link.innerText = text;
    // Making navbar links work
    link.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.pushState({}, "", href);
        renderPage();
    });
    li.appendChild(link);
    return li;
}
// Create Nav items
const homeItem = createNavItem("Home", "#/");
const galleryItem = createNavItem("Gallery", "#/gallery");
const aftercareItem = createNavItem("Aftercare", "#/aftercare");
const bookingItem = createNavItem("Booking", "#/booking");
// Content Container
const contentContainer = document.createElement("div");
contentContainer.className = "content-container";
// Page Functions
// Home (default)
function homePage() {
    const div = document.createElement("div");
    div.innerText = "Home";
    return div;
    // Random 3 selected images ticker thing idk
    // 2 containers side by side - short about me and portrait image
}
// Gallery
function galleryPage() {
    const div = document.createElement("div");
    div.innerText = "Gallery";
    return div;
}
// Aftercare
function aftercarePage() {
    const div = document.createElement("div");
    div.innerText = "Aftercare";
    return div;
}
// Booking
function bookingPage() {
    // For booking, I want a simple box with information about booking, including an Instagram link
    const bookingContainer = document.createElement("div");
    bookingContainer.className = "booking-container";
    // Booking Info
    const bookingInfo = document.createElement("p");
    bookingInfo.className = "booking-info";
    bookingInfo.innerText = // booking information
        `
    Currently, all booking goes directly through my Instagram DM's.
    
    If you would be interested in booking a tattoo, you can click on the Instagram logo below to be taken to my Instagram account, where we can discuss appointment times.
    `;
    // Instagram link
    const instagramLink = document.createElement("a");
    instagramLink.href = "https://www.instagram.com/tandz.tat/";
    instagramLink.target = "_blank";
    instagramLink.className = "instagram-link";
    const instagramIcon = document.createElement("img");
    instagramIcon.src = "./assets/icons/instagram.svg";
    instagramIcon.className = "instagram-icon";
    instagramLink.appendChild(instagramIcon);
    bookingContainer.appendChild(bookingInfo);
    bookingContainer.appendChild(instagramLink);
    return bookingContainer;
}
// Router - Switches between pages, sharing title and navbar
function router(path) {
    switch (path) {
        case "/":
            return homePage();
        case "/gallery":
            return galleryPage();
        case "/aftercare":
            return aftercarePage();
        case "/booking":
            return bookingPage();
        default:
            const div = document.createElement("div");
            div.innerText = "404 Not Found";
            return div;
    }
}
// Rendering Page
function renderPage() {
    contentContainer.innerHTML = "";
    const path = window.location.hash.slice(1) || "/";
    const page = router(path);
    contentContainer.appendChild(page);
}
// Footer
const footer = document.createElement("div");
footer.className = "footer";
footer.innerText = "© Property of Tandz Tats";
// Appending items to navbar
navbar.appendChild(homeItem);
navbar.appendChild(galleryItem);
navbar.appendChild(aftercareItem);
navbar.appendChild(bookingItem);
// Navbarcontainer appending navbar
navbarContainer.appendChild(navbar);
// Appending title and tagline to titlecontainer
titleContainer.appendChild(mainTitle);
titleContainer.appendChild(tagline);
// Appending all divs
topContainer.appendChild(titleContainer);
topContainer.appendChild(navbarContainer);
mainContainer.appendChild(topContainer);
mainContainer.appendChild(contentContainer);
mainContainer.appendChild(footer);
// Assemble Page
container.appendChild(mainContainer);
// Assemble App
app.appendChild(container);
window.addEventListener("popstate", renderPage);
renderPage(); // Initial render of page
export {};
//# sourceMappingURL=main.js.map