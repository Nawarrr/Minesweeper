document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')

    let width = 10
    let bombs = 20
    let squares = [] 
    // Create Board
    function createBoard() {
        // shuffle game array with bombs
        const bombsArray = Array(bombs).fill('bomb')
        const emptyArray = Array(width**2 - bombs).fill('empty')
        const unShuffledArray = emptyArray.concat(bombsArray)
        const shuffledArray = unShuffledArray.sort(()=>Math.random() - 0.5)

        for(let i=0 ; i<width*width ; i++) {

            const square = document.createElement('div')
            square.setAttribute('id' , i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
        }

        //addding numbers to the neigbhoring squares
        for (let i = 0 ; i < squares.length ; i++) {
            
        }
    }
    createBoard()
} )