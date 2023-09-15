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