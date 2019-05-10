function process() {
  // set canvas sight alright
  if(canvas.width  != window.innerWidth)  canvas.width  = window.innerWidth
  if(canvas.height != window.innerHeight) canvas.height = window.innerHeight

  soundCooldown--

  // loop trough balls
  for(let index in balls) {
    let ball = balls[index]

    // cooldown
    ball.cooldown--
    // move ball
    ball.move()
    // collisions
    ball.checkWallCollision() // wall collision
    for(let indexx in balls) ball.checkBallCollision(balls[indexx]) // ball collisions
  }
  
}