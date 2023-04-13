import SpaceKey from './spaceKey.js';

export default
    class SpaceCanvas {

    #obj;
    #spaceKey
    #ctx;

    #isKeyUsed;
    #tid;
    
    #beforeEffectWidth;
    #afterEffectWidth;
    #beforeEffectHeight;
    #afterEffectHeight;
    #keyScaleDelay;

    #isClear;
    #timer;
    #oddEvenCheck;

    constructor() {
        this.#obj = document.createElement("canvas");
        document.body.append(this.#obj);
        this.#ctx = this.#obj.getContext("2d");
        this.#obj.width = window.innerWidth;
        this.#obj.height = window.innerHeight;

        this.#obj.tabIndex = 0;
        this.#obj.focus();

        this.#spaceKey = new SpaceKey();
        this.#timer = 70;
        
        this.#isKeyUsed = false;

        this.#tid = null;
        this.#isClear = null;
        this.#keyScaleDelay = 25;
        this.#oddEvenCheck = 0;

        this.#beforeEffectWidth = this.#spaceKey.w;
        this.#afterEffectWidth = window.innerWidth*0.118;
        this.#beforeEffectHeight = this.#spaceKey.h;
        this.#afterEffectHeight = window.innerHeight * 0.118;
    }

    run(){
        this.#tid = setInterval(()=>{   
            this.update();
            this.paint();
        },17);
    }

    update(){
        let ctx = this.#ctx;
        let space = this.#spaceKey;

        space.update(ctx);

        this.#keyScaleDelay--;
        if(this.#keyScaleDelay==0) {
            this.effectSpace();
            this.#keyScaleDelay=25;
            this.#oddEvenCheck++;
        }
        this.isAllKeyUsed();
    }

    paint(){
        let ctx = this.#ctx;
        let space = this.#spaceKey;

         space.draw(ctx);
    }

    effectSpace(){

        let aw = this.#afterEffectWidth;
        let ah = this.#afterEffectHeight;
        let bw = this.#beforeEffectWidth;
        let bh = this.#beforeEffectHeight;

        if(this.#oddEvenCheck > 5)
        return;

        if(this.#oddEvenCheck%2==0)
        this.#spaceKey.keyEffect(aw, ah, document.getElementById("spaceUsing"));
        else
        this.#spaceKey.keyEffect(bw, bh, document.getElementById("space"));
    }


    resetCanvas(){
        let obj = this.#obj;
        obj.width = window.innerWidth-0.1;
        obj.height = window.innerHeight-0.1;
    }
    
    isAllKeyUsed(){
        
        if(this.#oddEvenCheck < 5)
        return;
        
        this.#timer--;
        if(this.#timer == 0) {
            this.#obj.style.display = "none";
            this.#isClear("spaceTutorial");
        }

    }

    set isClear(callback) {
        this.#isClear = callback;
    }

}