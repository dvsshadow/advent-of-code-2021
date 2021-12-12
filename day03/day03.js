const utils = require('../utils')

const data = utils.getDataString('./day03/input.txt')
const dataArr = data.split('\n')

function part1(data) {
  let gamma = ""
  let epsilon = ""

  const verticalLines = []
  const totalLen = data[0].length

  for (let i = 0; i < totalLen; i++) {
    let lineString = ""
    data.forEach((line) => {
      lineString += line.charAt(i)
    })
    verticalLines.push(lineString)
  }

  verticalLines.forEach((line) => {
    const mostCommon = utils.getMostCommonChar(line)
    if (mostCommon == '0') {
      gamma += '0'
      epsilon += '1'
    } else {
      gamma += '1'
      epsilon += '0'
    }
  })

  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))
}

function part2Aux(linesArr, totalLen, isMostCommon) {
  for (let i = 0; i < totalLen; i++) {
    let lineString = ""
    linesArr.forEach((line) => {
      lineString += line.charAt(i)
    })

    const mostCommonChar = utils.getMostCommonChar(lineString)
    const zeroCount = utils.getCharCount(lineString, '0');
    const oneCount = utils.getCharCount(lineString, '1');
    const linesArrAux = []
    
    if (zeroCount == oneCount) {
      // If the zero and one count is equal, we get the lines with 1 for the most common, and 0 for the least common
      linesArr.forEach((line) => {
        if (isMostCommon ? line.charAt(i) == '1' : line.charAt(i) == '0') {
          linesArrAux.push(line)
        }
      })
    } else {
      linesArr.forEach((line) => {
        if (isMostCommon ? line.charAt(i) == mostCommonChar : line.charAt(i) != mostCommonChar) {
          linesArrAux.push(line)
        }
      })
    }

    linesArr = linesArrAux
    if (linesArr.length == 1) {
      return linesArr[0]
    }
  }
}

function part2(data) {
  const totalLen = data[0].length
  const oxygenRating = part2Aux(data, totalLen, true)
  const co2Rating = part2Aux(data, totalLen, false)

  console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))
}

part1(dataArr)
part2(dataArr)