const utils = require('../utils')

const data = utils.getDataString('./day17/input.txt')
const dataArr = data.split('target area: ')[1].split(', ').map((str) => str.substring(2))

const startX = parseInt(dataArr[0].split('..')[0])
const endX = parseInt(dataArr[0].split('..')[1])
const startY = parseInt(dataArr[1].split('..')[0])
const endY = parseInt(dataArr[1].split('..')[1])


const steps = 1000
const vSet = new Set()

function part1() {

  let maxY = 0
  for (let veloY = -500; veloY < 500; veloY++) {
    for (let veloX = -500; veloX < 500; veloX++) {
      // maxY = Math.max(maxY, iterate(veloX, veloY))
      let hasPassed = iterate(veloX, veloY)
      if (hasPassed != -1) {
        vSet.add([veloX, veloY])
      }
    }
  }
  console.log(vSet.size)
}

function iterate(velX, velY) {
  let x = 0
  let y = 0
  let maxY = 0

  for (let s = 0; s < steps; s++) {
    x += velX
    y += velY
    maxY = Math.max(maxY, y)

    if (startX <= x && x <= endX && startY <= y && y <= endY) {
      return maxY
    }

    velX -= xVelocity(velX)
    --velY
    
  }

  return -1
}

function xVelocity(vel) {
  return (vel > 0) - (vel < 0)
}

function isPast(pos, velX, velY) {
  if (velX > 0 && pos.c > endX) {
    return true
  }
  if (velX < 0 && pos.c < startX) {
    return true
  }
  if (velY < 0 && pos.r < endY) {
    return true
  }
  return false
}

part1()