var div = document.getElementById('div');
var hex = '#cdeb8f';

gradient(hex, div);

function gradient(topColor, elm) {
  function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  var ratio = 1.24;
  var top = hexToRgb(topColor);
  var r = Math.floor(top.r / ratio);
  var g = Math.floor(top.g / ratio);
  var b = Math.floor(top.b / ratio);
  var bottom = rgbToHex(r, g, b);
  var bg = 'linear-gradient(to bottom,  ' + hex + ' 0%, ' + bottom + ' 100%)';
  elm.style.background = bg;
}
