// Sprite generator: http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
/******************** Global Variables ********************/
const canvas = document.querySelector('#canvas')
const cxt = canvas.getContext('2d')
let sprite = new Image()
sprite.src = '../images/sprite.png'
let xPositionSprite = 0
let yPositionSprite = 0
let imageX = 0
let imageY = 64*11
let animationID;

let canvasX = 0

/******************** Functions ********************/
function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite, 64, 64) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}

function playerMove(e) {
    if(e.key === 'ArrowRight') {
        imageY = 64*11
        xPositionSprite += 5
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    if(e.key === 'ArrowDown') {
        console.log('downnnnnnn')
        yPositionSprite += 5
        imageY = 64*10
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    if(e.key === 'ArrowLeft') {
        imageY = 64*9
        xPositionSprite -= 5
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    if(e.key === 'ArrowUp') {
        imageY = 64*8
        yPositionSprite -= 5
        if(imageX + 64 >= 64*9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
}


/******************** Script ********************/
document.onkeydown = playerMove
animationLoop()