const fs = require("fs")

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