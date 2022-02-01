class Pixel {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = types.indexOf(type);
  }
}

function setup() {
  const width = 255;
  const height = 255;
  createCanvas(width, height);
}

const width = 255;
const height = 255;

function windowResized() {
  resizeCanvas(width, height);
}

var types = ["air", "sand", "water"];
var pxs = [];

for (i=0;i<(width*height)i++) {
  pxs.push([])
}

for (y=0;y<height;y++) {
  for (x=0;x<width;x++) {
    type = types[Math.round(Math.random() * (types.length - 1))];

    var pixel = new Pixel(type, Math.round(Math.random() * width), Math.round(Math.random() * height));
    pxs[x][y] = pixel;
  }
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