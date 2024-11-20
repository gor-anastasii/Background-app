const openBtn = document.querySelector('.open-btn')
const crossBtn = document.querySelector('#cross-btn')
const settingModal = document.querySelector('.setting-container')

crossBtn.addEventListener('click', () => {
    settingModal.style.transform = 'translate(400px)'
    openBtn.style.transform = 'translate(0px)'
})

openBtn.addEventListener('click', () => {
    settingModal.style.transform = 'translate(0px)'
    openBtn.style.transform = 'translate(300px)'
    openBtn.style.transition = 'all 0.8s ease-in-out 0s'
})

const app = document.querySelector('.app-container')
const changeBtn = document.querySelector('#change-btn')

const firstColor = document.getElementById('fc')
const secondColor = document.getElementById('sc')

const firstCircle = document.querySelector('.fc')
const secondCircle = document.querySelector('.sc')

const checkbox = document.getElementById('checkbox')

let newColor1 = '45F0DC'
let newColor2 = 'D538EF'

let direction = 90

firstColor.addEventListener('click', copyText)
secondColor.addEventListener('click', copyText)

changeBtn.addEventListener('click', () => {
    if(!checkbox.checked){
        newColor1 = decToHex(getRandomCode())
        exampleArr.unshift({color: newColor1, check: false})
    }
    newColor2 = decToHex(getRandomCode())  
    exampleArr.unshift({color: newColor2, check: false})
    updateBackground(newColor1, newColor2, direction)
    createColorArray(exampleArr)
})

const directionContainer = document.querySelector('.direction-btns')
const directionBtns = [...document.querySelectorAll('.direction-btns > div')]

const directionRule = [315, 0, 45, 270, 'radial', 90, 225, 180, 135]

directionContainer.addEventListener('click', e => {
    let divIndex = directionBtns.findIndex(item  => item.classList.contains('active-direction'))
 
    if(divIndex != -1) {
        directionBtns[divIndex].classList.remove('active-direction')
    }

    if(e.target.closest("DIV") !== directionContainer){
        e.target.closest('DIV').classList.add('active-direction')

        let directionIndex = directionBtns.findIndex(item => e.target.closest('DIV') === item)
        direction = directionRule[directionIndex]

        updateBackground(newColor1, newColor2, direction)
    }
})

const colorInput = document.getElementById('input')
const checkMark = document.getElementById('check-mark')
const regexp = /^[0-9A-Fa-f]+$/

const colorArray = document.querySelector('.color-array')
let colorArrayBtns = [...document.querySelectorAll('.color-array > div')]
let exampleArr = [{color: '45F0DC', check: false}, {color: 'D538EF', check: false},]  

colorArray.addEventListener('click', e => {
    console.log(e.target.getAttribute('data'))
    if(e.target.getAttribute('data') !== null){
        newColor1 = e.target.getAttribute('data')
        updateBackground(newColor1, newColor2, direction)
    }
})

function createColorArray(arr){    
    arr.forEach(item => {
        if(!item.check){
            const template = `<div class="color" style="background: #${item.color};" data="${item.color}"></div>`
            colorArray.insertAdjacentHTML('afterbegin', template.trim())
            item.check = true
            colorArrayBtns = [...document.querySelectorAll('.color-array > div')]
        }
    })
    console.log(colorArrayBtns)

    if (colorArrayBtns.length > 10) {
        colorArrayBtns.slice(10).forEach((btn) => btn.remove());
    }
}

createColorArray(exampleArr)


checkMark.addEventListener('click', () => {
    let length = colorInput.value.length
    if(regexp.test(colorInput.value) && (length == 6 || length == 3 || length == 2)){
        length == 2 ? newColor1 = colorInput.value.toUpperCase().repeat(3) : 
        length == 3 ? newColor1 = colorInput.value.toUpperCase().repeat(2) : 
        newColor1 = colorInput.value.toUpperCase()


        exampleArr.unshift({color: newColor1, check: false})
        updateBackground(newColor1, newColor2, direction)
        createColorArray(exampleArr)
    }
    colorInput.value = ''
})

function copyText(){
    let textToCopy = this.innerText
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
        this.style.color = '#c5c5c5';
        setTimeout(() => {
            this.style.color = '';
        }, 300);
    })
}

function updateBackground(color1, color2, direction){
    if(direction == 'radial'){
        app.style.background = `radial-gradient(#${color1}, #${color2})`
    } else {
        app.style.background = `linear-gradient(${direction}deg, #${color1}, #${color2})`
    }

    firstColor.innerText = '#' + color1.toString().toUpperCase()
    secondColor.innerText = '#' + color2.toString().toUpperCase()

    firstCircle.style.backgroundColor = `#${color1}`
    secondCircle.style.backgroundColor = `#${color2}`
}

function decToHex(n) { 
    return Number(n).toString(16).padStart(6, '0'); 
} 

function hexTodec (hex) { 
    return parseInt(hex, 16); 
}

function getRandomCode(){
    return Math.floor(Math.random() * 16777214);
}
