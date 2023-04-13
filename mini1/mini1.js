//★프로그램 js(동작하는)

import Conveyor from "./conveyor.js";
import Background from "./background.js";
import Pipe from "./pipe.js";
import Light from "./light.js";
import Intro from "./intro.js";

export default class Game1 {
    #canvas;
    ctx;
    conveyor;
    background;
    beltmove;
    pipe;
    light;
    intro;
    rhythmgame;
    currentPos3;
    correctPipe;
    #isClear;

    // 음악
    correct;
    incorrect;
    stop;

    constructor() {
        this.#canvas = document.createElement("canvas");
        document.body.append(this.#canvas);
        //캔버스 크기 설정
        this.#canvas.width = window.innerWidth / 3;
        this.#canvas.height = window.innerHeight;

        //캔버스 설정1
        this.#canvas.tabIndex = 0;
        this.#canvas.focus();
        //캔버스 설정2
        this.#canvas.style.display = "block";
        this.#canvas.style.margin = "0 auto";
        this.#canvas.style.position = "absolute";
        this.#canvas.style.top = 0;
        this.#canvas.style.left = 0;
        this.#canvas.style.left = window.innerWidth / 3 + "px";

        this.ctx = this.#canvas.getContext("2d");

        this.#canvas.onkeydown = this.check.bind(this);


        this.conveyor = new Conveyor();
        this.pipe = new Pipe();
        this.background = new Background();
        this.light = new Light();
        this.intro = new Intro();
        this.intro.isVisible = function () { this.isVisible = false }.bind(this);

        this.isVisible = true;
        this.correctPipe = false;

        this.#isClear = null;
        this.clearDelay = 50;

        this.correct = new Audio("./sound/item/mini1/conveyor-Correct2.mp3");
        this.incorrect = new Audio("./sound/item/mini1/mini1-incorrect.mp3");
    }

    draw() {
        this.ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.conveyor.draw(this.ctx);
        this.pipe.draw(this.ctx);
        this.background.draw(this.ctx);
        this.light.draw(this.ctx);

        if (this.isVisible) { //콜백 조건들이 참일때만 
            this.intro.draw(this.ctx);//스페이스 이미지가 나타난다
        }
    }

    run() {
        this.draw();
        requestAnimationFrame(() => this.run());
        if (this.correctPipe) {
            this.clearDelay--;
            if (this.clearDelay != 0) return;
            this.#canvas.style.display = "none";
            this.#isClear(1);
        }
        this.conveyor.animation6();
        this.pipe.animation1();
        this.pipe.animation2();
        this.pipe.animation3();
        this.pipe.animation4();
        this.pipe.animation5();
        this.currentPos3 = this.pipe.currentPos3;
    }

    check(e) {
        let key = e.key;
        if (key == " ") { //스페이스
            console.log("정답판정");
            if (this.#canvas.clientWidth / 2 - 200 <= this.currentPos3 && this.currentPos3 <= this.#canvas.clientWidth / 2 - 100) { //맞았을때
                this.correct.volume = 1.0;
                this.correct.play();
                this.light.lightOn("green");
                this.correctPipe = true;

            } else {
                this.incorrect.play();
                this.light.lightOn("red");
            }
        }
    }

    set isClear(callback) {
        this.#isClear = callback;
    }



}