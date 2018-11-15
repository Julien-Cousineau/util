(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
typeof define === 'function' && define.amd ? define(factory) :
(factory());
}(this, (function () { 'use strict';

// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

// http://www.w3.org/TR/css3-color/
var kCSSColorTable = {
  "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
  "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
  "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
  "beige": [245,245,220,1], "bisque": [255,228,196,1],
  "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
  "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
  "brown": [165,42,42,1], "burlywood": [222,184,135,1],
  "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
  "chocolate": [210,105,30,1], "coral": [255,127,80,1],
  "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
  "crimson": [220,20,60,1], "cyan": [0,255,255,1],
  "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
  "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
  "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
  "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
  "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
  "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
  "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
  "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
  "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
  "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
  "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
  "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
  "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
  "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
  "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
  "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
  "gray": [128,128,128,1], "green": [0,128,0,1],
  "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
  "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
  "indianred": [205,92,92,1], "indigo": [75,0,130,1],
  "ivory": [255,255,240,1], "khaki": [240,230,140,1],
  "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
  "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
  "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
  "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
  "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
  "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
  "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
  "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
  "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
  "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
  "limegreen": [50,205,50,1], "linen": [250,240,230,1],
  "magenta": [255,0,255,1], "maroon": [128,0,0,1],
  "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
  "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
  "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
  "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
  "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
  "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
  "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
  "navy": [0,0,128,1], "oldlace": [253,245,230,1],
  "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
  "orange": [255,165,0,1], "orangered": [255,69,0,1],
  "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
  "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
  "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
  "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
  "pink": [255,192,203,1], "plum": [221,160,221,1],
  "powderblue": [176,224,230,1], "purple": [128,0,128,1],
  "rebeccapurple": [102,51,153,1],
  "red": [255,0,0,1], "rosybrown": [188,143,143,1],
  "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
  "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
  "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
  "sienna": [160,82,45,1], "silver": [192,192,192,1],
  "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
  "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
  "snow": [255,250,250,1], "springgreen": [0,255,127,1],
  "steelblue": [70,130,180,1], "tan": [210,180,140,1],
  "teal": [0,128,128,1], "thistle": [216,191,216,1],
  "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
  "violet": [238,130,238,1], "wheat": [245,222,179,1],
  "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
  "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]};

function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
  i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parse_css_int(str) {  // int or percentage.
  if (str[str.length - 1] === '%')
    { return clamp_css_byte(parseFloat(str) / 100 * 255); }
  return clamp_css_byte(parseInt(str));
}

function parse_css_float(str) {  // float or percentage.
  if (str[str.length - 1] === '%')
    { return clamp_css_float(parseFloat(str) / 100); }
  return clamp_css_float(parseFloat(str));
}

function css_hue_to_rgb(m1, m2, h) {
  if (h < 0) { h += 1; }
  else if (h > 1) { h -= 1; }

  if (h * 6 < 1) { return m1 + (m2 - m1) * h * 6; }
  if (h * 2 < 1) { return m2; }
  if (h * 3 < 2) { return m1 + (m2 - m1) * (2/3 - h) * 6; }
  return m1;
}

function parseCSSColor(css_str) {
  // Remove all whitespace, not compliant, but should just be more accepting.
  var str = css_str.replace(/ /g, '').toLowerCase();

  // Color keywords (and transparent) lookup.
  if (str in kCSSColorTable) { return kCSSColorTable[str].slice(); }  // dup.

  // #abc and #abc123 syntax.
  if (str[0] === '#') {
    var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
    if (str.length === 4) {
      if (!(iv >= 0 && iv <= 0xfff)) { return null; }  // Covers NaN.
      return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
        (iv & 0xf0) | ((iv & 0xf0) >> 4),
        (iv & 0xf) | ((iv & 0xf) << 4),
        1];
    } else if (str.length === 7) {
      if (!(iv >= 0 && iv <= 0xffffff)) { return null; }  // Covers NaN.
      return [(iv & 0xff0000) >> 16,
        (iv & 0xff00) >> 8,
        iv & 0xff,
        1];
    }

    return null;
  }

  var op = str.indexOf('('), ep = str.indexOf(')');
  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op+1, ep-(op+1)).split(',');
    var alpha = 1;  // To allow case fallthrough.
    switch (fname) {
    case 'rgba':
      if (params.length !== 4) { return null; }
      alpha = parse_css_float(params.pop());
      // Fall through.
    case 'rgb':
      if (params.length !== 3) { return null; }
      return [parse_css_int(params[0]),
        parse_css_int(params[1]),
        parse_css_int(params[2]),
        alpha];
    case 'hsla':
      if (params.length !== 4) { return null; }
      alpha = parse_css_float(params.pop());
      // Fall through.
    case 'hsl':
      if (params.length !== 3) { return null; }
      var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
      // NOTE(deanm): According to the CSS spec s/l should only be
      // percentages, but we don't bother and let float or percentage.
      var s = parse_css_float(params[1]);
      var l = parse_css_float(params[2]);
      var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      var m1 = l * 2 - m2;
      return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
        clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
        clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
        alpha];
    default:
      return null;
    }
  }

  return null;
}

var red = {"50":"#ffebee","100":"#ffcdd2","200":"#ef9a9a","300":"#e57373","400":"#ef5350","500":"#f44336","600":"#e53935","700":"#d32f2f","800":"#c62828","900":"#b71c1c","a100":"#ff8a80","a200":"#ff5252","a400":"#ff1744","a700":"#d50000"};
var pink = {"50":"#fce4ec","100":"#f8bbd0","200":"#f48fb1","300":"#f06292","400":"#ec407a","500":"#e91e63","600":"#d81b60","700":"#c2185b","800":"#ad1457","900":"#880e4f","a100":"#ff80ab","a200":"#ff4081","a400":"#f50057","a700":"#c51162"};
var purple = {"50":"#f3e5f5","100":"#e1bee7","200":"#ce93d8","300":"#ba68c8","400":"#ab47bc","500":"#9c27b0","600":"#8e24aa","700":"#7b1fa2","800":"#6a1b9a","900":"#4a148c","a100":"#ea80fc","a200":"#e040fb","a400":"#d500f9","a700":"#aa00ff"};
var deepPurple = {"50":"#ede7f6","100":"#d1c4e9","200":"#b39ddb","300":"#9575cd","400":"#7e57c2","500":"#673ab7","600":"#5e35b1","700":"#512da8","800":"#4527a0","900":"#311b92","a100":"#b388ff","a200":"#7c4dff","a400":"#651fff","a700":"#6200ea"};
var indigo = {"50":"#e8eaf6","100":"#c5cae9","200":"#9fa8da","300":"#7986cb","400":"#5c6bc0","500":"#3f51b5","600":"#3949ab","700":"#303f9f","800":"#283593","900":"#1a237e","a100":"#8c9eff","a200":"#536dfe","a400":"#3d5afe","a700":"#304ffe"};
var blue = {"50":"#e3f2fd","100":"#bbdefb","200":"#90caf9","300":"#64b5f6","400":"#42a5f5","500":"#2196f3","600":"#1e88e5","700":"#1976d2","800":"#1565c0","900":"#0d47a1","a100":"#82b1ff","a200":"#448aff","a400":"#2979ff","a700":"#2962ff"};
var lightBlue = {"50":"#e1f5fe","100":"#b3e5fc","200":"#81d4fa","300":"#4fc3f7","400":"#29b6f6","500":"#03a9f4","600":"#039be5","700":"#0288d1","800":"#0277bd","900":"#01579b","a100":"#80d8ff","a200":"#40c4ff","a400":"#00b0ff","a700":"#0091ea"};
var cyan = {"50":"#e0f7fa","100":"#b2ebf2","200":"#80deea","300":"#4dd0e1","400":"#26c6da","500":"#00bcd4","600":"#00acc1","700":"#0097a7","800":"#00838f","900":"#006064","a100":"#84ffff","a200":"#18ffff","a400":"#00e5ff","a700":"#00b8d4"};
var teal = {"50":"#e0f2f1","100":"#b2dfdb","200":"#80cbc4","300":"#4db6ac","400":"#26a69a","500":"#009688","600":"#00897b","700":"#00796b","800":"#00695c","900":"#004d40","a100":"#a7ffeb","a200":"#64ffda","a400":"#1de9b6","a700":"#00bfa5"};
var green = {"50":"#e8f5e9","100":"#c8e6c9","200":"#a5d6a7","300":"#81c784","400":"#66bb6a","500":"#4caf50","600":"#43a047","700":"#388e3c","800":"#2e7d32","900":"#1b5e20","a100":"#b9f6ca","a200":"#69f0ae","a400":"#00e676","a700":"#00c853"};
var lightGreen = {"50":"#f1f8e9","100":"#dcedc8","200":"#c5e1a5","300":"#aed581","400":"#9ccc65","500":"#8bc34a","600":"#7cb342","700":"#689f38","800":"#558b2f","900":"#33691e","a100":"#ccff90","a200":"#b2ff59","a400":"#76ff03","a700":"#64dd17"};
var lime = {"50":"#f9fbe7","100":"#f0f4c3","200":"#e6ee9c","300":"#dce775","400":"#d4e157","500":"#cddc39","600":"#c0ca33","700":"#afb42b","800":"#9e9d24","900":"#827717","a100":"#f4ff81","a200":"#eeff41","a400":"#c6ff00","a700":"#aeea00"};
var yellow = {"50":"#fffde7","100":"#fff9c4","200":"#fff59d","300":"#fff176","400":"#ffee58","500":"#ffeb3b","600":"#fdd835","700":"#fbc02d","800":"#f9a825","900":"#f57f17","a100":"#ffff8d","a200":"#ffff00","a400":"#ffea00","a700":"#ffd600"};
var amber = {"50":"#fff8e1","100":"#ffecb3","200":"#ffe082","300":"#ffd54f","400":"#ffca28","500":"#ffc107","600":"#ffb300","700":"#ffa000","800":"#ff8f00","900":"#ff6f00","a100":"#ffe57f","a200":"#ffd740","a400":"#ffc400","a700":"#ffab00"};
var orange = {"50":"#fff3e0","100":"#ffe0b2","200":"#ffcc80","300":"#ffb74d","400":"#ffa726","500":"#ff9800","600":"#fb8c00","700":"#f57c00","800":"#ef6c00","900":"#e65100","a100":"#ffd180","a200":"#ffab40","a400":"#ff9100","a700":"#ff6d00"};
var deepOrange = {"50":"#fbe9e7","100":"#ffccbc","200":"#ffab91","300":"#ff8a65","400":"#ff7043","500":"#ff5722","600":"#f4511e","700":"#e64a19","800":"#d84315","900":"#bf360c","a100":"#ff9e80","a200":"#ff6e40","a400":"#ff3d00","a700":"#dd2c00"};
var brown = {"50":"#efebe9","100":"#d7ccc8","200":"#bcaaa4","300":"#a1887f","400":"#8d6e63","500":"#795548","600":"#6d4c41","700":"#5d4037","800":"#4e342e","900":"#3e2723"};
var grey = {"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121"};
var blueGrey = {"50":"#eceff1","100":"#cfd8dc","200":"#b0bec5","300":"#90a4ae","400":"#78909c","500":"#607d8b","600":"#546e7a","700":"#455a64","800":"#37474f","900":"#263238"};
var darkText = {"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","dividers":"rgba(0, 0, 0, 0.12)"};
var lightText = {"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","dividers":"rgba(255, 255, 255, 0.12)"};
var darkIcons = {"active":"rgba(0, 0, 0, 0.54)","inactive":"rgba(0, 0, 0, 0.38)"};
var lightIcons = {"active":"rgba(255, 255, 255, 1)","inactive":"rgba(255, 255, 255, 0.5)"};
var white = "#ffffff";
var black = "#000000";

