export default class Pipe{
    x;
    y;
    pipes;
    speed;
    startX;
    endX;
    theThing1;
    currentPos1;
    theThing2;
    currentPos2;
    theThing3;
    currentPos3;
    theThing4;
    currentPos4;
    theThing5;
    currentPos5;

    constructor(){
        this.x = -500;
        this.y = window.innerHeight /2;
        //좌표

        this.pipes = [];

        this.speed = 5;
        this.startX = -1700;
        this.endX = window.innerWidth*0.75;
        
        this.pipes.push({image: document.getElementById("pipe1")});
        this.pipes.push({image: document.getElementById("pipe2")});
        this.pipes.push({image: document.getElementById("pipe3")});
        this.pipes.push({image: document.getElementById("pipe4")});
        this.pipes.push({image: document.getElementById("pipe5")});

        this.theThing1 = document.querySelector("#pipe1");
        this.currentPos1 = this.x;
        this.theThing2 = document.querySelector("#pipe2");
        this.currentPos2 = this.currentPos1-600;
        this.theThing3 = document.querySelector("#pipe3");
        this.currentPos3 = this.currentPos2-600;
        this.theThing4 = document.querySelector("#pipe4");
        this.currentPos4 = this.currentPos3-600;
        this.theThing5 = document.querySelector("#pipe5");
        this.currentPos5 = this.currentPos4-600;

    }

    draw(ctx){
        for(let i=0; i<this.pipes.length; i++){
            let img = this.pipes[i].image;
            let dw = img.width/1.14;
            let dh = img.height/1.14;
            ctx.drawImage(this.pipes[i].image, this[`currentPos${i+1}`], this.y-dh/2, dw, dh);
        } //벡틱사용
    }

    animation1() { 
        this.currentPos1 += this.speed;
        if (this.currentPos1 >= this.endX) {
            this.currentPos1 = this.startX;
        }
    }

    animation2() { 
        this.currentPos2 += this.speed;
        if (this.currentPos2 >= this.endX) {
            this.currentPos2 = this.startX;
        }
    }

    animation3() { 
        this.currentPos3 += this.speed;
        if (this.currentPos3 >= this.endX) {
            this.currentPos3 = this.startX;
        }
    }

    animation4() { 
        this.currentPos4 += this.speed;
        if (this.currentPos4 >= this.endX) {
            this.currentPos4 = this.startX;
        }
    }

    animation5() { 
        this.currentPos5 += this.speed;
        if (this.currentPos5 >= this.endX) {
            this.currentPos5 = this.startX;
        }
    }

    // set pipe(pipe){
    //     this.pipe = pipe;
    // }







}