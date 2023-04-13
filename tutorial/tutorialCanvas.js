import Key from './key.js';

export default
    class TutorialCanvas {

    #obj;
    #keys;
    #ctx;

    #isKeyUsed;
    #tid;
    
    #beforeEffectWidth;
    #afterEffectWidth;
    #beforeEffectHeight;
    #afterEffectHeight;
    #keyRemoveDelay;

    #isClear;
    #timer;

    constructor() {
        this.#obj = document.createElement("canvas");
        document.body.append(this.#obj);
        this.#ctx = this.#obj.getContext("2d");
        this.#obj.width = window.innerWidth;
        this.#obj.height = window.innerHeight;

        this.#obj.tabIndex = 0;
        this.#obj.focus();

        this.#obj.onkeydown = this.keyDownHandler.bind(this);
        this.#obj.onkeyup = this.keyUpHandler.bind(this);

        let positionArr = [
            [window.innerWidth * 0.3, window.innerHeight * 0.5, 'ControlLeft'],
            [window.innerWidth * 0.45, window.innerHeight * 0.5, 'ArrowLeft'],
            [window.innerWidth * 0.57, window.innerHeight * 0.5, 'ArrowRight'],
            [window.innerWidth * 0.51, window.innerHeight * 0.37, 'ArrowUp']
        ];

        this.#keys = [];
        this.#timer = [false, false, false, false];

        for (let i = 0; i < 4; i++) {
            let keyName;
            let x;
            let y;
            let position = positionArr[i];

            let keyIndex = i;

            if (i == 0) {
                x = position[0];
                y = position[1];
                keyName = position[2];
            }
            else if (i == 1) {
                x = position[0];
                y = position[1];
                keyName = position[2];
            }
            else if (i == 2) {
                x = position[0];
                y = position[1];
                keyName = position[2];
            }
            else {
                x = position[0];
                y = position[1];
                keyName = position[2];
            }

            this.#keys.push(new Key(x, y, `document.getElementById("${keyName}")`, keyIndex));
        }

        
        
        this.#isKeyUsed = [false, false, false, false];

        this.#tid = null;
        this.#isClear = null;
        this.#keyRemoveDelay = [20, 20, 20, 20];

        this.#beforeEffectWidth = window.innerWidth * 0.06;
        this.#afterEffectWidth = window.innerWidth * 0.065;
        this.#beforeEffectHeight = window.innerHeight * 0.115;
        this.#afterEffectHeight = window.innerHeight * 0.12;
    }

    run(){

        this.#tid = setInterval(()=>{   
            this.update();
            this.paint();
        },17);
    }
    update(){
        let ctx = this.#ctx;
        let keys = this.#keys;

        for(let key of keys){
            key.update(ctx);
        }
        // this.isAllKeyUsed();

        for(let i=0; i<4; i++){
            if(this.#timer[i]) {
                this.#keyRemoveDelay[i]--;
                if(this.#keyRemoveDelay[i]==0)
                    this.#keys[i].img = document.getElementById("UsedKey");
            }
        }
        

       

    }

    paint(){
        let ctx = this.#ctx;
        let keys = this.#keys;

        for(let key of keys){
            key.draw(ctx);
            
        }
    }


    keyDownHandler(e) {
        let code = e.code;
        if (code != "F12")
            e.preventDefault();

        let aw = this.#afterEffectWidth;
        let ah = this.#afterEffectHeight;

        if (!(e.code == "ControlLeft" || e.code == "ArrowLeft" || e.code == "ArrowRight" || e.code == "ArrowUp"))
            return;

            switch (code) {
                case "ControlLeft":
                    this.#keys[0].keyEffect(aw, ah, document.getElementById("ControlLeftUsing"));
                    this.#isKeyUsed[0] = true;
                    break;
                case "ArrowLeft":
                    this.#keys[1].keyEffect(aw, ah, document.getElementById("ArrowLeftUsing"));
                    this.#isKeyUsed[1] = true;
                    break;
                case "ArrowRight":
                    this.#keys[2].keyEffect(aw, ah, document.getElementById("ArrowRightUsing"));
                    this.#isKeyUsed[2] = true;
                    break;
                case "ArrowUp":
                    this.#keys[3].keyEffect(aw, ah, document.getElementById("ArrowUpUsing"));
                    this.#isKeyUsed[3] = true;
                    break;
            }
    }

    keyUpHandler(e) {
        let code = e.code;
        if (code != "F12")
            e.preventDefault();

        let bw = this.#beforeEffectWidth;
        let bh = this.#beforeEffectHeight;
        
        switch (code) {
            case "ControlLeft":
                this.#keys[0].keyEffect(bw, bh, document.getElementById("ControlLeft"));
                this.#timer[0] = true;
                break;
            case "ArrowLeft":
                this.#keys[1].keyEffect(bw, bh, document.getElementById("ArrowLeft"));
                this.#timer[1] = true;
                break;
            case "ArrowRight":
                this.#keys[2].keyEffect(bw, bh, document.getElementById("ArrowRight"));
                this.#timer[2] = true;
                break;
            case "ArrowUp":
                this.#keys[3].keyEffect(bw, bh, document.getElementById("ArrowUp"));
                if(this.#timer[0])
                    this.#timer[3] = true;
                break;
        }


    }

    resetCanvas(){
        let obj = this.#obj;
        obj.width = window.innerWidth-0.1;
        obj.height = window.innerHeight-0.1;
    }
    
    isAllKeyUsed(){
        for(let keyUsed of this.#isKeyUsed) {
            if(keyUsed == false)
            return;
        }
        console.log("끝냈니?");
        
        this.#obj.style.display = "none";
        this.#isClear("tutorial");
    }


    set isClear(callback) {
        this.#isClear = callback;
    }

}