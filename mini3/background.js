// mini1Canvas의 UI중 세번째 (3/4)

export default
class Background {

    #x;
    #y;
    #img;
    #width;
    #height;

    constructor(){
        this.#img = document.getElementById("mini3-background");
        this.#width = window.innerWidth/3;
        this.#height = window.innerHeight;
        this.#x = window.innerWidth/2-this.#width/2;
        this.#y = 0;
    }

    draw(ctx){
        
        let img = this.#img;
        let x = this.#x;
        let y = this.#y;
        let w = this.#width;
        let h = this.#height;

        ctx.drawImage(img, x, y, w, h);
    }

    update(ctx){
        this.draw(ctx);
    }

}