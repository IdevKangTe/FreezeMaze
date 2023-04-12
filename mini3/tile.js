// mini1Canvas의 UI중 두번째 (2/4)

export default
class Tile{

    #width;
    #height;

    #clo;
    #dia;
    #heart;
    #spade;

    #xClo;
    #xDia;
    #xHeart;
    #xSpade;

    #yClo;
    #yDia;
    #yHeart;
    #ySpade;

    #isCloCorrect;
    #isDiaCorrect;
    #isHeartCorrect;
    #isSpadeCorrect;

    #answer;
    #aX;
    #aY;
    #aW;
    #aH;

    constructor(){

        // 다이아몬드 타일 위치 (w.iW * 0.43, w.iH * 0.222)
        // 클로버 타일 위치 (w.iW * 0.503, w.iH * 0.222)
        // 스페이드 타일 위치 (w.iW *0.43, w.iH * 0.36)
        // 하트 타일 위치 (w.iW * 0.503, w.iH * 0.36)
        // 타일 크기 (w.iW*0.07, w.iH*0.13);
        
        this.#clo = document.getElementById("clo");
        this.#dia = document.getElementById("dia");
        this.#heart = document.getElementById("heart");
        this.#spade = document.getElementById("spade");
        //비율 수정하기
        this.#height = window.innerHeight*0.105;
        this.#width = window.innerWidth*0.051;

        this.#xClo = window.innerWidth*0.512;
        this.#xDia = window.innerWidth*0.440;
        this.#xHeart = window.innerWidth*0.513;
        this.#xSpade = window.innerWidth*0.440;

        this.#yClo = window.innerHeight*0.247;
        this.#yDia = window.innerHeight*0.242;
        this.#yHeart = window.innerHeight*0.38;
        this.#ySpade = window.innerHeight*0.38; 

        this.#isCloCorrect = false;
        this.#isDiaCorrect = false;
        this.#isHeartCorrect = false;
        this.#isSpadeCorrect = false;

        this.#answer = document.getElementById("answer");
        // 다이아몬드 위치
        // this.#aX = window.innerWidth * 0.433;
        // this.#aY = window.innerHeight * 0.235;
        // this.#aW = window.innerWidth * 0.061;
        // this.#aH = window.innerHeight * 0.114;

        // 클로버 위치
        // this.#aX = window.innerWidth * 0.507;
        // this.#aY = window.innerHeight * 0.235;
        // this.#aW = window.innerWidth * 0.061;
        // this.#aH = window.innerHeight * 0.114;

        // 스페이드
        // this.#aX = window.innerWidth * 0.433;
        // this.#aY = window.innerHeight * 0.372;
        // this.#aW = window.innerWidth * 0.061;
        // this.#aH = window.innerHeight * 0.114;

        //하트 위치
        // this.#aX = window.innerWidth * 0.507;
        // this.#aY = window.innerHeight * 0.372;
        // this.#aW = window.innerWidth * 0.061;
        // this.#aH = window.innerHeight * 0.114;

    }
    get isCloCorrect(){
        return this.#isCloCorrect;
    }
    get isDiaCorrect(){
        return this.#isDiaCorrect;
    }
    get isHeartCorrect(){
        return this.#isHeartCorrect;
    }
    get isSpadeCorrect(){
        return this.#isSpadeCorrect;
    }


    set isCloCorrect(tf) {
        this.#isCloCorrect = tf;
    }
    set isDiaCorrect(tf){
        this.#isDiaCorrect=tf;
    }
    set isHeartCorrect(tf){
        this.#isHeartCorrect=tf;
    }
    set isSpadeCorrect(tf){
        this.#isSpadeCorrect=tf;
    }


    draw(ctx){
        let answer = this.#answer;
        let aX = this.#aX;
        let aY = this.#aY;
        let aW = this.#aW;
        let aH = this.#aH;
        // ctx.drawImage(answer,aX, aY, aW, aH);
        
        let xClo = this.#xClo;
        let xDia = this.#xDia;
        let xHeart = this.#xHeart;
        let xSpade = this.#xSpade;
        let yClo = this.#yClo;
        let yDia = this.#yDia;
        let yHeart = this.#yHeart;
        let ySpade = this.#ySpade;

        let h = this.#height;
        let w = this.#width;

        let clo = this.#clo;
        let dia = this.#dia;
        let heart = this.#heart;
        let spade = this.#spade;
        
        let isCloCorrect= this.#isCloCorrect;
        let isDiaCorrect = this.#isDiaCorrect;
        let isHeartCorrect = this.#isHeartCorrect;
        let isSpadeCorrect = this.#isSpadeCorrect;
       

        if(isCloCorrect)
        ctx.drawImage(clo,xClo,yClo,w,h);

        if(isDiaCorrect)
        ctx.drawImage(dia,xDia,yDia,w,h);

        if(isHeartCorrect)
        ctx.drawImage(heart,xHeart,yHeart,w,h);

        if(isSpadeCorrect)
        ctx.drawImage(spade,xSpade,ySpade,w,h);
    }

    update(ctx){
        this.draw(ctx);

    }

}