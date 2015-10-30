var fs = require('fs')
var Canvas = require('canvas')

var atlas = require('./')


var canvas = new Canvas(512, 512)

atlas({
  canvas: canvas
  , family: 'Helvetica'
  , size: 21
  , shape: [canvas.width, canvas.height]
  , step: [51, 51]
})

fs.writeFile('atlas.png', canvas.toBuffer())
