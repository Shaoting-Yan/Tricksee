  function showUI(){
    shown = true;
    let gap = 40;
    heave = createSlider(0.1, 6, he, 0);
    heave.position(120, 500);
    heave.style('width', '200px');
    sway = createSlider(0.1, 6, sw, 0);
    sway.position(120, 500+gap);
    sway.style('width', '200px');
    surge = createSlider(0.1, 6, su, 0);
    surge.position(120, 500+gap*2);
    surge.style('width', '200px');
    damp = createSlider(1, 30, da, 0);
    damp.position(120, 500+gap*3);
    damp.style('width', '200px');
  
    p1 = createP('heave');
    p1.style('font-size', '20px');
    p1.position(330, 475);
    p2 = createP('sway');
    p2.style('font-size', '20px');
    p2.position(330, 475+gap);
    p3 = createP('surge');
    p3.style('font-size', '20px');
    p3.position(330, 475+gap*2);
    p4 = createP('damp');
    p4.style('font-size', '20px');
    p4.position(330, 475+gap*3);
    tweak.remove();
  }
