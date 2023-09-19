getMotion();

//universal functions
_setup = function(){
  this.pixelDensity(1);
  this.createCanvas(this.windowWidth,this.windowHeight,this.WEBGL); 
  //view variables
  this.camHeight = this.height/2/this.tan(this.PI/6);
  this.viewSize = this.camHeight*Math.PI*2.5;
  //motion parameter
  this.he = 3;
  this.sw = 3;
  this.su = 2;
  this.da = 1;
  thickness = 45;
  //layer 1, the frontmost layer
  layer1 = this.createGraphics(this.viewSize,this.height+400);
  this.offset = 200;
  this.shift = Math.random()*this.offset;
  space = 3;
  size = this.int(layer1.width/this.offset);
  this.arrows = [];
  this.tagged = random1D(size,size/2,space);
  for(let i = 0;i<this.tagged.length;i++){
    let length = this.random(this.height*0.5,this.height*0.95);
    if(this.tagged[i] && this.hasBlack){
      this.arrows.push(new ArrowCurve(-200,0,length*(2/5),length*(3/5),length,thickness,"black"));
    }else{
      this.arrows.push(new ArrowCurve(-200,0,length*(2/5),length*(3/5),length,thickness,"#DE3D83"));
    }
  }
}
_draw = function(){
  let rotation = getEulerAngles(getRotationMatrix(this.rotationZ,this.rotationX,this.rotationY));
  this.Rz = Math.PI-rotation[0];
  this.Ry = rotation[2];
  this.Rx = rotation[1];  

  this.clear();
  this.background(255);

  let currX = this.camHeight*this.Ry; 
  this.translate(currX,0,0); 

  layer1.clear();
  layer1.push();
  for(let i = 0;i<(this.arrows.length);i++){
    layer1.push();
    layer1.translate(i*this.offset+this.shift,0);
    let curr = this.arrows[i];
    curr.display(layer1,this.Rz);
    layer1.pop();
  }
  layer1.pop();

  this.push();
  this.imageMode(this.CENTER);
  this.noStroke();
  this.translate(0,0,this.zHeight);
  factor = (Math.abs(this.zHeight)+this.camHeight)/this.camHeight;
  this.image(layer1,0,0,layer1.width*factor,layer1.height*factor);
  this.pop();
  this.moveCamera();
}

var layer1 = function(p){
  p.zHeight = 0;
  p.hasBlack = true;
  p.moveCamera = moveCamera.bind(p);
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
} 
var layer2 = function(p){
  p.zHeight = -200;
  p.hasBlack = false;
  p.moveCamera = moveCamera.bind(p);
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
} 
var layer3 = function(p){
  p.zHeight = -500;
  p.hasBlack = true;
  p.moveCamera = moveCamera.bind(p);
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
} 

let layer1Canvas = new p5(layer1,'layer1Canvas');
let layer2Canvas = new p5(layer2,'layer2Canvas');
let layer3Canvas = new p5(layer3,'layer3Canvas');