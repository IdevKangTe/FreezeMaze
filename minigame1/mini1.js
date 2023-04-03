/**@type {HTMLCanvasElement} */

let canvas = document.getElementById("mini1");
let ctx = canvas.getContext("2d");

let window_width = window.innerWidth;
let window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;

// 타일을 맞춘 걸 count하여 도합 4가 되었을 때 finish를 콘솔에 출력
let isDKeyCorrect = false; 
let isCKeyCorrect = false;
let isSKeyCorrect = false;
let isLKeyCorrect = false;
let correctCount = 0;

// 이미지 생성
const imageWidth = 75;
const imageHeight = 75;
// 정답 이미지 생성
const tileImageWidth = 82;
const tileImageHeight = 82;

const xRange = 260;
const xRangeBox = window_width/2-200;
const yRange = 90;
const yRangeBox = 475;

let xpos = {x1:(Math.floor(Math.random()*xRange))+xRangeBox,x2:(Math.floor(Math.random()*xRange))+xRangeBox,x3:(Math.floor(Math.random()*xRange))+xRangeBox,x4:(Math.floor(Math.random()*xRange))+xRangeBox,x5:(Math.floor(Math.random()*xRange))+xRangeBox,x6:(Math.floor(Math.random()*xRange))+xRangeBox,x7:(Math.floor(Math.random()*xRange))+xRangeBox,x8:(Math.floor(Math.random()*xRange))+xRangeBox,x9:(Math.floor(Math.random()*xRange))+xRangeBox,x10:(Math.floor(Math.random()*xRange))+xRangeBox,x11:(Math.floor(Math.random()*xRange))+xRangeBox};
let ypos = {y1:(Math.floor(Math.random()*yRange))+yRangeBox,y2:(Math.floor(Math.random()*yRange))+yRangeBox,y3:(Math.floor(Math.random()*yRange))+yRangeBox,y4:(Math.floor(Math.random()*yRange))+yRangeBox,y5:(Math.floor(Math.random()*yRange))+yRangeBox,y6:(Math.floor(Math.random()*yRange))+yRangeBox,y7:(Math.floor(Math.random()*yRange))+yRangeBox,y8:(Math.floor(Math.random()*yRange))+yRangeBox,y9:(Math.floor(Math.random()*yRange))+yRangeBox,y10:(Math.floor(Math.random()*yRange))+yRangeBox,y11:(Math.floor(Math.random()*yRange))+yRangeBox};

const bgImg = new Image();
bgImg.src="bgimg.jpg";


const image1 = new Image();
image1.src = "1.png";
const image2 = new Image();
image2.src = "2.png";
const image3 = new Image();
image3.src = "3.png";
const image4 = new Image();
image4.src = "4.png";
const image5 = new Image();
image5.src = "5.png";
const image6 = new Image();
image6.src = "6.png";
const image7 = new Image();
image7.src = "7.png";
const image8 = new Image();
image8.src = "8.png";
const image9 = new Image();
image9.src = "9.png";
const image10 = new Image();
image10.src = "10.png";
const image11 = new Image();
image11.src = "11.png";
const fixedImage = new Image();
fixedImage.src = "fixed-image.png";
const fixedImage2 = new Image();
fixedImage2.src = "fixed-image.png";
const fixedImage3 = new Image();
fixedImage3.src = "fixed-image.png";
const fixedImage4 = new Image();
fixedImage4.src = "fixed-image.png";


let imageX = xpos.x1;
let imageY = ypos.y1;
let image2X = xpos.x2;
let image2Y = ypos.y2;
let image3X = xpos.x2;
let image3Y = ypos.y3;
let image4X = xpos.x4;
let image4Y = ypos.y4;
let image5X  = xpos.x5;
let image5Y = ypos.y5;
let image6X = xpos.x6;
let image6Y = ypos.y6;
let image7X = xpos.x7;
let image7Y = ypos.y7;
let image8X = xpos.x8;
let image8Y = ypos.y8;
let image9X = xpos.x9;
let image9Y = ypos.y9;
let image10X = xpos.x10;
let image10Y = ypos.y10;
let image11X = xpos.x11;
let image11Y = ypos.y11;

