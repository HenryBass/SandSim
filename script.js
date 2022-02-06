class Air {
  constructor() {
    this.temp = 1;
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
update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y + 1] = self;
      nextmap[x][y] = below;
    }

    this.updated = true;
    return nextmap;
  }
}

class Sand {
  constructor() {
    this.temp = 1;
    this.updated = false;
    this.solid = false;
    this.type = "sand";
    this.mass = 2;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(195 + colormult);
    this.g = Math.abs(154 + colormult);
    this.b = Math.abs(108 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y + 1] = self;
      nextmap[x][y] = below;
    } else {
      var r = Math.round((Math.random() * 2) - 1);
      var nextpos = nextmap[x + r][y + 1];
      var defined = (nextpos != undefined)
      if ((defined) && (nextpos.solid == false) && (nextpos.mass < this.mass)) {
        nextmap[x + r][y + 1] = self;
        nextmap[x][y] = nextpos;
      }
    }

    this.updated = true;
    return nextmap;
  }
}

class Gravel {
  constructor() {
    this.temp = 1;
    this.updated = false;
    this.solid = false;
    this.type = "gravel";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y + 1] = self;
      nextmap[x][y] = below;
    }

    this.updated = true;
    return nextmap;
  }
}

class Stone {
  constructor() {
    this.temp = 1;
    this.updated = false;
    this.solid = true;
    this.type = "stone";
    this.mass = 10;
    var multval = 20;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(50 + colormult);
  }
  update(x, y, map, self, nextmap) {

    this.updated = true;
    return nextmap;
  }
}

class Water {
  constructor() {
    this.temp = 0.5;
    this.updated = false;
    this.solid = false;
    this.type = "water";
    this.mass = 1;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y + 1] = self;
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

class Steam {
  constructor() {
    this.temp = 5;
    this.updated = false;
    this.solid = false;
    this.type = "steam";
    this.mass = -1;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y - 1] = self;
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

class Lava {
  constructor() {
    this.temp = 10;
    this.updated = false;
    this.solid = false;
    this.type = "lava";
    this.mass = 5;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(20 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x][y + 1] = self;
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
var nextpxs = pxs;


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
  var th = document.getElementById("thermal");
  while (y < height) {
    while (x < width) {
      px = nextpxs[x][y];
      
      px.updated = false;
      if (th.checked == true) {
        fill(px.temp  * 20, 0, 0);
      } else {
        fill(px.r, px.g, px.b);
      }
      rect(x * scalex, y * scaley, scalex, scaley);
      x++;
    }
    x = 0;
    y++;
  }
  x = 0;
  y = 0;

  if (mouseIsPressed) {

    var blocktype = document.getElementById("blocks").value;
    var size = document.getElementById("size").value;

    if (size > 1) {


    try {
      while (y < height) {
        while (x < width) {
          var xdist = Math.abs(x - (mouseX / scalex));
          var ydist = Math.abs(y - (mouseY / scaley));
          if (((xdist * scalex) < size) && ((ydist * scalex) < size)) {
            eval("var placepx = new " + str(blocktype) + "();")
          pxs[Math.round(x)][Math.round(y)] = placepx;
          }
          x++;
        }
        x = 0;
        y++;
      }
      x = 0;
      y = 0;

    } catch {
      0;
    }
  } else {
    eval("var placepx = new " + str(blocktype) + "();")
    pxs[Math.round(mouseX / scalex)][Math.round(mouseY / scaley)] = placepx;
  }
  }
}