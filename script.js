var c = document.getElementById("canvas");
var ctx = canvas.getContext('2d', { alpha: false });
var co2 = 0;

c.addEventListener("mousemove", function (e) {
  getMousePosition(c, e);
});

c.addEventListener("mouseout", function (e) {
  mouseX = undefined;
  mouseY = undefined;
  mouseIsPressed = false;
});


c.style.cursor = "none";

var mouseX = 1;
var mouseY = 1;
var mouseIsPressed = false;
var paused = false;

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  mouseX = Math.round(x);
  mouseY = Math.round(y);

}

canvas.onmousedown = function (e) {
  mouseIsPressed = true;
}


canvas.onmouseup = function (e) {
  mouseIsPressed = false;
}

class Air {
  constructor() {
    this.temp = 1;
    this.cond = 0.1;
    this.updated = false;
    this.solid = false;
    this.type = "Air";
    this.mass = 0;
    var multval = 55;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(210 + this.colormult);
    this.g = Math.abs(210 + this.colormult);
    this.b = Math.abs(210 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    if (wind) {
      this.r = Math.abs(210);
      this.g = Math.abs(210);
      this.b = Math.abs(210);
    } else {
      this.r = Math.abs(210 + this.colormult);
      this.g = Math.abs(210 + this.colormult);
      this.b = Math.abs(210 + this.colormult);
    }
    if (sco2) {
      this.r -= Math.abs((co2 / 10));
      this.g -= Math.abs((co2 / 10));
      this.b -= Math.abs((co2 / 10));
    } else {

    }



    var below = nextmap[x][y + 1];
    if (((below != undefined) && ((below.mass < self.mass) || (below.mass == this.mass && below.temp > this.temp && wind)) && (below.solid != true))) {
      nextmap[x][y + 1] = self;
      nextmap[x][y] = below;

    } else if (wind) {

      var r = Math.round((Math.random() * 2) - 1);
      var nextpos = nextmap[x + r][y];
      var defined = (nextpos != undefined)
      if ((defined) && (nextpos.solid == false) && ((nextpos.temp < this.temp && nextpos.mass == this.mass)  ||  (nextpos.mass <= 2))) {
        if (nextpos.mass >= 0) {
        nextmap[x + r][y] = self;
        nextmap[x][y] = nextpos;
        } else if ((Math.random() * 2) > nextpos.mass + 0.1) {
        nextmap[x + r][y] = self;
        nextmap[x][y] = nextpos;
        }
      }

    }

    this.updated = true;
    return nextmap;
  }
}

class Sand {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Sand";
    this.mass = 2;
    var multval = 55;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(195 + this.colormult);
    this.g = Math.abs(154 + this.colormult);
    this.b = Math.abs(108 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
        if (this.temp > 10) {
      nextmap[x][y] = new Glass();
    } else {
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

    if (this.temp > 0) {
      this.g = 154 - this.temp + this.colormult;
      this.b = 108 - this.temp + this.colormult;
      this.r = 195 + this.temp + this.colormult;
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
    this.type = "Gravel";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var below = nextmap[x][y + 1];
    if (this.temp > 8) {
      nextmap[x][y] = new Stone();
    } else {
      if ((below != undefined) && (below.mass <= 1) && (below.solid != true)) {
        nextmap[x][y + 1] = self;
        nextmap[x][y] = below;
      }
    }

    this.updated = true;
    return nextmap;
  }
}

class Dirt {
  constructor() {
    this.temp = 1;
    this.cond = 0.1;
    this.updated = false;
    this.solid = false;
    this.type = "Dirt";
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
    if (this.temp <= 10) {

      if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
        nextmap[x + xr][y + 1] = self;
        nextmap[x][y] = below;
      } else if (Math.random() >= 0.9999) {
        nextmap[x][y] = new Moss();
      }
    } else {
      if (Math.random <= 0.9) {
        nextmap[x][y] = new Smoke();
      } else {
        nextmap[x][y] = new Ash();
      }
    }

    this.updated = true;
    return nextmap;
  }
}

class Ash {
  constructor() {
    this.temp = 5;
    this.cond = 0.1;
    this.updated = false;
    this.solid = false;
    this.type = "Ash";
    this.mass = 0.1;
    var multval = 100;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {
    var xr = Math.round((Math.random() * 2) - 1);
    var below = nextmap[x + xr][y + 1];

    if ((below != undefined) && (below.mass < 0.1) && (below.solid != true)) {
      nextmap[x + xr][y + 1] = self;
      nextmap[x][y] = below;
    }

    this.updated = true;
    return nextmap;
  }
}


class Snow {
  constructor() {
    this.temp = -5;
    this.cond = 0.5;
    this.updated = false;
    this.solid = false;
    this.type = "Snow";
    this.mass = 1;
    var multval = 5;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(250 + colormult);
    this.g = Math.abs(250 + colormult);
    this.b = Math.abs(250 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 0) {
      nextmap[x][y] = new Water();
    } else {
      var xr = Math.round((Math.random() * 2) - 1);
      var below = nextmap[x + xr][y + 1];
      if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
        nextmap[x + xr][y + 1] = self;
        nextmap[x][y] = below;
      }
    }

    this.updated = true;
    return nextmap;
  }
}

class Fungus {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Fungus";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(100 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 1.5) {
      nextmap[x][y] = new Dirt();
    } else {
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
      var other = nextmap[x + xr][y + yr];
      if ((other != undefined) && (other.type == "Moss" || other.type == "Dirt" || other.type == "Wood" || other.type == "Fungus" || other.type == "Water")) {
        nextmap[x + xr][y + yr] = new Fungus();
      }
    }
    this.updated = true;
    return nextmap;
  }

}

