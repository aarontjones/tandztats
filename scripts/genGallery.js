const fs = require("fs")

// Load in instagram api

// If post is a normal image
const postImage = [

]

// If post is video
const postVideo = [

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
  5  
]

// Also, every time gather profile picture, and put it in "assets/images/" as portrait.png

// Helper to format description nicely
function formatDescription(filename) {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/-/g, " ")       // replace dashes with spaces
}

// Build gallery array
const gallery = placeholders.map((file, index) => ({
  src: `./assets/images/${file}`,
  description: formatDescription(file),
  likeAmount: likes[index],
  igLink: "#"
}));

// Write to JSON
fs.writeFileSync("./data/gallery.json", JSON.stringify(gallery, null, 2))

console.log("gallery.json generated")