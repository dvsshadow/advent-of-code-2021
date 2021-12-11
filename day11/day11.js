const utils = require('../utils')

const data = utils.getDataString('./day11/input.txt')
const dataArr = data.split('\n').map((str) => str.split(''))

console.log(dataArr)

const MAX_ITERATIONS = 20000

// 8
const adjacentOffsets = [[0, 1], [0, -1], [1, 0], [1, 1], [1, -1], [-1, 0], [-1, 1], [-1, -1]]

function part1(data) {
  let sums = 0
  for (let step = 0; step < MAX_ITERATIONS; step++) {
    const explosions = new Array()
    const visitedExplosions = new Array()
    
    let hasExplosions = false
    for (let c = 0; c < data.length; c++) {
      for (let r = 0; r < data.length; r++) {
        const current = data[c][r];
        data[c][r]++
        if (data[c][r] > 9) {
          explosions.push([c, r])
          data[c][r] = 0
          ++sums
          if (!hasExplosions) hasExplosions = true
        } 
      }
    }

    while (explosions.length > 0) {
      const toExplode = explosions.pop()
      adjacentOffsets.forEach((offset) => {
        const adjCol = toExplode[0] + offset[0]
        const adjRow = toExplode[1] + offset[1]
        if (data[adjCol] && data[adjCol][adjRow]) {
          if (data[adjCol][adjRow]) {
            data[adjCol][adjRow]++
            if (data[adjCol][adjRow] > 9) {
              explosions.push([adjCol, adjRow])
              data[adjCol][adjRow] = 0
              ++sums
            }
          }
        }
      })
    }
  }
  console.log(sums)
}

function part2(data) {
  for (let step = 0; step < MAX_ITERATIONS; step++) {
    let nOfExplosions = 0
    const explosions = new Array()
    const visitedExplosions = new Array()
    
    let hasExplosions = false
    for (let c = 0; c < data.length; c++) {
      for (let r = 0; r < data.length; r++) {
        const current = data[c][r];
        data[c][r]++
        if (data[c][r] > 9) {
          explosions.push([c, r])
          data[c][r] = 0
          ++nOfExplosions
          if (!hasExplosions) hasExplosions = true
        } 
      }
    }

    while (explosions.length > 0) {
      const toExplode = explosions.pop()
      adjacentOffsets.forEach((offset) => {
        const adjCol = toExplode[0] + offset[0]
        const adjRow = toExplode[1] + offset[1]
        if (data[adjCol] && data[adjCol][adjRow]) {
          if (data[adjCol][adjRow]) {
            data[adjCol][adjRow]++
            if (data[adjCol][adjRow] > 9) {
              explosions.push([adjCol, adjRow])
              data[adjCol][adjRow] = 0
              ++nOfExplosions
            }
          }
        }
      })
    }

    if (nOfExplosions == (data.length * data.length)) {
      console.log(step + 1)
    }
  }
}

part2(dataArr)