export default 
class Keys{

    #src;
    #x;
    #y;
    #imageWidth;
    #imageHeight;
    
    
    constructor(src=`1.png`, x=0,y=0,imageWidth=100,imageHeight=100) {
        this.#src = src;
        this.#x = x;
        this.#y = y;
        this.#imageWidth = imageWidth;
        this.#imageHeight = imageHeight;
    } 

    


    get x(){
        return this.#x;
    }
    set x(x){
        this.#x = x;
    }
    get y(){
        return this.#y;
    }
    set y(y){
        this.#y = y;
    }
    get imageWidth(){
        return this.#imageWidth;
    }
    set imageWidth(imageWidth){
        this.#imageWidth = imageWidth;
    }
    get imageHeight(){
        return this.#imageHeight;
    }
    set imageHeight(x){
        this.#imageHeight = imageHeight;
    }


    
}