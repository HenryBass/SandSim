class Pixel {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval/2));
    this.r = Math.abs(colors[types.indexOf(type)][0] + colormult);
    this.b = Math.abs(colors[types.indexOf(type)][1] + colormult);
    this.g = Math.abs(colors[types.indexOf(type)][2] + colormult);
  }
}

function setup() {
  const width = 255;
  const height = 255;
  createCanvas(width, height);
  noStroke();
}

const width = 255;
const height = 255;

function windowResized() {
  resizeCanvas(width, height);
}

colors = [[200, 200, 200], [200, 200, 0], [0, 0, 200]]
var types = ["air", "sand", "water"];

function makeArray(width, height) {
  var arr = [];
  for(let i = 0; i < height; i++) {
    arr.push(new Array(width));
  }
  return arr;
}

pxs = makeArray(width, height);
nextpxs = makeArray(width, height);


for (y=0;y<height;y++) {
  for (x=0;x<width;x++) {
    type = types[Math.round(Math.random() * (types.length - 1))];

    var pixel = new Pixel("water", Math.round(Math.random() * width), Math.round(Math.random() * height));
    pxs[x][y] = pixel;
  }
}

var x = 0;
var y = 0;

function draw() {
  background(0);

  while (y<height) {
    while (x<width) {
      px = pxs[x][y];
      fill(px.r, px.b, px.g);
      rect(x, y, 1, 1);
      x++;
    }
    x = 0;
    y++;
  }
  
  x = 0;
  y = 0;
}

function mouseClicked() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}