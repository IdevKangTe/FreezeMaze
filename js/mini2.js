const canvas = document.getElementById("mini2");
const ctx = canvas.getContext("2d");
//--------------------------------------------canvas

//캔버스 크기
canvas.width = 800;
canvas.height = window.innerHeight;

//캔버스 지우기
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//--------------------------------------------------선 지우기

// 캔버스 내에서만 동작하게
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //마우스 움직일때
    canvas.addEventListener("mouseup", stopPainting); //마우스 버튼 손뗄때
}

//------------------------------------sound


const leftBoxes = document.getElementsByClassName("leftBox");
const rightBoxes = document.getElementsByClassName("rightBox");


//------------------------------------캔버스 그림 그릴 범위

ctx.strokeStyle = 'white';
ctx.lineWidth = 16;
ctx.lineCap = 'round';
//------------------------------------------------canvas line

// const audio = new Audio();
// audio.src = "./mini1_electric_zap01.wav";



function playAudio() {
    const audio = new Audio("./audio/mini2/mini1_electric_zap01.wav");
    audio.play();
}// 전선 연결시 나는 소리

function wrong(){
    const wrong = new Audio("./audio/mini2/mini1_electric_incorrect.mp3");
    wrong.play();
}//전선 연결 실패시 나는 소리

let playing = false;

function bgsound(){
    const bg = new Audio("./audio/mini2/bgm_basic.wav");
    if(!playing){ //false
        bg.play();
        console.log("소리 반복");
        playing = true;
    }
}//배경음악



class Line {
    #startX
    #startY
    #leftValue
    #endX
    #endY
    #rightValue
    #isRight
    #lineColor
    constructor(color = "white") {
        this.#startX = 0;
        this.#startY = 0;
        this.#leftValue = 0;
        this.#endX = 0;
        this.#endY = 0;
        this.#rightValue = 0;
        this.#isRight = false;
        this.#lineColor = color;
    }

    setStart(x = 0, y = 0) {
        this.#startX = x;
        this.#startY = y;
    }

    setEnd(x = 0, y = 0) {
        this.#endX = x;
        this.#endY = y;
    }

    getPoint() {
        return {
            x1: this.#startX,
            y1: this.#startY,
            x2: this.#endX,
            y2: this.#endY,
        };
    }

    get leftValue() {
        return this.#leftValue;
    }

    setLeftValue(value) {
        this.#leftValue = value;
    }

    get rightValue() {
        return this.#rightValue;
    }

    setRightValue(value) {
        this.#rightValue = value;
    }

    get isRight() {
        return this.#isRight;
    }

    set isRight(value) {
        this.#isRight = value;
    }

    get color() {
        return this.#lineColor;
    }
}


let x1, y1, x2, y2;
let left = '';
let right = '';
let painting = false;
let lines = [
    new Line("red"),
    new Line("yellow"),
    new Line("blue"),
    new Line("green"),
];

// 초기화면
function init(isStart) {
    if (!isStart) {
        console.log("lines", lines);
        for (let i = 0; i < lines.length; i++) {
            if(lines[i].isRight) {
                let linePoint = lines[i].getPoint();
                drawLine(linePoint, lines[i].color);
            }
        }
    }
    else {
        lines = [
            new Line("red"),
            new Line("yellow"),
            new Line("blue"),
            new Line("green"),
        ];
    }
}

init(true);


// (왼쪽 박스 클릭 시) 페인팅 시작
function startPainting(e) {
    playAudio();
    e.preventDefault();
    left = e.target.value;
    // 선이 이어진 곳에서 다시 페인팅되지 않게.
    if (!lines[left-1].isRight) {
        painting = true;
        ctx.strokeStyle = lines[left - 1].color;
        lines[left-1].setLeftValue(left);
        lines[left-1].setStart(x1, y1);
    }
}

// 페인팅 중지
function stopPainting(e) {
    painting = false;
}

// 마우스 움직일 때
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    bgsound();
    if (!painting) { //그림 안그려질때
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        x1 = x;
        y1 = y;
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
        x2 = x;
        y2 = y;
    }
}



if (leftBoxes) {
    const leftBoxesArray = Array.from(leftBoxes);
    console.log(leftBoxesArray);
    leftBoxesArray.forEach((box) => {
        box.addEventListener("mousedown", startPainting);
        box.addEventListener("mouseover", stopPainting); // 마우스 뗐을 때 페인팅 중지
    });
}

// 오른쪽 박스 닿으면 페인팅 중지
function handleBoxCheck(e) {
    right = e.target.value;
    check(left, right);
    stopPainting();
    reset();
    init(false);
}

if (rightBoxes) {
    const rightBoxesArray = Array.from(rightBoxes);
    rightBoxesArray.forEach((box) => {
        box.addEventListener("mouseover", handleBoxCheck);
    })
}

function check(left, right) {
    if (left === right) { //짝이 맞으면
        lines[right-1].setRightValue(right);
        lines[right-1].setEnd(x2, y2);
        lines[right - 1].isRight = true;
    }
    else {
        wrong();
        init(true);
    }
    
}


function drawLine({x1, y1, x2, y2}, color) {
    // for (let i = 0; i < 8; i++) {
        // ctx.strokeStyle = `rgb(
        //     0,
        //     ${Math.floor(32.5 * i)},
        //     0)`;
        ctx.strokeStyle = color;
        ctx.beginPath();
        // ctx.moveTo(x1 + i, y1 + i);
        // ctx.lineTo(x2 + i, y2 + i);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    // }
}
//선그리기


const imgs = document.querySelectorAll("img");
Array.from(imgs).forEach((img) => {
    img.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.style.pointerEvents = "none";
    });
});
//버튼 이미지


//캔버스 사이즈 지정하는 함수
function resize() {
    canvas.height = window.innerHeight;
    init(true);
};

//윈도우 창 크기가 변할 때마다 resize 함수를 호출
window.addEventListener('resize', resize.bind(this));


canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect(); // 캔버스의 위치와 크기 정보를 가져옴
    var ix = event.clientX - rect.left; // 캔버스 내부에서의 x 좌표값 계산
    var iy = event.clientY - rect.top; // 캔버스 내부에서의 y 좌표값 계산
    console.log("x 좌표값: " + ix + ", y 좌표값: " + iy);
});
//-------------------좌표값 구하기 