class Fire {
  constructor() {
    this.temp = 25;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Fire";
    this.mass = 3;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(120 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp < 9 || Math.random() >= 0.9) {
      nextmap[x][y] = new Smoke();
    } else {
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
      var other = nextmap[x + xr][y + yr];
      if ((other != undefined) && (other.type == "Wood") || (other.type == "Moss")) {

        nextmap[x + xr][y + yr] = new Fire();
      }
    }
    if (Math.random() > 0.95 && sco2) {
      co2 += 0.1;
    }
    this.updated = true;
    return nextmap;
  }

}

class Lightning {
  constructor() {
    this.temp = 500;
    this.cond = 0;
    this.updated = false;
    this.solid = true;
    this.type = "Lightning";
    this.mass = 0;
    var multval = 20;
    this.dead = false;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(220 + colormult);
    this.g = Math.abs(220 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.dead) {

        if (Math.random() > 0.99) {
          nextmap[x][y] = new Smoke()
        } else {
          nextmap[x][y] = new Air()
        }

      this.updated = true;
      return nextmap;
    }
    this.dead = true;
    var dist = 1;
    var xr = Math.round((Math.random() * 2) - 1);
      
    if (nextmap[x + xr][y + dist].type == "Air") {
        nextmap[x + xr][y + dist] = new Lightning();
        var xr = Math.round((Math.random() * 2) - 1);
        dist+=1;
      } else  if (nextmap[x + xr][y + dist].type == "Wire"){
        nextmap[x + xr][y + dist] = new Head();
      }
    
    if (Math.random() > 0.95 && sco2) {
      co2 += 0.1;
    }
    this.updated = true;
    return nextmap;
  }

}

class Fly {
  constructor() {
    this.temp = 3;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Fly";
    this.preg = false;
    this.hunger = 100;
    this.mass = 1;
    this.life = 10;
    var multval = 55;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + this.colormult);
    this.g = Math.abs(50 + this.colormult);
    this.b = Math.abs(100 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if ((this.temp > 9) || (this.life <= 0) || (this.temp < 0) || (this.hunger <= 0) || co2 > 300) {
      if (this.preg == false) {
        nextmap[x][y] = new Dirt();
      } else {
        nextmap[x][y] = new Fly();
      }
    } else {
      if (Math.random() > 0.9 && sco2) {
        co2 += 1;
      }
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
      var other = nextmap[x + xr][y + yr];
      if (((other != undefined) && (other.type == "Air"))) {


        nextmap[x + xr][y + yr] = nextmap[x][y];
        if (this.life < 10) {
          this.life += 1;
        }
        if (Math.random() >= 0.95 && this.preg) {
          nextmap[x][y] = new Fly();
          this.preg = false;
          this.hunger = 100;
        } else {
          nextmap[x][y] = new Air();
        }
        this.hunger -= 0.1 * Math.random();
      } else if ((other.type == 'Moss' || other.type == 'Fungus') && this.preg == false) {
        this.preg = true;
        nextmap[x + xr][y + yr] = nextmap[x][y];
        this.hunger = 100;

        if (Math.random() < 0.6) {
          nextmap[x][y] = new Air();
        } else {
          nextmap[x][y] = new Water();
        }

        this.life += 1;

      } else {
        this.life -= 1;

      }
    }

    if (this.preg) {
      this.b = 200 + this.colormult;
    } else {
      this.b = 100 + this.colormult;
    }
    this.updated = true;
    return nextmap;
  }

}

class Cow {
  constructor() {
    this.temp = 3;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Cow";
    this.preg = false;
    this.hunger = 100;
    this.mass = 1;
    var multval = 55;
    this.r = Math.abs(10);
    this.g = Math.abs(10);
    this.b = Math.abs(10);
  }
  update(x, y, map, self, nextmap) {
    if ((this.temp > 9) || (this.life <= 0) || (this.temp < 0) || (this.hunger <= 0) || co2 > 300) {
      if (this.preg == false) {
        nextmap[x][y] = new Dirt();
      } else {
        nextmap[x][y] = new Cow();
      }
    } else {
      if (Math.random() > 0.9 && sco2) {
        co2 += 3;
      }
      
      if (nextmap[x][y + 1] != undefined && nextmap[x][y + 1].type == "Air") {
        var yr = 1;
        var xr = 0;
      } else {
        var yr = 0;
        var xr = Math.round((Math.random() * 2) - 1);
      }
      var other = nextmap[x + xr][y + yr];
      if (((other != undefined) && (other.type == "Air"))) {


        nextmap[x + xr][y + yr] = nextmap[x][y];
        if (Math.random() >= 0.95 && this.preg) {
          nextmap[x][y] = new Cow();
          this.preg = false;
          this.hunger = 100;
        } else {
          nextmap[x][y] = new Air();
        }
        this.hunger -= 0.1 * Math.random();
      } else if ((other.type == 'Moss' || other.type == 'Fungus') && this.preg == false) {
        this.preg = true;
        nextmap[x + xr][y + yr] = nextmap[x][y];
        this.hunger = 100;

        if (Math.random() < 0.6) {
          nextmap[x][y] = new Air();
        } else {
          nextmap[x][y] = new Water();
        }


      } else {

      }
    }
    this.updated = true;
    return nextmap;
  }

}

class Quarks {
  constructor() {
    this.temp = 10;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Quarks";

    this.r = Math.abs(Math.round(Math.random()) * 255);
    this.g = Math.abs(Math.round(Math.random()) * 255);
    this.b = Math.abs(Math.round(Math.random()) * 255);
  }

  update(x, y, map, self, nextmap) {

    if (this.r >= 255 & this.g >= 255 && this.b >= 255) {
      if (Math.random() >= 0.5) {
        nextmap[x][y] = new Neutron();
      } else {
        nextmap[x][y] = new Proton();     
      }
    } else {

      var xr = Math.round((Math.random() * 8) - 4);
      var yr = Math.round((Math.random() * 8) - 4);

      var other = nextmap[x + xr][y + yr];

      if ((other != undefined) && (other.type == "Air") && other.type != "Quarks") {

        nextmap[x + xr][y + yr] = nextmap[x][y];
        nextmap[x][y] = new Air();

      } else if (other.type == "Quarks"){

        if (this.r < 255 && this.r + other.r <= 255) {
          this.r += other.r;
        }
        if (this.g < 255 && this.g + other.g <= 255) {
          this.g += other.g;
        }
        if (this.b < 255 && this.b + other.b <= 255) {
          this.b += other.b;
        }
        nextmap[x + xr][y + yr] = nextmap[x][y];
        nextmap[x][y] = new Air();
      }

    }

    this.updated = true;
    return nextmap;

  }

}

