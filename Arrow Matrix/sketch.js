getMotion();
var mainSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 15;
  //Arrow sizing
  p.arrowSize = 70;
  p.arrowWeight = 21;
  p.gap = 70;
  p.offset = p.arrowSize + p.gap;
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight, p.WEBGL); 
    //view variables
    p.camHeight = p.height/2/p.tan(p.PI/6);
    p.viewSize = p.camHeight*Math.PI*2;
    p.matrixSize = p.int(p.viewSize/p.offset);
    //some buffer
    fixedBoard = p.createGraphics(p.viewSize,p.viewSize);
    //Arrow instances
    p.blueArrow = new Arrow(p.arrowSize,p.arrowWeight,p.color('#2677BB'));
    p.greenArrow = new Arrow(p.arrowSize,p.arrowWeight,p.color('#457C39'));
    p.flagged = random2D(p.matrixSize,p.matrixSize**2/5,2.5);
    for(let i = 0;i < p.matrixSize; i++){
      for(let j = 0;j < p.matrixSize; j++){
        if(!p.flagged[i][j]){
          fixedBoard.push();
          fixedBoard.translate(i*p.offset,j*p.offset);
          p.blueArrow.display(fixedBoard);
          fixedBoard.pop();
        }
      }
    }
    fixedBoardBuffer = p.createFramebuffer();
    fixedBoardBuffer.resize(p.viewSize,p.viewSize);
    fixedBoardBuffer.draw(()=>{p.clear();p.imageMode(p.CENTER);
                            p.image(fixedBoard,0,0,fixedBoardBuffer.width,fixedBoardBuffer.width)});
    fixedBoard.remove();
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
    p.image(fixedBoardBuffer,0,0,fixedBoardBuffer.width,fixedBoardBuffer.height);
    // p.image(p.moveBoard,0,0,p.moveBoard.width,p.moveBoard.height);
    moveCamera(p);
  }
} 

let mainCanvas = new p5(mainSketch,'mainCanvas');