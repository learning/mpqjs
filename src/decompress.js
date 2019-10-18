const zlib = require('zlib')
const compressjs = require('compressjs')

/**
 * Read the compression type & decompress file data,
 * used by `MPQArchive.prototype.readFile`
 */
module.exports = data => {
  let type = data.readUInt8(0)
  switch (type) {
    case 0:
      // raw data
      return data
    case 2:
      return zlib.inflateSync(data.slice(1))
    case 16:
      return Buffer.from(compressjs.Bzip2.decompressFile(data.slice(1)))
    default:
      throw new TypeError(`Unsupported compression type "${type}"`)
  }
}
