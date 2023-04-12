export default class Light {
    x;
    y;
    dw;
    dh;
    redlight;
    greenlight;
    lightoff;
    color;
    delay;

    constructor() {
        this.dw = 150;
        this.dh = 150;

        this.x = window.innerWidth *0.125 ;
        this.y = -10;

        this.lightoff = document.getElementById('lightoff');
        this.redlight = document.getElementById('redlight');
        this.greenlight = document.getElementById('greenlight');

        this.color = null;

        this.delay = 50;

    }

    draw(ctx) {
        ctx.drawImage(this.lightoff, this.x, this.y, this.dw, this.dh);

        // if (!this.onPressSpace) return; //스페이스바가 눌렸을때는 무조건 초록불 아니면 빨간불
        if (this.color == "red"){
            ctx.drawImage(this.redlight, this.x, this.y, this.dw, this.dh);

            this.delay--;
            if (this.delay!=0) return;
            this.color = null;
            this.delay = 50;
        }
        if (this.color == "green") {
            ctx.drawImage(this.greenlight, this.x, this.y, this.dw, this.dh);
        }
        //콜백을 써라......변수를 넘긴다 true,false를 넘겨준다 

    }


    lightOn(color) {
        console.log("color", color);
        this.color = color;
    }



}