export default class Background{
    x;
    y;
    dw;
    dh;
    bg;

    constructor(){
        this.bg = document.getElementById("coverImg");
        
        this.dw = window.innerWidth/3;
        this.dh = window.innerHeight;
        //크기
        
        this.x = 0;
        this.y = 0;
        //좌표
    }

    draw(ctx){
        ctx.drawImage(this.bg, this.x, this.y, this.dw, this.dh);
    }

    
}