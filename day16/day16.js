const utils = require('../utils')

const data = utils.getDataString('./day16/input.txt').split('')

let dataBin = ''
data.forEach((char) => {
  dataBin += parseInt(char, 16).toString(2).padStart(4, 0)
})

let versionSums = 0

// Ver + Id + 0 Literal value
const minimumPacketSize = 3 + 3 + 5 - 1

function part1(data, isSubpacket) {
  const arr = data
  let literalValue
  while (arr.length > minimumPacketSize) {
    let packetVer = arr.splice(0, 3).join('')
    // versionSums += parseInt(packetVer, 2)
    let packetId = parseInt(arr.splice(0, 3).join(''), 2)
    if (packetId == 4) {
      const toRet =  getNextPacket(arr, isSubpacket)
      return toRet
    } else {
      let lengthType = arr.splice(0, 1)
      const allPackets = new Array()
      if (parseInt(lengthType, 2) == 0) {
        // next 15 bits are the total length in bits of the sub packets contained in this packet
        const len = arr.splice(0, 15).join('')
        const subpacketsLen = parseInt(len, 2)
        const allSubPackets = arr.splice(0, subpacketsLen)
        while (allSubPackets.length > 0) {
          allPackets.push(part1(allSubPackets, true, 0))
        }
      } else {
        const len = arr.splice(0, 11).join('')
        let numberOfSubpackets = parseInt(len, 2)
        while (numberOfSubpackets-- > 0) {
          allPackets.push(part1(arr, true))
        }
      }

      // do the calculations for the sub packets
      const toRet =  getSubpacketsResults(allPackets, packetId)
      console.log(toRet)
      return toRet
    }
  }
  return literalValues
}

function getSubpacketsResults(allPackets, packetId) {
  // turn the packets into literal values
  const numPackets = allPackets.map((char) => {
      if (isBinary(char)) {
        return parseInt(char, 2)
      } else {
        return char
      }
  })
  console.log(numPackets)
  switch (packetId) {
    case 0: {
      // sum packets
      if (numPackets.length == 1) {
        return numPackets[0]
      }
      return numPackets.reduce((prev, curr) => prev + curr)
      break
    }
    case 1: {
      // product packets
      if (numPackets.length == 1) {
        return numPackets[0]
      }
      return numPackets.reduce((prev, curr) => prev * curr)
    }
    case 2: {
      // minimum packets
      return Math.min(...numPackets)
    }
    case 3: {
      // maximum packets
      return Math.max(...numPackets)
    }
    case 5: {
      // greater than packets
      return +(numPackets[0] > numPackets[1])
    }
    case 6: {
      // less than packets
      return +(numPackets[0] < numPackets[1])
    }
    case 7: {
      // equal to packets
      return +(numPackets[0] == numPackets[1])
    }
  }
}

function isBinary(str) {
  let isBinary = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "0" || str[i] == "1") {
      isBinary = true;
    } else {
      isBinary = false;
    }
  }
  return isBinary
}

function getNextPacket(packets, isSubpacket) {
  let hasNext = true
  let currPacket = ''
  while (hasNext) {
    hasNext = parseInt(packets.splice(0, 1))
    currPacket += packets.splice(0, 4).join('')
  }

  if (!isSubpacket) {
    if (packets.length % 4 != 0) {
      const toRem = packets.length % 4
      packets.splice(0, toRem)
    }
  }

  return currPacket
}

part1(dataBin.split(''), false)