// 맞았을 때 타일이 나타날 공간
const fixedImageX = 657;
const fixedImageY = 168;
const fixedImage2X = 753;
const fixedImage2Y = 172;
const fixedImage3X = 657;
const fixedImage3Y = 270;
const fixedImage4X = 756;
const fixedImage4Y = 268;


// 배경 이미지 로드
bgImg.addEventListener('load', function () {
  ctx.drawImage(bgImg, window_width/2-250, 0 , 450, window_height);
})
//바닥에 깔릴 정답 이미지들
fixedImage.addEventListener('load', function () {
  ctx.drawImage(fixedImage, fixedImageX, fixedImageY, tileImageWidth, tileImageHeight);
})
fixedImage2.addEventListener('load', function () {
  ctx.drawImage(fixedImage2, fixedImage2X, fixedImage2Y, tileImageWidth, tileImageHeight);
})
fixedImage3.addEventListener('load', function () {
  ctx.drawImage(fixedImage3, fixedImage3X, fixedImage3Y, tileImageWidth, tileImageHeight);
})
fixedImage4.addEventListener('load', function () {
  ctx.drawImage(fixedImage4, fixedImage4X, fixedImage4Y, tileImageWidth, tileImageHeight);
})



image1.addEventListener('load', function () {
  ctx.drawImage(image1, imageX, imageY, imageWidth, imageHeight);
});
image2.addEventListener('load', function () {
  ctx.drawImage(image2, image2X, image2Y, imageWidth, imageHeight);
})
image3.addEventListener('load', function () {
  ctx.drawImage(image3, image3X, image3Y, imageWidth, imageHeight);
})
image4.addEventListener('load', function () {
  ctx.drawImage(image4, image4X, image4Y, imageWidth, imageHeight);
})
image5.addEventListener('load', function () {
  ctx.drawImage(image5, image5X, image5Y, imageWidth, imageHeight);
})
image5.addEventListener('load', function () {
  ctx.drawImage(image5, image5X, image5Y, imageWidth, imageHeight);
})
image6.addEventListener('load', function () {
  ctx.drawImage(image6, image6X, image6Y, imageWidth, imageHeight);
})
image7.addEventListener('load', function () {
  ctx.drawImage(image7, image7X, image7Y, imageWidth, imageHeight);
})
image8.addEventListener('load', function () {
  ctx.drawImage(image8, image8X, image8Y, imageWidth, imageHeight);
})
image9.addEventListener('load', function () {
  ctx.drawImage(image9, image9X, image9Y, imageWidth, imageHeight);
})
image10.addEventListener('load', function () {
  ctx.drawImage(image10, image10X, image10Y, imageWidth, imageHeight);
})
image11.addEventListener('load', function () {
  ctx.drawImage(image11, image11X, image11Y, imageWidth, imageHeight);
})

//열쇠 이미지들


let isDragging = false;
let startX;
let startY;
let currentShape;


function isMouseInShape(x, y, shape) {
  let shapeLeft = shape.x;
  let shapeRight = shape.x + shape.width;
  let shapeTop = shape.y;
  let shapeBottom = shape.y + shape.height;
  return (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom);
}
function mouseDown(event) {
  event.preventDefault();
  startX = parseInt(event.clientX);
  startY = parseInt(event.clientY);
  
  const size = 65;

  const images = [
    {x: imageX, y: imageY, width: 100, height: 100, shape: image1},
    {x: image2X, y: image2Y, width: size, height: size, shape: image2},
    {x: image3X, y: image3Y, width: size, height: size, shape: image3},
    {x: image4X, y: image4Y, width: size, height: size, shape: image4},
    {x: image5X, y: image5Y, width: size, height: size, shape: image5},
    {x: image6X, y: image6Y, width: size, height: size, shape: image6},
    {x: image7X, y: image7Y, width: size, height: size, shape: image7},
    {x: image8X, y: image8Y, width: size, height: size, shape: image8},
    {x: image9X, y: image9Y, width: size, height: size, shape: image9},
    {x: image10X, y: image10Y, width: size, height: size, shape: image10},
    {x: image11X, y: image11Y, width: size, height: size, shape: image11},
  ];

  for (const image of images) {
    if (isMouseInShape(startX, startY, image)) {
      isDragging = true;
      currentShape = image.shape;
      playAudio();
      break;
    }
  }
}