var materialcolors = {
  red: red,
  pink: pink,
  purple: purple,
  deepPurple: deepPurple,
  indigo: indigo,
  blue: blue,
  lightBlue: lightBlue,
  cyan: cyan,
  teal: teal,
  green: green,
  lightGreen: lightGreen,
  lime: lime,
  yellow: yellow,
  amber: amber,
  orange: orange,
  deepOrange: deepOrange,
  brown: brown,
  grey: grey,
  blueGrey: blueGrey,
  darkText: darkText,
  lightText: lightText,
  darkIcons: darkIcons,
  lightIcons: lightIcons,
  white: white,
  black: black
};

var Color = function Color(color) {
  this.update(color);
};

var prototypeAccessors = { luminance: { configurable: true } };
Color.parse = function parse (obj){return new Color(obj);};
Color.parseString = function parseString (input) {
  if (!input){ return undefined; }
  if (typeof input !== 'string'){ return undefined; }
  if (input instanceof Color){ return input; }
        
  var rgba = (input[0]==="#" && input.length==9)?Color.hex2rgba(input):parseCSSColor(input);
  if (!rgba){ return undefined; }
  rgba = (Array.isArray(rgba))?{r:rgba[0],g:rgba[1],b:rgba[2],a:rgba[3]}:rgba;
  return new Color(rgba);
};
Color.materialcolors = function materialcolors$1 (){
  return materialcolors;
};
Color.prototype.update = function update (color){
  if(!color){ color='#ffffffff'; }
  if(typeof color.r !== 'undefined') { return this.parseRGBA(color); }
  if(typeof color.h !== 'undefined' || typeof color.s !== 'undefined' || typeof color.v !== 'undefined') { return this.parseHSVA(color); }
  if(typeof color.a !== 'undefined') { return this.parseRGBA(color); }
       
  return this.parseHex(color);
};
    
Color.prototype.parseRGBA = function parseRGBA (rgba) {
  if(!this.rgba){ this.rgba={}; }
  var r=(typeof rgba.r !== 'undefined')? rgba.r : this.rgba.r || 0;
  var g=(typeof rgba.g !== 'undefined')? rgba.g : this.rgba.g || 0;
  var b=(typeof rgba.b !== 'undefined')? rgba.b : this.rgba.b || 0;
  var a=(typeof rgba.a !== 'undefined')? rgba.a :this.rgba.a || 1;
  this.rgba = {r:r,g:g,b:b,a:a};
  this.hsva = this.rgba2hsva(this.rgba);
  this.hex = this.rgba2hex(this.rgba);
  this.colorgroup = this.colorDetector(this.hsva);
  return this;
};
Color.prototype.parseHSVA = function parseHSVA (hsva) {
  if(!this.hsva){ this.hsva={}; }
  var h=(typeof hsva.h !== 'undefined')? hsva.h : this.hsva.h || 0;
  var s=(typeof hsva.s !== 'undefined')? hsva.s : this.hsva.s || 0;
  var v=(typeof hsva.v !== 'undefined')? hsva.v : this.hsva.v || 0;
  var a=(typeof hsva.a !== 'undefined')? hsva.a :this.hsva.a || 1;
  this.hsva = {h:h,s:s,v:v,a:a};
  this.rgba = this.hsva2rgba(this.hsva);
  this.hex = this.rgba2hex(this.rgba);
  return this;
};
Color.prototype.parseHex = function parseHex (hex){
  this.hex=hex;
  this.rgba = Color.hex2rgba(this.hex);
  this.hsva = this.rgba2hsva(this.rgba);
  return this;
        
};
prototypeAccessors.luminance.get = function (){
  var ref = this.rgba;
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;
  return ( 0.299 * r + 0.587 * g + 0.114 * b)/255;
};
Color.prototype.fontColor = function fontColor (){
  if(this.luminance>0.58){return Color.parseString('black');}
  return Color.parseString('white');
};
Color.prototype.rgb2str = function rgb2str () {
  var ref = this.rgba;
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;
  return 'rgb({0},{1},{2})'.format(r,g,b); 
};
Color.prototype.rgba2str = function rgba2str () {
  var ref = this.rgba;
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;
    var a = ref.a;
  return 'rgba({0},{1},{2},{3})'.format(r,g,b,a); 
};
Color.prototype.hsla2str = function hsla2str () {
  var ref=this.hsva;
    var h = ref.h;
    var s = ref.s;
    var v = ref.v;
    var a = ref.a;
  return 'hsla({0},{1}%,{2}%,{3})'.format(h,s*100,v*100,a); 
};
Color.prototype.copy = function copy (){
  var ref=this.rgba;
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;
    var a = ref.a;
  return new Color({r:r,g:g,b:b,a:a});
};
Color.prototype.rgba2hsva = function rgba2hsva (rgba) {
  var r = rgba.r / 255 || 0;
  var g = rgba.g / 255 || 0;
  var b = rgba.b / 255 || 0;
  var a = rgba.a || 0;
        
  var rr, gg, bb,h, s,
    v = Math.max(r, g, b),
    diff = v - Math.min(r, g, b),
    diffc = function(c) {return (v - c) / 6 / diff + 1 / 2;};
    
  if (diff == 0) {
    h = s = 0;
  }
  else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);
    
    if (r === v) {
      h = bb - gg;
    }
    else if (g === v) {
      h = (1 / 3) + rr - bb;
    }
    else if (b === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }
    else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) * 0.01,
    v: Math.round(v * 100) * 0.01,
    a:a
  };
};
Color.prototype.hsva2rgba = function hsva2rgba (hsva) {
  var h = hsva.h / 360.0 || 0;
  var s = hsva.s || 0;
  var v = hsva.v || 0;
  var a = hsva.a || 0;
      
        
  var r, g, b;
        
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
        
  switch (i % 6) {
  case 0: r = v, g = t, b = p; break;
  case 1: r = q, g = v, b = p; break;
  case 2: r = p, g = v, b = t; break;
  case 3: r = p, g = q, b = v; break;
  case 4: r = t, g = p, b = v; break;
  case 5: r = v, g = p, b = q; break;
  }
        
  return {r:Math.floor(r*255), g:Math.floor(g*255), b:Math.floor(b*255),a:a};
    
};
Color.prototype.rgba2hex = function rgba2hex (rgba){
  var trans = (typeof rgba.a !== 'undefined')?("0" + parseInt(Math.round(rgba.a*255),10).toString(16)).slice(-2):'';
     
  return "#" +
    ("0" + parseInt(rgba.r,10).toString(16)).slice(-2) +
    ("0" + parseInt(rgba.g,10).toString(16)).slice(-2) +
    ("0" + parseInt(rgba.b,10).toString(16)).slice(-2) +
    trans;
};
Color.hex2rgba = function hex2rgba (hex) {
  hex = hex.replace(/\s/g, '');
    
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b + 'ff';
  });
  var noTransRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  hex = hex.replace(noTransRegex, function(m, r, g, b) {
    return r + g + b + 'ff';
  });
    
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: Math.round(parseInt(result[4], 16) / 255.0 * 100.0) * 0.01
  } : null;
};
Color.prototype.colorDetector = function colorDetector (hsva) {
  var h = hsva.h || 0;
  var s = hsva.s || 0;
  var v = hsva.v || 0;
      
  if (v< 0.2) { return "black"; }
  if (v> 0.9 && s< 0.2) { return "white"; }
  if (s< 0.2) { return "gray"; }
    
  if (h < 30) { return "red"; }
  if (h < 60) { return "orange"; }
  if (h < 90) { return "yellow"; }
  if (h < 150) { return "green"; }
  if (h < 210) { return "cyan"; }
  if (h < 270) { return "blue"; }
  if (h < 330) { return "magenta"; }
    
  return "red";
};

Object.defineProperties( Color.prototype, prototypeAccessors );

