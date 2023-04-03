const canvas = document.getElementById('mini3');
const ctx = canvas.getContext("2d");

// let window_width = window.innerWidth;
let window_height = window.innerHeight;

canvas.width = 800;
canvas.height = window_height;

const redlight = document.getElementById('redlight');
const greenlight = document.getElementById('greenlight');
const keySpace = document.getElementById('keySpace');

let theThing2 = document.querySelector("#thing2");
let theThing3 = document.querySelector("#thing3");
let theThing4 = document.querySelector("#thing4");
let theThing5 = document.querySelector("#thing5");
let theThing6 = document.querySelector("#thing6");
let theThing1 = document.querySelector("#thing1");

let requestAnimationFrame = window.requestAnimationFrame;

const startX = 1300;
let currentPos1 = 0;
let currentPos2 = 0;
let currentPos3 = 0;
let currentPos4 = 0;
let currentPos5 = 0;
let currentPos6 = 0;

let correctPipe = false;
let doTutorial = false;

const speed = 5;
let rhythmgame;


function animateKey() {
    keySpace.classList.add("pressed");
    setTimeout(() => {
        keySpace.classList.remove("pressed");
        setTimeout(() => {
            keySpace.classList.add("pressed");
            setTimeout(() => {
                keySpace.classList.remove("pressed");
                setTimeout(() => {
                    keySpace.style.display = "none";
                    doTutorial = true;

                }, 500);
            }, 200);
        }, 200);
    }, 200);
};


animateKey();


setTimeout(function () {

    theThing2.style.display = "block";
    theThing3.style.display = "block";
    theThing4.style.display = "block";
    theThing5.style.display = "block";
    theThing1.style.display = "block";
    // moveThing2();
    // moveThing3();
    // moveThing4();
    // moveThing();
    // moveThing5();
    // moveThing6();

}, 2500);

let lightOn = function (lightColor) {

    lightColor.style.display = "block";
    setTimeout(function () {
        lightColor.style.display = "none";
    }, 100);
    setTimeout(function () {
        lightColor.style.display = "block";
    }, 300);
    setTimeout(function () {
        lightColor.style.display = "none";
    }, 500);

};

function run() {
    animation6();
    animation1();
    animation2();
    animation3();
    animation4();
    animation5();
    rhythmgame = requestAnimationFrame(run);
}

run();


function animation1() {
    currentPos1 += speed;
    theThing1.style.left = currentPos1 + "px";
    if (Math.abs(currentPos1) >= startX) {
        currentPos1 = -startX;
    }
}


function animation2() {
    currentPos2 += speed;
    theThing2.style.left = currentPos2 + "px";

    if (Math.abs(currentPos2) >= startX) {
        currentPos2 = -startX;
    }
}

function animation3() {
    currentPos3 += speed;
    theThing3.style.left = currentPos3 + "px";

    if (Math.abs(currentPos3) >= startX) {
        currentPos3 = -startX;
    }
}

function animation4() {
    currentPos4 += 5;
    theThing4.style.left = currentPos4 + "px";

    if (Math.abs(currentPos4) >= startX) {
        currentPos4 = -startX;
    }
}

function animation5() {
    currentPos5 += speed;
    theThing5.style.left = currentPos5 + "px";
    if (Math.abs(currentPos5) >= startX) {
        currentPos5 = -startX;
    }
}


function animation6() {
    currentPos6 += 3;
    theThing6.style.left = currentPos6 + "px";
    if (Math.abs(currentPos6) >= 50) {
        currentPos6 = -10;
    }
}


let failure = false;


window.addEventListener("keydown", e => {
    const key = e.key;
    console.log(key);
    
    if (key==" ") {
        console.log(currentPos1);
       cancelAnimationFrame(rhythmgame);
        
       if (95 < currentPos1 && currentPos1 < 123) {
               correctPipe = true;
               console.log('clear');
               lightOn(greenlight);
       } else {
           if(doTutorial==true) {
               
               lightOn(redlight);
               setTimeout(function(){
               run();
               },700);
   
           }
        }
    
    
    }

    
})