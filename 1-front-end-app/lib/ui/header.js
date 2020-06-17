export default function (window, text) {
  const headerElem = window.document.createElement('header')
  const titleElem = window.document.createElement('h1')
  const wrapper = window.document.createElement('div')
  wrapper.classList.add('wrapper')
  titleElem.innerText = text || 'Facewall'

  setUpHeaderListeners(window, titleElem, wrapper)

  wrapper.appendChild(titleElem)
  headerElem.appendChild(wrapper)

  return headerElem
}

export function setUpHeaderListeners (window, titleElem, wrapper) {
  window.onscroll = () => {
    if (window.scrollY >= 10) {
      wrapper.classList.add('notOnTop')
    }
    else {
      wrapper.classList.remove('notOnTop')
    }
  }

  titleElem.addEventListener('click', () => {
    window.scrollTo(0, 0)
  })
}