class Air {
  constructor() {
    this.type = "air";
    this.mass = 0;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(200 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map) {
    var nextmap = map;
    return nextmap;
  }
}

class Sand {
  constructor() {
    this.type = "sand";
    this.mass = 2;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(200 + colormult);
    this.b = Math.abs(0 + colormult);
  }
}

class Water {
  constructor() {
    this.type = "water";
    this.mass = 1;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + colormult);
    this.g = Math.abs(0 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map) {
    var nextmap = map;
    return nextmap;
  }
}


function setup() {
  const width = canvaswidth;
  const height = canvasheight;
  createCanvas(width, height);
  noStroke();
}

const width = 127;
const height = 127;
const canvaswidth = 500;
const canvasheight = 500;

const scalex = (canvaswidth / width);
const scaley = (canvasheight / height);

function windowResized() {
  resizeCanvas(width, height);
}

function makeArray(width, height) {
  var arr = [];
  for (let i = 0; i < height; i++) {
    arr.push(new Array(width));
  }
  return arr;
}

pxs = makeArray(width, height);
var nextpxs;


for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    var pixel = new Air();
    pxs[x][y] = pixel;
  }
}

var x = 0;
var y = 0;

function draw() {
  background(0);

  while (y < height) {
    while (x < width) {
      px = pxs[x][y];
      nextpxs = px.update(px.x, px.y, pxs);
      x++;
    }
    x = 0;
    y++;
  }
  x = 0;
  y = 0;

while (y < height) {
  while (x < width) {
    px = nextpxs[x][y];
    fill(px.r, px.g, px.b);
    rect(x * scalex, y * scaley, scalex, scaley);
    x++;
  }
  x = 0;
  y++;
}
x = 0;
y = 0;
}

function mouseDragged() {
  if((mouseX < canvaswidth) && (mouseY < canvasheight)) {
    var placepx = new Water();
    pxs[Math.round(mouseX / scalex)][Math.round(mouseY / scaley)] = placepx;
  }
}