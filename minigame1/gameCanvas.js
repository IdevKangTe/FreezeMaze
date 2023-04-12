import Background from "./background.js";
import Key from "./key.js";
import Tile from "./tile.js";
import Music from "./music.js";

export default
    class GameCanvas {

    #obj;
    #ctx;
    #tile;
    #keys;
    #background;
    #tid;

    // 마우스를 처음 클릭(이미지 내)한 x, y 지점
    #startX;
    #startY;
    // 마우스 드래그 하더라도 같이 움직이는 마우스의 x, y 지점
    #mouseX;
    #mouseY;

    #bgmAudio
    #janglingAudio;
    #CorrectAudio;
    #wrongAudio;
    #isPaintFirst

    #answerPosition
    #currentClick;
    #isClear;
    #quizAnswers;

    constructor() {
        this.#obj = document.createElement("canvas");
        document.body.append(this.#obj);
        this.#ctx = this.#obj.getContext("2d");
        this.#obj.width = window.innerWidth;
        this.#obj.height = window.innerHeight;
        // this.#obj.onclick = this.clickHandler.bind(this);
        this.#obj.onmousedown = this.mouseDown.bind(this);
        this.#obj.onmousemove = this.mouseMove.bind(this);
        this.#obj.onmouseout = this.mouseOut.bind(this);
        this.#obj.onmouseup = this.mouseUp.bind(this);

        this.#isPaintFirst = false;

        this.#obj.tabIndex = 0;
        this.#obj.focus();
        this.#tid = null;

        this.#background = new Background();
        this.#tile = new Tile();
        this.#keys = [];
        this.#quizAnswers = [false, false, false, false];

        for(let i=0; i<11; i++){
            let imageNumber = i+1;
            this.#keys.push(new Key(`document.getElementById("${imageNumber}")`, imageNumber));
        }

        // 마우스를 처음 클릭(이미지 내)한 x, y 지점
        this.#startX = 0;
        this.#startY = 0;
        // 마우스 드래그 하더라도 같이 움직이는 마우스의 x, y 지점
        this.#mouseX = 0;
        this.#mouseY = 0;
        // 클릭한 이미지 숫자(1~11) 저장
        this.#currentClick = -99;

        this.#bgmAudio = new Music();
        this.#janglingAudio = new Music("mini2_key_jangle.wav", 0.2);
        this.#CorrectAudio = new Music("mini2_key_turning01.wav", 0.8);
        this.#wrongAudio = new Music("mini2_key_putdown.wav");

        // this.#isClear = null;
    }


    update(e) {
        let ctx = this.#ctx;
        
        this.#background.update(ctx);
        for(let key of this.#keys) {
            key.update(ctx);
        }
        this.#tile.update(ctx)

        this.quizCheck();

    }

    run() {

        this.paint();

        this.#tid = setInterval(()=>{    
            this.update();
        },50);

        
    }


    paint() {
        let ctx = this.#ctx;
        let background = this.#background;
        let tile = this.#tile;
        background.draw(ctx);

        for(let key of this.#keys){
            key.draw(ctx);            
        }

        tile.draw(ctx);



    }

    mouseDown(e) {
        e.preventDefault();
        this.#startX = Math.floor(e.clientX);
        this.#startY = Math.floor(e.clientY);

        for(let key of this.#keys){
            if(key.mouseOnImageCheck(this.#startX, this.#startY)){
                this.#currentClick = key.keyId;
                this.#janglingAudio.playMusic();
                break;
            }
            
        }
        console.log(this.#tile.isDiaCorrect);
    }

    mouseMove(e) {

        this.#mouseX = parseInt(e.clientX);
        this.#mouseY = parseInt(e.clientY);

        for (let key of this.#keys) {
            if (key.isDragging) {
                this.#bgmAudio.playBgmMusic();
                key.mouseMoveHandler(this.#mouseX, this.#mouseY);
                this.paint();
            }
        }

    }

    mouseOut(e) {
        for (let key of this.#keys) {
            key.isDragging = false;
        }
    }
    

    mouseUp(e) {
        
        if(this.#currentClick == -99) 
        return;
        
        if(this.answerPositionCheck(e.x, e.y) > 0){
            console.log("정답위치");
            let position = this.answerPositionCheck(e.x, e.y);
            if(this.#currentClick == position) {
                this.#keys[this.#currentClick-1].img = `document.getElementById("answer")`;
                // this.#keys[this.#currentClick-1].img.style.display = "none";
                this.#CorrectAudio.playMusic();
               
                switch (position) {
                    case 1:
                        this.#quizAnswers[0] = true;
                        this.#janglingAudio.playMusic();
                        this.#tile.isDiaCorrect = true;
                        break;
                    case 2:
                        this.#quizAnswers[1] = true;
                        this.#janglingAudio.playMusic();
                        this.#tile.isCloCorrect = true;
                        break;
                    case 3:
                        this.#quizAnswers[2] = true;
                        this.#janglingAudio.playMusic();
                        this.#tile.isSpadeCorrect = true;
                        break;
                    case 4:
                        this.#quizAnswers[3] = true;
                        this.#janglingAudio.playMusic();
                        this.#tile.isHeartCorrect = true;
                        break;
                }

            } else {
                this.#wrongAudio.playMusic();
                this.#keys[this.#currentClick-1].resetPotion(this.#startX, this.#startY);
            }
        } 
        
        this.#keys[this.#currentClick-1].isDragging = false;
        this.#currentClick = -99;

    }

    quizCheck(){
        
        for(let answer of this.#quizAnswers) {
            if(answer == false) 
                return
        }

        console.log("퀴즈완료");
        this.#obj.style.display = "none";
        this.#isClear(1);
    }
    

    answerPositionCheck(x, y) {
        if (x > window.innerWidth * 0.433 &&
            x < window.innerWidth * 0.433 + window.innerWidth * 0.061 &&
            y > window.innerHeight * 0.235 &&
            y < window.innerHeight * 0.235 + window.innerHeight * 0.114) {
            //다이아
            return 1;
        } else if (x > window.innerWidth * 0.507 &&
            x < window.innerWidth * 0.507 + window.innerWidth * 0.061 &&
            y > window.innerHeight * 0.235 &&
            y < window.innerHeight * 0.235 + window.innerHeight * 0.114) {
            //클로버
            return 2;
        } else if (x > window.innerWidth * 0.433 &&
            x < window.innerWidth * 0.433 + window.innerWidth * 0.061 &&
            y > window.innerHeight * 0.372 &&
            y < window.innerHeight * 0.372 + window.innerHeight * 0.114) {
            //스페이드
            return 3;
        } else if (x > window.innerWidth * 0.507 &&
            x < window.innerWidth * 0.507 + window.innerWidth * 0.061 &&
            y > window.innerHeight * 0.372 &&
            y < window.innerHeight * 0.372 + window.innerHeight * 0.114) {
            //하트
            return 4;
        } else {
            return -99;
        }
    }

    set isClear(callback) {
        this.#isClear = callback;
    }

}
