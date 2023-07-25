export default class Intro{
    x;
    y;
    dw;
    dh;
    keySpace;
    doTutorial;
    delay;
    isOpacity;
    isVisible;

    constructor(){
        
        this.dw = 300;
        this.dh = 150;
        this.x = (window.innerWidth/3-this.dw)/2;
        this.y = (window.innerHeight-this.dh)/2;
        this.keySpace = document.getElementById("keySpace");

        this.doTutorial = false;

        this.isOpacity = false;
        this.delay = 15;

        this.isVisible = null;
        this.introTime = 90; //기본딜레이는 15이고, 커졌다작아졌다 총6번 = 90
    }

    draw(ctx){
        if (!this.isOpacity) {
            ctx.drawImage(this.keySpace,this.x,this.y,this.dw,this.dh);
        } //false일때 정상적인 이미지가 그려지고
        else {
            let dw = 250;
            let dh = 125;
            let x = this.x+(this.dw - dw)/2;
            let y = this.y+(this.dh - dh)/2;
            ctx.drawImage(this.keySpace,x,y,dw,dh);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.roundRect(x,y,dw,dh,26);
            ctx.fill();
        }//true일때 투명하고,작아지는 애니가 그려진다
        
        this.delay--;
        this.introTime--;

        if (this.delay != 0) return; //딜레이가 0이 아닐땐 밑에가 실행 안됨

        this.delay = 15;
        this.isOpacity = this.isOpacity ? false : true;
        if(this.introTime == 0){ //딜레이가 다 끝나면 
            this.isVisible(); //콜백함수호출
        }
    }


    set isVisible(callback){
        this.isVisible = callback;
    }


}