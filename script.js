class Air {
  constructor() {
    this.temp = 1;
    this.cond = 0.1;
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
    this.cond = 0.3;
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
    this.cond = 0.6;
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

class Dirt {
  constructor() {
    this.temp = 1.1;
    this.cond = 0.1;
    this.updated = false;
    this.solid = false;
    this.type = "dirt";
    this.mass = 2;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(65 + colormult);
    this.g = Math.abs(30 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    var xr = Math.round((Math.random() * 2) - 1);
    var below = nextmap[x + xr][y + 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
      nextmap[x + xr][y + 1] = self;
      nextmap[x][y] = below;
    }

    this.updated = true;
    return nextmap;
  }
}

class Virus {
  constructor() {
    this.temp = 5;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "virus";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 7) {
      nextmap[x][y] = new Dirt();
    } else {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);
    var other = nextmap[x + xr][y + yr];
    if ((other != undefined) && other.type != "air") {
      nextmap[x + xr][y + yr] = new Virus();
    }
    }
    this.updated = true;
    return nextmap;
  }

}

class Fire {
  constructor() {
    this.temp = 10;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "fire";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(120 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp < 9) {
      nextmap[x][y] = new Smoke();
    } else {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);
    var other = nextmap[x + xr][y + yr];
    if ((other != undefined) && other.type == "wood") {

      nextmap[x + xr][y + yr] = new Fire();
    }
    }
    this.updated = true;
    return nextmap;
  }

}

class Moss {
  constructor() {
    this.temp = 0.75;
    this.cond = 0.2;
    this.updated = false;
    this.solid = false;
    this.type = "moss";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(50 + colormult);
  }
  update(x, y, map, self, nextmap) {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);
    var other = nextmap[x + xr][y + yr];
    if ((other != undefined) && (other.type == "water") || (other.type == "virus")) {
      nextmap[x + xr][y + yr] = new Moss();

    }

    this.updated = true;
    return nextmap;
  }
}

class Stone {
  constructor() {
    this.temp = 1;
    this.cond = 0.8;
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
    if (this.temp > 8) {
      nextmap[x][y] = new Lava();
    }
    this.updated = true;
    return nextmap;
  }
}

class Wood {
  constructor() {
    this.temp = 1;
    this.cond = 0.8;
    this.updated = false;
    this.solid = true;
    this.type = "wood";
    this.mass = 10;
    var multval = 30;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(65 + colormult);
    this.g = Math.abs(30 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 8) {
      nextmap[x][y] = new Fire();
    }
    this.updated = true;
    return nextmap;
  }
}

class Ice {
  constructor() {
    this.temp = -10;
    this.cond = 0.5;
    this.updated = false;
    this.solid = true;
    this.type = "ice";
    this.mass = 10;
    var multval = 20;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 0) {
      nextmap[x][y] = new Water();
    }
    this.updated = true;
    return nextmap;
  }
}

class Water {
  constructor() {
    this.temp = 0.5;
    this.cond = 1;
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
    if (this.temp < -3) {
      nextmap[x][y] = new Ice();
    } else if (this.temp > 8) {
      nextmap[x][y] = new Steam();
    } else {
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
    }
    this.updated = true;
    return nextmap;
  }
}

class Steam {
  constructor() {
    this.temp = 7;
    this.cond = 0.5;
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

    if (self.temp >= 8) {
      
    
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
    } else {
      nextmap[x][y] = new Water();
    }

    this.updated = true;
    return nextmap;
  }
}

class Smoke {
  constructor() {
    this.temp = 7;
    this.cond = 0.5;
    this.updated = false;
    this.solid = false;
    this.type = "smoke";
    this.mass = -0.5;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {

    if (Math.random() >= 0.25) {
      
    
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
    } else {
      nextmap[x][y] = new Air();
    }

    this.updated = true;
    return nextmap;
  }
}

class Lava {
  constructor() {
    this.temp = 20;
    this.cond = 0.1;
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
    if (this.temp < 5) {
      nextmap[x][y] = new Stone();
    } else {

    
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
          var xr = Math.round((Math.random() * 2) - 1);
          var yr = Math.round((Math.random() * 2) - 1);
          nextpxs[x + xr][y + yr].temp += (px.temp / 4) * nextpxs[x + xr][y + yr].cond;
          px.temp -= (px.temp / 4) * nextpxs[x + xr][y + yr].cond;
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
        if (px.temp >= 0) {
          fill(px.temp  * 20, 0, 0);
        } else {
          fill(0, 0, Math.abs(px.temp) * 20);
        }
        
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
    try {
    if (size > 1) {
      // ^^ Yes i'm retarded this is just to error it out if out of range lmao
    
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


  } else {
    eval("var placepx = new " + str(blocktype) + "();")
    pxs[Math.round(mouseX / scalex)][Math.round(mouseY / scaley)] = placepx;
  }
  } catch {
      0;
  }
  }
  fill(50);
  text("FPS: " + Math.round(frameRate()), 10, 10, 70, 80);
}