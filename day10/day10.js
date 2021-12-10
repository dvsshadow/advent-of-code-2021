const utils = require('../utils')

const data = utils.getDataString('./day10/input.txt')
const dataArr = data.split('\n').map((str) => str.split(''))

const scoreTable = {
  ')': 3,
  ']': 57,
  '}': 1197, 
  '>': 25137,
}

const completeScore = {
  ')': 1,
  ']': 2,
  '}': 3, 
  '>': 4,
}

const validOpen = ['(', '[', '{', '<']

function getInverse(char) {
  switch (char) {
    case '(': return ')'
    case '[': return ']'
    case '{': return '}'
    case '<': return '>'
  }
}

function part1(data) {
  let ans = 0
  for (let l = data.length - 1; l >= 0; l--) {
    let bad = false
    const line = data[l];
    const stack = new Array()
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      
      if (validOpen.includes(char)) {
        stack.push(char)
      } else if (char == ')') {
        if (stack.pop() != '(') {
          ans += scoreTable[')']
          break
        } 
      } else if (char == ']') {
        if (stack.pop() != '[') {
          ans += scoreTable[']']
          break
        } 
      } else if (char == '}') {
        if (stack.pop() != '{') {
          ans += scoreTable['}']
          break
        } 
      } else if (char == '>') {
        if (stack.pop() != '<') {
          ans += scoreTable['>']
          break
        } 
      }
    }
  }
}

function part2(data) {
  const scores = new Array()
  for (let l = data.length - 1; l >= 0; l--) {
    let bad = false
    const line = data[l];
    const stack = new Array()
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      
      if (validOpen.includes(char)) {
        stack.push(char)
      } else if (char == ')') {
        if (stack.pop() != '(') {
          bad = true
          break
        } 
      } else if (char == ']') {
        if (stack.pop() != '[') {
          bad = true
          break
        } 
      } else if (char == '}') {
        if (stack.pop() != '{') {
          bad = true
          break
        } 
      } else if (char == '>') {
        if (stack.pop() != '<') {
          bad = true
          break
        } 
      }
    }
    if (!bad) {
      let score = 0
      while (stack.length > 0) {
        const extracted = stack.pop()
        score *= 5
        score += completeScore[getInverse(extracted)]
      }
      scores.push(score)
    }
  }
  const sortedScores = scores.sort((a, b) => {
    return b - a
  })
  const half = Math.floor(sortedScores.length / 2)
  console.log(sortedScores[half])
}

part2(dataArr)