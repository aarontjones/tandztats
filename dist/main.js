var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
mainTitle.innerText = "Tandz-Tat";
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
// Swipe Function
function initSwipe() {
    const pages = ["#/", "#/gallery", "#/aftercare"];
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", (e) => {
        // Dont swipe if modal is open
        if (modalOverlay.classList.contains("active"))
            return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // Ignore if vertical more than horizontal scrolling
        if (Math.abs(deltaY) > Math.abs(deltaX))
            return;
        // Ignore short swipes
        if (Math.abs(deltaX) < 60)
            return;
        const currentHash = window.location.hash || "#/";
        const currentIndex = pages.indexOf(currentHash);
        if (currentIndex === -1)
            return;
        let nextIndex;
        if (deltaX < 0) {
            // Swiping left -> page to the right
            nextIndex = Math.min(currentIndex + 1, pages.length - 1);
        }
        else {
            // Swiping right -> page to the left
            nextIndex = Math.max(currentIndex - 1, 0);
        }
        if (nextIndex !== currentIndex) {
            window.history.pushState({}, "", pages[nextIndex]);
            renderPage();
        }
    }, { passive: true });
}
// Create Nav items
const homeItem = createNavItem("Home", "#/");
const galleryItem = createNavItem("Gallery", "#/gallery");
const aftercareItem = createNavItem("Aftercare", "#/aftercare");
// Content Container - container for all different pages
const contentContainer = document.createElement("div");
contentContainer.className = "content-container";
// Page Functions
// Home (default)
function homePage() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // 3 randomly selected IG images
        const galleryWrapper = document.createElement("div");
        galleryWrapper.className = "carousel-wrapper";
        // Home Title
        const homeTitle = document.createElement("h2");
        homeTitle.className = "about-title";
        homeTitle.innerText = "Featured Work";
        // Temporary image list
        let images = [];
        try {
            const res = yield fetch("./data/featured.json");
            const data = yield res.json();
            images = data.images;
        }
        catch (_b) {
            console.error("Could not load featured.json");
        }
        // main image
        const mainImage = document.createElement("img");
        mainImage.className = "carousel-main";
        mainImage.src = images[0]; // sets first in array to main image
        // Thumbnail container
        const thumbnailContainer = document.createElement("div");
        thumbnailContainer.className = "carousel-thumbnails";
        // Indexing and showing main image
        let currentIndex = 0;
        let autoScroll;
        function showImage(index) {
            var _a;
            // Removing 'selected' from all thumbnails
            const thumbnails = thumbnailContainer.querySelectorAll(".carousel-thumb");
            thumbnails.forEach((thumb) => thumb.classList.remove("selected"));
            // Adding 'selected' class to current thumbnail
            (_a = thumbnails[index]) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
            mainImage.style.opacity = "0"; // Fade Out
            setTimeout(() => {
                mainImage.src = images[index];
                mainImage.style.opacity = "1"; // Fade In
                currentIndex = index;
            }, 250); // Transition Duration
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
            const thumb = document.createElement("img");
            thumb.src = src;
            thumb.className = "carousel-thumb";
            thumb.addEventListener("click", () => {
                showImage(index);
                resetAutoScroll();
            });
            thumbnailContainer.appendChild(thumb);
        });
        // Initial thumbnail border
        (_a = thumbnailContainer.querySelector(".carousel-thumb")) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
        galleryWrapper.appendChild(mainImage);
        galleryWrapper.appendChild(thumbnailContainer);
        // Pausing and resuming on mouse hover and exit
        mainImage.addEventListener("mouseenter", () => {
            clearInterval(autoScroll);
        });
        mainImage.addEventListener("mouseleave", () => {
            startAutoScroll();
        });
        // Starting Initial Auto-scroll
        startAutoScroll();
        // Homewrapper
        const homeWrapper = document.createElement("div");
        homeWrapper.className = "home-wrapper";
        // Title ABOVE everything
        const aboutTitle = document.createElement("h3");
        aboutTitle.className = "page-title";
        aboutTitle.innerText = "About The Artist";
        // Main container (holds text + image)
        const homeContainer = document.createElement("div");
        homeContainer.className = "home-container";
        // Left Side - About text
        const aboutContainer = document.createElement("div");
        aboutContainer.className = "about-container";
        const aboutText = document.createElement("p");
        aboutText.className = "about-text";
        aboutText.innerText = `
    Bristol and Exeter based tattoo artist, I have currently been tattooing for a year and a half.
    
    Pencil and pen-drawn flash, with new designs coming out constantly and lots to choose from already. Customs are also very welcome. Message me on Instagram by clicking on the Instagram icon below.
    
    I specialise in single-needle tattoos with either a 3rl or a 1rl, all is done with black ink. My designs tend to be realism/ micro-realism. However, I also do small stick and poke designs, All of which can be seen in both the featured work and the gallery section of this website.
    `;
        aboutContainer.appendChild(aboutText);
        // Right Side - Image
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        const portrait = document.createElement("img");
        portrait.src = "./assets/images/portrait.jpg";
        portrait.className = "portrait-image";
        imageContainer.appendChild(portrait);
        // Append both sides into container
        homeContainer.appendChild(aboutContainer);
        homeContainer.appendChild(imageContainer);
        // Name BELOW the container
        const nameCaption = document.createElement("p");
        nameCaption.className = "portrait-name";
        nameCaption.innerText = "Harry Tandy";
        // Add Name below portrait
        imageContainer.appendChild(nameCaption);
        // Short Booking Section
        const bookingTitle = document.createElement("h2");
        bookingTitle.className = "about-title";
        bookingTitle.innerText = "Booking";
        const bookingSection = document.createElement("div");
        bookingSection.className = "short-booking-container";
        const bookingInfo = document.createElement("p");
        bookingInfo.className = "booking-text";
        bookingInfo.innerText = `
    To enquire about booking and pricing for tattoos, Hand sized ones are around X, and Y sized ones are around Z. Feel free to message about tattoos directly, by direct messaging me on Instagram (link below).

    As for booking, you will still need to message me directly on Instagram.
    `;
        bookingSection.appendChild(bookingInfo);
        // Assemble wrapper
        homeWrapper.appendChild(aboutTitle);
        homeWrapper.appendChild(homeContainer);
        homeWrapper.appendChild(homeTitle);
        homeWrapper.appendChild(galleryWrapper);
        homeWrapper.appendChild(bookingTitle);
        homeWrapper.appendChild(bookingSection);
        return homeWrapper;
    });
}
function createBlogEntry(id, date, blurb, imageFilenames, overallDescription, description) {
    return { id, date, blurb, imageFilenames, overallDescription, description };
}
function parseBlogDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
}
// building cards in a masonry (Pinterest) style
function buildMasonryCard(entry) {
    const card = document.createElement("div");
    card.className = "masonry-card";
    const header = document.createElement("div");
    header.className = "masonry-card-header";
    const blurb = document.createElement("span");
    blurb.className = "masonry-card-blurb";
    blurb.innerText = entry.blurb;
    const meta = document.createElement("div");
    meta.className = "masonry-card-meta";
    const desc = document.createElement("span");
    desc.className = "masonry-card-desc";
    desc.innerText = entry.overallDescription;
    const date = document.createElement("span");
    date.className = "masonry-card-date";
    date.innerText = entry.date;
    meta.appendChild(desc);
    meta.appendChild(date);
    header.appendChild(blurb);
    header.appendChild(meta);
    const colCount = Math.min(entry.imageFilenames.length, 2);
    const imgGrid = document.createElement("div");
    imgGrid.className = `masonry-img-grid cols-${entry.imageFilenames.length}`;
    entry.imageFilenames.forEach((filename, index) => {
        const img = document.createElement("img");
        img.src = `assets/blogs/${entry.id}/${filename}`;
        img.alt = `${entry.blurb} - image ${index + 1}`;
        img.className = "masonry-img";
        img.addEventListener("click", () => {
            var _a;
            modalImage.src = img.src;
            modalCaption.innerText = (_a = entry.description[index]) !== null && _a !== void 0 ? _a : "";
            modalImage.style.display = "block";
            modalOverlay.classList.add("active");
        });
        imgGrid.appendChild(img);
    });
    card.appendChild(header);
    card.appendChild(imgGrid);
    return card;
}
const blogEntries = [
    // Format - ID, Date, Blurb, Image(s), Description, Description of images in Array
    createBlogEntry(1, "19/5/2026", "Hand & Machine Poke Designs", ["1000003029.jpg", "1000003030.jpg"], "For this flash I used an automated pen made from one of my tattoo machines and a regular non-motorised pen for the smaller pieces you see.", ["The smaller designs will vary; some will be done with a machine, depending on whether they are blacked out or require whip shading. Some will be hand-poked, such as the horse and bull, to name some examples.", "These bigger designs will all be done using a machine."]),
    createBlogEntry(2, "01/5/2025", "Initial Tattoo Pencil Designs", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"], "Some of my first designs, all done with pencil. Would love to do these!", ["Spartan, Insect and knife-thing", "Dragon", "Eagle, Flower and Buffalo", "Vase of Flowers", "Vase of Flowers, Vase with a snake and Samurai"]),
    createBlogEntry(3, "20/6/2025", "First Flash Page", ["1.jpg"], "Another early set of flash, my first time utilising a whole page for designs", ["Check out these on the Insta!"]),
    createBlogEntry(4, "09/9/2025", "Knife Flashes", ["1.jpg"], "Knife Flash, experimenting wrapping objects around one another.", ["Top to Bottom: Rose wrapped knife, Snake wrapped knife, Scorpion wrapped knife"]),
    createBlogEntry(5, "17/10/2025", "Bigger Flash Page", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"], "Loads of designs here, one of my bigger flash posts.", ["Heron, Flower and Rose", "Eagle scooping up a snake and sacred heart", "Horse Head and Flowere decorated vase", "Water Buffalo Head"]),
    createBlogEntry(6, "24/11/2025", "Short Shaped Flashes", ["1.jpg", "2.jpg"], "A small set of flash, showing progression shaping my flash tattoos to work with the body", ["Tiger, Dragon, Sacred Heart and Bird", "Rams skull with scorpion crawling"])
];
// Gallery
function galleryPage() {
    const galleryContainer = document.createElement("div");
    galleryContainer.className = "gallery-container";
    const galleryTitle = document.createElement("h2");
    galleryTitle.className = "page-title";
    galleryTitle.innerText = "Gallery";
    const subtext = document.createElement("p");
    subtext.className = "subtext";
    subtext.innerText = "Here is a collection of my flashes. Tap on any of them to get a closer look, press and hold on an image to zoom in and get a closer look! If you like any of these, reach out to me on Instagram to enquire and book in!";
    galleryContainer.appendChild(galleryTitle);
    galleryContainer.appendChild(subtext);
    // Optional Masonry-style
    const masonry = document.createElement("div");
    masonry.className = "masonry-grid";
    // sort newest first
    const sorted = [...blogEntries].sort((a, b) => parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime());
    sorted.forEach((entry) => {
        masonry.appendChild(buildMasonryCard(entry));
    });
    galleryContainer.appendChild(masonry);
    return galleryContainer;
}
// Aftercare
function aftercarePage() {
    // Same as booking page, so ill reuse CSS elements
    const aftercareContainer = document.createElement("div");
    aftercareContainer.className = "booking-container";
    // Aftercare Title
    const aftercareTitle = document.createElement("h2");
    aftercareTitle.className = "page-title";
    aftercareTitle.innerText = "Aftercare";
    // Aftercare Information
    const parasOneTitle = document.createElement("h2");
    parasOneTitle.className = "aftercare-separate";
    parasOneTitle.innerText = "No Second Skin? No Problem";
    const parasOne = document.createElement("p");
    parasOne.className = "aftercare-para";
    parasOne.innerText = `
    If you are allergic to adhesives, then Second Skin will not be used.

    If Second Skin is not used, the process of healing the tattoo is as follows: The tattoo will be wrapped in cling film with some medical tape to hold it in place post-tattoo. Leave the tattoo under the cling film for about 2-3 hours, then wash the tattoo in warm water and use non-scented soap to properly clean it.
   
    Over the course of the next few days, the tattoo will begin to flake, scab, itch and peel. It is best not to pull or itch any of these flaky bits of the tattoo, as this will adversely affect how the tattoo heals. Be especially careful when rubbing the tattoo with a towel or loofah, instead dab it with a paper towel when out of the shower. Avoid submerging it in water for 2 to 4 weeks. Especially avoid salt water and water with chlorine in it, as this will hinder the healing process.
    
    Lying on a new tattoo can be involuntary, but it is best to avoid pressure on new tattoos so that they may heal more quickly. If the tattoo feels particularly raw, I have always found wrapping it in a layer of clingfilm before bed helps with it rubbing on blankets and sheets. It is also annoying to wash out of clean bed sheets!
    
    It is best to also follow the same 4-week rule of thumb for keeping tattoos out of the sun, which can occasionally be a monumental task. Ensure that you stay on top of suncream in very sunny conditions, as this will protect the new tattoo.

    For the first week of having the tattoo, you should be moisturising it in the morning and the evening. There is a range of products that can be used. I personally find Palmer's Cocoa Butter is the best for me. 
    
    There are also products such as Bepanthen and hustle butter that achieve the same goal.
    `;
    // Second paragraph
    const parasTwoTitle = document.createElement("h2");
    parasTwoTitle.className = "aftercare-separate";
    parasTwoTitle.innerText = "Second skin for the win";
    const parasTwo = document.createElement("p");
    parasTwo.className = "aftercare-para";
    parasTwo.innerText = `
    If second skin is applied, the process is, for the most part, very similar. Second Skin can stay on for 2 to 3 days. Another bit of Second Skin will be given for the tattoo if the previous Second Skin has peeled off the main body of the tattoo. It is also important to monitor air or water bubbles under the Second Skin. Water in the form of sweat, being pressed against the tattoo for a long period of time, can result in infection or poor healing. Therefore, it is important to watch for this and change the layer within the 2 to 3 day period.
    
    Second Skin allows you to go about everyday activities; you can shower relatively normally, and it is protected against slight rubbing. However, it is best to keep a level of safety regarding the new tattoo.
    
    To peel the Second Skin of, run it under warm water and peel slowly. Stretch the adhesive parallel to the skin; this way it will be considerably more painless than tearing it off while dry. While in the shower, you should wash the tattoo gently with unscented soap. Then begin the week-long moisturising process, morning and evening, with any of the products detailed above.
    
    Be additionally aware of the dangers detailed above. Submerging the new tattoo in water, patting it dry when out of the shower, avoiding putting pressure on the tattoo and keeping it out of the sun.
    
    This is understandably a lot of information. However, following these steps should hopefully lead to the best result for your new tattoo!
    `;
    // Links to amazon page
    const productsTitle = document.createElement("h2");
    productsTitle.className = "aftercare-products-title";
    productsTitle.innerText = "Recommended Products";
    const productsRow = document.createElement("div");
    productsRow.className = "aftercare-products";
    const products = [
        { label: "Cocoa Butter", url: "https://www.amazon.co.uk/Palmers-Formula-Intensive-Moisturizing-Hydration/dp/B0FK6KPSCK/ref=sr_1_4_sspa?crid=395RLG9JT3LC0&dib=eyJ2IjoiMSJ9.0maMJVlYvmRzHbUfic6NiW9QVVS51HM31cry6EZrg9p5H9E9Eq0dgrVP5K_77yAuR9XpdPjlwiCQzaBqOhi6PW_KgjSipetLlaI_B55sNw6_miSPwOnTDlJARbrmd5Tm2LUb9BzsJL6H913QnUQbm9H6QDjg_Vv1dqZzOMR9Um7LVGSkRb9uXo7MNltCfOIkqSoeU1PxWaqnSDRz5MWunnngUE8pr4nAMbatdhS9my7BY8sUuvzdCOOBCnuQzZMk1rY0b8YEQYQEadnQk-qu7aBYhMnIPKlE5iOoP1iW1T0.MkIWqGhQwBxbdXxvv4kenDTc7033ozE2Fi0vFWXeC0w&dib_tag=se&keywords=cocoa+butter&qid=1779272001&sprefix=cocobutter%2Caps%2C139&sr=8-4-spons&aref=dh92qsiDNK&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" },
        { label: "Bepanthen", url: "https://www.amazon.co.uk/Bepanthen-Tattoo-Intense-Ointment-Provitamin/dp/B08MW387NQ/ref=asc_df_B08MW387NQ?mcid=6e210095f96431749bf3e3c0aa0a9ade&th=1&tag=googshopuk-21&linkCode=df0&hvadid=697192275042&hvpos=&hvnetw=g&hvrand=18030686021561345850&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9045616&hvtargid=pla-1125883823896&hvocijid=18030686021561345850-B08MW387NQ-&hvexpln=0" },
        { label: "Hustle Butter", url: "https://www.amazon.co.uk/Hustle-Butter-Organic-Tattoo-Bulldog/dp/B0B6JMQZZ3/ref=asc_df_B0B6JMQZZ3?mcid=6adc1f7760c43856b05a330159710f10&tag=googshopuk-21&linkCode=df0&hvadid=697261239304&hvpos=&hvnetw=g&hvrand=15933544647302166084&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9045616&hvtargid=pla-1720329433385&psc=1&hvocijid=15933544647302166084-B0B6JMQZZ3-&hvexpln=0" }
    ];
    products.forEach(({ label, url }) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.className = "aftercare-product-btn";
        const icon = document.createElement("img");
        icon.src = "./assets/icons/amazon.svg";
        icon.className = "aftercare-product-icon";
        const text = document.createElement("span");
        text.innerText = label;
        link.appendChild(icon);
        link.appendChild(text);
        productsRow.appendChild(link);
    });
    // Aftercare Columns
    const aftercareCols = document.createElement("div");
    aftercareCols.className = "aftercare-cols";
    const colOne = document.createElement("div");
    colOne.className = "aftercare-col";
    const colTwo = document.createElement("div");
    colTwo.className = "aftercare-col";
    colOne.appendChild(parasOneTitle);
    colOne.appendChild(parasOne);
    colTwo.appendChild(parasTwoTitle);
    colTwo.appendChild(parasTwo);
    aftercareCols.appendChild(colOne);
    aftercareCols.appendChild(colTwo);
    // Printing Page
    const printPage = document.createElement("a");
    printPage.href = "#";
    printPage.className = "centered-link";
    const printIcon = document.createElement("img");
    printIcon.src = "./assets/icons/print.svg";
    printIcon.className = "centered-icon";
    printPage.appendChild(printIcon);
    // Allow Printing of the page
    printPage.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent Default Link Behaviour
        window.print();
    });
    aftercareContainer.appendChild(aftercareTitle);
    aftercareContainer.appendChild(aftercareCols);
    aftercareContainer.appendChild(productsTitle);
    aftercareContainer.appendChild(productsRow);
    aftercareContainer.appendChild(printPage); // Print Symbol
    return aftercareContainer;
}
// Router - Switches between pages, sharing title and navbar
function router(path) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (path) {
            case "/":
                return yield homePage();
            case "/gallery":
                return galleryPage();
            case "/aftercare":
                return aftercarePage();
            default:
                const div = document.createElement("div");
                div.innerText = "404 Not Found";
                return div;
        }
    });
}
// Instagram Link for footer for every page - in contentcontainer
const footerInstagramLink = document.createElement("a");
footerInstagramLink.href = "https://www.instagram.com/tandz.tat/";
footerInstagramLink.target = "_blank";
footerInstagramLink.className = "footer-link";
const instagramIcon = document.createElement("img");
instagramIcon.src = "./assets/icons/instagram.svg";
instagramIcon.className = "footer-icon";
footerInstagramLink.appendChild(instagramIcon);
// Gallery Disclaimer - message that disclaims all photos are original / inspired pieces
const galleryDisclaimer = document.createElement("p");
galleryDisclaimer.className = "gallery-disclaimer";
galleryDisclaimer.innerText = "ALL IMAGES DISPLAYED ARE INTELLECTUAL PROPERTY OF HARRY TANDY / TANDZ TAT. ALL PIECES ARE ORIGINAL OR INSPIRED.";
// Modal for gallery images
const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay";
// Modal wrapper
const modalContent = document.createElement("div");
modalContent.className = "modal-content";
// Modal image
const modalImage = document.createElement("img");
modalImage.className = "modal-image";
modalImage.draggable = false; // messes with zoom if its true
modalImage.addEventListener("contextmenu", (e) => e.preventDefault()); // mobile holding down zoom fix
// Likes and Descriptions
const modalInfoContainer = document.createElement("div");
modalInfoContainer.className = "modal-info";
// Description container
const modalDescContainer = document.createElement("div");
modalDescContainer.className = "modal-desc-container";
const modalCaption = document.createElement("p");
modalCaption.className = "modal-caption";
modalDescContainer.appendChild(modalCaption);
// Appending info container with both sides
modalInfoContainer.appendChild(modalDescContainer);
// Dots for gallery carousel modal overlay
const modalCounter = document.createElement("div");
modalCounter.className = "modal-counter";
modalContent.appendChild(modalImage);
modalContent.appendChild(modalInfoContainer);
modalOverlay.appendChild(modalContent);
// Adding zoom onto modal overlay
const zoomLens = document.createElement("div");
zoomLens.className = "zoom-lens";
document.body.appendChild(zoomLens);
const ZOOM_FACTOR = 1.45;
let lensHeld = false;
function getLensSize() {
    return window.innerWidth <= 768 ? 210 : 180; // If mobile view: bigger lens.
}
function applyZoom(clientX, clientY) {
    const LENS_SIZE = getLensSize();
    const rect = modalImage.getBoundingClientRect();
    const xRatio = (clientX - rect.left) / rect.width;
    const yRatio = (clientY - rect.top) / rect.height;
    const bgW = rect.width * ZOOM_FACTOR;
    const bgH = rect.height * ZOOM_FACTOR;
    const bgX = -(xRatio * bgW - LENS_SIZE / 2);
    const bgY = -(yRatio * bgH - LENS_SIZE / 2);
    const isMobile = window.innerWidth <= 768;
    zoomLens.style.width = `${LENS_SIZE}px`;
    zoomLens.style.height = `${LENS_SIZE}px`;
    zoomLens.style.backgroundImage = `url('${modalImage.src}')`;
    zoomLens.style.backgroundSize = `${bgW}px ${bgH}px`;
    zoomLens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    zoomLens.style.left = `${clientX}px`; // offset by 50 pixels if its mobile
    zoomLens.style.top = `${clientY - (isMobile ? 25 : 0)}px`;
}
// Mouse - Hold Click to zoom
modalImage.addEventListener("mousedown", () => {
    lensHeld = true;
    zoomLens.classList.add("active");
});
document.addEventListener("mouseup", () => {
    lensHeld = false;
    zoomLens.classList.remove("active");
});
modalImage.addEventListener("mousemove", (e) => {
    if (!lensHeld)
        return;
    applyZoom(e.clientX, e.clientY);
});
modalImage.addEventListener("mouseleave", () => {
    zoomLens.classList.remove("active");
    lensHeld = false;
});
// Touch - Hold tap to zoom
let touchHoldTimer = null;
modalImage.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    touchHoldTimer = setTimeout(() => {
        lensHeld = true;
        zoomLens.classList.add("active");
        applyZoom(touch.clientX, touch.clientY);
    }, 300); // Adding slight delay
}, { passive: true });
modalImage.addEventListener("touchmove", (e) => {
    if (!lensHeld)
        return;
    e.preventDefault();
    const touch = e.touches[0];
    applyZoom(touch.clientX, touch.clientY);
}, { passive: false });
modalImage.addEventListener("touchend", () => {
    if (touchHoldTimer)
        clearTimeout(touchHoldTimer);
    lensHeld = false;
    zoomLens.classList.remove("active");
});
document.body.appendChild(modalOverlay);
// Closing modal on click anywhere
modalOverlay.addEventListener("click", (e) => {
    if (e.target !== modalImage) {
        modalOverlay.classList.remove("active");
        zoomLens.classList.remove("active");
        lensHeld = false;
        // Removing pinned desc
        document.querySelectorAll(".blog-entry.modal-open").forEach(el => el.classList.remove("modal-open"));
    }
});
// Rendering Page
function renderPage() {
    return __awaiter(this, void 0, void 0, function* () {
        contentContainer.innerHTML = "";
        const path = window.location.hash.slice(1) || "/";
        const page = yield router(path);
        contentContainer.appendChild(page);
        contentContainer.appendChild(footerInstagramLink);
    });
}
// Footer
const footer = document.createElement("div");
footer.className = "footer";
footer.innerText = "© Intellectual property of Harry Tandy";
// Appending items to navbar
navbar.appendChild(homeItem);
navbar.appendChild(galleryItem);
navbar.appendChild(aftercareItem);
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
// Wrapping footer in for better layour
const footerContainer = document.createElement("div");
footerContainer.className = "footer-container";
footerContainer.appendChild(footer);
mainContainer.appendChild(footerContainer);
// Assemble Page
container.appendChild(mainContainer);
// Assemble App
app.appendChild(container);
window.addEventListener("popstate", renderPage);
initSwipe(); // Initial Swipe Function
renderPage(); // Initial render of page
export {};
//# sourceMappingURL=main.js.map