const utils = require('../utils')

const data = utils.getDataString('./input.txt')

function part1(data) {
  let count = 0
  data.forEach((inputOutput) => {
    const outputs = inputOutput.output
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      if (output.length == 2 || output.length == 3 || output.length == 4 || output.length == 7) {
        ++count
      }
    }
  })
  console.log(count)
}

function part2(data) {
  let sum = 0
  data.forEach((inputOutput) => {
    let realSegmentDisplay = new Array(8)
    const inputs = inputOutput.input
    const outputs = inputOutput.output

    const sortedInputs = inputs.sort((a, b) => a.length - b.length)
    // 4
    realSegmentDisplay[3] = sortedInputs[3]
    // 7
    realSegmentDisplay[1] = sortedInputs[1]
    // 8
    realSegmentDisplay[7] = sortedInputs[7]
    const length6Input = new Array()
    const length5Input = new Array()

    for (let i = 0; i < sortedInputs.length; i++) {
      const input = sortedInputs[i];
      if (input.length == 5) {
        length5Input.push(input)
      } 
      if (input.length == 6) {
        length6Input.push(input)
      }
    }

    fillWithLength6(length6Input, sortedInputs, realSegmentDisplay)
    fillWithLength5(length5Input, sortedInputs, realSegmentDisplay)

    // With this info we can get the output chars by intersecting everything
    let outputStr = ''
    for (let i = 0; i < outputs.length; i++) {
      const output = outputs[i];
      if (output.length == 2) {
        outputStr += '1'
      } 
      if (output.length == 3) {
        outputStr += '7'
      }
      if (output.length == 4) {
        outputStr += '4'
      }
      if (output.length == 7) {
        outputStr += '8'
      }
      if (output.length == 6) {
        const intersectWith6 = (output.match(new RegExp('[' + realSegmentDisplay[5] + ']', 'g')) || []).join('')
        const intersectWith9 = (output.match(new RegExp('[' + realSegmentDisplay[8] + ']', 'g')) || []).join('')
        const intersectWith0 = (output.match(new RegExp('[' + realSegmentDisplay[0] + ']', 'g')) || []).join('')
        if (intersectWith6 == output) {
          outputStr += '6'
        }
        if (intersectWith9 == output) {
          outputStr += '9'
        }
        if (intersectWith0 == output) {
          outputStr += '0'
        }
      }
      if (output.length == 5) {
        const intersectWith2 = (output.match(new RegExp('[' + realSegmentDisplay[1] + ']', 'g')) || []).join('')
        const intersectWith3 = (output.match(new RegExp('[' + realSegmentDisplay[2] + ']', 'g')) || []).join('')
        const intersectWith5 = (output.match(new RegExp('[' + realSegmentDisplay[4] + ']', 'g')) || []).join('')
        if (intersectWith2 == output) {
          outputStr += '2'
        }
        if (intersectWith3 == output) {
          outputStr += '3'
        }
        if (intersectWith5 == output) {
          outputStr += '5'
        }
      }
    }
    sum += parseInt(outputStr)
  })
  console.log(sum)
}

const newData = data.split('\n')
  .map((line) => line.split('|'))
  .map((rawSeparated) => rawSeparated.map((separated) => separated.trim()))
  .map((separated) => {
    return {
      input: separated[0].split(' '),
      output: separated[1].split(' ')
    }
  })

part2(newData)

function fillWithLength5(length5Input, sortedInputs, realSegmentDisplay) {
  for (let i = 0; i < length5Input.length; i++) {
    const input = length5Input[i]

    const intersectWith6 = (input.match(new RegExp('[' + realSegmentDisplay[5] + ']', 'g')) || []).join('')
    const intersectWith9 = (input.match(new RegExp('[' + realSegmentDisplay[8] + ']', 'g')) || []).join('')

    const six = realSegmentDisplay[5]
    const nine = realSegmentDisplay[8]

    if (intersectWith6.length == input.length && intersectWith9.length == input.length) {
      // 5 fully intersect with 6
      realSegmentDisplay[4] = input
    } else if (intersectWith9.length == input.length) {
      // 3 fully intersect with 9
      realSegmentDisplay[2] = input
    } else {
      // 2 does not fully intersect with either of them
      realSegmentDisplay[1] = input
    }
  }
}

function fillWithLength6(length6Input, sortedInputs, realSegmentDisplay) {
  for (let i = 0; i < length6Input.length; i++) {
    const input = length6Input[i]
    // check if intersect with 4 which is 9
    const intersectWith4 = (input.match(new RegExp('[' + sortedInputs[2] + ']', 'g')) || []).join('')
    const intersectWith7 = (input.match(new RegExp('[' + sortedInputs[1] + ']', 'g')) || []).join('')

    const four = sortedInputs[2]
    const seven = sortedInputs[1]

    if (intersectWith4.length == four.length) {
      // 9 fully intersect with 4
      realSegmentDisplay[8] = input
    } else if (intersectWith7.length == seven.length) {
      // 0 fully intersect with 7 and not 4
      realSegmentDisplay[0] = input
    } else {
      // 6 does not fully intersect with 7 or 4
      realSegmentDisplay[5] = input
    }
  }
}
