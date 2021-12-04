const fs = require('fs')

function getDataString(path) {
  let data
  try {
    data = fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
  }
  return data
}

function getSum(arr) {
  return arr.reduce((prev, curr) => {
    return prev + curr;
  })
}

// https://stackoverflow.com/a/22590204
function getMostCommonChar(str) {
  let max = 0
  let maxChar = ''
  str.split('').forEach(function(char) {
    if(str.split(char).length > max) {
        max = str.split(char).length
        maxChar = char
     }
  })
  return maxChar;
}

function getCharCount(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == char) {
      ++count
    }
  }
  return count;
}

module.exports = {
  getDataString: getDataString,
  getSum: getSum,
  getMostCommonChar: getMostCommonChar,
  getCharCount: getCharCount,
}