class Neutron {
  constructor() {
    this.temp = 2;
    this.cond = 0;
    this.updated = false;
    this.solid = false;
    this.type = "Neutron";

    this.r = Math.abs(150 + Math.random() * 20);
    this.g = Math.abs(160 + Math.random() * 20);
    this.b = Math.abs(150 + Math.random() * 20);
  }

  update(x, y, map, self, nextmap) {


      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);

      var other = nextmap[x + xr][y + yr];

      if ((other != undefined) && (other.solid == false) && other.type != "Uranium" && other.type != "Thorium") {

        nextmap[x + xr][y + yr] = nextmap[x][y];
        nextmap[x][y] = other;

      } else if (other.type == "Uranium" || other.type == "Thorium") {
        nextmap[x + xr][y + yr] = new GammaRay();
        nextmap[x][y] = new Air();
      }
      

    this.updated = true;
    return nextmap;

  }

}

class Proton {
  constructor() {
    this.temp = 2;
    this.cond = 0;
    this.updated = false;
    this.solid = false;
    this.type = "Proton";

    this.r = Math.abs(200 + Math.random() * 50);
    this.g = Math.abs(20 + Math.random());
    this.b = Math.abs(20 + Math.random());
  }

  update(x, y, map, self, nextmap) {

      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);

      var other = nextmap[x + xr][y + yr];

      if ((other != undefined) && (other.solid == false) && other.type != "Electron") {

        nextmap[x + xr][y + yr] = nextmap[x][y];
        nextmap[x][y] = other;

      } else if (other.type == "Electron") {
        nextmap[x + xr][y + yr] = new Hydrogen();
        nextmap[x][y] = new Air();
      }
      

    this.updated = true;
    return nextmap;

  }

}
class Electron {
  constructor() {
    this.temp = 2;
    this.cond = 0;
    this.updated = false;
    this.solid = false;
    this.type = "Electron";

    this.r = Math.abs(20 + Math.random());
    this.g = Math.abs(20 + Math.random());
    this.b = Math.abs(200 + Math.random() * 50);
  }

  update(x, y, map, self, nextmap) {


      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);

      var other = nextmap[x + xr][y + yr];

      if ((other != undefined) && (other.solid == false) && other.type != "Wire") {

        nextmap[x + xr][y + yr] = nextmap[x][y];
        nextmap[x][y] = other;

      } else if (other.type == "Wire") {
        nextmap[x + xr][y + yr] = new Head();
        nextmap[x][y] = new Air();
      }
      

    this.updated = true;
    return nextmap;

  }

}

class Neuron {
  constructor() {
    this.bias = 0;
    this.active = 0;
    this.weights = array(100);
  }

  update(next) {
    for (var i = 0; i < next.length; i++) {
      next[i] += (this.active * this.weights[i]) + next[i].bias;      
  }
    return[next];
  }
}

class AI {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "AI";
    this.energy = 100;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.input = array(8);
    this.hidden = array(16);
    this.output = array(8);
    
    for (i = 0; i < this.input.length; i++) {
      this.input[i] = new Neuron();
    }
    for (i = 0; i < this.hidden.length; i++) {
      this.hidden[i] = new Neuron();
    }
    for (i = 0; i < this.output.length; i++) {
      this.output[i] = new Neuron();
    }
    this.mutation = 0.1;
  }

  update(x, y, map, self, nextmap) {

    if (this.temp > 10 || this.temp < -5 || this.energy <= 0) {
      nextmap[x][y] = new Moss();
    } else if (this.energy >= 100) {
      this.energy -= 50;
    } else {

      this.x += Math.tanh(this.output[0].active);
      this.y += Math.tanh(this.output[1].active);
      
    }
    this.energy -= 1;
    this.r = this.energy;
    this.updated = true;
    return nextmap;

  }

}

class Uranium {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Uranium";
    this.mass = 10;
    var multval = 70;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + this.colormult);
    this.g = Math.abs(180 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp >= 10) {
      for (var i = 0; i < 2; i ++) {
        var xr = Math.round((Math.random() * 2) - 1);
        var yr = Math.round((Math.random() * 2) - 1);
        if (nextmap[x + xr][y + yr].type == "Air") {
          nextmap[x + xr][y + yr] = new Neutron();
        }
        if (Math.random() < 0.5) {
        nextmap[x][y] = new GammaRay();
        }
      }
    } else {
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

      if (this.temp > 0) {
        this.r = 0 + (this.temp * 50) + this.colormult;

      } else {
        this.r = 0 + this.colormult;

      }
    }
    this.updated = true;
    return nextmap;
  }
}

class Thorium {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Thorium";
    this.mass = 10;
    var multval = 70;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + this.colormult);
    this.g = Math.abs(80 + this.colormult);
    this.b = Math.abs(150 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp >= 20) {
      for (var i = 0; i < 4; i ++) {
        var xr = Math.round((Math.random() * 2) - 1);
        var yr = Math.round((Math.random() * 2) - 1);
        if (nextmap[x + xr][y + yr].type == "Air") {
          nextmap[x + xr][y + yr] = new Neutron();
        }
        if (Math.random() < 0.5) {
        nextmap[x][y] = new GammaRay();
        }
      }
    } else {
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

      if (this.temp > 0) {
        this.r = 0 + (this.temp * 50) + this.colormult;

      } else {
        this.r = 0 + this.colormult;

      }
    }
    this.updated = true;
    return nextmap;
  }
}

