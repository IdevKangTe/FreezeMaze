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

    #answerPosition
    #currentClick;

    constructor() {
        this.#obj = document.createElement("canvas");
        this.#ctx = this.#obj.getContext("2d");
        this.#obj.width = window.innerWidth/3;
        this.#obj.height = window.innerHeight;
        this.#obj.tabIndex = 0;
        document.body.append(this.#obj);
        this.#obj.focus();
        // this.#obj.onclick = this.clickHandler.bind(this);
        this.#obj.onmousedown = this.mouseDown.bind(this);
        this.#obj.onmousemove = this.mouseMove.bind(this);
        this.#obj.onmouseout = this.mouseOut.bind(this);
        this.#obj.onmouseup = this.mouseUp.bind(this);

        this.#tid = null;

        this.#background = new Background();
        this.#tile = new Tile();
        this.#keys = [];
        for(let i=0; i<11; i++) {
            let imageNumber = i+1;
            this.#keys.push(new Key(`document.getElementById("${imageNumber}")`,imageNumber));
        }

        // 마우스를 처음 클릭(이미지 내)한 x, y 지점
        this.#startX = 0;
        this.#startY = 0;
        // 마우스 드래그 하더라도 같이 움직이는 마우스의 x, y 지점
        this.#mouseX = 0;
        this.#mouseY = 0;

        // 클릭한 이미지 숫자(1~11) 저장
        this.#currentClick = null;

        this.#bgmAudio = new Music();
        this.#janglingAudio = new Music("mini2_key_jangle.wav", 0.2);
        this.#CorrectAudio = new Music("mini2_key_turning01.wav", 0.8);
        this.#wrongAudio = new Music("mini2_key_putdown.wav");

    }


    update(e) {
        this.#key.update(ctx);
    }

    run() {

        this.paint();

        // console.log(this.#key.isDragging);

        // this.#tid = setInterval(()=>{    
        //     this.update();
        // },17);

    }


    paint() {
        let ctx = this.#ctx;
        let background = this.#background;
        let tile = this.#tile;
        background.draw(ctx);
        
        for (let key of this.#keys) {
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
                this.#currentClick = this.#keys.indexOf(key)+1;
                console.log(this.#currentClick);
                break;
                
            }
        }
        


    }

    mouseMove(e) {

        this.#mouseX = parseInt(e.clientX);
        this.#mouseY = parseInt(e.clientY);

        //dragging쪽에 콜백 함수를 적용할 수 있을까?

        if (this.#key.isDragging) {
            this.#bgmAudio.playBgmMusic();

            // let dx = this.#mouseX - this.#startX;
            // let dy = this.#mouseY - this.#startY;
            // this.#startX = this.#mouseX;
            // this.#startY = this.#mouseY;

            this.#key.mouseMoveHandler(this.#mouseX, this.#mouseY);
            // 배열의 인덱스를 움직이게 할 예정 
            this.paint();

        }

    }

    mouseOut(e) {
        this.#key.isDragging = false;
    }

    mouseUp(e) {
        this.#key.isDragging = false;

        //다이아몬드라면?\

        let position = this.answerPositionCheck(e.x, e.y);
        if (this.#key.keyId == position) {
            // 정답 이미지 등장
            switch (position) {
                case 'dia':
                    this.#tile.isDiaCorrect(true);
                    break;
                case 'clover':
                    this.#tile.isCloCorrect(true);
                    break;
                case 'spade':
                    this.#tile.isSpadeCorrect(true);
                    break;
                case 'heart':
                    this.#tile.isHeartCorrect(true);
                    break;
            }
        } else {
            this.#key.positionReturn(this.#startX,this.#startY);
        }
    }

    answerPositionCheck(x, y) {
        if (x > window.innerWidth * 0.43 &&
            window.innerWidth * 0.43 + window.innerWidth * 0.07 < x &&
            y > window.innerHeight * 0.222 &&
            window.innerHeight * 0.222 + window.innerHeight * 0.13 < y) {
            //다이아
            // return 'dia';
            return 1;
        } else if (x > window.innerWidth * 0.503 &&
            window.innerWidth * 0.503 + window.innerWidth * 0.07 < x &&
            y > window.innerHeight * 0.222 &&
            window.innerHeight * 0.222 + window.innerHeight * 0.13 < y) {
            //클로버
            // return 'clover';
            return 2;
        } else if (x > window.innerWidth * 0.43 &&
            window.innerWidth * 0.43 + window.innerWidth * 0.07 < x &&
            y > window.innerHeight * 0.36 &&
            window.innerHeight * 0.36 + window.innerHeight * 0.13 < y) {
            //스페이드
            // return 'spade';
            return 3;
        } else if (x > window.innerWidth * 0.503 &&
            window.innerWidth * 0.503 + window.innerWidth * 0.07 < x &&
            y > window.innerHeight * 0.36 &&
            window.innerHeight * 0.36 + window.innerHeight * 0.13 < y) {
            //하트
            // return 'heart';
            return 4;
        } else {
            return -99;
        }
    }

    

}
