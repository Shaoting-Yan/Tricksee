class Arrow {
    constructor(_size,_weight,_color){
      this.size = _size;
      this.weight = _weight;
      this.color = _color;
    }
    display(p){
      p.push();
      p.translate(-this.size/2,-this.size/2);
      p.strokeWeight(this.weight);
      p.stroke(this.color);
      p.strokeCap(p.SQUARE);
      p.strokeJoin(p.MITER);
      p.noFill();
      p.line(0,0,0,this.size+this.weight/2);
      p.line(-this.weight/2,this.size,this.size,this.size);
      p.line(0,this.size,this.size,0);
      p.pop();
    }
  }
const arrowMatrixWrapper = function(){
    let layer1 = function(p){
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
            const container = document.getElementById('visuals');
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            p.createCanvas(containerWidth,containerHeight,this.WEBGL); 
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
            p.moveObject();
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
            p.moveCamera();
        }
        p.moveCamera = moveCamera.bind(p);
        p.moveObject = moveObject.bind(p);
    } 
    const layerContainer1 = document.createElement("div");
    const wrapper = document.createElement('div');
    function show(){
        wrapper.style.height = "100%";
        wrapper.style.width = "100%";
        wrapper.style.backgroundImage = "url(assets/background.jpg)";
        wrapper.style.backgroundSize = "cover";
        const container = document.getElementById("arrow-matrix");
        container.appendChild(wrapper);
        layerContainer1.style.position="absolute";
        layerContainer1.style.mixBlendMode="multiply";
        layerContainer1.style.zIndex="0";
        wrapper.appendChild(layerContainer1);
        layer1Canvas = new p5(layer1,layerContainer1);//globally scoped but doesn't seem to be a problem
    }
    function remove(){
        layer1Canvas.remove();
        layerContainer1.remove();
        wrapper.remove();
    }
    return {show:show,remove:remove,name:"Arrow Matrix",breathStyle:"rgba(255, 255, 255, 0.25)"};
}

const arrowMatrix = arrowMatrixWrapper();