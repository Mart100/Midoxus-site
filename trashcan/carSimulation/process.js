function tick() {
  moving()

}

function moving() {
  let moved = false

  let speed = 100/grid.camera.zoom

  if(keys[87] || keys[38]) { // north
    grid.move({x:0,y:speed})
    moved = true
  }
  if(keys[68] || keys[39]) { // east
    grid.move({x:-speed,y:0})
    moved = true
  }
  if(keys[83] || keys[40]) { // south
    grid.move({x:0,y:-speed})
    moved = true
  }
  if(keys[65] || keys[37]) { // west
     grid.move({x:speed,y:0})
    moved = true
  }

  if(!moved) return

  displayTileInfo()
  debugPanel.add('posX', grid.camera.pos.x)
  debugPanel.add('posY', grid.camera.pos.y)
}