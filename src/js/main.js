import './vendor';

import IMask from "imask";

function scrollToTarget(selector) {
    const target = document.querySelector(selector)
    if (target) {
        const headerHeight = 100
        const targetPosition = target.getBoundingClientRect().top
        const offsetPosition = targetPosition + window.scrollY - headerHeight

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    } else {
        console.warn(`Элемент "${selector}" не найден!`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');

    // Mobile menu
    const menuBtn = document.querySelector('.header__menu-btn');
    menuBtn.addEventListener('click', () => {
        if (header.classList.contains('header--menu-shown')) {
            header.classList.remove('header--menu-shown')
            document.body.style.overflow = ''
        }
        else {
            header.classList.add('header--menu-shown')
            document.body.style.overflow = 'hidden'
        }
    })

    // Menu Scroll
    const linklist = document.querySelectorAll('.js-scroll-link')
    linklist.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            header.classList.remove('header--menu-shown')
            document.body.style.overflow = ''
            const target = e.target.getAttribute('href')
            scrollToTarget(target)
        })
    })

    // Phone mask
    const phoneInputsList = document.querySelectorAll('input[type="tel"]')
    if (phoneInputsList.length) {
        phoneInputsList.forEach((phoneInput) => {
            IMask(phoneInput, {
                mask: [
                    {
                        mask: '+7 (000) 000-00-00'
                    },
                ]
            })
        })
    }

    // Form validation
    const forms = document.querySelectorAll('form')

    const checkRequredFields = (form) => {
        const inputsList = form.querySelectorAll('input[required]')
        let hasFormEmptyFields = false;
        if (inputsList.length) {
            inputsList.forEach(input => {
                if (!input.value.trim().length) {
                    hasFormEmptyFields = true;
                }
            })
        }
        console.log(hasFormEmptyFields)
        return hasFormEmptyFields;
    }

    if (forms.length) {
        forms.forEach((form) => {
            const inputsList = form.querySelectorAll('input[required]')
            const submitBtn = form.querySelector('button[type="submit"]')
            if (inputsList.length) {
                inputsList.forEach(input => {
                    input.addEventListener('input', () => {
                        if (!checkRequredFields(form)) {
                            submitBtn.removeAttribute('disabled')
                        }
                        else {
                            submitBtn.disabled = true
                        }
                    })
                })
            }
        })
    }
})