class GammaRay {
  constructor() {
    this.temp = 500;
    this.cond = 0;
    this.updated = false;
    this.solid = true;
    this.type = "GammaRay";
    this.mass = 1;
    this.xr = Math.round((Math.random() * 2) - 1);
    this.yr = Math.round((Math.random() * 2) - 1);
    var multval = 55;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + this.colormult);
    this.g = Math.abs(200 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
    this.life = 0;
  }
  update(x, y, map, self, nextmap, width) {
    try {
      if (this.life >= 300 || x > width || x <= 0) {
        nextmap[x][y] = new Smoke()
      } else {
        var other = nextmap[x + this.xr][y + this.yr];
        if ((other != undefined) && other.type == "Air") {
          nextmap[x + this.xr][y + this.yr] = nextmap[x][y];

          if (Math.random() < 0.96) {
            nextmap[x][y] = new Air()
          } else {
            nextmap[x][y] = new GammaRay();
          }
        } else {
          var tries = 0;
          while (((nextmap[x + this.xr][y + this.yr] != undefined) && (nextmap[x + this.xr][y + this.yr].type != "Air")) && (nextmap[x + this.xr][y + this.yr].type != "GammaRay")) {
            tries += 1;
            if (tries > 5) {
              this.xr = 0;
              this.yr = 0;
              nextmap[x][y] = new GammaRay()
              this.life += 1;
              this.temp = 500 - this.life;
              tries = 0;
              this.updated = true;
              return nextmap;

            }
            this.xr = Math.round(((Math.random()) * 2) - 1);
            this.yr = Math.round(((Math.random()) * 2) - 1);
          }


          nextmap[x + this.xr][y + this.yr] = nextmap[x][y];
          nextmap[x][y] = new Air()


        }
        this.life += 1;
        this.temp = 500 - this.life;
      }

    } catch (error) {
      console.log(error.message, error.stack)
    }
    tries = 0;
    this.updated = true;
    return nextmap;
  }

}

class Moss {
  constructor() {
    this.temp = 0.75;
    this.cond = 0.2;
    this.updated = false;
    this.solid = true;
    this.type = "Moss";
    this.mass = 3;
    this.water = 5;
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
    if (this.temp >= 5) {
      nextmap[x][y] = new DeadMoss();
    } else {
      if (((other != undefined) && ((other.type == "Water")) && Math.random() >= 0.9)) {
        this.water += 1;
        if (this.water >= 5) {
          nextmap[x + xr][y + yr] = new Moss();
        }

      } else if (other.type == "Fungus") {
        nextmap[x + xr][y + yr] = new Moss();
      } else if (other.type == "Gasoline") {
        nextmap[x + xr][y + yr] = new Dirt();
      } else if (other.type == "Moss") {
        other.water += this.water / 10;
        this.water -= this.water / 10;
      }
      this.water -= 0.05 * Math.random();
      if (this.water <= 0) {
        nextmap[x][y] = new DeadMoss();
      }
    }
    this.b = this.water * 20;
    if (Math.random() > 0.99) {
      co2 -= 1;
    }
    this.updated = true;
    return nextmap;
  }
}

class DeadMoss {
  constructor() {
    this.temp = 1;
    this.cond = 0.5;
    this.updated = false;
    this.solid = true;
    this.type = "Moss";
    this.mass = 3;
    this.water = 0;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {
    var r = Math.random();
    if (this.temp > 4 && r >= 0.2) {
      nextmap[x][y] = new Fire();
    } else if (r < 0.2 && this.temp > 4) {
      nextmap[x][y] = new Dirt();
    } else {
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
      var other = nextmap[x + xr][y + yr];
      if (((other != undefined) && Math.random() >= 0.5)) {
        if (other.type == "Gasoline") {
          nextmap[x][y] = new Dirt();
        } else if (other.type == "Water") {
          nextmap[x][y] = new Moss();
        }

      }

    }
    if (Math.random() > 0.995) {
      co2 -= 1;
    }
    this.updated = true;
    return nextmap;
  }
}

class Stone {
  constructor() {
    this.temp = 0;
    this.cond = 0.8;
    this.updated = false;
    this.solid = true;
    this.type = "Stone";
    this.mass = 10;
    var multval = 20;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + this.colormult);
    this.g = Math.abs(50 + this.colormult);
    this.b = Math.abs(50 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 12) {
      nextmap[x][y] = new Lava();
    }

    if (this.temp > 0) {
      this.g = 50 - (this.temp * 5) + this.colormult;
      this.b = 50 - (this.temp * 5) + this.colormult;
      this.r = 50 + (this.temp * 5) + this.colormult;
    } else {
      this.g = 50 + this.colormult;
      this.b = 50 + this.colormult;
      this.r = 50 + this.colormult;
    }
    this.updated = true;
    return nextmap;
  }
}

class Glass {
  constructor() {
    this.temp = 1;
    this.cond = 0.7;
    this.updated = false;
    this.solid = true;
    this.type = "Glass";
    this.mass = 12;
    var multval = 5;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(120 + this.colormult);
    this.g = Math.abs(120 + this.colormult);
    this.b = Math.abs(120 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 17) {
      nextmap[x][y] = new Lava();
    }

    if (this.temp > 0) {
      this.g = 120 - (this.temp * 5) + this.colormult;
      this.b = 120 - (this.temp * 5) + this.colormult;
      this.r = 120 + (this.temp * 5) + this.colormult;
    } else {
      this.g = 120 + this.colormult;
      this.b = 120 + this.colormult;
      this.r = 120 + this.colormult;
    }
    this.updated = true;
    return nextmap;
  }
}

class Titanium {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Titanium";
    this.mass = 100;
    var multval = 10;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(150 + this.colormult);
    this.g = Math.abs(150 + this.colormult);
    this.b = Math.abs(150 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 0) {
      this.g = 150 - (this.temp) + this.colormult;
      this.b = 150 - (this.temp) + this.colormult;
      this.r = 150 + (this.temp) + this.colormult;
    }
    this.updated = true;
    return nextmap;
  }
}

