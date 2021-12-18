const utils = require('../utils')

const data = utils.getDataString('./day15/input.txt')
const dataArr = data.split('\n').map((line) => line.split('').map((char) => parseInt(char)))

// https://stackoverflow.com/a/42919752
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

// down and right
// r, c
const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function part1(data) {
  const queue = new PriorityQueue((a, b) => b.score > a.score)
  queue.push({ score: 0, coord: [0, 0]})
  const maxRow = data.length
  const maxCol = data[0].length
  const visited = new Set()

  while (!queue.isEmpty()) {
    const { score, coord } = queue.pop()
    if (coord[0] == maxRow - 1 && coord[1] == maxCol - 1) {
      console.log(coord)
      console.log(score)
      break
    }

    if (visited.has(getStr(coord[0], coord[1]))) {
      continue
    }
    visited.add(getStr(coord[0], coord[1]))
    if (isNaN(score)) {
      console.log(coord)
      console.log(score)
      break
    }

    const adjs = getAdj(coord[0], coord[1])
    adjs.forEach((adj) => {
      const r = adj[0]
      const c = adj[1]
      if (0 <= r && r < maxRow && 0 <= c && c < maxCol) {
        queue.push({ score: score + data[r][c], coord: [r, c]})
      }
    })
  }
}

let len
function part2(data) {
  const queue = new PriorityQueue((a, b) => b.score > a.score)
  queue.push({ score: 0, coord: [0, 0]})
  len = data.length
  const maxRow = data.length * 5
  const maxCol = data[0].length * 5
  const visited = new Set()

  while (!queue.isEmpty()) {
    const { score, coord } = queue.pop()
    if (coord[0] == maxRow - 1 && coord[1] == maxCol - 1) {
      console.log(coord)
      console.log(score)
      break
    }

    if (visited.has(getStr(coord[0], coord[1]))) {
      continue
    }

    visited.add(getStr(coord[0], coord[1]))

    const adjs = getAdj(coord[0], coord[1])
    adjs.forEach((adj) => {
      const r = adj[0]
      const c = adj[1]
      if (0 <= r && r < maxRow && 0 <= c && c < maxCol) {
        queue.push({ score: score + getExpand(r, c, data, maxRow, maxCol), coord: [r, c]})
      }
    })
  }
}

function getStr(r, c) {
  return r + ',' + c
}

function getAdj(r, c) {
  return [[r+1, c], [r-1, c], [r, c+1], [r, c-1 ]]
}

function getExpand(r, c, data) {
  const valuesOnMap = data[r % len][c % len]
  const newRow = Math.floor(r / len)
  const newCol = Math.floor(c / len)
  let toReturn = valuesOnMap + newRow + newCol 
  toReturn = (toReturn - 1) % 9 + 1
  return toReturn
}

part2(dataArr)