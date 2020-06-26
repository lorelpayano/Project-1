// Sprite generator: http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/
/******************** Global Variables ********************/
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let sprite = new Image()
sprite.src = '../images/sprite.png'
let glitter = new Image();
glitter.src = '../images/glitter-explosion-removebg-preview.png'
// let sprite = new GIF();
// sprite.load('../images/download.gif')
// sprite.src = '../images/glitter-explosion.png'
let xPositionSprite = 0
let yPositionSprite = 400
let imageX = 0
let glitterX = 0;
let imageY = 64 * 11
let animationID;
let obstacleX = 0
let obstacleY = 0
let canvasX = 0
let died = false;
let obstacles = []
let score = 0;
let speedChange = 1
let obsChange = 500

const resetBtn = document.querySelector('#reset')
resetBtn.onclick = () => {location.reload()}





setInterval(function () {
    let img = new Image();
    let random = Math.ceil(Math.random() * 11)
    img.src = `../images/${random}.png`
    obstacles.push({
        img: img,
        color: 'red',
        x: Math.random() * (canvas.width - 30),
        y: -30,
        height: 30,
        width: 30,
        speed: speedChange
    })
}, obsChange)

setInterval ( () => {
    speedChange+= .2
    // obsChange-=500
    // score++;
}, 1000)

setInterval ( () => {
    // obsChange-=500
    score++;
}, 100)


/******************** Functions ********************/
function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!died)
        ctx.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite, 64, 64)
        
    else {
        ctx.drawImage(glitter, glitterX, 0, 56.6, 59, xPositionSprite, yPositionSprite, 64, 64)
        glitterX = (glitterX + 56.625) % 906
    }
   
    boundaries()

    obstacles.forEach((obs, i) => {
        // if(animationID > 200){
        // obs.speed = 3
        // }

        ctx.fillStyle = obs.color
        // ctx.fillRect(obs.x, obs.y += 1, 30, 30);
        ctx.drawImage(obs.img, obs.x, obs.y += obs.speed, 30, 30);
        if ((xPositionSprite + 15 < obs.x ||
                xPositionSprite > obs.x + 30 ||
                yPositionSprite > obs.y + 30 ||
                yPositionSprite + 15 < obs.y) === false) {
            console.log('colision detected')
            if (died === false)
                setTimeout(() => {
                    window.location.replace("gameover.html")
                    // window.cancelAnimationFrame(animationID);
                    // alert('game over')
                    // location.reload();
                }, 2000)
            died = true;
        }
        if(score > 300){
            window.location.replace("win.html")
        }
        
        if (obs.y >= canvas.height) {
            obstacles.splice(i, 1);
        }
        
    })
    drawScore()
    // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)

}

function drawScore() {
    ctx.fillStyle = 'rgba(255,255,255, 0.9)';
    ctx.fillRect(580, 10, 120, 40)
    ctx.font = '20px Playfair Display';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 585, 35);
}

function playerMove(e) {
    if (e.key === 'ArrowRight') {
        imageY = 64 * 11
        xPositionSprite += 14
        if (imageX + 64 >= 64 * 9) {
            imageX = 0
        } else {
            imageX += 64
        }
    
    }
    if (e.key === 'ArrowDown') {
        yPositionSprite += 14
        imageY = 64 * 10
        if (imageX + 64 >= 64 * 9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    if (e.key === 'ArrowLeft') {
        imageY = 64 * 9
        xPositionSprite -= 14
        if (imageX + 64 >= 64 * 9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }
    if (e.key === 'ArrowUp') {
        imageY = 64 * 8
        yPositionSprite -= 14
        if (imageX + 64 >= 64 * 9) {
            imageX = 0
        } else {
            imageX += 64
        }
    }

}


function boundaries() {
    if(yPositionSprite > canvas.height-70){
    yPositionSprite = 400
    }
    if(yPositionSprite < canvas.height-120){
    yPositionSprite = canvas.height -120
    }
    if(xPositionSprite > canvas.width-60){
    xPositionSprite = canvas.width- 50
    }
    if(xPositionSprite < canvas.width-700){
    xPositionSprite = 0
    }
}



/******************** Script ********************/
document.onkeydown = playerMove
animationLoop()
