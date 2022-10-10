'use strict'

const PACMAN = '\n\t\t<img class="pacman" src="img/pacman.png">\n';
var gPacman;
var gRotate= ''

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === CHERRY)updateScore(+10);
    if (nextCell === FOOD) updateScore(1);
    else if (nextCell === GHOST[0] || nextCell === GHOST[1] ||nextCell === GHOST[2]) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
        
    }else if(nextCell === CHERRY){
       gPacman.isSuper = true
    }
     if (gPacman.isSuper){
    
        for (var i = 0; i < gGhosts.length; i++) {
            var currGhosts = gGhosts[i];
            console.log(currGhosts);
            console.log(  gBoard[currGhosts.location.i][currGhosts.location.j]);
            gBoard[currGhosts.location.i][currGhosts.location.j] = GHOST[3]
            console.log(  gBoard[currGhosts.location.i][currGhosts.location.j]);
            // currGhosts = GHOST4
            
            renderCell({i:[currGhosts.location.i],j:[currGhosts.location.j]}, GHOST[3])
        }
        
        
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location,getPacmanHTML());
}

function getNextLocation(eventKeyboard) {
    
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gRotate = 'rotate(-90deg)'
            nextLocation.i--;
            break;
        case 'ArrowDown':
            gRotate = 'rotate(90deg)'
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            gRotate = 'rotate(160deg)'
            nextLocation.j--;
            break;
        case 'ArrowRight':
            gRotate = 'rotate(-360deg)'
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function getPacmanHTML() {
    return `<div style="transform:${gRotate}" class="pacman">${PACMAN}</div>`
  }