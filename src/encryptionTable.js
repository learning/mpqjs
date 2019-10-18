const { UInt64 } = require('int64_t')
const { _, not } = require('./utils')

/**
 * Encryption table for MPQ hash function
 */
module.exports = (() => {
  let seed = new UInt64(0x00100001)
  let table = {}

  for (let i = 0, m = 256; i < m; ++i) {
    let index = i
    for (let j = 0, n = 5; j < n; ++j) {
      seed = seed.mul(_(125)).add(_(3)).mod(_(0x2AAAAB))
      let temp1 = seed.and(_(0xFFFF)).shiftLeft(0x10)

      seed = seed.mul(_(125)).add(_(3)).mod(_(0x2AAAAB))
      let temp2 = seed.and(_(0xFFFF))

      table[index] = temp1.or(temp2)

      index += 0x100
    }
  }

  return table
})()
