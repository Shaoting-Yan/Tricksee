class ArrowCurve{
  constructor(_prev,_start,_tangent,_curvature,_length,_thickness,_color){
    this.prev = new p5.Vector(0,_prev);
    this.start = new p5.Vector(0,_start);
    this.tangent = new p5.Vector(0,_tangent);
    this.curvature = new p5.Vector(0,_curvature);
    this.mid = new p5.Vector(0,(_length-_start)/2);
    this.offset = new p5.Vector(0,(_length-_start)/2);
    this.thickness = _thickness;
    this.color = _color;
    this.arrowSize = _thickness*2.5;
    this.arrowBody1 = new p5.Vector.fromAngle(Math.PI*0.75,this.arrowSize);
    this.arrowBody2 = new p5.Vector.fromAngle(Math.PI*1.25,this.arrowSize);
  }
  display(p,Rz){
    this.offset.setHeading(Rz);
    let arrowPoint = p5.Vector.add(this.mid,this.offset);
    p.push();
    p.noFill();
    p.stroke(this.color);
    p.strokeWeight(this.thickness);
    p.strokeCap(p.SQUARE);
    p.translate(-this.prev.x,-this.prev.y);
    p.line(this.prev.x,this.prev.y,this.start.x,this.start.y);
    p.beginShape();
      p.vertex(arrowPoint.x,arrowPoint.y);
      p.bezierVertex(this.curvature.x,this.curvature.y,this.tangent.x,this.tangent.y,
                        this.start.x,this.start.y);
    p.endShape();
    let tangent = p5.Vector.sub(arrowPoint,this.curvature);
    let heading = tangent.heading();
    p.translate(arrowPoint.x,arrowPoint.y);
    p.rotate(heading);
    p.strokeCap(p.PROJECT);
    p.line(0,0,this.arrowBody1.x,this.arrowBody1.y);
    p.line(0,0,this.arrowBody2.x,this.arrowBody2.y);
    p.pop();
  }
}