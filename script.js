class Pixel {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = types.indexOf(type);
  }
}

function setup() {
  var width = 255;
  var height = 255;
  createCanvas(width, height);
}

function windowResized() {
  resizeCanvas(width, height);
}

var types = ["air", "sand", "water"];
var pxs = [];

while (pxs.length < 500) {
  type = types[Math.round(Math.random() * (types.length - 1))];

  var pixel = new Pixel(type, Math.round(Math.random() * 255), Math.round(Math.random() * 255));
  pxs.push(pixel);
}

function draw() {
  background(0);
  var i = 0;

  while (i < pxs.length) {
    var j = 0;
    px = pxs[i];

    while (j < pxs.length) {
      
      j++;
    }
    
    set(px.x, px.y, 255);
    updatePixels();
    i++;
  }
    
}