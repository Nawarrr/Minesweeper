document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let flags = 0
    let width = 10
    let bombs = 20
    let squares = []
    let isGameOver = false
    // Create Board
    function createBoard() {
        // shuffle game array with bombs
        const bombsArray = Array(bombs).fill('bomb')
        const emptyArray = Array(width ** 2 - bombs).fill('empty')
        const unShuffledArray = emptyArray.concat(bombsArray)
        const shuffledArray = unShuffledArray.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {

            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
        // Click
            square.addEventListener('click' , function(e) {
                click(square)
            })
            // CTRL + Left Click
            square.oncontextmenu = function(e) {
                e.preventDefault()
                addFlag(square)
            }
        }






        //addding numbers to the neigbhoring squares
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)
            if (squares[i].classList.contains('empty')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) { total++ } // bomb on the left
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) { total++ } //bomb on the right upper
                if (i > 10 && squares[i - width].classList.contains('bomb')) { total++ } // bomb above
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) { total++ } //bomb on the left upper
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) { total++ } //bomb on the right
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) { total++ } // bomb right lower
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) { total++ } //bomb left lower
                if (i < 90 && squares[i + width].classList.contains('bomb')) { total++ } // bomb below
                squares[i].setAttribute('data' , total)
                console.log(squares[i])

            }

        }
    }
    createBoard()

    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombs)) {
          if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = ' 🚩'
            flags ++
            
            checkForWin()
          } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags --
            
          }
        }
      }

//click on square actions
function click(square){
    let currentId = square.id

    if (isGameOver) {return}

    if (square.classList.contains('checked') || square.classList.contains('flag')) { return}

    if (square.classList.contains('bomb')){
        gameOver()
    } else {
        let total = square.getAttribute('data')
        if (total != 0){
            square.classList.add('checked')
            square.innerHTML = total
            return
        }
        checkSquare(square,currentId)           
        square.classList.add('checked')
        
    } 
}

//check neighboursquare
function checkSquare(square, currentId){
    const isLeftEdge = (currentId % width ===0)
    const isRightEdge = (currentId % width === width - 1)

    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge){
            const newId = squares[parseInt(currentId)-1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 9 && !isRightEdge) {
            const newId =   squares[parseInt(currentId)+1 - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 10){
            const newId =   squares[parseInt(currentId) - width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 11 && !isLeftEdge) {
            const newId = squares[parseInt(currentId)-1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 98 && !isRightEdge) {
            const newId = squares[parseInt(currentId) + 1 ].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 90 && !isLeftEdge) {
            const newId = squares[parseInt(currentId)-1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 88 && !isRightEdge) {
            const newId = squares[parseInt(currentId) -1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId < 90 ) {
            const newId = squares[parseInt(currentId) + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
    }, 10)
}
function gameOver(square) {
    console.log('Game Over')
    isGameOver = true
    // show bombs
    squares.forEach(square => {
        if (square.classList.contains('bomb')) {
          square.innerHTML = '💣'
    }
}) 
}




function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombs) {
        alert('YOU WIN!')
        isGameOver = true
      }
    }
  }








})