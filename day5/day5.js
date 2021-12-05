const utils = require('../utils')

const data = utils.getDataString('./inputTest.txt')
const dataArr = data.split("\n")

function part1(data) {
  // horizontal and vertical mean at least one point in common

  // each pair has x1, x2, and y1, y2
  const filledPoints = new Array()
  let max = -1

  const points = data
      .map((line) => line.split(' -> '))
      .map((twoPoints) => twoPoints.map((point) => point.split(',')))
      .map((pointPairs) => {
        return {
          x1: parseInt(pointPairs[0][0]),
          x2: parseInt(pointPairs[0][1]),
          y1: parseInt(pointPairs[1][0]),
          y2: parseInt(pointPairs[1][1]),
        }
      })

  for (let p = 0; p < points.length; p++) {
    const point = points[p];
    console.log(point)
    if (point.x1 != point.y1 && point.x2 != point.y2) {
      // diagonal
    } else {
      if (point.x1 == point.y1) {
        const start = Math.min(point.x2, point.y2)
        const end = Math.max(point.x2, point.y2)
        if (end > max) {
          max = end
        }
        for (let i = start; i <= end; i++) {
          if (!filledPoints[point.x1]) {
            filledPoints[point.x1] = []
            filledPoints[point.x1][i] = 1
          } else if (!filledPoints[point.x1][i]) {
            filledPoints[point.x1][i] = 1
          } else {
            filledPoints[point.x1][i] += 1
          }
        }
      } else {
        const start = Math.min(point.x1, point.y1)
        const end = Math.max(point.x1, point.y1)
        if (end > max) {
          max = end
        }
        for (let i = start; i <= end; i++) {
          if (!filledPoints[i]) {
            filledPoints[i] = []
            filledPoints[i][point.x2] = 1
          } else if (!filledPoints[i][point.x2]) {
            filledPoints[i][point.x2] = 1
          } else {
            filledPoints[i][point.x2] += 1
          }
        }
      }
    } 
  }

  let count = 0
  for (let l = 0; l < max+1; l++) {
    for (let p = 0; p < max+1; p++) {
      if (!filledPoints[l]) {
        filledPoints[l] = []
      }
      if (!filledPoints[l][p]) {
        filledPoints[l][p] = -1
      } else if (filledPoints[l][p] >= 2) {
        ++count
      }
    }
  }

  console.log(count)
}

// diagonals are okay I think, rest is crap, need to rewrite
function part2(data) {

  const filledPoints = new Array()
  let max = -1

  const points = data
      .map((line) => line.split(' -> '))
      .map((twoPoints) => twoPoints.map((point) => point.split(',')))
      .map((pointPairs) => {
        console.log(pointPairs)
        return {
          x1: parseInt(pointPairs[0][0]),
          y1: parseInt(pointPairs[0][1]),
          x2: parseInt(pointPairs[1][0]),
          y2: parseInt(pointPairs[1][1]),
        }
      })

  console.log(points[0])

  for (let p = 0; p < points.length; p++) {
    const point = points[p];
    if (
      (point.x1 != point.y1 && point.x2 != point.y2 && point.x1 != point.x2 && point.y1 != point.y2) ||
      (point.x1 == point.x2 && point.y1 == point.y2)) {

      const offSetX = (point.x2 > point.x1 || point.x2 == point.x1) ? 1 : -1
      const offSetY = (point.y2 > point.y1 || point.y2 == point.y1) ? 1 : -1
      const diagMax = Math.max(point.x1, point.y1, point.x2, point.y2)
      if (diagMax > max) {
        max = diagMax
      }

      let x = point.x1
      let y = point.y1
      console.log(`P1 ${point.x1},${point.y1}`)
      console.log(`P2 ${point.x2},${point.y2}`)
      // sum p1 to offset iteratively until equals to p2
      const iterations = Math.abs(point.x1 - point.x2)
      for (let i = 0; i < iterations; i++) {
        if (!filledPoints[x]) {
          filledPoints[x] = []
          filledPoints[x][y] = 1
        } else if (!filledPoints[x][y]) {
          filledPoints[x][y] = 1
        } else {
          filledPoints[x][y] += 1
        }

        x += offSetX
        y += offSetY



        console.log(`X:${x} Y:${y}`)
      }

      if (!filledPoints[x]) {
        filledPoints[x] = []
        filledPoints[x][y] = 1
      } else if (!filledPoints[x][y]) {
        filledPoints[x][y] = 1
      } else {
        filledPoints[x][y] += 1
      }

      console.log(`DONE: X:${x} Y:${y} P2 ${point.x2},${point.y2}`)
    } else {
      if (point.x1 == point.x2) {
        const start = Math.min(point.y1, point.y2)
        const end = Math.max(point.y1, point.y2)
        if (end > max) {
          max = end
        }
        for (let i = start; i <= end; i++) {
          if (!filledPoints[point.x1]) {
            filledPoints[point.x1] = []
            filledPoints[point.x1][i] = 1
          } else if (!filledPoints[point.x1][i]) {
            filledPoints[point.x1][i] = 1
          } else {
            filledPoints[point.x1][i] += 1
          }
        }
      } else if (point.y1 == point.y2) {
        const start = Math.min(point.x1, point.x2)
        const end = Math.max(point.x1, point.x2)
        if (end > max) {
          max = end
        }
        for (let i = start; i <= end; i++) {
          if (!filledPoints[i]) {
            filledPoints[i] = []
            filledPoints[i][point.y1] = 1
          } else if (!filledPoints[i][point.y1]) {
            filledPoints[i][point.y1] = 1
          } else {
            filledPoints[i][point.y1] += 1
          }
        }
      }
    } 
  }

  let count = 0
  let str = ''
  for (let l = 0; l < max+1; l++) {
    for (let p = 0; p < max+1; p++) {
      if (!filledPoints[p]) {
        filledPoints[l] = []
      }
      if (!filledPoints[l][p]) {
        filledPoints[l][p] = -1
      } else if (filledPoints[l][p] >= 2) {
        ++count
      }
      if (filledPoints[l][p] == -1) {
        str += '. '
      } else {
        str += filledPoints[l][p] + ' '
      }
      
    }
    console.log(str)
    str = ''
  }

  console.log(count)
}

// for diagonals, find the quadrant, each quadrant has an offset, and iteratively sum the offset to the first number until you get to the second

part2(dataArr)
