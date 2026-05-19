// This file will generate new featured images from the existing gallery.js every 3 days - no api needed here

const fs = require("fs")
const path = require("path")

const FEATURED_DIR = path.join(__dirname, "../assets/images/featured")
const OUTPUT_FILE = path.join(__dirname, "../data/featured.json")

// Main function

function run() {
    // Read all jpg files from folder
    const allImages = fs.readdirSync(FEATURED_DIR)
        .filter(f => f.toLowerCase().endsWith(".jpg"))

    if (allImages.length < 3) {
        console.error("Need at least 3 jpg images to run")
        process.exit(1)
    }

    // Shuffle
    for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]]
    }

    // Take first 3
    const selected = allImages.slice(0, 3).map(f => `./assets/images/featured/${f}`)

    fs.mkdirSync(path.join(__dirname, "../data"), { recursive: true })

    // Write to JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ images: selected }, null, 2))

    console.log("featured.json generated:", selected)
}

run()