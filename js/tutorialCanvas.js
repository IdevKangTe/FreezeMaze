import Key from './key.js';

export default class TutorialCanvas {

    #obj;
    #keys;
    #ctx;

    #isKeyUsed;

    #beforeEffectWidth;
    #afterEffectWidth;
    #beforeEffectHeight;
    #afterEffectHeight;
    #keyRemoveDelay;

    #isClear;
    #timer;
    #count;
    #delay;

    constructor() {
        this.#obj = document.createElement("canvas");
        document.body.append(this.#obj);
        this.#ctx = this.#obj.getContext("2d");
        this.#obj.width = window.innerWidth;
        this.#obj.height = window.innerHeight;
        this.#obj.style.position = "absolute";
        this.#obj.style.top = 0;
        this.#obj.style.left = 0;

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
        this.#count = 0;
        this.#delay = 50;

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
        
        this.#isClear = null;
        this.#keyRemoveDelay = [20, 20, 20, 20];
        
        this.#beforeEffectWidth = this.#obj.width * 0.06;
        this.#afterEffectWidth = this.#obj.width * 0.065;
        this.#beforeEffectHeight = this.#obj.height * 0.115;
        this.#afterEffectHeight = this.#obj.height * 0.12;
        
        // window.onresize = this.resize.bind(this);
    }
    
    // resize() {
    //     this.#obj.width = window.innerWidth;
    //     this.#obj.height = window.innerHeight;
    // }
    
    run() {
        // this.resize();
        this.update();
        this.paint();

        const reqId = requestAnimationFrame(() => this.run());
        this.#count = this.#isKeyUsed.filter(isUsed => isUsed === true).length;
        if (this.#count == 4) {
            this.#delay--;
            if (this.#delay != 0) return;
            this.#obj.style.display = "none";
            this.#isClear();
            cancelAnimationFrame(reqId);
        }
    }

    update() {
        let ctx = this.#ctx;
        let keys = this.#keys;

        for (let key of keys) {
            key.update(ctx);
        }

        for (let i = 0; i < 4; i++) {
            if (this.#timer[i]) {
                this.#keyRemoveDelay[i]--;
                if (this.#keyRemoveDelay[i] == 0)
                    this.#keys[i].img = document.getElementById("UsedKey");
            }
        }
    }

    paint() {
        let ctx = this.#ctx;
        let keys = this.#keys;

        for (let key of keys) {
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
                if (this.#timer[0])
                    this.#timer[3] = true;
                break;
        }


    }

    set isClear(callback) {
        this.#isClear = callback;
    }

}