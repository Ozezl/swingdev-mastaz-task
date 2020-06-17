export default function createModal (window, root, img, email, controller) {
    const backdrop = createBackdrop(window)
    const modalBox = createModalBox(window, img, email)

    const modal = window.document.createElement('div')
    modal.classList.add('modal')

    const button = modalBox.children[0]

    setUpModalListeners(backdrop, button, modal, controller)

    modal.appendChild(backdrop)
    modal.appendChild(modalBox)

    root.appendChild(modal)
}

export function setUpModalListeners (backdrop, button, modal, controller) {
    backdrop.addEventListener('click', () => {
        removeModal(modal, controller)
    })

    button.addEventListener('click', () => {
        removeModal(modal, controller)
    })
}

export function removeModal (modal, controller) {
    controller.toggle('is-highlighted')
    modal.remove()
}

export function createBackdrop (window) {
    const backdrop = window.document.createElement('div')
    backdrop.classList.add('backdrop')
    
    return backdrop
}

export function createModalBox (window, img, email) {
    const modalBox = window.document.createElement('div')
    modalBox.classList.add("modalBox")

    const button = window.document.createElement('div')
    button.classList.add('close')

    const buttonText = window.document.createElement('SPAN')
    buttonText.innerHTML += '+'

    const avatar = window.document.createElement('div')
    avatar.classList.add('avatar')

    const text = window.document.createElement('div')
    text.classList.add('text')

    const description = window.document.createElement('div')
    description.classList.add('description')
    description.innerHTML += 'Your generated email:'

    const mail = window.document.createElement('div')
    mail.classList.add('mail')
    mail.innerHTML += email

    button.appendChild(buttonText)

    avatar.appendChild(img)

    text.appendChild(description)
    text.appendChild(mail)
    
    modalBox.appendChild(button)
    modalBox.appendChild(avatar)
    modalBox.appendChild(text)

    return modalBox
}