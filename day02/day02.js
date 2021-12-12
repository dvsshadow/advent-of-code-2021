const utils = require('../utils')

const data = utils.getDataString('./day02/input.txt')
const dataArr = data.split('\n')

function part1(data) {
  let distance = 0;
  let depth = 0;

  data.forEach((input) => {
    const instructionAndAmount = input.split(" ");
    const instruction = instructionAndAmount[0];
    const amount = parseInt(instructionAndAmount[1]);
    switch(instruction) {
      case 'forward': distance += amount; break;
      case 'down': depth += amount; break;
      case 'up':  depth -= amount; break;
    }
  })

  console.log(distance * depth);
}

function part2(data) {
  let distance = 0;
  let depth = 0;
  let aim = 0;

  data.forEach((input) => {
    const instructionAndAmount = input.split(" ");
    const instruction = instructionAndAmount[0];
    const amount = parseInt(instructionAndAmount[1]);
    switch(instruction) {
      case 'forward': {
        distance += amount;
        depth += (aim * amount);
        break;
      }
      case 'down': aim += amount; break;
      case 'up':  aim -= amount; break;
    }
  })

  console.log(distance * depth);
}

part1(dataArr);
part2(dataArr);