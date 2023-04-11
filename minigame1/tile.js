// mini1Canvas의 UI중 두번째 (2/4)

export default
class Tile{

    #width;
    #height;

    #answer;
    #xAnswer;
    #yAnswer;
    #answerWidth;
    #answerHeight;

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

    constructor(){
        this.#answer = document.getElementById("answer");

        // 다이아몬드 타일 위치 (w.iW * 0.43, w.iH * 0.222)
        // 클로버 타일 위치 (w.iW * 0.503, w.iH * 0.222)
        // 스페이드 타일 위치 (w.iW *0.43, w.iH * 0.36)
        // 하트 타일 위치 (w.iW * 0.503, w.iH * 0.36)
        // 타일 크기 (w.iW*0.07, w.iH*0.13);
        this.#xAnswer = window.innerWidth*0.503;
        this.#yAnswer = window.innerHeight*0.36;
        
        this.#answerWidth = window.innerWidth*0.07;
        this.#answerHeight = window.innerHeight*0.13;

        this.#clo = document.getElementById("clo");
        this.#dia = document.getElementById("dia");
        this.#heart = document.getElementById("heart");
        this.#spade = document.getElementById("spade");

        this.#height = 84;
        this.#width = 84;

        this.#xClo = window.innerWidth/2+10;
        this.#xDia = window.innerWidth/2-86;
        this.#xHeart = window.innerWidth/2+12;
        this.#xSpade = window.innerWidth/2-88;

        this.#yClo = window.innerHeight/2-213;
        this.#yDia = window.innerHeight/2-217;
        this.#yHeart = window.innerHeight/2-97;
        this.#ySpade = window.innerHeight/2-94; 

        this.#isCloCorrect = false;
        this.#isDiaCorrect = false;
        this.#isHeartCorrect = false;
        this.#isSpadeCorrect = false;

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
        is.#isHeartCorrect=tf;
    }
    set isSpadeCorrect(tf){
        is.#isSpadeCorrect=tf;
    }


    draw(ctx){
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
        let aw = this.#answerWidth;
        let ah = this.#answerHeight;

        let clo = this.#clo;
        let dia = this.#dia;
        let heart = this.#heart;
        let spade = this.#spade;
        
        let isCloCorrect= this.#isCloCorrect;
        let isDiaCorrect = this.#isDiaCorrect;
        let isHeartCorrect = this.#isHeartCorrect;
        let isSpadeCorrect = this.#isSpadeCorrect;

        let answer = this.#answer;
        let xA = this.#xAnswer;
        let yA = this.#yAnswer;

        ctx.drawImage(answer,xA,yA,aw,ah);

        if(isCloCorrect)
        ctx.drawImage(clo,xClo,yClo,w,h);

        if(isDiaCorrect)
        ctx.drawImage(dia,xDia,yDia,w,h);

        if(isHeartCorrect)
        ctx.drawImage(heart,xHeart,yHeart,w,h);

        if(isSpadeCorrect)
        ctx.drawImage(spade,xSpade,ySpade,w,h);
    }

}