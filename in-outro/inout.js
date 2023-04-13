//inOutroCanvas가 메인으로 바뀌면서 얘는 필요 없습니다.

import Logo from './logo.js';
import Background from './background.js';

let canvas = document.getElementById("in-outro");
let ctx = canvas.getContext('2d');

let window_width = window.innerWidth;
let window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;


let logo = new Logo();
let bkImage = new Background();


let deltaTime = 0;
let prevTime = 0;

let animate = function () {
  // 프레임 처리
  let now = performance.now();

  deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
  prevTime = now;
  // 프레임 시간 계산
  
  bkImage.update(ctx);
  logo.update(ctx);
 
  requestAnimationFrame(animate);
};

animate();
