var fs = require('fs')
var Canvas = require('canvas')

var atlas = require('./')


var canvas = new Canvas()

atlas({
  canvas: canvas
  , family: 'Helvetica'
  , size: 21
  , background: '#000'
})

fs.writeFile('atlas.png', canvas.toBuffer())
