'use strict'

const GHOST1 = '\n\t\t<img class="icon" src="img/1.png">\n'
const GHOST2 ='\n\t\t<img class="icon" src="img/2.png">\n'
const GHOST3 ='\n\t\t<img class="icon" src="img/3.png">\n'
const GHOST4 ='\n\t\t<img class="icon" src="img/4.png">\n'

const GHOST =[]

var gGhosts = []
var gIntervalGhosts

function makeGhost(){

    for (var i = 1; i < 5; i++) {
        var ghost = `\n\t\t<img class="icon" src="img/${i}.png">\n`
        GHOST.push(ghost)
    }
    console.log('GHOST', GHOST)
}

function createGhost(board,index) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: GHOST[index]
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST[index]
}

function createGhosts(board) {
    gGhosts = []
    for(var i = 0; i < 3; i++){
        createGhost(board,i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
    console.log(gGhosts);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost, i)
    }
}

function moveGhost(ghost, index){
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST[0]) return
    if (nextCell === GHOST[1]) return
    if (nextCell === GHOST[2]) return
    if (nextCell === PACMAN) {
        gameOver()
        return
    }
    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
     // DOM
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST[index]

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost,index))

}

function getGhostHTML(ghost,index) {
    return `<span>${GHOST[index]}</span>`
}

function getCherryHTML() {
    return `<span>${CHERRY}</span>`
}


function getMoveDiff(){
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}
