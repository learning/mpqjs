const fs = require('fs')

const { _ } = require('../src/utils')

// Test class/functions/objects
const MPQArchive = require('../src/mpq')
const encryptionTable = require('../src/encryptionTable')
const decompress = require('../src/decompress')

// test data
const encryptionTableCase = require('./encryptionTable')
const { header1, header2 } = require('./header')
const { hashTable1, hashTable2, blockTable1, blockTable2 } = require('./table')
const {
  rawSource, rawTarget,
  zlibSource, zlibTarget,
  bz2Source, bz2Target,
  errorSource
} = require('./decompress')
const listfile = require('./listfile')

const archive1 = new MPQArchive('./tests/test1.SC2Replay')
const archive2 = new MPQArchive('./tests/test2.SC2Replay')

function readFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

test('prepareEncryptionTable', () => {
  expect(encryptionTable).toStrictEqual(encryptionTableCase)
})

test('decompress', () => {
  expect(decompress(rawSource)).toStrictEqual(rawTarget)
  expect(decompress(zlibSource)).toStrictEqual(zlibTarget)
  expect(decompress(bz2Source)).toStrictEqual(bz2Target)
  expect(() => decompress(errorSource))
    .toThrowError('Unsupported compression type')
})

test('_hash', () => {
  expect(archive1._hash('(hash table)', 'TABLE')).toStrictEqual(_(0xc3af3770))
  expect(archive1._hash('(block table)', 'TABLE')).toStrictEqual(_(0xec83b3a3))
  expect(archive1._hash('(listfile)', 'HASH_A')).toStrictEqual(_(0xfd657910))
  expect(archive1._hash('(listfile)', 'HASH_B')).toStrictEqual(_(0x4e9b98a7))
})

test('_decrypt', () => {
  const key1 = 3968054179
  const key2 = 3283040112

  const files = [
    './tests/decrypt.source.1.bin',
    './tests/decrypt.target.1.bin',
    './tests/decrypt.source.2.bin',
    './tests/decrypt.target.2.bin'
  ]

  return Promise.all(files.map(file => readFile(file)))
    .then(([ source1, target1, source2, target2 ]) => {
      expect(archive1._decrypt(source1, key1)).toStrictEqual(target1)
      expect(archive1._decrypt(source2, key2)).toStrictEqual(target2)
    }, err => {
      expect(err).toBe(null)
    })
})

test('readHeader', () => {
  expect(archive1.header).toStrictEqual(header1)
  expect(archive2.header).toStrictEqual(header2)
})

test('readTable', () => {
  expect(archive1.hashTable).toStrictEqual(hashTable1)
  expect(archive1.blockTable).toStrictEqual(blockTable1)
  expect(archive2.hashTable).toStrictEqual(hashTable2)
  expect(archive2.blockTable).toStrictEqual(blockTable2)
})

test('readFile', () => {
  expect(archive1.files).toStrictEqual(listfile)
  // TODO: Test case for multiple sectors of files
})

test('extract', () => {
  return Promise.all([
    Promise.all(listfile.map(file => readFile(`./tests/test1/${file}`)))
      .then(buffers => {
        expect(archive1.extract()).toStrictEqual(
          listfile.reduce((result, filename, i) => Object.assign(result, {
            [filename]: buffers[i]
          }), {})
        )
      }),
    Promise.all(listfile.map(file => readFile(`./tests/test2/${file}`)))
      .then(buffers => {
        expect(archive2.extract()).toStrictEqual(
          listfile.reduce((result, filename, i) => Object.assign(result, {
            [filename]: buffers[i]
          }), {})
        )
      })
  ])
})
