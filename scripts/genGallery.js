const fs = require("fs")
const { type } = require("os")
const axios = require("axios")
const path = require("path")

// Updating profile picture
async function updateProfilePic(url) {
  try {
    const response = await axios ({
      url,
      method: "GET",
      responseType: "stream"
    })

    const outputPath = path.join(__dirname, "./assets/images/portrait.jpg")
    const writer = fs.createWriteStream(outputPath)

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve)
      writer.on("error", reject)
    })
  } catch (err) {
    console.error("Failed to download profile pic")
  }
}

async function run() {
  // this is where instagram api function will go for updating profile pic

  // const instagramData = {profilePicURL: "#"}
  // await updateProfilePic(instagramData.profilePicURL)
  // console.log("Profile Pic Updated")

  // Load in instagram posts via api - THESE ARE PLACEHOLDERS FOR NOW
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
      id: 2,
      igLink: "#"
    },
    {
      file: "place-holder-3.png",
      likes: 13,
      id: 3,
      igLink: "#"
    },
    {
      file: "place-holder-4.svg",
      likes: 52,
      id: 4,
      igLink: "#"
    },
    {
      file: "place-holder-1.svg",
      likes: 12,
      id: 5,
      igLink: "#"
    },
    {
      file: "place-holder-2.png",
      likes: 152,
      id: 6,
      igLink: "#"
    },
    {
      file: "place-holder-3.png",
      likes: 13,
      id: 7,
      igLink: "#"
    },
    {
      file: "place-holder-4.svg",
      likes: 52,
      id: 8,
      igLink: "#"
    },
    {
      file: "place-holder-1.svg",
      likes: 12,
      id: 9,
      igLink: "#"
    },
    {
      file: "place-holder-2.png",
      likes: 152,
      id: 10,
      igLink: "#"
    },
    {
      file: "place-holder-3.png",
      likes: 13,
      id: 11,
      igLink: "#"
    },
    {
      file: "place-holder-4.svg",
      likes: 52,
      id: 12,
      igLink: "#"
    }
  ]

  // If Video, put them into post videos, along with their ID
  const postVideo = [
    {
      file: "place-holder-5.mp4",
      likes: 23,
      id: 13,
      igLink: "#"
    }
  ]

  // If Carousel, Put them into post Carousel, along with their ID
  const postCarousel = [
    {
      file: ["place-holder-2.png", "place-holder-3.png"],
      likes: 42,
      id: 14,
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
  const videoPosts = postVideo.map((post) => ({
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
    .sort((a, b) => a.id - b.id) // newest to oldest - could be useful

  // Write to JSON
  fs.writeFileSync("./data/gallery.json", JSON.stringify(gallery, null, 2))

  console.log("gallery.json generated")

}

run()