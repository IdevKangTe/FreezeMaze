import Background from "./background.js";
import Key from "./key0411.js";
import Tile from "./tile.js";
import Music from "./music.js";

export default
    class Canvas {

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

        constructor() {
            this.#obj = document.createElement("canvas");
            this.#ctx = this.#obj.getContext("2d");
            this.#obj.width = window.innerWidth;
            this.#obj.height = window.innerHeight;
            this.#obj.tabIndex = 0;
            document.body.append(this.#obj);
            this.#obj.focus();

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

    }