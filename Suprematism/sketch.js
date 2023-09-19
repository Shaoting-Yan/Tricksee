getMotion();

//foreground
var foreSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 10;
  gap = 30;
  incr = 5;
  radius = 130;
  thickness = 4;
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight, p.WEBGL); 
    p.camHeight = p.height/2/p.tan(p.PI/6);
  }
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    moveCamera(p);
    p.clear();
    p.noStroke();
    p.fill(0);
    p.rotateZ(Math.PI/2-p.Rz);
    focus = p.accY/p.height*20;//binding with camera movement
    for(i = -19; i < 20;i+=2){
      d = i-focus;
      currIncr = Math.sign(d)*incr*d*d/2;//linearly interpolating the gap
      p.push();
      p.translate(0,i*gap+currIncr,0);
      p.cylinder(radius,thickness,100);
      p.pop();
    }
  }
} 

//background
var backSketch = function(p){
  gap = 75;
  w = 150;
  h = 300;
  offset = w+gap;
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight);
    p.camHeight = p.height/2/p.tan(p.PI/6);
    p.viewSize = p.camHeight*Math.PI;
    p.scrollSize = p.int(p.viewSize/offset)+1;
  }
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    p.clear();
    p.push();
    p.translate(p.width/2,p.height/2);
    p.rotate(Math.PI/2-p.Rz);
    currX = p.camHeight*p.Ry;
    p.translate(currX,0);   
    p.rectMode(p.CENTER);
    for (let i = -p.scrollSize;i < p.scrollSize; i++){
      p.push();
      p.fill('#E4BD0B');
      p.noStroke();
      p.translate(i*offset,0);
      p.rect(0,0,w,h);
      p.pop();
    }
    p.pop();
  }
}

let backCanvas = new p5(backSketch,'backCanvas');
let foreCanvas = new p5(foreSketch,'foreCanvas');