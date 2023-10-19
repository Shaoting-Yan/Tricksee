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
  this.thickness = 50;
  this.offset = 200;
  this.shift = Math.random()*this.offset;
  this.space = 3;
  size = this.int(this.viewSize/this.offset);
  this.arrows = [];
  this.tagged = random1D(size,size/2,this.space);
  for(let i = 0;i<this.tagged.length;i++){
    let length = this.random(this.height*0.5,this.height*0.95);
    if(this.tagged[i] && this.hasBlack){
      this.arrows.push(new ArrowCurve(-200,0,length*(2/5),length*(3/5),length,this.thickness,"black"));
    }else{
      this.arrows.push(new ArrowCurve(-200,0,length*(2/5),length*(3/5),length,this.thickness,"#DE3D83"));
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
  this.push();
  let currX = this.camHeight*this.Ry; 
  this.translate(currX,0,0);
  factor = (Math.abs(this.zHeight)+this.camHeight)/this.camHeight;
  this.scale(factor,factor);
  this.translate(-this.viewSize/2,-this.height/2-200,this.zHeight); 

  for(let i = 0;i<(this.arrows.length);i++){
    this.push();
    this.translate(i*this.offset+this.shift,0);
    let curr = this.arrows[i];
    curr.display(this,this.Rz,factor);
    this.pop();
  }
  this.pop();

  this.push();
  this.imageMode(this.CENTER);
  this.noStroke();
  this.translate(0,0,0);
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

const arrowCurtainWrapper = function(){
  const layerContainer1 = document.createElement("div");
  const layerContainer2 = document.createElement("div");
  const layerContainer3 = document.createElement("div");
  function show(){
    wrapper = document.createElement("div");
    document.body.appendChild(wrapper);
    layerContainer1.style.position="absolute";
    layerContainer1.style.mixBlendMode="multiply";
    layerContainer1.style.zIndex="2";
    layerContainer1.style.filter="blur(12px)";
    layerContainer2.style.position="absolute";
    layerContainer2.style.mixBlendMode="multiply";
    layerContainer2.style.zIndex="1";
    layerContainer2.style.filter="blur(5px)";
    layerContainer3.style.position="absolute";
    layerContainer3.style.mixBlendMode="multiply";
    layerContainer3.style.zIndex="0";
    wrapper.appendChild(layerContainer1);
    wrapper.appendChild(layerContainer2);
    wrapper.appendChild(layerContainer3);
    layer1Canvas = new p5(layer1,layerContainer1);
    layer2Canvas = new p5(layer2,layerContainer2);
    layer3Canvas = new p5(layer3,layerContainer3);
  }
  function remove(){
    layer1Canvas.remove();
    layer2Canvas.remove();
    layer3Canvas.remove();
    layerContainer1.remove();
    layerContainer2.remove();
    layerContainer3.remove();
    wrapper.remove();
  }
  return {show:show,remove:remove};
}

arrowCurtainWrapper().show();
console.log("here");

