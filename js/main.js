'use strict'

const WALL = ''
const FOOD = '🔘'
const EMPTY = ' '
const CHERRY = '\n\t\t<img class="icon" src="img/5.png">\n'

var gLevel = {
    SIZE: 8,
    MINES: 2
}

var gGame = {
    score: 0,
    isOn: false
}
var gIntervalCharryObj
var charryObj;
var gBoard


function initGame() {
    
    gBoard = buildBoard()
    console.log(' gBoard', gBoard)
    makeGhost()
    createPacman(gBoard)
    console.log(' gPacman', gPacman)
    createGhosts(gBoard)

    gIntervalCharryObj = setInterval(createCherry, 1500)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    var board = []

    board = createMat(gLevel.SIZE, gLevel.SIZE)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === board.length - 1 ||
                j === 0 || j === board.length - 1 ||
                (j === 3 && i > 4 && i < board.length - 2)) {
                board[i][j] = WALL
            }

        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]


            var cellClass = 'cell-' + i + '-' + j;
            if (currCell === WALL) cellClass += ' wall';
            strHTML += `<td class="${cellClass}">${currCell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    console.log(gGame.score);
}

function createCherry() {
    var randomI = getRandomInt(0, gBoard.length - 1)
    var randomJ = getRandomInt(0, gBoard.length - 1)
    charryObj = {
        location: {
            i: randomI,
            j: randomJ
        },
        currCellContent: CHERRY
    }
    var randomCell = gBoard[charryObj.location.i][charryObj.location.j]
    if (randomCell ===  FOOD) {
        //MODAL
        randomCell = charryObj.currCellContent
        gBoard[charryObj.location.i][charryObj.location.j] = charryObj.currCellContent
        console.log(gBoard);

        //DOM
        var location = { i: charryObj.location.i, j: charryObj.location.j }
        renderCell(location, getCherryHTML())

    }

}



function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    gPacman.isSuper = false
    gGame.score = 0
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCharryObj)

    var elRestart = document.querySelector('.restart')
    elRestart.style.display = 'block'
    var elRestart = document.querySelector('.win-container')
    elRestart.querySelector('.win').innerHTML = 'GAME OVER '
    elRestart.style.display = 'block'
}























function movePacman(event) {

}