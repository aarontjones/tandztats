const fs = require("fs")
const { type } = require("os")

// Eventually, update this to include their unique ID's in everything - so that it orders oldest to newest.


// Load in instagram posts via api

// If image, put them into post images, along with their ID
const postImage = [
  {
    file: "place-holder-1.svg",
    likes: 12,
    id: 1,
    igLink: "#"
  },
  {
    file: "place-holder-2.png",
    likes: 152,
    id: 1,
    igLink: "#"
  },
  {
    file: "place-holder-3.png",
    likes: 13,
    id: 1,
    igLink: "#"
  },
  {
    file: "place-holder-4.svg",
    likes: 52,
    id: 1,
    igLink: "#"
  }
]

// If Video, put them into post videos, along with their ID
const postVideo = [
  {
    file: "place-holder-5.mp4",
    likes: 23,
    id: 5,
    igLink: "#"
  }
]

// If Carousel, Put them into post Carousel, along with their ID
const postCarousel = [
  {
    file: ["place-holder-2.png", "place-holder-3.png"],
    likes: 42,
    id: 6,
    igLink: "#"
  }
]

// Also, every time gather profile picture, and put it in "assets/images/" as portrait.png

// Helper to format description nicely
function formatDescription(filename) {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/-/g, " ")       // replace dashes with spaces
}

// Build gallery array

// Images
const imagePosts = postImage.map((post) => ({
    src: `./assets/images/${post.file}`,
    description: formatDescription(post.file),
    likeAmount: post.likes,
    igLink: post.igLink,
    id: post.id,
    type: "image"
}))


// Videos
const videoPosts = postImage.map((post) => ({
    src: `./assets/images/${post.file}`,
    description: formatDescription(post.file),
    likeAmount: post.likes,
    igLink: post.igLink,
    id: post.id,
    type: "video"
}))

// Carousel
const carouselPosts = postCarousel.map((post) => ({
    src: post.file.map(file => `./assets/images/${file}`),
    description: formatDescription(post.file[0]), // Uses first image name for carousel
    likeAmount: post.likes,
    igLink: post.igLink,
    id: post.id,
    type: "carousel"
}))


// Combine all
const gallery = [...imagePosts, ...videoPosts, ...carouselPosts]

// Write to JSON
fs.writeFileSync("./data/gallery.json", JSON.stringify(gallery, null, 2))

console.log("gallery.json generated")