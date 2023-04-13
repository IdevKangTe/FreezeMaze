//돌아가는 컨베이어 벨트
export default class Conveyor{
    x;
    y;
    dw;
    dh;
    conveyor;
    speed;
    startX;
    theThing6;
    currentPos6;
    bg;

    constructor(x=-300,y=0){
        this.x = x;
        this.y = y;
        //좌표

        this.dw = window.innerWidth;
        this.dh = window.innerHeight;
        //크기

        // this.conveyor = document.getElementById("cvbelt");
        this.speed = 5;

        this.startX = 50;

        this.theThing6 = document.querySelector("#cvbelt");

        this.currentPos6 = 0;

    }

    draw(ctx){
        ctx.drawImage(this.theThing6,this.x,this.y,this.dw,this.dh);
    }

    
    beltmove(){ 
        this.x += this.speed;
        // this.currentPos6 + "px";
    
        if (Math.abs(this.x) >= this.startX) {
            this.x = -this.startX;
        }
    }


    animation6() {
        this.currentPos6 += this.speed;
        this.x = this.currentPos6;
        
        //speed = px 
        if (Math.abs(this.currentPos6) >= this.startX) {
            this.currentPos6 = -this.startX;
        } //Math.abs(숫자의 절댓값 반환)
    } //이동하는 거리가 x보다 크거나 같다면 currentPos1을 재설정하여 이동을 반복한다

}