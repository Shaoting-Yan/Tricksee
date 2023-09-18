getMotion();
var backSketch = function(p){
  //motion parameter
  p.he = 3;
  p.sw = 3;
  p.su = 2;
  p.da = 20;
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
    layer1 = p.createFramebuffer({ depth: false });//for some weird reason has to disable depth
    layer1.resize(p.viewSize,p.viewSize);
    layer1Pass1 = p.createFramebuffer({ depth: false });
    layer1Pass1.resize(layer1.width,layer1.height);
    layer1Pass2 = p.createFramebuffer({ depth: false });
    layer1Pass2.resize(layer1.width,layer1.height);
    layer1.blurRadius = 0.1;//can not set this to zero
    layer1.offset = 175;
    layer1.space = 4;
    layer1.size = p.int(layer1.width/layer1.offset);
    layer1.begin();
      p.clear();
      p.translate(-layer1.width/2,-layer1.height/2);
      for(let i = 0;i<layer1.size;i++){
        for(let j = 0;j<layer1.size;j++){
          p.push();
          p.noStroke();
          p.fill('#DE3D83');
          p.translate(i*layer1.offset,j*layer1.offset);
          p.circle(0,0,75);
          p.pop();
        }
      }
    layer1.end();
    
    //layer 2
    layer2 = p.createFramebuffer({ depth: false });//for some weird reason has to disable depth
    layer2.resize(p.viewSize,p.viewSize);
    layer2Pass1 = p.createFramebuffer({ depth: false });
    layer2Pass1.resize(layer2.width,layer2.height);
    layer2Pass2 = p.createFramebuffer({ depth: false });
    layer2Pass2.resize(layer2.width,layer2.height);
    layer2.blurRadius = 3;//can not set this to zero
    layer2.offset = 175;
    layer2.space = 4;
    layer2.size = p.int(layer2.width/layer2.offset);
    layer2.begin();
      p.clear();
      p.translate(-layer2.width/2,-layer2.height/2);
      for(let i = 0;i<layer2.size;i++){
        for(let j = 0;j<layer2.size;j++){
          p.push();
          p.noStroke();
          p.fill('#2677BB');
          p.translate(i*layer2.offset,j*layer2.offset);
          p.circle(0,0,75);
          p.pop();
        }
      }
    layer2.end();

    // //layer 3
    // layer3 = p.createFramebuffer({ depth: false });//for some weird reason has to disable depth
    // layer3.resize(p.viewSize,p.viewSize);
    // layer3Pass1 = p.createFramebuffer({ depth: false });
    // layer3Pass1.resize(layer3.width,layer3.height);
    // layer3Pass2 = p.createFramebuffer({ depth: false });
    // layer3Pass2.resize(layer3.width,layer3.height);
    // layer3.blurRadius = 2;//can not set this to zero
    // layer3.offset = 200;
    // layer3.space = 4;
    // layer3.size = p.int(layer3.width/layer3.offset);
    // layer3.begin();
    //   p.clear();
    //   p.translate(-layer3.width/2,-layer3.height/2);
    //   for(let i = 0;i<layer3.size;i++){
    //     for(let j = 0;j<layer3.size;j++){
    //       p.push();
    //       p.noStroke();
    //       p.fill('#00B8B8');
    //       p.translate(i*layer3.offset,j*layer3.offset);
    //       p.circle(0,0,30);
    //       p.pop();
    //     }
    //   }
    // layer3.end();
  }
  p.draw = function(){
    let rotation = getEulerAngles(getRotationMatrix(p.rotationZ,p.rotationX,p.rotationY));
    p.Rz = rotation[0];
    p.Ry = rotation[2];
    p.Rx = rotation[1];  
    p.clear();
    p.background(255);
    moveCamera(p);
    currVector = p.createVector(p.accX,p.accY);//from moveCamera function

    moveObject(p);

    p.gaussianBlur(layer1,layer1Pass1,layer1Pass2,layer1.blurRadius);
    p.gaussianBlur(layer2,layer2Pass1,layer2Pass2,layer2.blurRadius);
    // p.gaussianBlur(layer3,layer3Pass1,layer3Pass2,layer3.blurRadius);

    p.resetShader();
    p.push();
    p.imageMode(p.CENTER);
    p.blendMode(p.MULTIPLY);
    p.translate(0,0,-100);
    p.image(layer2Pass2,currVector.x+25,currVector.y+25);
    p.translate(0,0,100);
    p.image(layer1Pass2,0,0);
    // p.image(layer3Pass2,0,0);
    p.pop();
  }

  p.gaussianBlur = function (source,pbo1,pbo2,radius){
    //iterate to get larger blur
    for(let i = 0;i<radius;i++){
      let spread = radius-i;
      //two pass gaussian blur
      pbo1.begin();
        p.clear();
        p.noStroke();
        p.shader(p.blurShader);
        p.blurShader.setUniform('tex0', i==0?source:pbo2);
        p.blurShader.setUniform('direction', [0,spread]);
        p.blurShader.setUniform('iResolution', [pbo2.width,pbo2.height]);
        p.rect(0,0,pbo1.width,pbo1.height);
      pbo1.end();
      pbo2.begin();
        p.clear();
        p.noStroke();
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