getMotion();
var backSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 1;
  thickness = 30;
  p.preload = function(){
    p.blurShader = p.loadShader('shaders/effect.vert', 'shaders/effect.frag');
  }
  p.setup = function(){
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth,p.windowHeight,p.WEBGL); 
    //view variables
    p.camHeight = p.height/2/p.tan(p.PI/6);
    p.viewSize = p.camHeight*Math.PI*2;

    //layer 1, the frontmost layer
    layer1 = p.createGraphics(p.viewSize,p.height);
    layer1Pass1 = p.createFramebuffer();
    layer1Pass1.resize(layer1.width,layer1.height);
    layer1Pass2 = p.createFramebuffer();
    layer1Pass2.resize(layer1.width,layer1.height);
    layer1.blurRadius = 0.1;//can not set this to zero
    layer1.offset = 200;
    layer1.space = 4;
    layer1.size = p.int(layer1.width/layer1.offset);
    layer1.arrows = [];
    layer1.tagged = random1D(layer1.size,layer1.size/2,layer1.space);
    for(let i = 0;i<layer1.tagged.length;i++){
      let length = p.random(layer1.height*0.5, layer1.height*1.0);
      if(layer1.tagged[i]){
        layer1.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"black"));
      }else{
        layer1.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"#DE3D83"));
      }
    }

    //layer 2
    layer2 = p.createGraphics(p.viewSize,p.height);
    layer2Pass1 = p.createFramebuffer();
    layer2Pass1.resize(layer2.width,layer2.height);
    layer2Pass2 = p.createFramebuffer();
    layer2Pass2.resize(layer2.width,layer2.height);
    layer2.blurRadius = 2;//can not set this to zero
    layer2.offset = 200;
    layer2.space = 4;
    layer2.size = p.int(layer2.width/layer2.offset);
    layer2.arrows = [];
    layer2.tagged = random1D(layer2.size,layer2.size/2,layer2.space);
    for(let i = 0;i<layer2.tagged.length;i++){
      let length = p.random(layer2.height*0.5, layer2.height*1.0);
      if(layer2.tagged[i]){
        layer2.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"#DE3D83"));
      }else{
        layer2.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"#DE3D83"));
      }
    }
    //layer 3
    layer3 = p.createGraphics(p.viewSize,p.height);
    layer3Pass1 = p.createFramebuffer();
    layer3Pass1.resize(layer3.width,layer3.height);
    layer3Pass2 = p.createFramebuffer();
    layer3Pass2.resize(layer3.width,layer3.height);
    layer3.blurRadius = 5;//can not set this to zero
    layer3.offset = 200;
    layer3.space = 4;
    layer3.size = p.int(layer3.width/layer3.offset);
    layer3.arrows = [];
    layer3.tagged = random1D(layer3.size,layer3.size/2,layer3.space);
    for(let i = 0;i<layer3.tagged.length;i++){
      let length = p.random(layer3.height*0.5, layer3.height*1.0);
      if(layer3.tagged[i]){
        layer3.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"black"));
      }else{
        layer3.arrows.push(new ArrowCurve(0,length*(2/5),length*(3/5),length,thickness,"#DE3D83"));
      }
    }
  }
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = Math.PI-rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    p.clear();
    p.background(255);
    let currX = p.camHeight*p.Ry; 
    p.translate(currX,0,0); 


    layer1.clear();
    layer1.push();
    for(let i = 0;i<(layer1.arrows.length);i++){
      layer1.push();
      layer1.translate(i*layer1.offset,0);
      let curr = layer1.arrows[i];
      curr.display(layer1,p.Rz);
      layer1.pop();
    }
    layer1.translate(layer1.width/2,0);
    layer1.pop();
    p.gaussianBlur(layer1,layer1Pass1,layer1Pass2,layer1.blurRadius);

    layer2.clear();
    layer2.push();
    for(let i = 0;i<(layer2.arrows.length);i++){
      layer2.push();
      layer2.translate(i*layer2.offset,0);
      let curr = layer2.arrows[i];
      curr.display(layer2,p.Rz);
      layer2.pop();
    }
    layer2.translate(layer2.width/2,0);
    layer2.pop();
    p.gaussianBlur(layer2,layer2Pass1,layer2Pass2,layer2.blurRadius);

    layer3.clear();
    layer3.push();
    for(let i = 0;i<(layer3.arrows.length);i++){
      layer3.push();
      layer3.translate(i*layer3.offset,0);
      let curr = layer3.arrows[i];
      curr.display(layer3,p.Rz);
      layer3.pop();
    }
    layer3.translate(layer3.width/2,0);
    layer3.pop();
    p.gaussianBlur(layer3,layer3Pass1,layer3Pass2,layer3.blurRadius);


    p.resetShader();

    p.push();
    p.imageMode(p.CENTER);
    p.blendMode(p.MULTIPLY);
    p.noStroke();
    p.translate(0,0,-800);
    let factor = (base,incr) => ((base+incr)/base);
    let f1 = factor(p.camHeight,800);
    p.image(layer3Pass2,0,0,layer3Pass2.width*f1,layer3Pass2.height*f1);
    p.translate(0,0,400);
    let f2 = factor(p.camHeight,400);
    p.image(layer2Pass2,0,0,layer2Pass2.width*f2,layer2Pass2.height*f2);
    p.translate(0,0,400);
    p.image(layer1Pass2,0,0);
    p.pop();
    moveCamera(p);
    // p.orbitControl();
  }

  p.gaussianBlur = function (source,pbo1,pbo2,radius){
    //iterate to get larger blur
    for(let i = 0;i<radius;i++){
      let spread = radius-i;
      //two pass gaussian blur
      pbo1.begin();
        p.clear();
        p.shader(p.blurShader);
        p.blurShader.setUniform('tex0', i==0?source:pbo2);
        p.blurShader.setUniform('direction', [0,spread]);
        p.blurShader.setUniform('iResolution', [pbo2.width,pbo2.height]);
        p.rect(0,0,pbo1.width,pbo1.height);
      pbo1.end();
      pbo2.begin();
        p.clear();
        p.shader(p.blurShader);
        p.blurShader.setUniform('tex0', pbo1);
        p.blurShader.setUniform('direction', [spread,0]);
        p.blurShader.setUniform('iResolution', [pbo1.width,pbo1.height]);
        p.rect(0,0,pbo2.width,pbo2.height);
      pbo2.end();
    }
  }
} 

let backCanvas = new p5(backSketch,'backCanvas');
// let foreCanvas = new p5(foreSketch,'drawCanvas');