const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7
const keys = {
    // p1
    'w' : {isPressed : false},
    'a' : {isPressed : false},
    's' : {isPressed : false},
    'd' : {isPressed : false},
    // p2
    'ArrowUp' : {isPressed : false},
    'ArrowLeft' : {isPressed : false},
    'ArrowDown' : {isPressed : false},
    'ArrowRight' : {isPressed : false}
}

class Sprite {
    constructor({position, velocity, color='red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 100
        this.color = color
        this.lastKey
        this.isAttacking = false
        this.attackBox = {
            position,
            width : 100,
            height : 50,
            offset,
            color : 'green'
        }
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // Weapon
        c.fillStyle = this.attackBox.color
        c.fillRect(this.attackBox.position.x + this.attackBox.offset.x, this.attackBox.position.y + this.attackBox.offset.y, this.attackBox.width, this.attackBox.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else { 
            this.velocity.y += gravity
        }
    }
}

// Players
const p1 = new Sprite({
    position: {
        x: 100, y: 50
    },
    velocity: {
        x: 0, y: 0
    },
    offset: {
        x: 0, y:0
    }
})

const p2 = new Sprite({
    position: {
        x: 300, y: 100
    },
    velocity: {
        x: 0, y: 0
    },
    offset: {
        x: -50, y:0
    }
})


// Animation Frame
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    p1.update()
    p2.update()

    // Free movement
    if(keys.a.isPressed && p1.lastKey === 'a') {
        p1.velocity.x = -5
    } else if (keys.d.isPressed && p1.lastKey === 'd') {
        p1.velocity.x = 5
    }

    if(keys.ArrowLeft.isPressed && p2.lastKey === 'ArrowLeft') {
        p2.velocity.x = -5
    } else if (keys.ArrowRight.isPressed && p2.lastKey === 'ArrowRight') {
        p2.velocity.x = 5
    } 
}

animate()

// Event Listeners
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'w':
            p1.velocity.y = -20
            keys.w.isPressed = true
            p1.lastKey = 'w'
            break
        case 'a':
            keys.a.isPressed = true
            p1.lastKey = 'a'
            break
        case 's':
            p1.isAttacking = true
            keys.s.isPressed = true
            p1.lastKey = 's'
            break
        case 'd':
            keys.d.isPressed = true
            p1.lastKey = 'd'
            break
        // Player 2
        case 'ArrowUp':
            p2.velocity.y = -20
            keys.ArrowUp.isPressed = true
            p2.lastKey = 'ArrowUp'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.isPressed = true
            p2.lastKey = 'ArrowLeft'
            break
        case 'ArrowDown':
            p2.isAttacking = true
            keys.ArrowDown.isPressed = true
            p2.lastKey = 'ArrowDown'
            break
        case 'ArrowRight':
            keys.ArrowRight.isPressed = true
            p2.lastKey = 'ArrowRight'
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'w':
            keys.w.isPressed = false
            break
        case 'a':
            p1.velocity.x = 0
            keys.a.isPressed = false
            break
        case 's':
            keys.s.isPressed = false
            break
        case 'd':
            p1.velocity.x = 0
            keys.d.isPressed = false
            break
        default:
            // p1.velocity.x = 0
            case 'ArrowUp':
                keys.ArrowUp.isPressed = false
                break
            case 'ArrowLeft':
                p2.velocity.x = 0
                keys.ArrowLeft.isPressed = false
                break
            case 'ArrowDown':
                keys.ArrowDown.isPressed = false
                break
            case 'ArrowRight':
                p2.velocity.x = 0
                keys.ArrowRight.isPressed = false
                break
    }
})