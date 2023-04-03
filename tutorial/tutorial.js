/**@type {HTMLCanvasElement} */

let canvas = document.getElementById("canvasTutorial");
let ctx = canvas.getContext('2d');

let window_width = window.innerWidth;
let window_Height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_Height;

const keyControl = document.getElementById("keyControl");
const keySpace = document.getElementById("keySpace");
const keyArrowLeft = document.getElementById("keyArrowLeft");
const keyArrowDown = document.getElementById("keyArrowDown");
const keyArrowRight = document.getElementById("keyArrowRight");
const keyArrowUp = document.getElementById("keyArrowUp");
const disappearTiming = 1000;

let useControlKey = false;
let useSpaceKey = false;

// preventDefault(); 이거는 잘못된 식이던데, 필요하다면 defalut prevent 스크롤 이동 안 되게 막아두기

document.addEventListener("keyup", function(e) {
    console.log(e);
    const key = document.getElementById(`key`+e.key);
    if(key) key.classList.remove("pressed");
    
});

document.addEventListener("keyup", function(e) {
    if (e.code === "Space") {
      keySpace.classList.remove("pressed");
    }
  }); 


  document.addEventListener("keydown", function(e) {
    
    if (e.code === "Space") {
        keySpace.classList.add("pressed");
        setTimeout(function() {
            keySpace.style.opacity = 0;
        }, disappearTiming);
    }
  });

  
  document.addEventListener("keydown", function(event) {
    
      if (event.code === "ArrowUp") {
        keyArrowUp.classList.add("pressed");
        // ctrl + up 모션을 취한 뒤에 없어지는 걸로
        if(useControlKey) {
            setTimeout(function() {
                keyArrowUp.style.opacity = 0;
            }, disappearTiming);
        }
    }
});

 document.addEventListener("keydown", function(event) {
    
    if (event.code === "ArrowRight") {
        keyArrowRight.classList.add("pressed");
        setTimeout(function() {
            keyArrowRight.style.opacity = 0;
         }, disappearTiming);
    }
});

    
document.addEventListener("keydown", function(event) {
    
    if (event.code === "ArrowLeft") {
        keyArrowLeft.classList.add("pressed");
        setTimeout(function() {
            keyArrowLeft.style.opacity = 0;
        }, disappearTiming);
    }
});


document.addEventListener("keydown", function(event) {
    
    if(event.key === "Control") {
        useControlKey = true;
        keyControl.classList.add("pressed");
        setTimeout(() => keyControl.style.opacity = "0", disappearTiming); // 1초 뒤에 사라지게 함
    }
});



