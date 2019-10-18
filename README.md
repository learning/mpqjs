# mpqjs
Library for reading MPQ (MoPaQ) archives in pure javascript, inspiration of
[mpyq](https://github.com/eagleflo/mpyq), originally used for StarCraft II
replay analyse.

## Installation

```
npm install mpqjs --save
```

## Usage

#### Initialize

```
const MPQArchive = require('mpqjs')
const archive = new MPQArchive('./tests/test1.SC2Replay')
```

#### Extract files to memory

```
archive.extract()
```

All files will be extracted to the memory, in a JSON object:

```
{
  'replay.attributes.events': <Buffer 00 00 00 00 00 8a 02 00 00 e7 03 ... >,
  'replay.details': <Buffer 05 24 00 04 01 00 10 05 16 00 02 18 e7 82 ... >,
  'replay.details.backup': <Buffer 05 24 00 04 01 00 10 05 16 00 02 00 ... >,
  'replay.game.events': <Buffer 00 f0 54 da 71 77 08 00 60 d8 06 04 a7 ... >,
  'replay.gamemetadata.json': <Buffer 7b 0a 20 20 20 20 22 54 69 74 6c ... >,
  'replay.initData': <Buffer 10 0c e7 82 99 e7 83 ad e5 9c a3 e7 81 ab ... >,
  'replay.initData.backup': <Buffer 10 00 04 f8 ff ff ff 0f 00 00 00 00 ... >,
  'replay.load.info': <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >,
  'replay.message.events': <Buffer 00 25 80 00 00 05 01 00 27 80 00 00 ... >,
  'replay.resumable.events': <Buffer 60 00 00 00 01 06 23 23 23 ff 0c ... >,
  'replay.server.battlelobby': <Buffer 07 73 2f 55 73 65 72 73 2f 53 68 ... >,
  'replay.smartcam.events': <Buffer 00 5b 01 00 00 01 00 8c 06 28 00 03 ... >,
  'replay.sync.events': <Buffer 01 40 2b 5b 01 01 40 b1 2f 01 01 40 a1 ... >,
  'replay.sync.history': <Buffer >,
  'replay.tracker.events': <Buffer 03 00 09 00 09 12 05 08 00 09 02 02 ... >
}
```

#### Extract files to file system

```
archive.extractToDisk()
```

### Compatibility

- Node.js 8.9.0+

### Test

```
npm test
```