var uigradients = [
    {
        "name": "Heat",
        "colors": ["#00416A", "#E4E5E6"]
    },
    {
        "name": "Blu",
        "colors": ["#00416A", "#E4E5E6"]
    },
    {
        "name": "Ver",
        "colors": ["#FFE000", "#799F0C"]
    },
    {
        "name": "Ver Black",
        "colors": ["#F7F8F8", "#ACBB78"]
    },
    {
        "name": "Combi",
        "colors": ["#00416A", "#799F0C", "#FFE000"]
    },
    {
        "name": "Anwar",
        "colors": ["#334d50", "#cbcaa5"]
    },
    {
        "name": "Bluelagoo",
        "colors": ["#0052D4", "#4364F7", "#6FB1FC"]
    },
    {
        "name": "Lunada",
        "colors": ["#5433FF", "#20BDFF", "#A5FECB"]
    },
    {
        "name": "Reaqua",
        "colors": ["#799F0C", "#ACBB78"]
    },
    {
        "name": "Mango",
        "colors": ["#ffe259", "#ffa751"]
    },
    {
        "name": "Bupe",
        "colors": ["#00416A", "#E4E5E6"]
    },
    {
        "name": "Rea",
        "colors": ["#FFE000", "#799F0C"]
    },
    {
        "name": "Windy",
        "colors": ["#acb6e5", "#86fde8"]
    },
    {
        "name": "Royal Blue",
        "colors": ["#536976", "#292E49"]
    },
    {
        "name": "Royal Blue + Petrol",
        "colors": ["#BBD2C5", "#536976", "#292E49"]
    },
    {
        "name": "Copper",
        "colors": ["#B79891", "#94716B"]
    },
    {
        "name": "Anamnisar",
        "colors": ["#9796f0", "#fbc7d4"]
    },
    {
        "name": "Petrol",
        "colors": ["#BBD2C5", "#536976"]
    },
    {
        "name": "Sky",
        "colors": ["#076585", "#fff"]
    },
    {
        "name": "Sel",
        "colors": ["#00467F", "#A5CC82"]
    },
    {
        "name": "Skyline",
        "colors": ["#1488CC", "#2B32B2"]
    },
    {
        "name": "DIMIGO",
        "colors": ["#ec008c", "#fc6767"]
    },
    {
        "name": "Purple Love",
        "colors": ["#cc2b5e", "#753a88"]
    },
    {
        "name": "Sexy Blue",
        "colors": ["#2193b0", "#6dd5ed"]
    },
    {
        "name": "Blooker20",
        "colors": ["#e65c00", "#F9D423"]
    },
    {
        "name": "Sea Blue",
        "colors": ["#2b5876", "#4e4376"]
    },
    {
        "name": "Nimvelo",
        "colors": ["#314755", "#26a0da"]
    },
    {
        "name": "Hazel",
        "colors": ["#77A1D3", "#79CBCA", "#E684AE"]
    },
    {
        "name": "Noon to Dusk",
        "colors": ["#ff6e7f", "#bfe9ff"]
    },
    {
        "name": "YouTube",
        "colors": ["#e52d27", "#b31217"]
    },
    {
        "name": "Cool Brown",
        "colors": ["#603813", "#b29f94"]
    },
    {
        "name": "Harmonic Energy",
        "colors": ["#16A085", "#F4D03F"]
    },
    {
        "name": "Playing with Reds",
        "colors": ["#D31027", "#EA384D"]
    },
    {
        "name": "Sunny Days",
        "colors": ["#EDE574", "#E1F5C4"]
    },
    {
        "name": "Green Beach",
        "colors": ["#02AAB0", "#00CDAC"]
    },
    {
        "name": "Intuitive Purple",
        "colors": ["#DA22FF", "#9733EE"]
    },
    {
        "name": "Emerald Water",
        "colors": ["#348F50", "#56B4D3"]
    },
    {
        "name": "Lemon Twist",
        "colors": ["#3CA55C", "#B5AC49"]
    },
    {
        "name": "Monte Carlo",
        "colors": ["#CC95C0", "#DBD4B4", "#7AA1D2"]
    },
    {
        "name": "Horizon",
        "colors": ["#003973", "#E5E5BE"]
    },
    {
        "name": "Rose Water",
        "colors": ["#E55D87", "#5FC3E4"]
    },
    {
        "name": "Frozen",
        "colors": ["#403B4A", "#E7E9BB"]
    },
    {
        "name": "Mango Pulp",
        "colors": ["#F09819", "#EDDE5D"]
    },
    {
        "name": "Bloody Mary",
        "colors": ["#FF512F", "#DD2476"]
    },
    {
        "name": "Aubergine",
        "colors": ["#AA076B", "#61045F"]
    },
    {
        "name": "Aqua Marine",
        "colors": ["#1A2980", "#26D0CE"]
    },
    {
        "name": "Sunrise",
        "colors": ["#FF512F", "#F09819"]
    },
    {
        "name": "Purple Paradise",
        "colors": ["#1D2B64", "#F8CDDA"]
    },
    {
        "name": "Stripe",
        "colors": ["#1FA2FF", "#12D8FA", "#A6FFCB"]
    },
    {
        "name": "Sea Weed",
        "colors": ["#4CB8C4", "#3CD3AD"]
    },
    {
        "name": "Pinky",
        "colors": ["#DD5E89", "#F7BB97"]
    },
    {
        "name": "Cherry",
        "colors": ["#EB3349", "#F45C43"]
    },
    {
        "name": "Mojito",
        "colors": ["#1D976C", "#93F9B9"]
    },
    {
        "name": "Juicy Orange",
        "colors": ["#FF8008", "#FFC837"]
    },
    {
        "name": "Mirage",
        "colors": ["#16222A", "#3A6073"]
    },
    {
        "name": "Steel Gray",
        "colors": ["#1F1C2C", "#928DAB"]
    },
    {
        "name": "Kashmir",
        "colors": ["#614385", "#516395"]
    },
    {
        "name": "Electric Violet",
        "colors": ["#4776E6", "#8E54E9"]
    },
    {
        "name": "Venice Blue",
        "colors": ["#085078", "#85D8CE"]
    },
    {
        "name": "Bora Bora",
        "colors": ["#2BC0E4", "#EAECC6"]
    },
    {
        "name": "Moss",
        "colors": ["#134E5E", "#71B280"]
    },
    {
        "name": "Shroom Haze",
        "colors": ["#5C258D", "#4389A2"]
    },
    {
        "name": "Mystic",
        "colors": ["#757F9A", "#D7DDE8"]
    },
    {
        "name": "Midnight City",
        "colors": ["#232526", "#414345"]
    },
    {
        "name": "Sea Blizz",
        "colors": ["#1CD8D2", "#93EDC7"]
    },
    {
        "name": "Opa",
        "colors": ["#3D7EAA", "#FFE47A"]
    },
    {
        "name": "Titanium",
        "colors": ["#283048", "#859398"]
    },
    {
        "name": "Mantle",
        "colors": ["#24C6DC", "#514A9D"]
    },
    {
        "name": "Dracula",
        "colors": ["#DC2424", "#4A569D"]
    },
    {
        "name": "Peach",
        "colors": ["#ED4264", "#FFEDBC"]
    },
    {
        "name": "Moonrise",
        "colors": ["#DAE2F8", "#D6A4A4"]
    },
    {
        "name": "Clouds",
        "colors": ["#ECE9E6", "#FFFFFF"]
    },
    {
        "name": "Stellar",
        "colors": ["#7474BF", "#348AC7"]
    },
    {
        "name": "Bourbon",
        "colors": ["#EC6F66", "#F3A183"]
    },
    {
        "name": "Calm Darya",
        "colors": ["#5f2c82", "#49a09d"]
    },
    {
        "name": "Influenza",
        "colors": ["#C04848", "#480048"]
    },
    {
        "name": "Shrimpy",
        "colors": ["#e43a15", "#e65245"]
    },
    {
        "name": "Army",
        "colors": ["#414d0b", "#727a17"]
    },
    {
        "name": "Miaka",
        "colors": ["#FC354C", "#0ABFBC"]
    },
    {
        "name": "Pinot Noir",
        "colors": ["#4b6cb7", "#182848"]
    },
    {
        "name": "Day Tripper",
        "colors": ["#f857a6", "#ff5858"]
    },
    {
        "name": "Namn",
        "colors": ["#a73737", "#7a2828"]
    },
    {
        "name": "Blurry Beach",
        "colors": ["#d53369", "#cbad6d"]
    },
    {
        "name": "Vasily",
        "colors": ["#e9d362", "#333333"]
    },
    {
        "name": "A Lost Memory",
        "colors": ["#DE6262", "#FFB88C"]
    },
    {
        "name": "Petrichor",
        "colors": ["#666600", "#999966"]
    },
    {
        "name": "Jonquil",
        "colors": ["#FFEEEE", "#DDEFBB"]
    },
    {
        "name": "Sirius Tamed",
        "colors": ["#EFEFBB", "#D4D3DD"]
    },
    {
        "name": "Kyoto",
        "colors": ["#c21500", "#ffc500"]
    },
    {
        "name": "Misty Meadow",
        "colors": ["#215f00", "#e4e4d9"]
    },
    {
        "name": "Aqualicious",
        "colors": ["#50C9C3", "#96DEDA"]
    },
    {
        "name": "Moor",
        "colors": ["#616161", "#9bc5c3"]
    },
    {
        "name": "Almost",
        "colors": ["#ddd6f3", "#faaca8"]
    },
    {
        "name": "Forever Lost",
        "colors": ["#5D4157", "#A8CABA"]
    },
    {
        "name": "Winter",
        "colors": ["#E6DADA", "#274046"]
    },
    {
        "name": "Nelson",
        "colors": ["#f2709c", "#ff9472"]
    },
    {
        "name": "Autumn",
        "colors": ["#DAD299", "#B0DAB9"]
    },
    {
        "name": "Candy",
        "colors": ["#D3959B", "#BFE6BA"]
    },
    {
        "name": "Reef",
        "colors": ["#00d2ff", "#3a7bd5"]
    },
    {
        "name": "The Strain",
        "colors": ["#870000", "#190A05"]
    },
    {
        "name": "Dirty Fog",
        "colors": ["#B993D6", "#8CA6DB"]
    },
    {
        "name": "Earthly",
        "colors": ["#649173", "#DBD5A4"]
    },
    {
        "name": "Virgin",
        "colors": ["#C9FFBF", "#FFAFBD"]
    },
    {
        "name": "Ash",
        "colors": ["#606c88", "#3f4c6b"]
    },
    {
        "name": "Cherryblossoms",
        "colors": ["#FBD3E9", "#BB377D"]
    },
    {
        "name": "Parklife",
        "colors": ["#ADD100", "#7B920A"]
    },
    {
        "name": "Dance To Forget",
        "colors": ["#FF4E50", "#F9D423"]
    },
    {
        "name": "Starfall",
        "colors": ["#F0C27B", "#4B1248"]
    },
    {
        "name": "Red Mist",
        "colors": ["#000000", "#e74c3c"]
    },
    {
        "name": "Teal Love",
        "colors": ["#AAFFA9", "#11FFBD"]
    },
    {
        "name": "Neon Life",
        "colors": ["#B3FFAB", "#12FFF7"]
    },
    {
        "name": "Man of Steel",
        "colors": ["#780206", "#061161"]
    },
    {
        "name": "Amethyst",
        "colors": ["#9D50BB", "#6E48AA"]
    },
    {
        "name": "Cheer Up Emo Kid",
        "colors": ["#556270", "#FF6B6B"]
    },
    {
        "name": "Shore",
        "colors": ["#70e1f5", "#ffd194"]
    },
    {
        "name": "Facebook Messenger",
        "colors": ["#00c6ff", "#0072ff"]
    },
    {
        "name": "SoundCloud",
        "colors": ["#fe8c00", "#f83600"]
    },
    {
        "name": "Behongo",
        "colors": ["#52c234", "#061700"]
    },
    {
        "name": "ServQuick",
        "colors": ["#485563", "#29323c"]
    },
    {
        "name": "Friday",
        "colors": ["#83a4d4", "#b6fbff"]
    },
    {
        "name": "Martini",
        "colors": ["#FDFC47", "#24FE41"]
    },
    {
        "name": "Metallic Toad",
        "colors": ["#abbaab", "#ffffff"]
    },
    {
        "name": "Between The Clouds",
        "colors": ["#73C8A9", "#373B44"]
    },
    {
        "name": "Crazy Orange I",
        "colors": ["#D38312", "#A83279"]
    },
    {
        "name": "Hersheys",
        "colors": ["#1e130c", "#9a8478"]
    },
    {
        "name": "Talking To Mice Elf",
        "colors": ["#948E99", "#2E1437"]
    },
    {
        "name": "Purple Bliss",
        "colors": ["#360033", "#0b8793"]
    },
    {
        "name": "Predawn",
        "colors": ["#FFA17F", "#00223E"]
    },
    {
        "name": "Endless River",
        "colors": ["#43cea2", "#185a9d"]
    },
    {
        "name": "Pastel Orange at the Sun",
        "colors": ["#ffb347", "#ffcc33"]
    },
    {
        "name": "Twitch",
        "colors": ["#6441A5", "#2a0845"]
    },
    {
        "name": "Atlas",
        "colors": ["#FEAC5E", "#C779D0", "#4BC0C8"]
    },
    {
        "name": "Instagram",
        "colors": ["#833ab4", "#fd1d1d", "#fcb045"]
    },
    {
        "name": "Flickr",
        "colors": ["#ff0084", "#33001b"]
    },
    {
        "name": "Vine",
        "colors": ["#00bf8f", "#001510"]
    },
    {
        "name": "Turquoise flow",
        "colors": ["#136a8a", "#267871"]
    },
    {
        "name": "Portrait",
        "colors": ["#8e9eab", "#eef2f3"]
    },
    {
        "name": "Virgin America",
        "colors": ["#7b4397", "#dc2430"]
    },
    {
        "name": "Koko Caramel",
        "colors": ["#D1913C", "#FFD194"]
    },
    {
        "name": "Fresh Turboscent",
        "colors": ["#F1F2B5", "#135058"]
    },
    {
        "name": "Green to dark",
        "colors": ["#6A9113", "#141517"]
    },
    {
        "name": "Ukraine",
        "colors": ["#004FF9", "#FFF94C"]
    },
    {
        "name": "Curiosity blue",
        "colors": ["#525252", "#3d72b4"]
    },
    {
        "name": "Dark Knight",
        "colors": ["#BA8B02", "#181818"]
    },
    {
        "name": "Piglet",
        "colors": ["#ee9ca7", "#ffdde1"]
    },
    {
        "name": "Lizard",
        "colors": ["#304352", "#d7d2cc"]
    },
    {
        "name": "Sage Persuasion",
        "colors": ["#CCCCB2", "#757519"]
    },
    {
        "name": "Between Night and Day",
        "colors": ["#2c3e50", "#3498db"]
    },
    {
        "name": "Timber",
        "colors": ["#fc00ff", "#00dbde"]
    },
    {
        "name": "Passion",
        "colors": ["#e53935", "#e35d5b"]
    },
    {
        "name": "Clear Sky",
        "colors": ["#005C97", "#363795"]
    },
    {
        "name": "Master Card",
        "colors": ["#f46b45", "#eea849"]
    },
    {
        "name": "Back To Earth",
        "colors": ["#00C9FF", "#92FE9D"]
    },
    {
        "name": "Deep Purple",
        "colors": ["#673AB7", "#512DA8"]
    },
    {
        "name": "Little Leaf",
        "colors": ["#76b852", "#8DC26F"]
    },
    {
        "name": "Netflix",
        "colors": ["#8E0E00", "#1F1C18"]
    },
    {
        "name": "Light Orange",
        "colors": ["#FFB75E", "#ED8F03"]
    },
    {
        "name": "Green and Blue",
        "colors": ["#c2e59c", "#64b3f4"]
    },
    {
        "name": "Poncho",
        "colors": ["#403A3E", "#BE5869"]
    },
    {
        "name": "Back to the Future",
        "colors": ["#C02425", "#F0CB35"]
    },
    {
        "name": "Blush",
        "colors": ["#B24592", "#F15F79"]
    },
    {
        "name": "Inbox",
        "colors": ["#457fca", "#5691c8"]
    },
    {
        "name": "Purplin",
        "colors": ["#6a3093", "#a044ff"]
    },
    {
        "name": "Pale Wood",
        "colors": ["#eacda3", "#d6ae7b"]
    },
    {
        "name": "Haikus",
        "colors": ["#fd746c", "#ff9068"]
    },
    {
        "name": "Pizelex",
        "colors": ["#114357", "#F29492"]
    },
    {
        "name": "Joomla",
        "colors": ["#1e3c72", "#2a5298"]
    },
    {
        "name": "Christmas",
        "colors": ["#2F7336", "#AA3A38"]
    },
    {
        "name": "Minnesota Vikings",
        "colors": ["#5614B0", "#DBD65C"]
    },
    {
        "name": "Miami Dolphins",
        "colors": ["#4DA0B0", "#D39D38"]
    },
    {
        "name": "Forest",
        "colors": ["#5A3F37", "#2C7744"]
    },
    {
        "name": "Nighthawk",
        "colors": ["#2980b9", "#2c3e50"]
    },
    {
        "name": "Superman",
        "colors": ["#0099F7", "#F11712"]
    },
    {
        "name": "Suzy",
        "colors": ["#834d9b", "#d04ed6"]
    },
    {
        "name": "Dark Skies",
        "colors": ["#4B79A1", "#283E51"]
    },
    {
        "name": "Deep Space",
        "colors": ["#000000", "#434343"]
    },
    {
        "name": "Decent",
        "colors": ["#4CA1AF", "#C4E0E5"]
    },
    {
        "name": "Colors Of Sky",
        "colors": ["#E0EAFC", "#CFDEF3"]
    },
    {
        "name": "Purple White",
        "colors": ["#BA5370", "#F4E2D8"]
    },
    {
        "name": "Ali",
        "colors": ["#ff4b1f", "#1fddff"]
    },
    {
        "name": "Alihossein",
        "colors": ["#f7ff00", "#db36a4"]
    },
    {
        "name": "Shahabi",
        "colors": ["#a80077", "#66ff00"]
    },
    {
        "name": "Red Ocean",
        "colors": ["#1D4350", "#A43931"]
    },
    {
        "name": "Tranquil",
        "colors": ["#EECDA3", "#EF629F"]
    },
    {
        "name": "Transfile",
        "colors": ["#16BFFD", "#CB3066"]
    },

    {
        "name": "Sylvia",
        "colors": ["#ff4b1f", "#ff9068"]
    },
    {
        "name": "Sweet Morning",
        "colors": ["#FF5F6D", "#FFC371"]
    },
    {
        "name": "Politics",
        "colors": ["#2196f3", "#f44336"]
    },
    {
        "name": "Bright Vault",
        "colors": ["#00d2ff", "#928DAB"]
    },
    {
        "name": "Solid Vault",
        "colors": ["#3a7bd5", "#3a6073"]
    },
    {
        "name": "Sunset",
        "colors": ["#0B486B", "#F56217"]
    },
    {
        "name": "Grapefruit Sunset",
        "colors": ["#e96443", "#904e95"]
    },
    {
        "name": "Deep Sea Space",
        "colors": ["#2C3E50", "#4CA1AF"]
    },
    {
        "name": "Dusk",
        "colors": ["#2C3E50", "#FD746C"]
    },
    {
        "name": "Minimal Red",
        "colors": ["#F00000", "#DC281E"]
    },
    {
        "name": "Royal",
        "colors": ["#141E30", "#243B55"]
    },
    {
        "name": "Mauve",
        "colors": ["#42275a", "#734b6d"]
    },
    {
        "name": "Frost",
        "colors": ["#000428", "#004e92"]
    },
    {
        "name": "Lush",
        "colors": ["#56ab2f", "#a8e063"]
    },
    {
        "name": "Firewatch",
        "colors": ["#cb2d3e", "#ef473a"]
    },
    {
        "name": "Sherbert",
        "colors": ["#f79d00", "#64f38c"]
    },
    {
        "name": "Blood Red",
        "colors": ["#f85032", "#e73827"]
    },
    {
        "name": "Sun on the Horizon",
        "colors": ["#fceabb", "#f8b500"]
    },
    {
        "name": "IIIT Delhi",
        "colors": ["#808080", "#3fada8"]
    },
    {
        "name": "Jupiter",
        "colors": ["#ffd89b", "#19547b"]
    },
    {
        "name": "50 Shades of Grey",
        "colors": ["#bdc3c7", "#2c3e50"]
    },
    {
        "name": "Dania",
        "colors": ["#BE93C5", "#7BC6CC"]
    },
    {
        "name": "Limeade",
        "colors": ["#A1FFCE", "#FAFFD1"]
    },
    {
        "name": "Disco",
        "colors": ["#4ECDC4", "#556270"]
    },
    {
        "name": "Love Couple",
        "colors": ["#3a6186", "#89253e"]
    },
    {
        "name": "Azure Pop",
        "colors": ["#ef32d9", "#89fffd"]
    },
    {
        "name": "Nepal",
        "colors": ["#de6161", "#2657eb"]
    },
    {
        "name": "Cosmic Fusion",
        "colors": ["#ff00cc", "#333399"]
    },
    {
        "name": "Snapchat",
        "colors": ["#fffc00", "#ffffff"]
    },
    {
        "name": "Ed's Sunset Gradient",
        "colors": ["#ff7e5f", "#feb47b"]
    },
    {
        "name": "Brady Brady Fun Fun",
        "colors": ["#00c3ff", "#ffff1c"]
    },
    {
        "name": "Black Rosé",
        "colors": ["#f4c4f3", "#fc67fa"]
    },
    {
        "name": "80's Purple",
        "colors": ["#41295a", "#2F0743"]
    },
    {
        "name": "Radar",
        "colors": ["#A770EF", "#CF8BF3", "#FDB99B"]
    },
    {
        "name": "Ibiza Sunset",
        "colors": ["#ee0979", "#ff6a00"]
    },
    {
        "name": "Dawn",
        "colors": ["#F3904F", "#3B4371"]
    },
    {
        "name": "Mild",
        "colors": ["#67B26F", "#4ca2cd"]
    },
    {

        "name": "Vice City",
        "colors": ["#3494E6", "#EC6EAD"]
    },
    {
        "name": "Jaipur",
        "colors": ["#DBE6F6", "#C5796D"]

    },
    {
        "name": "Jodhpur",
        "colors": ["#9CECFB", "#65C7F7", "#0052D4"]

    },
    {
        "name": "Cocoaa Ice",
        "colors": ["#c0c0aa", "#1cefff"]
    },
    {
        "name": "EasyMed",
        "colors": ["#DCE35B", "#45B649"]
    },
    {
        "name": "Rose Colored Lenses",
        "colors": ["#E8CBC0", "#636FA4"]
    },
    {
        "name": "What lies Beyond",
        "colors": ["#F0F2F0", "#000C40"]
    },
    {
        "name": "Roseanna",
        "colors": ["#FFAFBD", "#ffc3a0"]
    },
    {
        "name": "Honey Dew",
        "colors": ["#43C6AC", "#F8FFAE"]
    },
    {
        "name": "Under the Lake",
        "colors": ["#093028", "#237A57"]
    },
    {
        "name": "The Blue Lagoon",
        "colors": ["#43C6AC", "#191654"]
    },
    {
        "name": "Can You Feel The Love Tonight",
        "colors": ["#4568DC", "#B06AB3"]
    },
    {
        "name": "Very Blue",
        "colors": ["#0575E6", "#021B79"]
    },
    {
        "name": "Love and Liberty",
        "colors": ["#200122", "#6f0000"]
    },
    {
        "name": "Orca",
        "colors": ["#44A08D", "#093637"]
    },
    {
        "name": "Venice",
        "colors": ["#6190E8", "#A7BFE8"]
    },
    {
        "name": "Pacific Dream",
        "colors": ["#34e89e", "#0f3443"]
    },
    {
        "name": "Learning and Leading",
        "colors": ["#F7971E", "#FFD200"]
    },
    {
        "name": "Celestial",
        "colors": ["#C33764", "#1D2671"]
    },
    {
        "name": "Purplepine",
        "colors": ["#20002c", "#cbb4d4"]
    },
    {
        "name": "Sha la la",
        "colors": ["#D66D75", "#E29587"]
    },
    {
        "name": "Mini",
        "colors": ["#30E8BF", "#FF8235"]
    },
    {
        "name": "Maldives",
        "colors": ["#B2FEFA", "#0ED2F7"]
    },
    {
        "name": "Cinnamint",
        "colors": ["#4AC29A", "#BDFFF3"]
    },
    {
        "name": "Html",
        "colors": ["#E44D26", "#F16529"]
    },
    {
        "name": "Coal",
        "colors": ["#EB5757", "#000000"]
    },
    {
        "name": "Sunkist",
        "colors": ["#F2994A", "#F2C94C"]
    },
    {
        "name": "Blue Skies",
        "colors": ["#56CCF2", "#2F80ED"]
    },
    {
        "name": "Chitty Chitty Bang Bang",
        "colors": ["#007991", "#78ffd6"]
    },
    {
        "name": "Visions of Grandeur",
        "colors": ["#000046", "#1CB5E0"]
    },
    {
        "name": "Crystal Clear",
        "colors": ["#159957", "#155799"]
    },
    {
        "name": "Mello",
        "colors": ["#c0392b", "#8e44ad"]
    },
    {
        "name": "Compare Now",
        "colors": ["#EF3B36", "#FFFFFF"]
    },
    {
        "name": "Meridian",
        "colors": ["#283c86", "#45a247"]
    },
    {
        "name": "Relay",
        "colors": ["#3A1C71", "#D76D77", "#FFAF7B"]
    },
    {
        "name": "Alive",
        "colors": ["#CB356B", "#BD3F32"]
    },
    {
        "name": "Scooter",
        "colors": ["#36D1DC", "#5B86E5"]
    },
    {
        "name": "Terminal",
        "colors": ["#000000", "#0f9b0f"]
    },
    {
        "name": "Telegram",
        "colors": ["#1c92d2", "#f2fcfe"]
    },
    {
        "name": "Crimson Tide",
        "colors": ["#642B73", "#C6426E"]
    },
    {
        "name": "Socialive",
        "colors": ["#06beb6", "#48b1bf"]
    },
    {
        "name": "Subu",
        "colors": ["#0cebeb", "#20e3b2", "#29ffc6"]
    },
    {
        "name": "Broken Hearts",
        "colors": ["#d9a7c7", "#fffcdc"]
    },
    {
        "name": "Kimoby Is The New Blue",
        "colors": ["#396afc", "#2948ff"]
    },
    {
        "name": "Dull",
        "colors": ["#C9D6FF", "#E2E2E2"]
    },
    {
        "name": "Purpink",
        "colors": ["#7F00FF", "#E100FF"]
    },
    {
        "name": "Orange Coral",
        "colors": ["#ff9966", "#ff5e62"]
    },
    {
        "name": "Summer",
        "colors": ["#22c1c3", "#fdbb2d"]
    },
    {
        "name": "King Yna",
        "colors": ["#1a2a6c", "#b21f1f", "#fdbb2d"]
    },
    {
        "name": "Velvet Sun",
        "colors": ["#e1eec3", "#f05053"]
    },
    {
        "name": "Zinc",
        "colors": ["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]
    },
    {
        "name": "Hydrogen",
        "colors": ["#667db6", "#0082c8", "#0082c8", "#667db6"]
    },
    {
        "name": "Argon",
        "colors": ["#03001e", "#7303c0", "#ec38bc", "#fdeff9"]
    },
    {
        "name": "Lithium",
        "colors": ["#6D6027", "#D3CBB8"]
    },
    {
        "name": "Digital Water",
        "colors": ["#74ebd5","#ACB6E5"]
    },
    {
        "name": "Orange Fun",
        "colors": ["#fc4a1a", "#f7b733"]
    },
    {
        "name": "Rainbow Blue",
        "colors": ["#00F260", "#0575E6"]
    },
    {
        "name": "Pink Flavour",
        "colors": ["#800080", "#ffc0cb"]
    },
    {
        "name": "Sulphur",
        "colors": ["#CAC531", "#F3F9A7"]
    },
    {
        "name": "Selenium",
        "colors": ["#3C3B3F", "#605C3C"]
    },
    {
        "name": "Delicate",
        "colors": ["#D3CCE3", "#E9E4F0"]
    },
    {

        "name": "Ohhappiness",
        "colors": ["#00b09b", "#96c93d"]
    },
    {
        "name": "Lawrencium",
        "colors": ["#0f0c29", "#302b63", "#24243e"]
    },
    {
        "name": "Relaxing red",
        "colors": ["#fffbd5", "#b20a2c"]
    },
    {
        "name": "Taran Tado",
        "colors": ["#23074d", "#cc5333"]
    },
    {
        "name": "Bighead",
        "colors": ["#c94b4b", "#4b134f"]
    },
    {
        "name": "Sublime Vivid",
        "colors": ["#FC466B", "#3F5EFB"]
    },
    {
        "name": "Sublime Light",
        "colors": ["#FC5C7D", "#6A82FB"]
    },
    {
        "name": "Pun Yeta",
        "colors": ["#108dc7", "#ef8e38"]
    },
    {
        "name": "Quepal",
        "colors": ["#11998e", "#38ef7d"]
    },
    {
        "name": "Sand to Blue",
        "colors": ["#3E5151", "#DECBA4"]
    },
    {
        "name": "Wedding Day Blues",
        "colors": ["#40E0D0", "#FF8C00", "#FF0080"]
    },
    {
        "name": "Shifter",
        "colors": ["#bc4e9c", "#f80759"]
    },
    {
        "name": "Red Sunset",
        "colors": ["#355C7D", "#6C5B7B", "#C06C84"]
    },
    {
        "name": "Moon Purple",
        "colors": ["#4e54c8", "#8f94fb"]
    },
    {
        "name": "Pure Lust",
        "colors": ["#333333", "#dd1818"]
    },
    {
        "name": "Slight Ocean View",
        "colors": ["#a8c0ff", "#3f2b96"]
    },
    {
        "name": "eXpresso",
        "colors": ["#ad5389", "#3c1053"]
    },
    {
        "name": "Shifty",
        "colors": ["#636363", "#a2ab58"]
    },
    {
        "name": "Vanusa",
        "colors": ["#DA4453", "#89216B"]
    },
    {
        "name": "Evening Night",
        "colors": ["#005AA7", "#FFFDE4"]
    },
    {
        "name": "Magic",
        "colors": ["#59C173", "#a17fe0", "#5D26C1"]
    },
    {
        "name": "Margo",
        "colors": ["#FFEFBA", "#FFFFFF"]
    },
    {
        "name": "Blue Raspberry",
        "colors": ["#00B4DB", "#0083B0"]
    },
    {
        "name": "Citrus Peel",
        "colors": ["#FDC830", "#F37335"]
    },
    {
        "name": "Sin City Red",
        "colors": ["#ED213A", "#93291E"]
    },    
    {
        "name": "Rastafari",
        "colors": ["#1E9600", "#FFF200", "#FF0000"]
    },
    {
        "name": "Summer Dog",
        "colors": ["#a8ff78", "#78ffd6"]
    },
    {
        "name": "Wiretap",
        "colors": ["#8A2387", "#E94057", "#F27121"]
    },
    {
        "name": "Burning Orange",
        "colors": ["#FF416C", "#FF4B2B"]
    },
    {
        "name": "Ultra Voilet",
        "colors": ["#654ea3", "#eaafc8"]
    },
    {
      "name": "By Design",
      "colors": ["#009FFF", "#ec2F4B"]
    },
    {
        "name": "Kyoo Tah",
        "colors": ["#544a7d", "#ffd452"]
    },
    {
        "name": "Kye Meh",
        "colors": ["#8360c3", "#2ebf91"]
    },
    {
        "name": "Kyoo Pal",
        "colors": ["#dd3e54", "#6be585"]
    },
    {
        "name": "Metapolis",
        "colors": ["#659999", "#f4791f"]
    },
    {
        "name": "Flare",
        "colors": ["#f12711", "#f5af19"]
    },
    {
        "name": "Witching Hour",
        "colors": ["#c31432", "#240b36"]
    },
    {
        "name": "Azur Lane",
        "colors": ["#7F7FD5", "#86A8E7", "#91EAE4"]
    },
    {
        "name": "Neuromancer",
        "colors": ["#f953c6", "#b91d73"]
    },
    {
        "name": "Harvey",
        "colors": ["#1f4037", "#99f2c8"]
    },
    {
        "name": "Amin",
        "colors": ["#8E2DE2", "#4A00E0"]
    },
    {
        "name": "Memariani",
        "colors": ["#aa4b6b", "#6b6b83" , "#3b8d99"]
    },
    {
        "name": "Yoda",
        "colors": ["#FF0099", "#493240"]
    },
    {
        "name": "Cool Sky",
        "colors": ["#2980B9", "#6DD5FA", "#FFFFFF"]
    },
    {
        "name": "Dark Ocean",
        "colors": ["#373B44", "#4286f4"]
    },
    {
        "name": "Evening Sunshine",
        "colors": ["#b92b27", "#1565C0"]
    },
    {
        "name": "JShine",
        "colors": ["#12c2e9","#c471ed","#f64f59"]
    },
    {
        "name": "Moonlit Asteroid",
        "colors": ["#0F2027", "#203A43", "#2C5364"]
    },
    {
        "name": "MegaTron",
        "colors": ["#C6FFDD", "#FBD786", "#f7797d"]
    },
    {
        "name": "Cool Blues",
        "colors": ["#2193b0","#6dd5ed"]
    },
    { 
        "name": "Piggy Pink",
        "colors": ["#ee9ca7","#ffdde1"]
    },
    {
        "name": "Grade Grey",
        "colors": ["#bdc3c7","#2c3e50"]
    }
];

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) { compare = ascendingComparator(compare); }
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) { lo = 0; }
      if (hi == null) { hi = a.length; }
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) { lo = mid + 1; }
        else { hi = mid; }
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) { lo = 0; }
      if (hi == null) { hi = a.length; }
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) { hi = mid; }
        else { lo = mid + 1; }
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) { return [start]; }
  if (reverse = stop < start) { n = start, start = stop, stop = n; }
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) { return []; }

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) { ticks[i] = (start + i) * step; }
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) { ticks[i] = (start - i) / step; }
  }

  if (reverse) { ticks.reverse(); }

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) { step1 *= 10; }
  else if (error >= e5) { step1 *= 5; }
  else if (error >= e2) { step1 *= 2; }
  return stop < start ? -step1 : step1;
}

