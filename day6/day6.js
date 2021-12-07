const utils = require('../utils')

const data = utils.getDataString('./input.txt')
const dataArr = data.split("\n")

function part1(data) {
  const initialState = data.split(',').map((char) => parseInt(char))
  const days = 80
  let lanternFishToAdd = 0
  let currentState = initialState
  for (let d = 0; d < days; d++) {
    // subtract one number ot each, and store how many to add
    for (let l = 0; l < currentState.length; l++) {
      const lanternFish = currentState[l];
      if (lanternFish == 0) {
        ++lanternFishToAdd
        currentState[l] = 6
      } else {
        --currentState[l]
      }
    }
    
    while (lanternFishToAdd > 0) {
      currentState.push(8)
      --lanternFishToAdd
    }
  }
  console.log(currentState.length)
}

function part2(data) {
  const initialState = data.split(',').map((char) => parseInt(char))
  const maxDays = 256

  // each index of the array corresponds to a day
  const fishPerDay = new Array(9).fill(0)

  for (let l = 0; l < initialState.length; l++) {
    fishPerDay[initialState[l]] += 1
  }

  for (let d = 0; d < maxDays; d++) {
    let toCreate
    for (let i = 0; i < fishPerDay.length; i++) {
      if (i == 0) {
        toCreate = fishPerDay[i]
      } else {
        fishPerDay[i - 1] = fishPerDay[i]
      }
    }
    fishPerDay[6] += toCreate
    fishPerDay[8] = toCreate
  }
  
  console.log(utils.getSum(fishPerDay))
}

part2(data)