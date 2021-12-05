const utils = require('../utils')

const data = utils.getDataString('./input.txt')
const dataArr = data.split("\n\n").map((data) => data.split("\n"));

function part1(data) {
  const bingoNumbers = data.shift()[0].split(',')

  const boards = 
    data.map((board) => {
      return {
        won: false,
        content: board.map((line) => {
          return line.match(/\d+/g).map((cell) => {
              return {
                value: cell,
                marked: false
              }
            })
          })
        }
      })

  for (let i = 0; i < bingoNumbers.length; i++) {
    const bingoNumber = bingoNumbers[i];
    
    // mark boards and then check for win
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b].content;
      if (!board.win) {
        for (let l = 0; l < board.length; l++) {
          const line = board[l];
          for (let c = 0; c < line.length; c++) {
            const cell = line[c];
            if (parseInt(cell.value) == bingoNumber) {
              cell.marked = true
            }
          }
        }
      }
    }

    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      if (checkBoardWin(board.content)) {
        console.log(getUncheckedSum(board.content) * bingoNumber)
        return
      }
    }
  }
}

function part2(data) {
  const bingoNumbers = data.shift()[0].split(',')

  const boards = 
    data.map((board) => {
      return {
        won: false,
        content: board.map((line) => {
          return line.match(/\d+/g).map((cell) => {
              return {
                value: cell,
                marked: false
              }
            })
          })
        }
      })

  for (let i = 0; i < bingoNumbers.length; i++) {
    const bingoNumber = bingoNumbers[i];
    
    // mark boards and then check for win
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b].content;
      if (!board.win) {
        for (let l = 0; l < board.length; l++) {
          const line = board[l];
          for (let c = 0; c < line.length; c++) {
            const cell = line[c];
            if (parseInt(cell.value) == bingoNumber) {
              cell.marked = true
            }
          }
        }
      }
    }

    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      if (!board.won && checkBoardWin(board.content)) {
        board.won = true
        if (boards.every((board) => board.won)) {
          console.log(getUncheckedSum(board.content) * bingoNumber)
          return
        }
      }
    }
  }
}

function getUncheckedSum(board) {
  let sum = 0
  board.forEach((line) => {
    line.forEach((cell) => {
      if (!cell.marked) {
        sum += parseInt(cell.value)
      }
    })
  })
  return sum
}

function checkBoardWin(board) {
  // check verticals
  for (let i = 0; i < board.length; i++) {
    let winCount = 0
    for (let j = 0; j < board.length; j++) {
      const cell = board[j][i];
      if (cell.marked) {
        ++winCount
      }
      
    }
    if (winCount == board[i].length) {
      return true;
    }
  }

  // check horizontal
  for (let i = 0; i < board.length; i++) {
    let winCount = 0
    for (let j = 0; j < board.length; j++) {
      const cell = board[i][j];
      if (cell.marked) {
        ++winCount
      }
      
    }
    if (winCount == board[i].length) {
      return true;
    }
  }
  return false
}

part2(dataArr)