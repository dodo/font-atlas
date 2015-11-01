var fs = require('fs')
var Canvas = require('canvas')

var atlas = require('./')


var canvas = new Canvas()

var glyphs = atlas({
  canvas: canvas
  , family: 'Helvetica'
  , size: 21
  , background: '#009ee8'
})

console.log(glyphs)
fs.writeFile('atlas.png', canvas.toBuffer())
