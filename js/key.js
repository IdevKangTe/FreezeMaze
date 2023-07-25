export default
class Key{


    #x;
    #y;
    #img;
    #w;
    #h;

    constructor(x, y, img=null){
        this.#x = x;
        this.#y = y;
        this.#img = eval(img);
        this.#w = window.innerWidth*0.06;
        this.#h = window.innerHeight*0.115;
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