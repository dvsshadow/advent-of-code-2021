const utils = require('../utils')

const data = utils.getDataString('./day12/input.txt')
const dataArr = data.split('\n').map((str) => str.split('-'))


let nodes = new Array()
let paths = new Set()

function part1(data) {
  data.forEach((line) => {
    const node = line[0]
    const edge = line[1]
    if (!nodes[node]) {
      nodes[node] = new Array()
    }
    nodes[node][edge] = 1
    if (!nodes[edge]) {
      nodes[edge] = new Array()
    }
    nodes[edge][node] = 1
  })
  
  const start = nodes['start']
  for (const node in start) {
    const path = new Array()
    path.push('start')
    findAllPaths(node, path, paths)
  }
  
  console.log(paths.size)
  let count = 0
  for (const path of paths) {
    const splitPath = path.split(',')
    // remove start and end
    splitPath.shift()
    splitPath.pop()
    for (const node of splitPath) {
      if (isLowerCase(node)) {
        ++count
        break
      }
    }
  }
  console.log(count)
}

function findAllPaths(node, path) {
  if (!nodes[node]) {
    path.push(node)
    const prevNode = path[path.length - 2]
    if (!isLowerCase(prevNode)) {
      findAllPaths(prevNode, path)
    }
    return
  }

  // check if all nodes are small letters and curr node is small too
  path.push(node)
  for (const edge in nodes[node]) {
    if (edge == 'end') {
      const newPath = [...path]
      newPath.push(edge)
      paths.add(newPath.join(','))
      continue
    }
    if (isLowerCase(node) && isLowerCase(edge) && !nodes[edge]) {
      // no way to go back from a lower case node, so we skip that path
      continue
    }
    if (isLowerCase(edge) && path.includes(edge)) {
      continue
    }

    const newPath = [...path]
    findAllPaths(edge, newPath)
  }

  const prevNode = path[path.length - 2]
  if (!isLowerCase(prevNode)) {
    findAllPaths(prevNode, path)
  }
}

function part2(data) {
  data.forEach((line) => {
    const node = line[0]
    const edge = line[1]
    if (!nodes[node]) {
      nodes[node] = new Array()
    }
    nodes[node][edge] = 1
    if (!nodes[edge]) {
      nodes[edge] = new Array()
    }
    nodes[edge][node] = 1
  })
  
  const start = nodes['start']
  for (const node in start) {
    const path = new Array()
    path.push('start')
    findAllPaths2(node, path, paths)
  }
}

function findAllPaths2(node, path) {
  if (!nodes[node]) {
    path.push(node)
    const prevNode = path[path.length - 2]
    if (!isLowerCase(prevNode)) {
      findAllPaths2(prevNode, path)
    }
    return
  }

  // check if all nodes are small letters and curr node is small too
  path.push(node)
  for (const edge in nodes[node]) {
    if (edge == 'start') {
      continue
    }
    if (edge == 'end') {
      const newPath = [...path]
      newPath.push(edge)
      paths.add(newPath.join(','))
      continue
    }
    if (isLowerCase(node) && isLowerCase(edge) && !nodes[edge]) {
      if (hasVisitedSmallCaveTwice(path)) {
        continue
      } 
      
    }
    if (isLowerCase(edge) && path.includes(edge) && hasVisitedSmallCaveTwice(path)) {
      continue
    }

    const newPath = [...path]
    findAllPaths2(edge, newPath)
  }

  const prevNode = path[path.length - 2]
  if (!isLowerCase(prevNode)) {
    findAllPaths(prevNode, path)
  }
}

function isLowerCase(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

function hasVisitedSmallCaveTwice(path) {
  const counts = {};

  for (const char of path) {
    if (isLowerCase(char)) {
      if (!counts[char]) {
        counts[char] = 1
      } else {
        return true
      }
    }
  }

  return false
}

part2(dataArr)