var prefix = "$";

function Map() {}

Map.prototype = map$1.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) { if (property[0] === prefix) { delete this[property]; } }
  },
  keys: function() {
    var keys = [];
    for (var property in this) { if (property[0] === prefix) { keys.push(property.slice(1)); } }
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) { if (property[0] === prefix) { values.push(this[property]); } }
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) { if (property[0] === prefix) { entries.push({key: property.slice(1), value: this[property]}); } }
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) { if (property[0] === prefix) { ++size; } }
    return size;
  },
  empty: function() {
    for (var property in this) { if (property[0] === prefix) { return false; } }
    return true;
  },
  each: function(f) {
    for (var property in this) { if (property[0] === prefix) { f(this[property], property.slice(1), this); } }
  }
};

function map$1(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) { object.each(function(value, key) { map.set(key, value); }); }

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) { while (++i < n) { map.set(i, object[i]); } }
    else { while (++i < n) { map.set(f(o = object[i], i, object), o); } }
  }

  // Convert object to map.
  else if (object) { for (var key in object) { map.set(key, object[key]); } }

  return map;
}

function Set() {}

var proto = map$1.prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) { object.each(function(value) { set.add(value); }); }

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) { while (++i < n) { set.add(object[i]); } }
    else { while (++i < n) { set.add(f(object[i], i, object)); } }
  }

  return set;
}