// 키를 잡을 때 나는 소리
function playAudio() {
  const audio = new Audio("mini2_key_jangle.wav");
  audio.volume = 0.2;
  audio.play();
}

function playCorrectAudio() {
  const correctAudio = new Audio("mini2_key_turning01.wav");
  correctAudio.play();
}

function playWrongAudio() {
  const wrongAudio = new Audio("mini2_key_putdown.wav");
  wrongAudio.volume = 0.7;
  wrongAudio.play();
}


let isBgmPlay = false;


function bgmAudio() {

  if(!isBgmPlay){
  const bgmAudio = new Audio("bgm_basic.wav");
  bgmAudio.play();
  bgmAudio.volume = 0.35;
  isBgmPlay = true;

  }
  
}






function mouseMove(event) {

  let mouseX = parseInt(event.clientX);
  let mouseY = parseInt(event.clientY);
  // let rect = canvas.getBoundingClientRect();
  // let canvasX = mouseX - rect.left;
  // let canvasY = mouseY - rect.top;
  
  if (isDragging) {
    bgmAudio();
    let dx = mouseX - startX;
    let dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    if (currentShape === image1) {
      imageX += dx;
      imageY += dy;
    } else if (currentShape === image2) {
      image2X += dx;
      image2Y += dy;
    }else if (currentShape === image3) {
      image3X += dx;
      image3Y += dy;
    }else if (currentShape === image4) {
      image4X += dx;
      image4Y += dy;
    }else if (currentShape === image5) {
      image5X += dx;
      image5Y += dy;
    }else if (currentShape === image6) {
      image6X += dx;
      image6Y += dy;
    }else if (currentShape === image7) {
      image7X += dx;
      image7Y += dy;
    }else if (currentShape === image8) {
      image8X += dx;
      image8Y += dy;
    }else if (currentShape === image9) {
      image9X += dx;
      image9Y += dy;
    }else if (currentShape === image10) {
      image10X += dx;
      image10Y += dy;
    }else if (currentShape === image11) {
      image11X += dx;
      image11Y += dy;
    }
    
    drawCanvas();
  }
}

