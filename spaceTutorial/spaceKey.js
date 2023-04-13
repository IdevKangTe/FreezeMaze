export default
class SpaceKey{


    #x;
    #y;
    #img;
    #w;
    #h;

    constructor(){
        this.#img = document.getElementById("space");
        this.#w = window.innerWidth*0.115;
        this.#h = window.innerHeight*0.115;
        this.#x = window.innerWidth/2 - this.#w/2;
        this.#y = window.innerHeight/2 - this.#h/2;
    }

    get w(){
        return this.#w;
    }

    get h(){
        return this.#h;
    }

    set img(img){
        this.#img = img;
    }

    get img(){
        return this.#img;
    }

    draw(ctx){
        let x = this.#x;
        let y = this.#y;
        ctx.drawImage(this.#img,x,y,this.#w,this.#h);
    }

    update(ctx){
        this.draw(ctx);
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    }

    keyEffect(w, h, img){
        this.#w = w;
        this.#h = h;
        this.#img = eval(img);
    }


}