var array$1 = Array.prototype;

var map$2 = array$1.map;
var slice$1 = array$1.slice;

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) { prototype[key] = definition[key]; }
  return prototype;
}

function Color$1() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color$1, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: function() {
    return this.rgb().hex();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) { r = g = b = NaN; }
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color$1)) { o = color(o); }
  if (!o) { return new Rgb; }
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color$1, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: function() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) { h = s = l = NaN; }
  else if (l <= 0 || l >= 1) { h = s = NaN; }
  else if (s <= 0) { h = NaN; }
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) { return new Hsl(o.h, o.s, o.l, o.opacity); }
  if (!(o instanceof Color$1)) { o = color(o); }
  if (!o) { return new Hsl; }
  if (o instanceof Hsl) { return o; }
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) { h = (g - b) / s + (g < b) * 6; }
    else if (g === max) { h = (b - r) / s + 2; }
    else { h = (r - g) / s + 4; }
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color$1, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// https://beta.observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) { return new Lab(o.l, o.a, o.b, o.opacity); }
  if (o instanceof Hcl) {
    if (isNaN(o.h)) { return new Lab(o.l, 0, 0, o.opacity); }
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) { o = rgbConvert(o); }
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) { x = z = y; } else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color$1, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) { return new Hcl(o.h, o.c, o.l, o.opacity); }
  if (!(o instanceof Lab)) { o = labConvert(o); }
  if (o.a === 0 && o.b === 0) { return new Hcl(NaN, 0, o.l, o.opacity); }
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color$1, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) { return new Cubehelix(o.h, o.s, o.l, o.opacity); }
  if (!(o instanceof Rgb)) { o = rgbConvert(o); }
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color$1, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

