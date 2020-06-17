import generateGravatarURL from '../gravatar-url'
import createModal from './modal'


const IMAGE_SIZE = 64
const EXTRA_ROWS = 5

export function createImages (window, numberOfImages, mainRoot) {
  return Array.apply(null, Array(numberOfImages)).map(() => gravatarImage(window, mainRoot))
}

export function gravatarImage (window, mainRoot) {
  const img = new window.Image()
  const generatedURL = generateGravatarURL(IMAGE_SIZE)
  img.src = generatedURL[0]
  const imgRef = img.cloneNode(true)
  const email = generatedURL[1]

  img.addEventListener('click', (e) => {
    const controller = e.target.classList
    controller.toggle('is-highlighted')
    
    createModal(window, mainRoot, imgRef, email, controller)
  })

  return img
}

export function calculateNumberOfImages (window, root) {
  const currentImages = window.document.querySelectorAll('img').length

  const width = root.offsetWidth + window.scrollX
  const height = window.innerHeight + window.scrollY

  const imagesPerRow = Math.floor(width / IMAGE_SIZE)
  const imageRows = Math.floor(height / IMAGE_SIZE) + EXTRA_ROWS

  return imagesPerRow * imageRows - currentImages
}

export default function (window, root, mainRoot) {
  const imagesToCreate = calculateNumberOfImages(window, root)

  if (imagesToCreate <= 0) {
    return
  }

  createImages(window, imagesToCreate, mainRoot).forEach((image) => {
    root.appendChild(image)
  })
}
