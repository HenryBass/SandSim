class Air {
  constructor() {
    this.updated = false;
    this.solid = false;
    this.type = "air";
    this.mass = 0;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(200 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, nextmap) {
    var nextmap = map;
    return nextmap;
  }
}

class Sand {
  constructor() {
    this.updated = false;
    this.solid = true;
    this.type = "sand";
    this.mass = 2;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, nextmap) {
    var nextmap = map;
    return nextmap;
  }
}

class Stone {
  constructor() {
    this.updated = false;
    this.solid = true;
    this.type = "sand";
    this.mass = 10;
    var multval = 20;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(50 + colormult);
  }
  update(x, y, map, nextmap) {
    var nextmap = map;
    return nextmap;
  }
}

class Water {
  constructor() {
    this.updated = false;
    this.solid = false;
    this.type = "water";
    this.mass = 1;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + colormult);
    this.g = Math.abs(10 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y+1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
        nextmap[x][y+1] = self;
        nextmap[x][y] = below;
      } else {
        
        var r = Math.round((Math.random() * 2) - 1);
        var nextpos = nextmap[x + r][y];
        var defined = (nextpos != undefined)
        if ((defined) && (nextpos.solid == false)) {
          nextmap[x + r][y] = self;
          nextmap[x][y] = nextpos;
        }
      }
    

    this.updated = true;
    return nextmap;
  }
}

function shuffle(array)
{
  var m = array.length, t, i;
  while (m > 0) 
  {
	i = Math.floor(Math.random() * m--);
	t = array[m];
	array[m] = array[i];
	array[i] = t;
  }
  return array;
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
      if (px.updated == false) {
        try {
          nextpxs = px.update(x, y, pxs, px, nextpxs);
        }
        catch {
          0;
        }
      }
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
    px.updated = false;
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

function place() {
  
   var blocktype = document.getElementById("blocks").value; 
    try  {
    eval("var placepx = new " + str(blocktype) + "();")
    pxs[Math.round(mouseX / scalex)][Math.round(mouseY / scaley)] = placepx;
  } catch {
    0;
  }
}

function mouseDragged() {
  place()
}

function mousePressed() {
  place()
}