class Head {
  constructor() {
    this.temp = 20;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Head";
    this.mass = 100;
    this.colormult = 0;
    this.dead = false;
    this.r = Math.abs(220 + this.colormult);
    this.g = Math.abs(200 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.dead) {
      nextmap[x][y] = new Tail();
    }
    this.dead = true;
    return nextmap;
  }
}

class Tail {
  constructor() {
    this.temp = 20;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Tail";
    this.mass = 100;
    this.colormult = 0;
    this.dead = false;
    this.r = Math.abs(0 + this.colormult);
    this.g = Math.abs(0 + this.colormult);
    this.b = Math.abs(150 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.dead) {
      nextmap[x][y] = new Wire();

    }
    this.dead = true;

    return nextmap;
  }
}

class Wire {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Wire";
    this.mass = 100;
    this.dead = false;
    var multval = 10;
    this.others = 0;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(120 + this.colormult);
    this.g = Math.abs(120 + this.colormult);
    this.b = Math.abs(120 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.dead != true) {
      for (var xo = -1; xo < 2; xo++) {

        for (var yo = -1; yo < 2; yo++) {
          try {

            if (nextmap[x + xo][y + yo].type == "Head" && nextmap[x + xo][y + yo].updated == false) {
              this.others += 1;
            }

          } catch {
            0;
          }


        }
      }
      if (this.others == 2 || this.others == 1) {
        nextmap[x][y] = new Head();
        nextmap[x][y].updated = true;
      } else if (this.others > 2) {
        nextmap[x][y] = new Wire();
        nextmap[x][y].dead = true;
      }
    }
    this.dead = false;
    this.updated = true;
    return nextmap;
  }
}

class RLED {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "RLED";
    this.mass = 100;
    var multval = 10;
    this.others = 0;
    this.pow = 0;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(80 + this.colormult);
    this.g = Math.abs(20 + this.colormult);
    this.b = Math.abs(20 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    for (var xo = -1; xo < 2; xo++) {

      for (var yo = -1; yo < 2; yo++) {
        try {

          if (nextmap[x + xo][y + yo].type == "Head" && nextmap[x + xo][y + yo].updated == false) {
            if (this.pow + 20 < 250) {
              this.pow += 20;
            }
          }

        } catch {
          0;
        }


      }
    }
    if (this.pow < 0) {
      this.pow = 0;
    }

    this.r = Math.abs(80 + this.colormult + this.pow)
    this.pow -= 5;
    this.updated = true;
    return nextmap;
  }
}

class Copper {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.ox = 1;
    this.type = "Copper";
    this.mass = 100;
    var multval = 10;
    this.oxchance = 1;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(185 + this.colormult);
    this.g = Math.abs(95 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
  }
  update(x, y, map, self, nextmap) {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);
    if (nextmap[xr + x][yr + y].type == "Air" && Math.random() > 0.99) {
      this.ox += 1;
    }
    if (nextmap[xr + x][yr + y].type == "Oxygen") {
      this.ox += 1;
    }
    if (nextmap[xr + x][yr + y].type == "Copper" && nextmap[xr + x][yr + y].ox >= 10 && Math.random() < this.oxchance && this.ox < 10) {
      this.ox += this.oxchance;
      this.oxchance -= 0.2 * Math.random();
    }

    if (this.temp > 25) {
      nextmap[x][y] = new Lava();
    }
    if (this.temp > 0) {
      this.r = 185 + (this.temp * 5) + this.colormult - this.ox * 3;
      this.g = 95 + (this.temp * 5) + this.colormult + this.ox * 5;
      this.b = 0 - (this.temp * 5) + this.colormult + this.ox * 3;
    } else {
      this.r = 185 + this.colormult - this.ox * 3;
      this.g = 95 + this.colormult + this.ox * 5;
      this.b = 0 - this.colormult + this.ox * 3;
    }

    if (this.ox > 15) {
      this.ox = 15;
    }
    this.updated = true;
    return nextmap;
  }
}

class Insulator {
  constructor() {
    this.temp = 1;
    this.cond = 0;
    this.updated = false;
    this.solid = true;
    this.type = "Insulator";
    this.mass = 1;
    var multval = 30;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + this.colormult);
    this.g = Math.abs(150 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    this.updated = true;
    return nextmap;
  }
}

class HeatBlock {
  constructor() {
    this.temp = 100;
    this.cond = 0;
    this.updated = false;
    this.solid = true;
    this.type = "HeatBlock";
    this.mass = 100;
    var multval = 20;
    this.pow = 0;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + this.colormult);
    this.g = Math.abs(0 + this.colormult);
    this.b = Math.abs(0 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    for (var xo = -1; xo < 2; xo++) {

      for (var yo = -1; yo < 2; yo++) {
        try {

          if (nextmap[x + xo][y + yo].type == "Head" && nextmap[x + xo][y + yo].updated == false) {
            if (this.pow + 20 < 250) {
              this.pow += 20;
            }
          }

        } catch {
          0;
        }


      }
    }
    if (this.pow < 0) {
      this.pow = 0;
    }

    this.temp = this.pow;
    this.r = Math.abs(this.colormult + this.pow + 50);
    this.pow -= 5;
    this.updated = true;
    return nextmap;
  }
}

class ColdBlock {
  constructor() {
    this.temp = -100;
    this.cond = 0;
    this.updated = false;
    this.solid = true;
    this.type = "ColdBlock";
    this.mass = 100;
    var multval = 50;
    this.pow = 0;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + this.colormult);
    this.g = Math.abs(0 + this.colormult);
    this.b = Math.abs(200 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    for (var xo = -1; xo < 2; xo++) {

      for (var yo = -1; yo < 2; yo++) {
        try {

          if (nextmap[x + xo][y + yo].type == "Head" && nextmap[x + xo][y + yo].updated == false) {
            if (this.pow + 20 < 250) {
              this.pow += 20;
            }
          }

        } catch {
          0;
        }


      }
    }
    if (this.pow < 0) {
      this.pow = 0;
    }

    this.temp = 0 - this.pow;
    this.b = Math.abs(this.colormult + this.pow + 50);
    this.pow -= 5;
    this.updated = true;
    return nextmap;
  }

}

