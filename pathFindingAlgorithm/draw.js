function frame() {
    setTimeout(() => { requestAnimationFrame(frame) }, drawSpeed)
    if(settings.view.hideEverything) return
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // loop trough lines
    ctx.strokeStyle = 'black'
    for(let num in drawing.lines) {
        let line = drawing.lines[num]
        ctx.lineWidth=line.width
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.stroke()
    }
    // current line
    if(drawing.line.show) {
        ctx.lineWidth=drawing.size
        ctx.beginPath()
        ctx.moveTo(drawing.line.start.x, drawing.line.start.y)
        ctx.lineTo(input.mouse.pos.x, input.mouse.pos.y)
        ctx.stroke()
    }

    // start
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)'
    ctx.fillRect(25, 25, 100, 100) 

    drawFinishCube()

    // mouse thing
    if(phase == 'drawing') {
        ctx.lineWidth=2
        ctx.beginPath()
        ctx.rect(input.mouse.pos.x-drawing.size/2, input.mouse.pos.y-drawing.size/2, drawing.size, drawing.size)
        ctx.stroke()
    }

    // draw fitnessdistance
    if(phase == 'loading' || settings.view.showFitnessGrid) {
        for(let x=0;x<Math.round(canvas.width/10);x++) {
            for(let y=0;y<Math.round(canvas.height/10);y++) {
                if(distanceGrid[x][y] == 0) continue
                ctx.fillStyle = `rgba(${distanceGrid[x][y]/algorithm.topDistance*255}, 0, ${255-distanceGrid[x][y]/algorithm.topDistance*255}, 0.4)`
                ctx.fillRect(x*10, y*10, 10, 10)
            }
        }
    }

    // draw cubes
    if(phase == 'evolution') {
        // normal theme
        if(!settings.christmasTheme) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${settings.view.cubeTrans})`
            ctx.lineWidth = 10
            let viewAmount = algorithm.populationSize-1
            if(settings.view.viewFirst) viewAmount = 0
            for (var i=viewAmount; i >= 0; i--) {
                if(i == 0) ctx.fillStyle = 'rgba(255, 255, 255, 1)'
                else if(i < algorithm.populationSize*algorithm.rates.best) ctx.fillStyle = `rgba(255, 0, 0, ${settings.view.cubeTrans})`
                else if(i < algorithm.populationSize*algorithm.rates.best  +  algorithm.populationSize*algorithm.rates.mutation) ctx.fillStyle = `rgba(0, 255, 0, ${settings.view.cubeTrans})`
                else if(i < algorithm.populationSize*algorithm.rates.best  +  algorithm.populationSize*algorithm.rates.mutation  +  algorithm.populationSize*algorithm.rates.crossover) ctx.fillStyle = `rgba(0, 165, 255, ${settings.view.cubeTrans})`
                else ctx.fillStyle = 'rgba(0, 0, 255, 1)'


                let cube = algorithm.population[i]
                ctx.beginPath()
                ctx.rect(cube.pos.x, cube.pos.y, 30, 30)
                ctx.fill()
                if(settings.view.cubeStroke) ctx.stroke()
            }
        }
        // christmasTheme
        else if(settings.christmasTheme) {
            ctx.drawImage(images.sheep, 90, 130, 50, 60, 10, 10, 50, 60);
            ctx.strokeStyle = `rgba(0, 0, 0, ${settings.view.cubeTrans})`
            ctx.lineWidth = 10
            let viewAmount = algorithm.populationSize-1
            if(settings.view.viewFirst) viewAmount = 0
            for (var i=viewAmount; i >= 0; i--) {
                if(i == 0) ctx.fillStyle = 'rgba(255, 255, 255, 1)'
                else if(i < algorithm.populationSize*algorithm.rates.best) ctx.fillStyle = `rgba(255, 0, 0, ${settings.view.cubeTrans})`
                else if(i < algorithm.populationSize*algorithm.rates.best  +  algorithm.populationSize*algorithm.rates.mutation) ctx.fillStyle = `rgba(0, 255, 0, ${settings.view.cubeTrans})`
                else if(i < algorithm.populationSize*algorithm.rates.best  +  algorithm.populationSize*algorithm.rates.mutation  +  algorithm.populationSize*algorithm.rates.crossover) ctx.fillStyle = `rgba(0, 165, 255, ${settings.view.cubeTrans})`
                else ctx.fillStyle = 'rgba(0, 0, 255, 1)'


                let cube = algorithm.population[i]
                ctx.beginPath()
                ctx.rect(cube.pos.x, cube.pos.y, 30, 30)
                ctx.fill()
                if(settings.view.cubeStroke) ctx.stroke()
            }
        }
    }
}







function drawFinishCube() {
        // finnish
    /* b1 w1 b2 w2
       w3 b3 w4 b4
       b5 w5 b6 w6
       w7 b7 w8 b8
    */
   ctx.fillStyle = 'rgba(0, 0, 0, 1)'
   ctx.fillRect(screen.width-25-100, screen.height-25-100, 25, 25) //b1
   ctx.fillRect(screen.width-25-50,  screen.height-25-100, 25, 25) //b2
   ctx.fillRect(screen.width-25-75,  screen.height-25-75, 25, 25) //b3
   ctx.fillRect(screen.width-25-25,  screen.height-25-75, 25, 25) //b4
   ctx.fillRect(screen.width-25-100, screen.height-25-50, 25, 25) //b1
   ctx.fillRect(screen.width-25-50,  screen.height-25-50, 25, 25) //b2
   ctx.fillRect(screen.width-25-75,  screen.height-25-25, 25, 25) //b3
   ctx.fillRect(screen.width-25-25,  screen.height-25-25, 25, 25) //b4

   ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
   ctx.fillRect(screen.width-25-75, screen.height-25-100, 25, 25) //w1
   ctx.fillRect(screen.width-25-25,  screen.height-25-100, 25, 25) //w2
   ctx.fillRect(screen.width-25-100,  screen.height-25-75, 25, 25) //w3
   ctx.fillRect(screen.width-25-50,  screen.height-25-75, 25, 25) //w4
   ctx.fillRect(screen.width-25-75, screen.height-25-50, 25, 25) //w1
   ctx.fillRect(screen.width-25-25,  screen.height-25-50, 25, 25) //w2
   ctx.fillRect(screen.width-25-100,  screen.height-25-25, 25, 25) //w3
   ctx.fillRect(screen.width-25-50,  screen.height-25-25, 25, 25) //w4
}