getMotion();
var backSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 15;
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight); 
    //view variables
    p.camHeight = p.height/2/p.tan(p.PI/6);
    p.viewSize = p.camHeight*Math.PI*2;
    p.matrixSize = p.int(p.viewSize/p.offset);
  }
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    p.clear();

  }
} 

var foreSketch = function(p){
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight);
  }
  p.draw = function(){
    p.clear();
    p.translate(p.width/2,p.height/2);
    arrow.display(p);
  }
}

let backCanvas = new p5(backSketch,'mainCanvas');
// let foreCanvas = new p5(foreSketch,'drawCanvas');