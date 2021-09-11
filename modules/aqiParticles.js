const canvas = document.getElementById('canvas')
// Set canvas size based on current display dims
if (window.innerWidth < 600) {
  canvas.width = 300
} else {
  canvas.width = 400
}
canvas.height = 200
const ctx = canvas.getContext('2d');

// // Create circular clipping region
// // Note: Currently not using; initially had the particles in a circle and change later
// ctx.beginPath();
// ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, 0, Math.PI * 2);
// ctx.clip();


// Particle class - for the particulate matter
class Particle {
  constructor(x, y, dx, dy, size, colour) {
    this.x = x
    this.y = y
    this.dx = dx // x-velocity
    this.dy = dy // y-velocity
    this.size = size 
    this.colour = colour
  }
  // Draw particle 
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false)
    // Comment arc above and uncomment below to try with little rects instead of circles
    // ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fillStyle = this.colour
    ctx.fill()
    ctx.globalAlpha = 0.8;
  }
  // Edge detection - make particle change direction if it hits edge of canvas 
  edge() {
    if (this.x > canvas.width || this.x < 0) {
      this.dx *= -1 
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dy *= -1
    }
  }
  // Update position of particles mased on velocity and edge detection
  update() {
    this.edge()
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Create particles array 
let particlesArray = []
function initParticles(numParticles) {
  particlesArray = [] // Clear array as we update it dynamically based on num particles
  for (let i = 0; i < numParticles; i++) {
    const size = (Math.random() * 3) + 2
    // Initialise the particles at random (x, y) positions
    const x = Math.random() * ((canvas.width - size*2) - (size*2)) + size*2
    const y = Math.random() * ((canvas.height - size*2) - (size*2)) + size*2
    const dx = Math.random()*0.5;
    const dy = Math.random()*0.5;
    const colour = '#cf6c07' //'#db7c26'

    particlesArray.push(new Particle(x, y, dx, dy, size, colour))
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const particle of particlesArray) {
      particle.draw()
    }
  }
}

// Animate the particles 
function animateParticles() {
  requestAnimationFrame(animateParticles)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const particle of particlesArray) {
    particle.update()
  }
}


export { canvas, initParticles, animateParticles }