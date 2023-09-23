getMotion();
_setup = function(){
  this.pixelDensity(1);
  this.createCanvas(this.windowWidth,this.windowHeight,this.WEBGL); 
  //view variables
  this.camHeight = this.height/2/this.tan(this.PI/6);
  this.viewSize = this.camHeight*Math.PI*2;
  //motion parameter
  this.he = 3;
  this.sw = 3;
  this.su = 2;
  this.da = 10;
  //grid sizing
  this.offset = this.width/this.gridRatio;
  this.size = this.int(this.viewSize/this.offset);
}

_draw = function(){
  let rotation = getEulerAngles(getRotationMatrix(this.rotationZ,this.rotationX,this.rotationY));
  this.Rz = rotation[0];
  this.Ry = rotation[2];
  this.Rx = rotation[1];  
  this.clear();
  // this.ortho();
  this.moveCamera();
  this.turnV = this.createVector(Math.cos(this.noise(this.frameCount/500)*2*Math.PI),
                          Math.sin(this.noise(this.frameCount/500)*2*Math.PI)).setMag(this.turnMag);//turning
  this.accV = this.createVector(this.accX,this.accY).mult(this.accMag);
  this.moveObject();
  this.push();
  // this.imageMode(this.CENTER);
  this.sumV = p5.Vector.add(this.accV, this.turnV);
  this.translate(-this.viewSize/2,-this.viewSize/2,this.zHeight);
  for(let i = 0;i<this.size;i++){
    for(let j = 0;j<this.size;j++){
      this.push();
      this.noStroke();
      this.fill(this.col);
      this.translate(i*this.offset+this.sumV.x,j*this.offset+this.sumV.y);
      this.circle(0,0,this.offset/this.elementRatio);
      this.pop();
    }
  }
  this.pop();
}

var layer1Sketch = function(p){
  //motion parameter 
  p.turnMag = 0;
  p.accMag = 0; 
  p.zHeight = 0;
  p.col = '#DE3D83';
  p.gridRatio = 2;
  p.elementRatio = 1.75;
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
  p.moveCamera = moveCamera.bind(p);
  p.moveObject = moveObject.bind(p);
} 

var layer2Sketch = function(p){
  //motion parameter 
  p.turnMag = 0;
  p.accMag = 1.5; 
  p.col = '#2677BB';
  p.zHeight = -150;
  p.gridRatio = 2;
  p.elementRatio = 2;
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
  p.moveCamera = moveCamera.bind(p);
  p.moveObject = moveObject.bind(p);
} 

var layer3Sketch = function(p){
  //motion parameter 
  p.turnMag = 0;
  p.accMag = 1; 
  p.col = '#00B8B8';
  p.zHeight = -300;
  p.gridRatio = 2;
  p.elementRatio = 2.25;
  p.setup = _setup.bind(p);
  p.draw = _draw.bind(p);
  p.moveCamera = moveCamera.bind(p);
  p.moveObject = moveObject.bind(p);
} 

let layer1Canvas = new p5(layer1Sketch,'layer1Canvas');
let layer2Canvas = new p5(layer2Sketch,'layer2Canvas');
let layer3Canvas = new p5(layer3Sketch,'layer3Canvas');