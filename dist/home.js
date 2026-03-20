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
    li.appendChild(link);
    return li;
}
// Create Nav items
const homeItem = createNavItem("Home", "/");
const galleryItem = createNavItem("Gallery", "/gallery");
const aftercareItem = createNavItem("Aftercare", "/aftercare");
const bookingItem = createNavItem("Booking", "/booking");
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
// Assemble Page
container.appendChild(mainContainer);
// Assemble App
app.appendChild(container);
export {};
//# sourceMappingURL=home.js.map