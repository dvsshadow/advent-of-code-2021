const utils = require('../utils')

const data = utils.getDataString('./day07/input.txt')

function part1(data) {
  const positions = data.split(',').map((char) => parseInt(char))
  const positionsSet = new Set(positions)
  let lowestPair
  positionsSet.forEach((targetPos) => {
    let fuelSum = 0
    positions.forEach((pos) => {
      fuelSum += Math.abs(targetPos - pos)
    })
    if (!lowestPair) {
      lowestPair = { pos: targetPos, fuel: fuelSum }
    } else {
      if (fuelSum < lowestPair.fuel) {
        lowestPair = { pos: targetPos, fuel: fuelSum }
      }
    }
  })
  console.log(lowestPair.fuel)
}

function part2(data) {
  const positions = data.split(',').map((char) => parseInt(char))
  const maxPosition = Math.max(...positions)
  const allPossiblePositions = [...Array(maxPosition).keys()]

  let lowestPair
  allPossiblePositions.forEach((targetPos) => {
    let fuelSum = 0
    positions.forEach((pos) => {
      let steps = Math.abs(targetPos - pos)
      for (let i = 1; i <= steps; i++) {
        fuelSum += i
      }
    })
    if (!lowestPair) {
      lowestPair = { pos: targetPos, fuel: fuelSum }
    } else {
      if (fuelSum < lowestPair.fuel) {
        lowestPair = { pos: targetPos, fuel: fuelSum }
      }
    }
  })
  console.log(lowestPair.fuel, lowestPair.pos)
}

part1(data)
part2(data)