class Spawner {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Spawner";
    this.mass = 100;
    this.pow = 0;
    var multval = 50;
    this.spawns = "Air";
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + this.colormult);
    this.g = Math.abs(0 + this.colormult);
    this.b = Math.abs(150 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    for (var xo = -1; xo < 2; xo++) {

      for (var yo = -1; yo < 2; yo++) {

        if (nextmap[x + xo][y + yo].type == "Head" && nextmap[x + xo][y + yo].updated == false && this.pow + 20 <= 250) {
          this.pow += 100;
        }

      }
    }

    while (xr != 0 && yr != 0) {
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
    }

    if (this.spawns == "Air" || this.spawns == "Spawner" || this.spawns == "Wire" || this.spawns == "Head" || this.spawns == "Tail") {
      this.spawns = nextmap[xr + x][yr + y].type;
    } else {
      if (nextmap[xr + x][yr + y].type != "Spawner" && nextmap[xr + x][yr + y].type != "Wire" && nextmap[xr + x][yr + y].type != "Head" && nextmap[xr + x][yr + y].type != "Tail" && this.pow > 5) {
        eval("nextmap[x + xr][y + yr] = new " + this.spawns + "();")
      }
    }

    this.r = this.pow + this.colormult;
    this.pow -= 1;
    this.updated = true;
    return nextmap;

  }
}

class Generator {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Generator";
    this.mass = 100;
    var multval = 50;
    this.colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(150 + this.colormult);
    this.g = Math.abs(0 + this.colormult);
    this.b = Math.abs(150 + this.colormult);
  }
  update(x, y, map, self, nextmap) {

    while (xr != 0 && yr != 0) {
      var xr = Math.round((Math.random() * 2) - 1);
      var yr = Math.round((Math.random() * 2) - 1);
    }

    if (nextmap[xr + x][yr + y].type == "Air" || nextmap[xr + x][yr + y].type == "Wire") {
      if (Math.random() < this.temp / 100) {
        nextmap[x + xr][y + yr] = new Head();
      }
    }

    this.updated = true;
    return nextmap;

  }
}

class Wood {
  constructor() {
    this.temp = 1;
    this.cond = 1;
    this.updated = false;
    this.solid = true;
    this.type = "Wood";
    this.mass = 3;
    this.water = 5;
    var multval = 10;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(55 + colormult);
    this.g = Math.abs(20 + colormult);
    this.b = Math.abs(0 + colormult);
  }
  update(x, y, map, self, nextmap) {

    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);
    var other = nextmap[x + xr][y + yr];
    if (this.temp > 16) {
      if (Math.random() >= 0.2) {
        nextmap[x][y] = new Fire();
      } else {
        nextmap[x][y] = new Ash();
      }
    } else {
      if (((other != undefined) && ((other.type == "Water")) && Math.random() >= 0.9)) {
        this.water += 1;
        if (this.water >= 5) {
          nextmap[x + xr][y + yr] = new Moss();
        }

      } else if (other.type == "Fungus") {
        nextmap[x + xr][y + yr] = new Moss();
      } else if (other.type == "Gasoline") {
        nextmap[x + xr][y + yr] = new Dirt();
      }
      this.water -= 0.05 * Math.random();

    }

    this.updated = true;
    return nextmap;
  }
}

