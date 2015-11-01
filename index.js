var defaultChars = [32, 126]

module.exports = atlas

function atlas(options) {
  options = options || {}

  var canvas = options.canvas || document.createElement('canvas')
  var family = options.family || 'monospace'
  var shape  = options.shape
  var step   = options.step
  var size   = options.size || 16
  var chars  = options.chars || defaultChars
  var color  = {
    background: options.background,
    foreground: options.foreground || '#fff',
  }

  if (typeof size !== 'number') {
    size = parseFloat(size)
  }

  if (color.background === 'transparent') {
    color.background = null
  }

  if (!Array.isArray(chars)) {
    chars = String(chars).split('')
  } else
  if (chars.length === 2
    && typeof chars[0] === 'number'
    && typeof chars[1] === 'number'
  ) {
    var newchars = []

    for (var i = chars[0], j = 0; i <= chars[1]; i++) {
      newchars[j++] = String.fromCharCode(i)
    }

    chars = newchars
  }

  if (Array.isArray(step)) {
    step = step.slice()
  } else {
    step = [Math.round(size * 1.2), Math.round(size * 1.2)]
  }

  if (Array.isArray(shape)) {
    shape = shape.slice()
  } else {
    shape = step.map(function (d) {
      return getPowerOfTwo(Math.ceil(Math.sqrt(chars.length + 1)) * d)
    })
  }

  canvas.width  = shape[0]
  canvas.height = shape[1]

  var ctx = canvas.getContext('2d')
  var img = ctx.getImageData(0, 0, step[0], step[1])

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.font = size + 'px ' + family
  ctx.fillStyle = color.foreground
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  var x = step[0] * 1.5
  var y = step[1] * 0.5
  for (var i = 0; i < chars.length; i++) {
    var w = ctx.measureText(chars[i]).width
    img.data[i * 4]     = w   // r
    img.data[i * 4 + 3] = 255 // a
    if (color.background) {
      var h = size * 1.2
      ctx.beginPath()
      ctx.rect(x - w*0.5, y - h*0.4, w, h)
      ctx.fillStyle = color.background
      ctx.fill()
      ctx.fillStyle = color.foreground
    }
    ctx.fillText(chars[i], x, y)
    if ((x += step[0]) > shape[0] - step[0]/2) (x = step[0]/2), (y += step[1])
  }

  ctx.putImageData(img, 0, 0)

  return canvas
}

function getPowerOfTwo(value, pow) {
  pow = pow || 1
  while (pow < value) pow *= 2
  return pow
}
