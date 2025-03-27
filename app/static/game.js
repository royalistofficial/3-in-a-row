document.addEventListener('DOMContentLoaded', () => {
    const gridSize = parseInt(localStorage.getItem('gridSize')) || 8;
    let score = 0;
    let selected = null;
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
    
    const gameBoard = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    
    function initGame() {
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
        createGrid();
    }

    function createGrid() {
        gameBoard.innerHTML = '';
        for(let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = getRandomColor();
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(e) {
        const cell = e.target;
        if(!selected) {
            selected = cell;
            cell.style.border = '2px solid black';
        } else {
            const selectedIndex = parseInt(selected.dataset.index);
            const clickedIndex = parseInt(cell.dataset.index);
            
            if(isAdjacent(selectedIndex, clickedIndex)) {
                swapCells(selected, cell);
                checkMatches();
                selected.style.border = '';
                selected = null;
            } else {
                selected.style.border = '';
                selected = cell;
                cell.style.border = '2px solid black';
            }
        }
    }

    function isAdjacent(index1, index2) {
        const diff = Math.abs(index1 - index2);
        return diff === 1 || diff === gridSize;
    }

    function swapCells(cell1, cell2) {
        const tempColor = cell1.style.backgroundColor;
        cell1.style.backgroundColor = cell2.style.backgroundColor;
        cell2.style.backgroundColor = tempColor;
    }

    function checkMatches() {
        let matchesFound = false;
        const cells = Array.from(gameBoard.children);
        
        for(let row = 0; row < gridSize; row++) {
            for(let col = 0; col < gridSize - 2; col++) {
                const index = row * gridSize + col;
                if(checkTriple(cells[index], cells[index+1], cells[index+2])) {
                    handleMatch(cells[index], cells[index+1], cells[index+2]);
                    matchesFound = true;
                }
            }
        }

        for(let col = 0; col < gridSize; col++) {
            for(let row = 0; row < gridSize - 2; row++) {
                const index = row * gridSize + col;
                if(checkTriple(cells[index], cells[index+gridSize], cells[index+2*gridSize])) {
                    handleMatch(cells[index], cells[index+gridSize], cells[index+2*gridSize]);
                    matchesFound = true;
                }
            }
        }

        if(matchesFound) {
            setTimeout(() => {
                refillGrid();
                checkMatches();
            }, 500);
        }
    }

    function checkTriple(cell1, cell2, cell3) {
        return cell1.style.backgroundColor === cell2.style.backgroundColor && 
               cell2.style.backgroundColor === cell3.style.backgroundColor;
    }

    function handleMatch(...cells) {
        cells.forEach(cell => {
            cell.style.backgroundColor = 'transparent';
            score += 100;
        });
        scoreElement.textContent = `Счёт: ${score}`;
    }

    function refillGrid() {
        const cells = Array.from(gameBoard.children);
        const grid = [];
        
        for(let row = 0; row < gridSize; row++) {
            grid[row] = [];
            for(let col = 0; col < gridSize; col++) {
                const index = row * gridSize + col;
                grid[row][col] = cells[index].style.backgroundColor;
            }
        }

        for(let col = 0; col < gridSize; col++) {
            let columnColors = [];
            for(let row = 0; row < gridSize; row++) {
                columnColors.push(grid[row][col]);
            }
            
            const nonEmpty = columnColors.filter(color => color !== 'transparent');
            const emptyCount = gridSize - nonEmpty.length;
            
            const newColors = Array.from({length: emptyCount}, () => getRandomColor());
            
            const newColumn = [...newColors, ...nonEmpty];
            
            for(let row = 0; row < gridSize; row++) {
                grid[row][col] = newColumn[row];
            }
        }

        for(let row = 0; row < gridSize; row++) {
            for(let col = 0; col < gridSize; col++) {
                const index = row * gridSize + col;
                cells[index].style.backgroundColor = grid[row][col];
            }
        }
    }

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    initGame();
});