function mouseUp(event) {
  isDragging = false;
  
  
  // 다이아몬드 이미지 위에 드랍한 경우
  if (
    event.clientX - canvas.offsetLeft > fixedImageX &&
    event.clientX - canvas.offsetLeft < fixedImageX + imageWidth &&
    event.clientY - canvas.offsetTop > fixedImageY &&
    event.clientY - canvas.offsetTop < fixedImageY + imageHeight
  ) {
    // 정답 이미지를 드랍한 경우
    if (currentShape === image1) {
      image1.src = "fixed-image.png";
      setTimeout(function(){
        fixedImage.src = "mini3-dia.png";
      },500);
      // fixedImage.src = "mini3-dia.png";
      isDKeyCorrect = true;
      correctCount += 1;
      playCorrectAudio();
    }

    else if (currentShape === image2) {
      image2X = xpos.x2;
      image2Y = ypos.y2;
      playWrongAudio();
    }else if (currentShape === image3) {
      image3X = xpos.x3;
      image3Y = ypos.y3;
      playWrongAudio();
    }else if (currentShape === image4) {
      image4X = xpos.x4;
      image4Y = ypos.y4;
      playWrongAudio();
    }else if (currentShape === image5) {
      image5X = xpos.x5;
      image5Y = ypos.y5;
      playWrongAudio();
    }else if (currentShape === image6) {
      image6X = xpos.x6;
      image6Y = ypos.y6;
      playWrongAudio();
    }else if (currentShape === image7) {
      image7X = xpos.x7;
      image7Y = ypos.y7;
      playWrongAudio();
    }else if (currentShape === image8) {
      image8X = xpos.x8;
      image8Y = ypos.y8;
      playWrongAudio();
    }else if (currentShape === image9) {
      image9X = xpos.x9;
      image9Y = ypos.y9;
      playWrongAudio();
    }else if (currentShape === image10) {
      image10X = xpos.x10;
      image10Y = ypos.y10;
      playWrongAudio();
    }else if (currentShape === image11) {
      image11X = xpos.x11;
      image11Y = ypos.y11;
      playWrongAudio();
    }
  }

  // 클로버 이미지 위에 드랍한 경우
  else if (
    event.clientX - canvas.offsetLeft > fixedImage2X &&
    event.clientX - canvas.offsetLeft < fixedImage2X + imageWidth &&
    event.clientY - canvas.offsetTop > fixedImage2Y &&
    event.clientY - canvas.offsetTop < fixedImage2Y + imageHeight
  ) {
    // 정답 이미지를 드랍한 경우
    if (currentShape === image11) {
      image11.src = "fixed-image.png";
      // setTimeout(function(){
      //   fixedImage2.src = "mini3-clo.png";
      // },500);
      fixedImage2.src = "mini3-clo.png";
      isCKeyCorrect = true;
      correctCount += 1;
      playCorrectAudio();
    }

    else if (currentShape === image1) {
      imageX = xpos.x1;
      imageY = ypos.y1;
      playWrongAudio();
    }else if (currentShape === image2) {
      image2X = xpos.x2;
      image2Y = ypos.y2;
      playWrongAudio();
    }else if (currentShape === image3) {
      image3X = xpos.x3;
      image3Y = ypos.y3;
      playWrongAudio();
    }else if (currentShape === image4) {
      image4X = xpos.x4;
      image4Y = ypos.y4;
      playWrongAudio();
    }else if (currentShape === image5) {
      image5X = xpos.x5;
      image5Y = ypos.y5;
      playWrongAudio();
    }else if (currentShape === image6) {
      image6X = xpos.x6;
      image6Y = ypos.y6;
      playWrongAudio();
    }else if (currentShape === image7) {
      image7X = xpos.x7;
      image7Y = ypos.y7;
      playWrongAudio();
    }else if (currentShape === image8) {
      image8X = xpos.x8;
      image8Y = ypos.y8;
      playWrongAudio();
    }else if (currentShape === image9) {
      image9X = xpos.x9;
      image9Y = ypos.y9;
      playWrongAudio();
    }else if (currentShape === image10) {
      image10X = xpos.x10;
      image10Y = ypos.y10;
      playWrongAudio();
    }

  }

  // 스페이드 이미지 위에 드랍한 경우
  else if (
    event.clientX - canvas.offsetLeft > fixedImage3X &&
    event.clientX - canvas.offsetLeft < fixedImage3X + imageWidth &&
    event.clientY - canvas.offsetTop > fixedImage3Y &&
    event.clientY - canvas.offsetTop < fixedImage3Y + imageHeight
  ) {
    // 정답 이미지를 드랍한 경우
    if (currentShape === image5) {
      image5.src = "fixed-image.png";
      // setTimeout(function(){
      //   fixedImage3.src = "mini3-spade.png";
      // },500);
      fixedImage3.src = "mini3-spade.png";
      isSKeyCorrect = true;
      correctCount += 1;
      playCorrectAudio();
    }

    else if (currentShape === image1) {
      imageX = xpos.x1;
      imageY = ypos.y1;
      playWrongAudio();
    }else if (currentShape === image2) {
      image2X = xpos.x2;
      image2Y = ypos.y2;
      playWrongAudio();
    }else if (currentShape === image3) {
      image3X = xpos.x3;
      image3Y = ypos.y3;
      playWrongAudio();
    }else if (currentShape === image4) {
      image4X = xpos.x4;
      image4Y = ypos.y4;
      playWrongAudio();
    }else if (currentShape === image6) {
      image6X = xpos.x6;
      image6Y = ypos.y6;
      playWrongAudio();
    }else if (currentShape === image7) {
      image7X = xpos.x7;
      image7Y = ypos.y7;
      playWrongAudio();
    }else if (currentShape === image8) {
      image8X = xpos.x8;
      image8Y = ypos.y8;
      playWrongAudio();
    }else if (currentShape === image9) {
      image9X = xpos.x9;
      image9Y = ypos.y9;
      playWrongAudio();
    }else if (currentShape === image10) {
      image10X = xpos.x10;
      image10Y = ypos.y10;
      playWrongAudio();
    }else if (currentShape === image11) {
      image11X = xpos.x11;
      image11Y = ypos.y11;
      playWrongAudio();
    }

  }

  // 하트 이미지 위에 드랍한 경우
  else if (
    event.clientX - canvas.offsetLeft > fixedImage4X &&
    event.clientX - canvas.offsetLeft < fixedImage4X + imageWidth &&
    event.clientY - canvas.offsetTop > fixedImage4Y &&
    event.clientY - canvas.offsetTop < fixedImage4Y + imageHeight
  ) {
    // 정답 이미지를 드랍한 경우
    if (currentShape === image9) {
      image9.src = "fixed-image.png";
      // setTimeout(function(){
      //   fixedImage4.src = "mini3-heart.png";
      // },500);
      fixedImage4.src = "mini3-heart.png";
      isLKeyCorrect = true;
      correctCount += 1;
      playCorrectAudio();
    }

    else if (currentShape === image1) {
      imageX = xpos.x1;
      imageY = ypos.y1;
      playWrongAudio();
    }else if (currentShape === image2) {
      image2X = xpos.x2;
      image2Y = ypos.y2;
      playWrongAudio();
    }else if (currentShape === image3) {
      image3X = xpos.x3;
      image3Y = ypos.y3;
      playWrongAudio();
    }else if (currentShape === image4) {
      image4X = xpos.x4;
      image4Y = ypos.y4;
      playWrongAudio();
    }else if (currentShape === image5) {
      image5X = xpos.x5;
      image5Y = ypos.y5;
      playWrongAudio();
    }else if (currentShape === image6) {
      image6X = xpos.x6;
      image6Y = ypos.y6;
      playWrongAudio();
    }else if (currentShape === image7) {
      image7X = xpos.x7;
      image7Y = ypos.y7;
      playWrongAudio();
    }else if (currentShape === image8) {
      image8X = xpos.x8;
      image8Y = ypos.y8;
      playWrongAudio();
    }else if (currentShape === image10) {
      image10X = xpos.x10;
      image10Y = ypos.y10;
      playWrongAudio();
    }else if (currentShape === image11) {
      image11X = xpos.x11;
      image11Y = ypos.y11;
      playWrongAudio();
    }

  }

  // 드랍과 동시에 카운팅
  console.log(correctCount);

  let fin = function () {
    if(correctCount == 4 && isDKeyCorrect == true && isCKeyCorrect == true && isLKeyCorrect==true && isSKeyCorrect ==true)
    console.log("finish");
  }
  fin();


}