function constant$1(x) {
  return function() {
    return x;
  };
}

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$1(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
}

var rgb$1 = (function rgbGamma(y) {
  var color$$1 = gamma(y);

  function rgb$$1(start, end) {
    var r = color$$1((start = rgb(start)).r, (end = rgb(end)).r),
        g = color$$1(start.g, end.g),
        b = color$$1(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$$1.gamma = rgbGamma;

  return rgb$$1;
})(1);

function array$2(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) { x[i] = interpolateValue(a[i], b[i]); }
  for (; i < nb; ++i) { c[i] = b[i]; }

  return function(t) {
    for (i = 0; i < na; ++i) { c[i] = x[i](t); }
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
}

function number$1(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") { a = {}; }
  if (b === null || typeof b !== "object") { b = {}; }

  for (k in b) {
    if (k in a) {
      i[k] = interpolateValue(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) { c[k] = i[k](t); }
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) { s[i] += bs; } // coalesce with previous string
      else { s[++i] = bs; }
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) { s[i] += bm; } // coalesce with previous string
      else { s[++i] = bm; }
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number$1(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) { s[i] += bs; } // coalesce with previous string
    else { s[++i] = bs; }
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) { s[(o = q[i]).i] = o.x(t); }
          return s.join("");
        });
}

function interpolateValue(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b)
      : (t === "number" ? number$1
      : t === "string" ? ((c = color(b)) ? (b = c, rgb$1) : string)
      : b instanceof color ? rgb$1
      : b instanceof Date ? date
      : Array.isArray(b) ? array$2
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number$1)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
}

