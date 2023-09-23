const dotMatrixWrapper = function(){
    const _setup = function(){
        this.pixelDensity(1);
        const container = document.getElementById('visuals');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        this.createCanvas(containerWidth,containerHeight,this.WEBGL); 
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
        
    const _draw = function(){
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
        
    const layer3 = function(p){
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
        
    const layer2 = function(p){
        //motion parameter 
        p.turnMag = 60;
        p.accMag = 1.5; 
        p.col = '#2677BB';
        p.zHeight = -30;
        p.gridRatio = 2;
        p.elementRatio = 2.1;
        p.setup = _setup.bind(p);
        p.draw = _draw.bind(p);
        p.moveCamera = moveCamera.bind(p);
        p.moveObject = moveObject.bind(p);
        } 
        
    const layer1 = function(p){
        //motion parameter 
        p.turnMag = 40;
        p.accMag = 1; 
        p.col = '#00B8B8';
        p.zHeight = -60;
        p.gridRatio = 2;
        p.elementRatio = 2.3;
        p.setup = _setup.bind(p);
        p.draw = _draw.bind(p);
        p.moveCamera = moveCamera.bind(p);
        p.moveObject = moveObject.bind(p);
        } 
    const layerContainer1 = document.createElement("div");
    const layerContainer2 = document.createElement("div");
    const layerContainer3 = document.createElement("div");
    const wrapper = document.createElement('div');
    function show(){
        wrapper.style.height = "100%";
        wrapper.style.width = "100%";
        wrapper.style.backgroundImage = "url(assets/background.jpg)";
        wrapper.style.backgroundSize = "cover";
        const container = document.getElementById("dot-matrix");
        container.appendChild(wrapper);
        layerContainer1.style.position="absolute";
        layerContainer1.style.mixBlendMode="multiply";
        layerContainer1.style.zIndex="2";
        layerContainer1.style.filter="blur(8px)";
        layerContainer2.style.position="absolute";
        layerContainer2.style.mixBlendMode="multiply";
        layerContainer2.style.zIndex="1";
        layerContainer2.style.filter="blur(4px)";
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
    return {show:show,remove:remove,name:"Dot Matrix",breathStyle:"rgba(49, 91, 47, 1.0)"};
}
const dotMatrix = dotMatrixWrapper();