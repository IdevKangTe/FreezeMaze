let canvas = document.getElementById("canvasIntro");
let ctx = canvas.getContext('2d');

let window_width = window.innerWidth;
let window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;

const logo = document.getElementById("logo");
logo.style.display = "none";
const logoze = document.getElementById("logoze");
logoze.style.display = "none";
const backgroundImg = new Image();
backgroundImg.src = 'logo-bg.jpg';
backgroundImg.style.display = "none";

const logozeWidth = 190;
const logozeHeight = 160;
//배경화면이 fade in하는 속도
let stepBg = 0.008;
// 로고가 fade in/out되는 속도
let step = 0.008;
let backgroundOpacity = 0;
let logoOpacity = 0;
const logoStartX = window_width / 2 - logo.width / 2;
const logoStartY = window_height / 2 - logo.height / 2;
const logozeX = logoStartX + 420;
const logozeY = logoStartY + 47;

let startAnimate1;
let startAnimate2;
let logozeOpacity = 1;
let startAnimate3;

let playIntro = false;
let playOutro = false;
// 다른 조작에서 playIntro를 true로 변경 시 아래의 모션이 동작됩니다.

if (playIntro) {

  animate1();
  //배경이 먼저 그려지고 그 뒤 로고가 그려집니다.
  setTimeout(() => {
  animate2();
  }, 3000);

  setTimeout(() => {
    cancelAnimationFrame(startAnimate1);
    cancelAnimationFrame(startAnimate2);
  }, 3000);

}

// 다른 조작에서 playOutro를 true로 변경 시 아래의 모션이 동작됩니다.
if (playOutro) {

  //화면이 
  animate1();
  animate2();

  setTimeout(() => {
    animate3();
  }, 4000);
  setTimeout(() => {
    cancelAnimationFrame(startAnimate3);
    logoze.style.display = "none";
  }, 100000);

}

{
  // 인아웃트로의 예시 화면입니다.
  
  animate1();

  setTimeout(() => {
    animate2();
  },3000);

  setTimeout(() => {
    animate3();
  }, 7000);

}




function drawBackground() {
  ctx.clearRect(0, 0, window_width, window_height);
  ctx.globalAlpha = backgroundOpacity;
  ctx.drawImage(backgroundImg, 0, 0, window.innerWidth, window.innerHeight);
}


function animate1() {
  if (backgroundOpacity < 1) {
    backgroundOpacity += stepBg;
  }

  drawBackground();

  startAnimate1 = requestAnimationFrame(animate1);
}


function animate2() {
  if (logoOpacity < 1) {
    logoOpacity += stepBg;
  }

  drawBackground();

  ctx.save(); // 현재 canvas context의 상태를 저장합니다.
  ctx.globalAlpha = logoOpacity;
  ctx.drawImage(logo, logoStartX, logoStartY, logo.width, logo.height);
  ctx.drawImage(logoze, logozeX, logozeY, logozeWidth, logozeHeight);
  ctx.restore(); // canvas context의 상태를 저장한 시점으로 되돌립니다.

  startAnimate2 = requestAnimationFrame(animate2);
}


function animate3() {
  if (Math.abs(logozeOpacity) >= 0.001) {
    logozeOpacity -= step;
    console.log(logozeOpacity);
  }

  drawBackground();
  ctx.drawImage(logo, window_width / 2 - logo.width / 2, window_height / 2 - logo.height / 2, logo.width, logo.height);

  ctx.save(); // 현재 canvas context의 상태를 저장합니다.
  ctx.globalAlpha = logozeOpacity;
  if (Math.abs(logozeOpacity) >= 0.002) {
    ctx.drawImage(logoze, logozeX, logozeY, logozeWidth, logozeHeight);
  }
  ctx.restore(); // canvas context의 상태를 저장한 시점으로 되돌립니다.

  startAnimate3 = requestAnimationFrame(animate3);
}









