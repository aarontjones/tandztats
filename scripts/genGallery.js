const fs = require("fs")

// Your placeholder images
const placeholders = [
  "place-holder-1.svg",
  "place-holder-2.png",
  "place-holder-3.png"
]

// Helper to format description nicely
function formatDescription(filename) {
  return filename
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/-/g, " ")       // replace dashes with spaces
}

// Build gallery object
const gallery = {
  flash: placeholders.map(file => ({
    src: `./assets/images/${file}`,
    description: formatDescription(file)
  })),

  applied: placeholders.map(file => ({
    src: `./assets/images/${file}`,
    description: formatDescription(file)
  })),

  healed: placeholders.map(file => ({
    src: `./assets/images/${file}`,
    description: formatDescription(file)
  }))
}

// Write to JSON
fs.writeFileSync("./data/gallery.json", JSON.stringify(gallery, null, 2))

console.log("gallery.json generated ✅")