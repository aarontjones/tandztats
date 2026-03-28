const fs = require("fs")
const { type } = require("os")

// Load in instagram api

// If post is a normal image
const postImage = [

]

// If post is video
const postVideo = [
  "place-holder-5.mp4"
]

// if post is carousel (post has multiple images)
const postCarousel = [

]

// placeholder images
const placeholders = [
  "place-holder-1.svg",
  "place-holder-2.png",
  "place-holder-3.png",
  "place-holder-4.svg"
]

// Placeholder likes
const likes = [
  19,
  20,
  31,
  5,
  28  
]

// Also, every time gather profile picture, and put it in "assets/images/" as portrait.png

// Helper to format description nicely
function formatDescription(filename) {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/-/g, " ")       // replace dashes with spaces
}

// Build gallery array
const imagePosts = placeholders.map((file, index) => ({
  src: `./assets/images/${file}`,
  description: formatDescription(file),
  likeAmount: likes[index],
  igLink: "#",
  type: "image"
}));

const videoPosts = postVideo.map((file, index) => ({
  src: `./assets/images/${file}`,
  description: formatDescription(file),
  likeAmount: likes[index],
  igLink: "#",
  type: "video"
}));


// Combine all
const gallery = [...imagePosts, ...videoPosts]

// Write to JSON
fs.writeFileSync("./data/gallery.json", JSON.stringify(gallery, null, 2))

console.log("gallery.json generated")