class Ice {
  constructor() {
    this.temp = -10;
    this.cond = 0.4;
    this.updated = false;
    this.solid = true;
    this.type = "Ice";
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
    this.temp = 0;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Water";
    this.mass = 1;
    this.falling = false;
    var multval = 55;
    
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(0 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp < -3 && this.falling == false) {
      nextmap[x][y] = new Ice();
    } else if (this.temp <= -3 && this.falling == true) {
      nextmap[x][y] = new Snow();
    } else if (this.temp > 10) {
      nextmap[x][y] = new Steam();
    } else {
      var below = nextmap[x][y + 1];
      if (((below != undefined) && (below.mass < self.mass) && (below.solid != true))) {
        if (sco2 && Math.random() > 0.9 && co2 > 350) {
          nextmap[x][y] = new Acid();
          this.updated = true;
          return nextmap;

        }
        nextmap[x][y + 1] = self;
        nextmap[x][y] = below;
        this.falling = true;

      } else {
        this.falling = false;
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

class Gasoline {
  constructor() {
    this.temp = 0;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Gasoline";
    this.mass = 1;
    this.falling = false;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(100 + colormult);
    this.g = Math.abs(100 + colormult);
    this.b = Math.abs(50 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp > 8) {
      nextmap[x][y] = new Fire();
      nextmap[x][y].temp += 10;
      if (sco2) {
        co2 += 0.5;
      }
    } else {
      var below = nextmap[x][y + 1];
      if (((below != undefined) && (below.mass < self.mass) && (below.solid != true))) {
        nextmap[x][y + 1] = self;
        nextmap[x][y] = below;
        this.falling = true;

      } else {
        this.falling = false;
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
    this.temp = 15;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Steam";
    this.mass = -1;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(150 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {

    if (self.temp >= 8) {
      var xr = Math.round((Math.random() * 2) - 1);
      var below = nextmap[x][y - 1];

      if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {

      } else {
        var nextpos = nextmap[x + xr][y];
        var defined = (nextpos != undefined)
        if ((defined) && (nextpos.solid == false)) {
          nextmap[x + xr][y] = self;
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

class Hydrogen {
  constructor() {
    this.temp = 0;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Hydrogen";
    this.mass = -1.5;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(150 + colormult);
    this.g = Math.abs(170 + colormult);
    this.b = Math.abs(170 + colormult);
  }
  update(x, y, map, self, nextmap) {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);

    if (nextmap[x + xr][y + yr].type == "Oxygen") {
      if (Math.random() > 0.5) {
        nextmap[x][y] = new Water();
        nextmap[x][y].temp += 7;
      } else {
        nextmap[x + xr][y + yr] = new Water();
        nextmap[x + xr][y + yr].temp += 7;
      }

      this.updated = true;
      return nextmap;
    } else if (nextmap[x + xr][y + yr].type == "Neutron"){
      nextmap[x + xr][y + yr] = new Deuterium();

      this.updated = true;
      return nextmap;
      
    }

    else if (self.temp <= 12) {
      var below = nextmap[x][y - 1];
      if ((below != undefined) && (below.mass > self.mass) && (below.solid != true)) {
        nextmap[x][y - 1] = self;
        nextmap[x][y] = below;
      } else {
        var nextpos = nextmap[x + xr][y];
        var defined = (nextpos != undefined)
        if ((defined) && (nextpos.solid == false)) {
          nextmap[x + xr][y] = self;
          nextmap[x][y] = nextpos;
        }
      }
    } else {
      nextmap[x][y] = new Fire();
      nextmap[x][y].temp += 20;
    }

    this.updated = true;
    return nextmap;
  }
}

class Deuterium {
  constructor() {
    this.temp = 0;
    this.cond = 0.4;
    this.updated = false;
    this.solid = false;
    this.type = "Deuterium";
    this.mass = 0;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(120 + colormult);
    this.g = Math.abs(150 + colormult);
    this.b = Math.abs(150 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (Math.random() > 0.999 && nextmap[x][y+1].type == "Air") {
      nextmap[x][y] = new Lightning();
    } else {
    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);

    if (nextmap[x + xr][y + yr].type == "Oxygen") {
      if (Math.random() > 0.5) {
        nextmap[x][y] = new Water();
        nextmap[x][y].temp += 7;
      } else {
        nextmap[x + xr][y + yr] = new Water();
        nextmap[x + xr][y + yr].temp += 7;
      }

      this.updated = true;
      return nextmap;
    }

    else if (self.temp <= 25) {
      var below = nextmap[x][y - 1];
      if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {
        nextmap[x][y - 1] = self;
        nextmap[x][y] = below;
      } else {
        var nextpos = nextmap[x + xr][y];
        var defined = (nextpos != undefined)
        if ((defined) && (nextpos.solid == false)) {
          nextmap[x + xr][y] = self;
          nextmap[x][y] = nextpos;
        }
      }
    } else {
      nextmap[x][y] = new Fire();
      nextmap[x][y].temp += 20;
    }
    }
    this.updated = true;
    return nextmap;
  }
}

class Oxygen {
  constructor() {
    this.temp = 0;
    this.cond = 1;
    this.updated = false;
    this.solid = false;
    this.type = "Oxygen";
    this.mass = -1.2;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(120 + colormult);
    this.g = Math.abs(170 + colormult);
    this.b = Math.abs(200 + colormult);
  }
  update(x, y, map, self, nextmap) {



    var xr = Math.round((Math.random() * 2) - 1);
    var below = nextmap[x][y - 1];
    if ((below != undefined) && (below.mass < self.mass) && (below.solid != true)) {

    } else {
      var nextpos = nextmap[x + xr][y];
      var defined = (nextpos != undefined)
      if ((defined) && (nextpos.solid == false)) {
        nextmap[x + xr][y] = self;
        nextmap[x][y] = nextpos;
      }
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
    this.type = "Smoke";
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

      } else {

        var r = Math.round((Math.random() * 2) - 1);
        var nextpos = nextmap[x + r][y];
        var defined = (nextpos != undefined)
        if ((defined) && (nextpos.solid == false)) {
          nextmap[x + r][y] = self;
          nextmap[x][y] = nextpos;
        }
      }
      if (sco2) {
        co2 += 0.1;
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
    this.temp = 25;
    this.cond = 0.1;
    this.updated = false;
    this.solid = false;
    this.type = "Lava";
    this.mass = 5;
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(200 + colormult);
    this.g = Math.abs(50 + colormult);
    this.b = Math.abs(20 + colormult);
  }
  update(x, y, map, self, nextmap) {
    if (this.temp < 12) {
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

class Acid {
  constructor() {
    this.temp = 7;
    this.cond = 0.2;
    this.updated = false;
    this.solid = false;
    this.type = "Acid";
    this.mass = 1;
    this.blist = ["Acid", "Air", "Titanium", "Insulator", "Spawner"]
    var multval = 55;
    var colormult = Math.round((Math.random() * multval) - (multval / 2));
    this.r = Math.abs(50 + colormult);
    this.g = Math.abs(200 + colormult);
    this.b = Math.abs(150 + colormult);
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

    var xr = Math.round((Math.random() * 2) - 1);
    var yr = Math.round((Math.random() * 2) - 1);

    if (nextmap[x + xr][y + yr] != undefined && (this.blist.includes(nextmap[x + xr][y + yr].type) == false)) {
      if (Math.random() > 0.9) {
        nextmap[x + xr][y + yr] = new Smoke()
        if (Math.random() > 0.3) {
          nextmap[x][y] = new Smoke()
        }
      }
    }

    this.updated = true;
    return nextmap;
  }
}

function setup() {

  window.requestAnimationFrame(draw);
}

{
  var screen = document.getElementById("screen").value;

  if (document.cookie != "") {
    screen = parseInt(document.cookie);
    document.getElementById("screen").value = screen;
  } else {
    var screen = 64;
    document.getElementById("screen").value = screen;
    document.cookie = screen;
  }

  var width = screen;
  var height = screen;
  var canvaswidth = canvas.width;
  var canvasheight = canvas.height;

  var scalex = (canvaswidth / width);
  var scaley = (canvasheight / height);
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

noise.seed(Math.random());
var noisemap = []

for (i=0;i<screen;i++) {
  noisemap.push(noise.perlin2(i / (screen / 2), 0) * 50)
}

noise.seed(Math.random());
for (i=0;i<screen;i++) {
  noisemap[i] += (noise.perlin2(i / 30, 0) * 40)
}

noise.seed(Math.random());
for (i=0;i<screen;i++) {
  noisemap[i] += Math.round(Math.random())
}
noise.seed(Math.random());

for (y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
var pixel = new Air()
  pxs[x][y] = pixel;
    
  }
  
}

var x = 0;
var y = 0;

function pause() {
  if (paused == false) {
    paused = true;
    document.getElementById("pause").innerHTML = "Unpause";
  } else if (paused) {
    paused = false;  
    document.getElementById("pause").innerHTML = "Pause";
  }
  
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      pause();
    }
}

function draw() {
  sco2 = document.getElementById("co2sim").checked;
  var heat = document.getElementById("heat").checked;
  if (heat) {
    document.getElementById("simwind").style.display = "inline";
    document.getElementById("wind").style.display = "inline";
    wind = document.getElementById("wind").checked;
  } else {
    document.getElementById("simwind").style.display = "none";
    document.getElementById("wind").style.display = "none";
    wind = false;
  }
  if (sco2) {
    co2 -= co2 / 1000;
    document.getElementById("co2").style.display = "block";
  } else {
    co2 = 0;
    document.getElementById("co2").style.display = "none";
  }

  if (co2 < 0) {
    co2 = 0;
  }

  ctx.clearRect(0, 0, width * scalex, height * scaley);

  while (y < height) {
    while (x < width) {
      px = pxs[x][y];
      if (px.updated == false) {
        try {
           if (paused == false) {

          nextpxs = px.update(x, y, pxs, px, nextpxs, (width - 2));
            if (heat) {
              var xr = Math.round((Math.random() * 2) - 1);
              var yr = Math.round((Math.random() * 2) - 1);
              nextpxs[x + xr][y + yr].temp += (px.temp / 4) * nextpxs[x + xr][y + yr].cond;
              px.temp -= (px.temp / 4) * nextpxs[x + xr][y + yr].cond;
            }
          }

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
          ctx.fillStyle = "rgb(" + px.temp * 20 + ", 0, 0)";
        } else {
          ctx.fillStyle = "rgb(0, 0, " + Math.abs(px.temp) * 20 + ")";
        }

      } else {

        ctx.fillStyle = "rgb(" + px.r + ", " + px.g + ", " + px.b + ")";

      }

      ctx.fillRect(x * scalex, y * scaley, scalex, scaley);

      x++;
    }
    x = 0;
    y++;
  }
  x = 0;
  y = 0;

  if (true) {

    if (mouseIsPressed) {
      ctx.fillStyle = "rgb(200, 0, 0)";
    } else {
      ctx.fillStyle = "rgb(0, 0, 0)";
    }
    ctx.fillRect(Math.round(mouseX / scalex) * scalex, Math.round(mouseY / scalex) * scalex, scalex, scaley);

  }


  if (mouseIsPressed) {
    try {
      var blocktype = document.getElementById("blocks").value;
      var size = document.getElementById("size").value;

      if (size > 1) {
      var shape = document.getElementById("shape").value;
        if (shape == "sqar") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (((xdist * scalex) < size) && ((ydist * scalex) < size)) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "circ") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (Math.pow((xdist * scalex), 2) + Math.pow((ydist * scalex), 2) < Math.pow(size, 2)) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "funi") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (Math.pow((xdist * scalex), 3) + Math.pow((ydist * scalex), 3) < Math.pow(size, 3)) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "diam") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if ((xdist * scalex) + (ydist * scalex) < size) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        }  else if (shape == "star") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (Math.pow((xdist * scalex), 0.5) + Math.pow((ydist * scalex), 0.5) < Math.pow(size, 0.5)) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "diam") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if ((xdist * scalex) + (ydist * scalex) < size) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "oval") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (Math.pow((xdist * scalex), 2) + Math.pow((ydist * 1.5 * scalex), 2) < Math.pow(size, 2)) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        } else if (shape == "lemn") {
        while (y < height) {
          while (x < width) {
            var xdist = Math.abs(x - (mouseX / scalex));
            var ydist = Math.abs(y - (mouseY / scaley));
            if (Math.pow((xdist * scalex), 2) + Math.pow((ydist * scalex), 2) < Math.sqrt(Math.pow(size, 2) * 2 * (Math.pow((xdist * scalex), 2) - Math.pow((ydist * scaley), 2)))) {
              eval("var placepx = new " + blocktype + "();")
              pxs[Math.round(x)][Math.round(y)] = placepx;
            }
            x++;
          }
          x = 0;
          y++;
        }
        x = 0;
        y = 0;
        }


      } else {
        eval("var placepx = new " + blocktype + "();")
        pxs[Math.round(mouseX / scalex)][Math.round(mouseY / scaley)] = placepx;
      }

    } catch {
      0;
    }
  }

  window.requestAnimationFrame(draw);
}

setup();

setInterval(function () {
  if (sco2) {
    if (co2 < 0) {
      co2 = 0;
    }

    var displayco2 = Math.round(co2 + Math.round(Math.random() * 30))

    if (co2 > 500) {
      document.getElementById("co2").innerHTML = "Pollution: " + "<b style =\"color: red;\">" + displayco2 + "</b>";
    } else if (co2 < 50) {
      document.getElementById("co2").innerHTML = "Pollution: " + "<b style =\"color: blue;\">" + displayco2 + "</b>";
    } else if (co2 < 100) {
      document.getElementById("co2").innerHTML = "Pollution: " + "<b style =\"color: green;\">" + displayco2 + "</b>";
    } else {
      document.getElementById("co2").innerHTML = "Pollution: " + "<b style =\"color: black;\">" + displayco2 + "</b>";
    }
  } else {
    document.getElementById("co2").style.display = "none";
  }
  screen = document.getElementById("screen").value;

  var body = document.getElementsByTagName('BODY')[0];

  if (screen != width && (body && body.readyState != 'loading')) {
    document.cookie = screen;
    location.reload();
  }
}, 2000);