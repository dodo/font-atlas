var defaultChars = [32, 126]

module.exports = atlas

function atlas(options) {
  options = options || {}

  var info   = {}
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
      return getPowerOfTwo(Math.ceil(Math.sqrt(chars.length)) * d)
    })
  }

  canvas.width  = shape[0]
  canvas.height = shape[1]

  var ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.font = size + 'px ' + family
  ctx.fillStyle = color.foreground
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  var x = step[0] * 0.5
  var y = step[1] * 0.5
  for (var char, glyph, i = 0; i < chars.length; i++) {
    char = chars[i]
    info[char] = glyph = {
      w: ctx.measureText(char).width,
      h: (size * 1.2),
    }
    glyph.x = (x - glyph.w * 0.5)
    glyph.y = (y - glyph.h * 0.4)
    if (color.background) {
      ctx.beginPath()
      ctx.rect(glyph.x, glyph.y, glyph.w, glyph.h)
      ctx.fillStyle = color.background
      ctx.fill()
      ctx.fillStyle = color.foreground
    }
    ctx.fillText(char, x, y)
    if ((x += step[0]) > shape[0] - step[0]/2) (x = step[0]/2), (y += step[1])
  }

  info.canvas = canvas
  info.order = chars
  info.length = chars.length

  return info
}

function getPowerOfTwo(value, pow) {
  pow = pow || 1
  while (pow < value) pow *= 2
  return pow
}