//mouseOut은 마우스를 element 바깥에서 안으로 옮길 때 발생 - 아무것도 발생 안 함
  function mouseOut(event) {
    isDragging = false;
    // 
  }


  function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1f1f1f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bgImg, window_width/2-250, 0 , 450, window_height);
    ctx.drawImage(fixedImage, fixedImageX, fixedImageY, tileImageWidth, tileImageHeight);
    ctx.drawImage(fixedImage2, fixedImage2X, fixedImage2Y, tileImageWidth, tileImageHeight);
    ctx.drawImage(fixedImage3, fixedImage3X, fixedImage3Y, tileImageWidth, tileImageHeight);
    ctx.drawImage(fixedImage4, fixedImage4X, fixedImage4Y, tileImageWidth, tileImageHeight);
  
    ctx.drawImage(image2, image2X, image2Y, imageWidth, imageHeight);
    ctx.drawImage(image3, image3X, image3Y, imageWidth, imageHeight);
    ctx.drawImage(image4, image4X, image4Y, imageWidth, imageHeight);
    ctx.drawImage(image6, image6X, image6Y, imageWidth, imageHeight);
    ctx.drawImage(image7, image7X, image7Y, imageWidth, imageHeight);
    ctx.drawImage(image8, image8X, image8Y, imageWidth, imageHeight);
    ctx.drawImage(image10, image10X, image10Y, imageWidth, imageHeight);
    
    

    if(isDKeyCorrect==false) {
    ctx.drawImage(image1, imageX, imageY, imageWidth, imageHeight);
    }

    if(isCKeyCorrect==false) {
    ctx.drawImage(image11, image11X, image11Y, imageWidth, imageHeight);
    }

    if(isSKeyCorrect==false) {
    ctx.drawImage(image5, image5X, image5Y, imageWidth, imageHeight);
    }

    if(isLKeyCorrect==false) {
    ctx.drawImage(image9, image9X, image9Y, imageWidth, imageHeight);
    }
  }



  
  canvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mouseup', mouseUp);
  canvas.addEventListener('mouseout', mouseOut);
