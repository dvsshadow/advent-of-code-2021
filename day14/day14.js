const utils = require('../utils')

const data = utils.getDataString('./day14/input.txt')
const dataArr = data.split('\n\n').map((line) => line.split('\n'))

const steps = 40

function part1(data) {
  const start = data[0][0]
  const instructions = data[1].map((line) => line.split(' -> '))
  const instructionsMap = new Array()
  for (let i = 0; i < instructions.length; i++) {
    instructionsMap[instructions[i][0]] = instructions[i][1]
  }

  let pairsMap = new Array()
  for (let c = 0; c < start.length - 1; c++) {
    const pair = start[c] + start[c + 1]
    if (!pairsMap[pair]) {
      pairsMap[pair] = 1
    } else {
      pairsMap[pair]++
    }
  }
  
  for (let s = 0; s < steps; s++) {
    const newPairsMap = new Array()
    for (const pair in pairsMap) {
      if (instructionsMap[pair]) {
        const pairCount = pairsMap[pair]
        const insert = instructionsMap[pair]
        const newPair1 = pair.charAt(0) + insert
        const newPair2 = insert + pair.charAt(1)
        if (!newPairsMap[newPair1]) {
          newPairsMap[newPair1] = pairCount
        } else {
          newPairsMap[newPair1] += pairCount
        }
        if (!newPairsMap[newPair2]) {
          newPairsMap[newPair2] = pairCount
        } else {
          newPairsMap[newPair2] += pairCount
        }
      }
    }
    pairsMap = newPairsMap
  }
  
  const single = new Array()
  for (const pair in pairsMap) {
    const char1 = pair.charAt(0)
    const char2 = pair.charAt(1)
    if (!single[char1]) {
      single[char1] = pairsMap[pair]
    } else {
      single[char1] += pairsMap[pair]
    }
    if (!single[char2]) {
      single[char2] = pairsMap[pair]
    } else {
      single[char2] += pairsMap[pair]
    }
  }

  let max = -1
  let min = Number.MAX_VALUE
  for (const char in single) {
    const count = single[char]
    if (count > max) {
      max = count
    }
    if (count < min) {
      min = count
    }
  }
}

part1(dataArr)