const utils = require('../utils')

const data = utils.getDataString('./day09/input.txt')
const dataArr = data.split('\n').map((str) => str.split(''))

// x = column, y = row
// up, down, left, right
const offsets = [[1, 0],[-1, 0],[0, 1],[0, -1]]

function part1(data) {
  console.log({data})
  let lowPoints = new Array()
  for (let c = 0; c < data.length; c++) {
    for (let r = 0; r < data[c].length; r++) {
      // check if up down left and right are all lower than the current number
      const current = data[c][r]
      let isAllLower = true
      offsets.forEach((offset) => {
        if (data[c + offset[0]] && data[c + offset[0]][r + offset[1]]) {
          const adjacent = data[c + offset[0]][r + offset[1]]
          if (current >= adjacent) {
            isAllLower = false
          }
        }
      })

      if (isAllLower) {
        lowPoints.push(current)
      }
    }
  }

  console.log(lowPoints.map((curr) => parseInt(curr) + 1).reduce((prev, curr) => prev + curr))
}

function part2(data) {
  const lowPoints = getLowPoints(data)

  // Iterate through the low Points and get the full sizes
  let sizes = new Array()
  lowPoints.forEach((coords) => {
    let col = coords[0]
    let row = coords[1]
    let visited = new Array()
    if (!visited[col]) {
      visited[col] = new Array()
    }
    visited[col][row] = true
    offsets.forEach((offset) => {
      const colCoords = col + offset[0]
      const rowCoords = row + offset[1]
      if (!visited[colCoords]) {
        visited[colCoords] = new Array()
      }
      if (data[colCoords] && data[colCoords][rowCoords]) {
        const adjacent = data[colCoords][rowCoords]
        // do this for the adjacent, and if they find a 9, stop

        if (adjacent != 9 && !visited[colCoords][rowCoords]) {
          visited[colCoords][rowCoords] = true
          getAdjacentSizes(colCoords, rowCoords, visited, data)
        }
      }
    })

    let count = 0
    for (let vc = 0; vc < visited.length; vc++) {
      if (visited[vc]) {
        const currVc = visited[vc];
        for (let vr = 0; vr < currVc.length; vr++) {
          const element = visited[vc][vr];
          if (element) {
            count += 1
          }
        }
      }
    }
    sizes.push(count)
  })

  const sortedSizes = sizes.sort((a, b) => {
    return b - a
  })
  console.log(sizes[0] * sizes[1] * sizes[2])
}

function getAdjacentSizes(col, row, visited, data) {
  offsets.forEach((offset) => {
    const colCoords = col + offset[0]
    const rowCoords = row + offset[1]
    if (data[colCoords] && data[colCoords][rowCoords]) {
      if (!visited[colCoords]) {
        visited[colCoords] = new Array()
      }
      if (!visited[colCoords][rowCoords]) {
        const adjacent = data[colCoords][rowCoords]

        if (adjacent != 9) {
          visited[colCoords][rowCoords] = true
          getAdjacentSizes(colCoords, rowCoords, visited, data)
        }
      }
    }
  })
}

part2(dataArr)

function getLowPoints(data) {
  let lowPoints = new Array()
  for (let c = 0; c < data.length; c++) {
    for (let r = 0; r < data[c].length; r++) {
      // check if up down left and right are all lower than the current number
      const current = data[c][r]
      let isAllLower = true
      offsets.forEach((offset) => {
        if (data[c + offset[0]] && data[c + offset[0]][r + offset[1]]) {
          const adjacent = data[c + offset[0]][r + offset[1]]
          if (current >= adjacent) {
            isAllLower = false
          }
        }
      })

      if (isAllLower) {
        lowPoints.push([c, r])
      }
    }
  }
  return lowPoints
}
