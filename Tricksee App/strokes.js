const strokesWrapper = function(){
    const layer1 = function(p){
        //motion parameter
        p.he = 3;
        p.sw = 3;
        p.su = 2;
        p.da = 15;
        thickness = 80;
        offset = thickness*2.25;
        p.setup = function(){
            p.pixelDensity(1);
            const container = document.getElementById('visuals');
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            p.createCanvas(containerWidth,containerHeight); 
            //view variables
            p.camHeight = p.height/2/p.tan(p.PI/6);
            p.viewSize = p.camHeight*Math.PI*2;
            p.matrixSize = p.int(p.viewSize/offset);
            //controlPoints
            p.midPoint = {x:0,y:p.height*(2/5)};
            p.controlPoint = {x:0,y:p.height*(3/5)};
            p.radius = p.height-p.midPoint.y;
        }
        p.draw = function(){
            let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
            p.Rz = rotation[0];
            p.Ry = rotation[2];
            p.Rx = rotation[1];  
            //camera move due to up and down
            Ay = p.accelerationY;
            Ax = p.accelerationX;
            let dy = p.he*Math.sign(Ay)*(Math.abs(Ay)**1.5);
            p.accY = p.accY == null ? 0 : p.accY+dy;
            if (p.accY != 0){                                        
            p.accY -= p.accY/p.da; //damping
            }
            p.clear();
            p.push();
            p.translate(p.width/2,p.height/2);
            p.rotate(Math.PI/2-p.Rz);
            p.translate(-p.viewSize/2,0);//get to center of the view
            currX = p.camHeight*p.Ry;
            p.translate(currX,0);//for yaw rotation
            //tiling buffer
            p.blendMode(p.MULTIPLY);
            for(i=0;i<p.matrixSize;i++){
            p.push();
            p.translate(i*offset,0);
            drawWire(p,thickness);
            p.pop();
            }
            p.pop();
        }
    }
    function drawWire(p,thickness){
        p.push();
        p.translate(p.width/2,-p.height/2);
        p.noFill();
        p.stroke('#2677BB');
        p.strokeWeight(thickness);
        // p.strokeCap(p.SQUARE);
        p.beginShape();
          p.vertex(p.cos(p.Rz)*p.radius,p.midPoint.y+p.sin(p.Rz)*p.radius);
          p.quadraticVertex(p.controlPoint.x,p.controlPoint.y,p.midPoint.x,p.midPoint.y);
          p.vertex(0,-100);  
        p.endShape();
        p.stroke('#DE3D83');
        p.line(p.midPoint.x,p.midPoint.y+p.accY,p.midPoint.x,p.height+100);
        p.pop();
    }
    const layerContainer1 = document.createElement("div");
    const wrapper = document.createElement('div');
    function show(){
        wrapper.style.height = "100%";
        wrapper.style.width = "100%";
        wrapper.style.backgroundImage = "url(assets/background.jpg)";
        wrapper.style.backgroundSize = "cover";
        const container = document.getElementById("strokes");
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
    return {show:show,remove:remove,name:"Strokes"};
}

const strokes = strokesWrapper();
