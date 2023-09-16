getMotion();
var mainSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 15;
  //Arrow sizing
  p.arrowSize = 50;
  p.arrowWeight = 15;
  p.gap = 50;
  p.offset = p.arrowSize + p.gap;
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight, p.WEBGL); 
    //view variables
    p.camHeight = p.height/2/p.tan(p.PI/6);
    p.viewSize = p.camHeight*Math.PI*2;
    p.matrixSize = p.int(p.viewSize/p.offset);
    //some buffer
    p.fixedBoard = p.createGraphics(p.viewSize,p.viewSize);
    //Arrow instances
    p.blueArrow = new Arrow(p.arrowSize,p.arrowWeight,p.color('#2677BB'));
    p.greenArrow = new Arrow(p.arrowSize,p.arrowWeight,p.color('#457C39'));
    p.flagged = random2D(p.matrixSize,p.matrixSize**2/5,2.5);
    for(let i = 0;i < p.matrixSize; i++){
      for(let j = 0;j < p.matrixSize; j++){
        if(!p.flagged[i][j]){
          p.fixedBoard.push();
          p.fixedBoard.translate(i*p.offset,j*p.offset);
          p.blueArrow.display(p.fixedBoard);
          p.fixedBoard.pop();
        }
      }
    }
  }
  
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    p.clear();
    moveObject(p);
    for(let i = 0;i < p.matrixSize; i++){
      for(let j = 0;j < p.matrixSize; j++){
        if(p.flagged[i][j]){
          p.push();
          p.translate(-p.viewSize/2+i*p.offset,-p.viewSize/2+j*p.offset);
          p.rotate(p.Rz-p.currRz-Math.PI/4);
          p.greenArrow.display(p);
          p.pop();
        }
      }
    }
    p.imageMode(p.CENTER);
    p.image(p.fixedBoard,0,0,p.fixedBoard.width,p.fixedBoard.height);
    // p.image(p.moveBoard,0,0,p.moveBoard.width,p.moveBoard.height);
    moveCamera(p);
  }
} 

var drawSketch = function(p){
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(200,200);
    arrow = new Arrow(100,30,p.color('black'));
  }
  p.draw = function(){
    p.clear();
    p.translate(p.width/2,p.height/2);
    arrow.display(p);
  }
}

let mainCanvas = new p5(mainSketch,'mainCanvas');
// let drawCanvas = new p5(drawSketch,'drawCanvas');