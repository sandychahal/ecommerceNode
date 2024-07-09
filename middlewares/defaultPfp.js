const fs = require('fs')
const path = require('path')

const defaultPfpPath = path.join(
  __dirname,
  '../public/images/default image.jpg'
) // Adjust the path to your default profile picture

const getDefaultProfilePicture = () => {
  return fs.readFileSync(defaultPfpPath)
}

module.exports = getDefaultProfilePicture
