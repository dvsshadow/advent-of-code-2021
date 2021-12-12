const { getSum } = require('../utils');
const utils = require('../utils')

function part1(dataArr) {
  let count = 0;
  dataArr.reduce((prev, curr) => {
    if (curr > prev) ++count;
    return curr;
  })
  console.log(count);
}

function part2(dataArr) {
  function getWindowValues(dataArr) {
    const windowValues = []
    for (let i = 0; i < dataArr.length - 3; i++) {
      windowValues.push(dataArr.slice(i, i + 3))
    }
    return windowValues
  }

  // split in 3 and sum of that
  const windowValues = getWindowValues(dataArr)

  let count = 0;

  windowValues
    .map((arr) => {
      return getSum(arr);
    })
    .reduce((prev, curr) => {
      if (curr > prev) ++count;
      return curr;
    })

  console.log(count)
}

const part1Data = utils.getDataString('./day01/input.txt')
const data1Arr = part1Data.split('\n').map((val) => {
  return parseInt(val)
})

part1(data1Arr)
part2(data1Arr)


