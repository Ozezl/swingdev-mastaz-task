import header from './header'
import gravatars from './gravatars'
import createModalBox, { createBackdrop } from './modal'

export function setupListeners (window, gravatarContainer, root) {
  window.addEventListener('scroll', () => {
    gravatars(window, gravatarContainer, root)
  })

  window.addEventListener('resize', () => {
    gravatars(window, gravatarContainer, root)
  })
}

export function init (window, root) {
  root.appendChild(header(window))

  const gravatarContainer = window.document.createElement('div')
  gravatarContainer.classList.add('gravatars')

  root.appendChild(gravatarContainer)

  gravatars(window, gravatarContainer, root)

  setupListeners(window, gravatarContainer, root)
}
