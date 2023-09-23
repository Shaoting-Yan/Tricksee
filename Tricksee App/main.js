getMotion();
const allVisuals = [arrowCurtain,arrowMatrix,dotMatrix,strokes];
let prevVisual = allVisuals[0];
document.querySelector(".top h2").innerText = prevVisual.name;

const visuals = new Swiper('#visuals > .swiper', {
    direction: 'horizontal',
    loop: false,
    on: {
        init: function () {
          allVisuals[0].show();
        },
      },
  });

visuals.on('transitionEnd',function (){
  if(visuals.activeIndex<allVisuals.length){
    let currVisual = allVisuals[visuals.activeIndex];
    if(prevVisual != currVisual){
      prevVisual.remove();
      document.querySelector(".top h2").innerText = currVisual.name;
      currVisual.show();
      prevVisual = currVisual;
      thumbnails.slides.forEach((e)=>{e.getElementsByTagName('img')[0].style.opacity="50%"});
      thumbnails.slides[visuals.activeIndex].getElementsByTagName('img')[0].style.opacity="100%";
    }
  }
});

const thumbnails = new Swiper('#carousel > .swiper', {
  direction: 'horizontal',
  slidesPerView: 4,
  loop: false,
  slideToClickedSlide:true,
  on: {
    },
});

thumbnails.on('click',function (){
  if(thumbnails.clickedIndex<allVisuals.length){
    thumbnails.slides.forEach((e)=>{e.getElementsByTagName('img')[0].style.opacity="50%"});
    thumbnails.clickedSlide.getElementsByTagName('img')[0].style.opacity="100%";
    visuals.slideTo(thumbnails.clickedIndex);
  }
});

const bottomSheet = interact('.bottom-sheet');
bottomSheet.draggable({
    startAxis:'y',
    listeners: {
      move (event) {      
        document.querySelector(".bottom-sheet-container").style.zIndex = "10";          
        const value = event.pageY-(window.innerHeight-202);
        if(value<135){
          document.querySelector(".bottom-sheet-container").style.paddingTop = value.toString()+"px";
        }
      },
      end (event){
        const pad = document.querySelector(".bottom-sheet-container").style.paddingTop;
        const parsed = parseFloat(pad.slice(0,-2));
        if( parsed > 100){
          document.querySelector(".bottom-sheet-container").style.paddingTop = "130px";
          document.getElementById("arrow").style.transform = "rotate(0deg)";
          document.querySelector(".bottom-sheet-container").style.zIndex = "8";     
        }else{
          document.querySelector(".bottom-sheet-container").style.paddingTop = "0px"
          document.getElementById("arrow").style.transform = "rotate(180deg)";
        }
      }
    }
  })

const CTA = document.getElementById("CTA");

CTA.addEventListener('click',toggleBreath);

const breath = document.getElementById("breath");

breath.addEventListener('click',toggleBreath);

let toggled = false;

const banner = document.querySelector('.banner');
let temp;
let prevText = "Tap to stop Tap to stop Tap to stop"
let currText = "Start breath Start breath Start breath";
banner.textContent = currText;

function toggleBreath(e){
  document.getElementById('breath').classList.toggle("start");
  document.getElementById('CTA').classList.toggle("none");
  temp = prevText;
  banner.textContent = temp;
  prevText = currText;
  currText = temp;
}

// window.addEventListener("deviceorientation", (e)=>{console.log(e)});
