const translate = document.querySelector('.translate')

translate.addEventListener('click', () => {
    document.querySelector('.more').style.display = 'block'
})
translate.addEventListener('mouseleave', () => {
    document.querySelector('.more').style.display = 'none'
})
