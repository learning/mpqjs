const { UInt64 } = require('int64_t')

module.exports = {
  _: num => {
    return num instanceof UInt64 ? num : new UInt64(num)
  },
  not: num => {
    if (num instanceof UInt64) {
      let buf = Buffer.from(num.toBuffer())
      for (let i = 0, len = buf.length; i < len; ++i) {
        buf[i] = ~buf[i]
      }
      return new UInt64(buf)
    }
    return ~num
  }
}
