const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board');

let time = 10
let score = 0
const colors = ['#FF7F50', '#6A5ACD', '#FF00FF', '#40E0D0', '#FFE4E1', '#2F4F4F', '#800080']



const setTime = (value) => {
    timeEl.innerHTML = value < 10 ? `00:0${value}` : `00:${value}`
}

const finishGame = () => {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span> </h1>`
}

const getRandomSize = (max, min) => {
    return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor() {
    const findIndex = Math.floor(Math.random() * colors.length)
    return colors[findIndex]
}

const createFinishCircle = () => {
    const circle = document.createElement('div')
    circle.classList.add('circle')

    const color = getRandomColor()
    const size = getRandomSize(10, 20)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomSize(0, width - size)
    const y = getRandomSize(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color

    board.append(circle)
}

const decreaseTime = () => {
    
    if (time === 0) {
        finishGame()
    } else {
        let current = --time 
        setTime(current)
    }   
}

const startGame = () => {
    setInterval(decreaseTime, 1000)
    createFinishCircle()
    setTime(time)
}

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up')
})


timeList.addEventListener('click', event => {
    const td = event.target
    if(td.classList.contains('time-btn')) {
        time = +td.getAttribute('data-time')
        screens[1].classList.add('up')  
        startGame()
    }
})

board.addEventListener('click', event => {
    const target = event.target.classList.contains('circle')
    if (target) {
        score++
        event.target.remove()
        createFinishCircle()
    }
})