var degrees = 180 / Math.PI;

var rho = Math.SQRT2;

function hsl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = hsl(start)).h, (end = hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var interpolateHsl = hsl$1(hue);

function hcl$1(hue$$1) {
  return function(start, end) {
    var h = hue$$1((start = hcl(start)).h, (end = hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var interpolateHcl = hcl$1(hue);

function constant$2(x) {
  return function() {
    return x;
  };
}

function number$2(x) {
  return +x;
}

var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant$2(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range$$1, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
  if (d1 < d0) { d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0); }
  else { d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1); }
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range$$1, deinterpolate, reinterpolate) {
  var j = Math.min(domain.length, range$$1.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range$$1 = range$$1.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range$$1 = unit,
      interpolate$$1 = interpolateValue,
      clamp = false,
      piecewise$$1,
      output,
      input;

  function rescale() {
    piecewise$$1 = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise$$1(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise$$1(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map$2.call(_, number$2), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice$1.call(_), rescale()) : range$$1.slice();
  };

  scale.rangeRound = function(_) {
    return range$$1 = slice$1.call(_), interpolate$$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
  };

  return rescale();
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function formatDecimal(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) { return null; } // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) { g = Math.max(1, width - length); }
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) { break; }
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) { throw new Error("invalid format: " + specifier); }
  var match;
  this.fill = match[1] || " ";
  this.align = match[2] || ">";
  this.sign = match[3] || "-";
  this.symbol = match[4] || "";
  this.zero = !!match[5];
  this.width = match[6] && +match[6];
  this.comma = !!match[7];
  this.precision = match[8] && +match[8].slice(1);
  this.trim = !!match[9];
  this.type = match[10] || "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) { i0 = i; } i1 = i; break;
      default: if (i0 > 0) { if (!+s[i]) { break out; } i0 = 0; } break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimal(x, p);
  if (!d) { return x + ""; }
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimal(x, p);
  if (!d) { return x + ""; }
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity$2(x) {
  return x;
}

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$2,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$2,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") { comma = true, type = "g"; }

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) { precision == null && (precision = 12), trim = true, type = "g"; }

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) { zero = true, fill = "0", align = "="; }

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) { value = formatTrim(value); }

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) { valueNegative = false; }

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) { value = group(value, Infinity); }

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) { value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; }

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = tickStep(start, stop, count == null ? 10 : count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) { specifier.precision = precision; }
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) { specifier.precision = precision - (specifier.type === "e"); }
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) { specifier.precision = precision - (specifier.type === "%") * 2; }
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return tickFormat(domain(), count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) { count = 10; }

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear$1() {
  var scale = continuous(deinterpolateLinear, number$1);

  scale.copy = function() {
    return copy(scale, linear$1());
  };

  return linearish(scale);
}

var t0$1 = new Date,
    t1$1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) { return range; } // also handles Invalid Date
    do { range.push(previous = new Date(+start)), offseti(start, step), floori(start); }
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) { while (floori(date), !test(date)) { date.setTime(date - 1); } }
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) { while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } } else { while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        } }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0$1.setTime(+start), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) { return null; }
  if (!(k > 1)) { return millisecond; }
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};
var milliseconds = millisecond.range;

var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond) * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});
var seconds = second.range;

var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute) * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});
var minutes = minute.range;

var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute % durationHour;
  if (offset < 0) { offset += durationHour; }
  date.setTime(Math.floor((+date - offset) / durationHour) * durationHour + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});
var hours = hour.range;

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});
var days = day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
var months = month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var years = year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYears = utcYear.range;

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) { date = new Date(+date); }

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) { c = specifier.charAt(++i); }
          else { pad = c === "e" ? " " : "0"; }
          if (format = formats[c]) { c = format(date, pad); }
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day$$1;
      if (i != string.length) { return null; }

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) { return new Date(d.Q); }

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) { d.H = d.H % 12 + d.p * 12; }

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) { return null; }
        if (!("w" in d)) { d.w = 1; }
        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day$$1 = week.getUTCDay();
          week = day$$1 > 4 || day$$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day$$1 = week.getDay();
          week = day$$1 > 4 || day$$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) { d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0; }
        day$$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) { return -1; }
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) { return -1; }
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) { map[names[i].toLowerCase()] = i; }
  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day$$1 = d.getDay();
  return day$$1 === 0 ? 7 : day$$1;
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day$$1 = d.getDay();
  d = (day$$1 >= 4 || day$$1 === 0) ? thursday(d) : thursday.ceil(d);
  return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day$$1 = d.getUTCDay();
  d = (day$$1 >= 4 || day$$1 === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale$1;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  timeFormat = locale$1.format;
  timeParse = locale$1.parse;
  utcFormat = locale$1.utcFormat;
  utcParse = locale$1.utcParse;
  return locale$1;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : utcParse(isoSpecifier);

var Gradient = function Gradient(options){
  options  =options || {};
  var stops=options.stops || [0];
  var colors = options.colors || [new Color()];
  this.interpolateType=options.interpolateType || 'interpolateRgb'; //interpolateHsl interpolateHcl interpolateRgb
  this.update(stops,colors);
};

var prototypeAccessors$1 = { interpolateTypes: { configurable: true },background: { configurable: true },obj: { configurable: true },fontColor: { configurable: true } };
prototypeAccessors$1.interpolateTypes.get = function (){
  return {
    interpolateRgb:rgb$1,
    interpolateHsl:interpolateHsl,
    interpolateHcl:interpolateHcl,
  };
};
Gradient.prototype.update = function update (stops,colors){
  this.stops=stops;
  this.colors=colors;
    
  var rgba = colors.map(function (color){ return color.rgba2str(); });
   
  if(!this.interpolateTypes[this.interpolateType]){ throw new Error("Does not exist"); }
  this.interpolator = linear$1()
    .domain(stops)
    .range(rgba)
    .interpolate(this.interpolateTypes[this.interpolateType]);
};
Gradient.parseUIGradients = function parseUIGradients (){
  var array = uigradients;
  var obj={};
  array.forEach(function (item){ return obj[item.name]=item.colors; });
  return obj;
};
Gradient.parseObj = function parseObj (obj){
  var stops = [];
  var colors = [];
  for(var stop in obj){
    stops.push(parseFloat(stop));
    colors.push(Color.parseString(obj[stop]));
  }
  return new Gradient({stops:stops,colors:colors});
};
Gradient.parseName = function parseName (name){
  var gradients = Gradient.parseUIGradients();
  if(!gradients[name]){
    console.warn("name does not exist");
    return gradients['Skyline'];
  }
    
  var hexs = gradients[name];
    
  var n = hexs.length;
  var stops = [];
  var colors = [];    
  for(var i=0;i<n;i++){
    var hex = hexs[i];
    stops.push(i / (n-1));
    colors.push(Color.parseString(hex));
  }
  return new Gradient({stops:stops,colors:colors});
    
};
prototypeAccessors$1.background.get = function (){
    var this$1 = this;

  var background = this.stops.map(function (stop,i){ return [stop,this$1.colors[i]]; }).sort(function (a,b){ return a[0]-b[0]; }).map(function (item){      
    return '{0} {1}%'.format(item[1].rgba2str(),item[0]*100);    
  });
   
    
  if(background.length>1){ return 'linear-gradient({0})'.format(background.join(',')); }    
  return background[0];       
};
prototypeAccessors$1.obj.get = function (){
  var ref=this;
    var stops = ref.stops;
    var colors = ref.colors;
  var obj={};
  stops.forEach(function (s,i){ return obj[s]=colors[i].hex; }); 
  return obj;
};
Gradient.prototype.interpolate = function interpolate (value){
  var ref=this;
    var interpolator = ref.interpolator;
  if(!Array.isArray(value)){ return interpolator(value); }
  if(Array.isArray(value)){ return value.map(function (v){ return interpolator(v); }); }
};
prototypeAccessors$1.fontColor.get = function (){
  var color = Color.parseString(this.interpolate(0.5));
  return color.fontColor();
};
Gradient.prototype.fontColorstr = function fontColorstr (){
  return this.fontColor.rgba2str();
    
};
Gradient.prototype.colorgroups = function colorgroups (){
  return this.colors.map(function (color){ return color.colorgroup; });
};
Gradient.prototype.toJSON = function toJSON (){return JSON.stringify(this.obj);};
  
Gradient.parse = function parse (obj){
  if(typeof obj==='string'){ return Gradient.parseName(obj); }
  return Gradient.parseObj(obj);
};

Object.defineProperties( Gradient.prototype, prototypeAccessors$1 );

module.exports.Color=Color;
module.exports.Gradient=Gradient;

// String :Formatter, Python approach to add values in strings. 
if (!String.prototype.formatold) {
  String.prototype.formatold = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ?
        args[number] :
        match;
    });
  };
}
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    if(!args){ return this; }                    
    return this.replace(/{([^}]*)}/g, function(match) {
      var key = match.replace(/{/, '').replace(/}/, '');
      if(!isNaN(parseInt(key))) { return (typeof args[key] != 'undefined')?args[key] :match; }
      if (!args[0][key]){ return match; }
      return args[0][key];
    });                     
  };
}


//String :pads left
String.prototype.lpad = function(padString, length) {
  var str = this;
  while (str.length < length)
    { str = padString + str; }
  return str;
};
 
//String :pads right
String.prototype.rpad = function(padString, length) {
  var str = this;
  while (str.length < length)
    { str = str + padString; }
  return str;
};

