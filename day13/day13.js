const utils = require('../utils')

const data = utils.getDataString('./day13/input.txt')
const dataArr = data.split('\n\n').map((line) => line.split('\n'))

function part1(data) {
  let pointsArray = new Array()
  const pointsToMark = data[0]
  const folds = data[1].map((line) => line.split('fold along ').pop())
  // Build checked and unchecked

  let maxCol = 0
  let maxRow = 0
  for (let p = 0; p < pointsToMark.length; p++) {
    const pointToMark = pointsToMark[p].split(',');
    const pointCol = parseInt(pointToMark[1])
    const pointRow = parseInt(pointToMark[0])
    if (pointCol > maxCol) {
      maxCol = pointCol
    }
    if (pointRow > maxRow) {
      maxRow = pointRow
    }
    if (!pointsArray[pointCol]) {
      pointsArray[pointCol] = new Array()
    }
    pointsArray[pointCol][pointRow] = 1
    if(maxCol % 2 != 0) {
      maxCol++;
    }
    
    if(maxRow % 2 != 0) {
      maxRow++;
    }
  }

  for (let c = 0; c <= maxCol; c++) {
    for (let r = 0; r <= maxRow; r++) {
      if (!pointsArray[c]) {
        pointsArray[c] = new Array()
      }
      if (!pointsArray[c][r]) {
        pointsArray[c][r] = 0
      }
    } 
  }

  folds.forEach((fold) => {
    const along = fold.split('=')[0]
    const amount = parseInt(fold.split('=')[1])
    console.log(amount * 2 + 1)
    if (along == 'x') {
      const rightHalf = new Array()
      for (let p = 0; p < pointsArray.length; p++) {
        rightHalf[p] = pointsArray[p].splice(amount)
        rightHalf[p].shift()
      }
      
      for (let line = 0; line < pointsArray.length; line++) {
        const lineSize = pointsArray[line].length
        for (let rI = 0, lI = lineSize - 1; rI < lineSize; rI++, lI--) {
          if (!pointsArray[line][lI] && rightHalf[line][rI]) {
            pointsArray[line][lI] = rightHalf[line][rI]
          }
        }
      }
    }
    if (along == 'y') {
      // horizontal fold
      // get the two halves
      const bottomHalf = pointsArray.splice(amount)
      bottomHalf.shift()
      // traverse bottomHalf in order and pointsArray in reverse
      for (let bI = 0, hI = bottomHalf.length - 1; bI < bottomHalf.length; bI++, hI--) {
        const line = bottomHalf[bI]
        const arrLine = pointsArray[hI]
        for (let bLi = 0; bLi < line.length; bLi++) {
          const pa = pointsArray[hI][bLi]
          const ba = bottomHalf[bI][bLi]
          if (!pointsArray[hI][bLi] && bottomHalf[bI][bLi]) {
            pointsArray[hI][bLi] = bottomHalf[bI][bLi]
          }
        }
      }
    }
    for (let p = 0; p < pointsArray.length; p++) {
      const line = pointsArray[p];
      console.log(line.join('').replace(/0/g, "..").replace(/1/g, "xx"))
    }
    console.log('\n')
  })


}

part1(dataArr)