/*
 * Various functions for dealing with/converting colors
 */

"use strict"

// See https://gist.github.com/mjackson/5311256 for the source of some of
// these.

// Extracted out of hslToRgb because eslint doesn't like nested functions.
function hue2rgb(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

module.exports = {
  intToHex: function(i) {
    let hex = i.toString(16)
    if (hex.length < 6) {
      hex = ("000000" + hex).substring(hex.length - 6)
    }

    return hex
  },

  hexToInt: function(hex) {
    return parseInt(hex, 16)
  },

  rgbToHex: function(r, g, b) {
    let hex = ""

    for (let n of [r, g, b]) {
      let s = (n & 0xff).toString(16)
      if (s.length < 2) {
        s = "0" + s
      }
      hex += s
    }

    return hex
  },

  hexToRgb: function(hex) {
    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    return [r, g, b]
  },

  rgbToHsl: function(r, g, b) {
    r /= 255
    g /= 255
    b /= 255

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h,
      s,
      l = (max + min) / 2

    if (max == min) {
      h = s = 0 // achromatic
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h /= 6
    }

    return [h, s, l]
  },

  hslToRgb: function(h, s, l) {
    let r, g, b

    if (s == 0) {
      r = g = b = l // achromatic
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s
      let p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return [r * 255, g * 255, b * 255]
  },

  distance: function(color1, color2) {
    // Weighted Euclidean distance. See https://en.wikipedia.org/wiki/Color_difference

    let little_r
    let red = 0
    let grn = 1
    let blu = 2
    let deltas = [0, 0, 0]

    deltas[red] = (color2[red] - color1[red]) ** 2
    deltas[grn] = (color2[grn] - color1[grn]) ** 2
    deltas[blu] = (color2[blu] - color1[blu]) ** 2
    little_r = (color1[red] + color2[red]) / 2

    let distance = Math.sqrt(
      deltas[red] * 2 +
        deltas[grn] * 4 +
        deltas[blu] * 3 +
        (little_r * (deltas[red] - deltas[blu])) / 256
    )

    return distance
  },
}