// Extract host name from url
if (!String.prototype.getHostName) {
  String.prototype.getHostName = function() {
    var match = this.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) { return match[2]; }
    return null;
  };
}

// String : replaceAll
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
}

// String : Add zeros(or c) infront of numbers.
if (!String.prototype.padZero) {
  String.prototype.padZero= function(_len, _c){
    var s= '', 
      c= _c || '0', 
      len= (_len || 2)-this.length;
    while(s.length<len) { s+= c; }
    return s+this;
  };
}

// Date : Add hours
if (!Date.prototype.addHours) {
  Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
  };
}

// Number : Convert to String, add zeros(or c) infront of numbers.
if (!Number.prototype.padZero) {
  Number.prototype.padZero= function(len, c){
    return String(this).padZero(len,c);
  };
}

// Number : Clamp number between min and max
if (!Number.prototype.clamp) {
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
}

// Number : Create simple range
if (!Number.prototype.ordermag) {
  Number.prototype.ordermag = function() {
    var order = Math.floor(Math.log(this) / Math.LN10 + 0.000000001); // because float math sucks like that
    return Math.pow(10,order);
  };
    
}
// const quickSortIndices = function(arr,indices,left, right){
//   let pivot,partitionIndex;
   
//   const partition = function(pivot, left, right){
//     var pivotValue = arr[pivot],
//         partitionIndex = left;
  
//     for(var i = left; i < right; i++){
//       if(arr[i] < pivotValue){
//         swap(arr, i, partitionIndex);
//         swap(indices, i, partitionIndex);
//         partitionIndex++;
//       }
//     }
//     swap(arr, right, partitionIndex);
//     swap(indices, right, partitionIndex);
//     return partitionIndex;
//   };


//   if(left < right){
//     pivot = right;
//     partitionIndex = partition(arr, pivot, left, right);
    
//     //sort left and right
//     quickSortIndices(arr,indices, left, partitionIndex - 1);
//     quickSortIndices(arr,indices, partitionIndex + 1, right);
//   }
  
//   return indices;
// };
// const swap = function(arr, i, j){
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// };

[Array,Int8Array,Int16Array, Int32Array,Uint8Array,Uint16Array, Uint32Array,Float32Array].forEach(function (item){
  if (!item.prototype.range) {
    item.prototype.range = function() {
      for(var i=0;i<this.length;i++){ this[i]=i; }
      return this;
    };
  }
  if (!item.prototype.random) {
    item.prototype.random = function() {
      for(var i=0;i<this.length;i++){ this[i]=parseInt(Math.random()*(this.length-1)); }
      return this;
    };
  }    
    
  if (!item.prototype.clamp) {
    item.prototype.clamp = function(min, max) {
      for(var i=0;i<this.length;i++){ this[i]=i.clamp(min,max); }
      return this;
    };
  }

  if (!item.prototype.min) {
    item.prototype.min = function(){
      var min = +Infinity,len = this.length;
      for (var i=0 ; i < len; i++ )
        { if ( this[i] < min ) { min = this[i]; } }
      return min;
    };
  }    
    
    
  if (!item.prototype.max) {
    item.prototype.max = function(){
      var max = -Infinity, len = this.length;
      for (var i=0 ; i < len; i++ )
        { if ( this[i] > max ) { max = this[i]; } }
      return max;
    };
  }   
    
  if (!item.prototype.add) {
    item.prototype.add = function(value){
      for(var i=0,n=this.length;i<n;i++){ this[i]+=value; }
      return this;
    };
  }
    
  if (!item.prototype.subtract) {
    item.prototype.subtract = function(value){
      for(var i=0,n=this.length;i<n;i++){ this[i]-=value; }
      return this;
    };
  }
  if (!item.prototype.multiply) {
    item.prototype.multiply = function(value){
      for(var i=0,n=this.length;i<n;i++){ this[i]*=value; }
      return this;
    };
  }
    
  if (!item.prototype.divide) {
    item.prototype.divide = function(value){
      for(var i=0,n=this.length;i<n;i++){ this[i]/=value; }
      return this;
    };
  }        
    
  if (!item.prototype.compare) {
    item.prototype.compare = function( a ) {
      var epsilon = 1.0E-7;
      for (var i = 0, n = this.length; i<n; i++) {
        if (a[i] - this[i] > epsilon) { return false; }
      }
      return true;
    };        
  }
  if (!item.prototype.move) {
    item.prototype.move = function(from, to) {
      if( to === from ) { return this; }
      var target = this[from];                         
      var increment = to < from ? -1 : 1;
      for(var k = from; k != to; k += increment){
        this[k] = this[k + increment];
      }
      this[to] = target;
      return this;
    };
  }
  if (!item.prototype.sortIndices) {
    item.prototype.sortIndices = function(desc) {
      var f = desc?function (a,b){ return b[1]-a[1]; }:
        function (a,b){ return a[1]-b[1]; };
      var copy = this.slice(0);
      var keys = new Array(this.length).fill();
      return keys.map(function (key,i){ return [i,copy[i]]; }).sort(f).map(function (item){ return item[0]; });
    };
  }    
  // if (!item.prototype.quickSortIndices) {
  //   item.prototype.quickSortIndices = function() {
  //     const arr=this.slice(0);
  //     const indices = new Uint32Array(this.length);
  //     for(let i=0;i<indices.length;i++)indices[i]=i;
  //     quickSortIndices(arr,indices,0,this.length-1);
  //     // console.log(arr)
  //     return indices;
  //   };
  // } 
    
    
});

// const quickSort = function(arr, left, right){
//   let pivot,partitionIndex;
   
//   const partition = function(arr, pivot, left, right){
//     var pivotValue = arr[pivot],
//         partitionIndex = left;
  
//     for(var i = left; i < right; i++){
//       if(arr[i] < pivotValue){
//         swap(arr, i, partitionIndex);
//         partitionIndex++;
//       }
//     }
//     swap(arr, right, partitionIndex);
//     return partitionIndex;
//   };


//   if(left < right){
//     pivot = right;
//     partitionIndex = partition(arr, pivot, left, right);
    
//   //sort left and right
//   quickSort(arr, left, partitionIndex - 1);
//   quickSort(arr, partitionIndex + 1, right);
//   }
//   return arr;
// };



// module.exports.quickSort = quickSort;
// module.exports.quickSortIndices = quickSortIndices;

module.exports.range = function(n,type) {
  n = (typeof n !== 'undefined') ?  n : 0;
  if (!(Number.isInteger(n))) { throw Error("Error in range: Value must be an integer"); }
  var array;
    
  if(type=='Uint8')  { array = new Uint8Array(n); }
  if(type=='Uint16') { array = new Uint16Array(n); }
  if(type=='Uint32') { array = new Uint32Array(n); }
  if(type=='Int8')  { array = new Int8Array(n); }
  if(type=='Int16') { array = new Int16Array(n); }
  if(type=='Int32') { array = new Int32Array(n); }
  if(type=='Float32')  { array = new Float32Array(n); }
  if((typeof type === 'undefined') || !array){ array = new Array(n); }
    
  for(var i=0;i<n;i++){ array[i]=i; }
  return array;
};


module.exports.isFloat32Array = function( value ) {
  return Object.prototype.toString.call( value ) === '[object Float32Array]';
}; 
module.exports.isUint32Array = function( value ) {
  return Object.prototype.toString.call( value ) === '[object Uint32Array]';
};
module.exports.isArray = function( value ) {
  return Object.prototype.toString.call( value ) === '[object Array]';
}; 


module.exports.humanFileSize = function(size){
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return Math.round(100 * (size / Math.pow(1024, i))) / 100 + ' ' + ['B', 'kB', 'MB', 'GB'][i];
    
};

module.exports.getFileExtension = function(filename){
  return filename.split('.').pop();
};

// Debounce function
module.exports.debounce=function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
  };
};


// Copy/Replace properties from another
module.exports.extend = function (dest, src) {
  for (var i in src) { dest[i] = src[i]; }
  return dest;
};





// Convert hex string to rgba object 
module.exports.hex2rgba = function (hex) {
  hex = hex.replace(/\s/g, '');

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b + 'ff';
  });
  var noTransRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  hex = hex.replace(noTransRegex, function(m, r, g, b) {
    return r + g + b + 'ff';
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: Math.round(parseInt(result[4], 16) / 255.0 * 100.0) * 0.01
  } : null;
};

// Convert rgb object to hsv object 
module.exports.rgb2hsv = function (rgb) {
  var rr, gg, bb,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    h, s,
    v = Math.max(r, g, b),
    diff = v - Math.min(r, g, b),
    diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };

  if (diff == 0) {
    h = s = 0;
  }
  else {
    s = diff / v;
    rr = diffc(r);
    gg = diffc(g);
    bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    }
    else if (g === v) {
      h = (1 / 3) + rr - bb;
    }
    else if (b === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }
    else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) * 0.01,
    v: Math.round(v * 100) * 0.01
  };
};

module.exports.hsv2rgb=function(hsv) {
  var h=hsv.h /360.0,s=hsv.s,v=hsv.v;
    
  var r, g, b;
    
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
    
  switch (i % 6) {
  case 0: r = v, g = t, b = p; break;
  case 1: r = q, g = v, b = p; break;
  case 2: r = p, g = v, b = t; break;
  case 3: r = p, g = q, b = v; break;
  case 4: r = t, g = p, b = v; break;
  case 5: r = v, g = p, b = q; break;
  }
    
  return {r:Math.floor(r*255), g:Math.floor(g*255), b:Math.floor(b*255)};

};


module.exports.rgb2hex=function(rgb){
  var trans = (rgb.a)?("0" + parseInt(Math.round(rgb.a*255),10).toString(16)).slice(-2):'';
 
  return "#" +
  ("0" + parseInt(rgb.r,10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb.g,10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb.b,10).toString(16)).slice(-2) +
  trans;
};

})));
