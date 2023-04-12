// mini1Canvas의 UI중 첫번째 (1/4)

export default
    class Key {

    #width;
    #height;
    #xRandomRange;
    #xRangeBox;
    #yRandomRange;
    #yRangeBox;

    
    #img;
    #x;
    #y;



    #isDragging

    #shapeLeft;
    #shapeRight;
    #shapeTop;
    #shapeBottom;

    #obj;

    #keyId;
    // 드레그 전 체크를 위한 size (이미지보다 조금 작다)
    #shapeSize;


    constructor(img=null, imageNumber=-1) {
        this.#width = window.innerWidth*0.054;
        this.#height = window.innerHeight*0.1;

        // x의 랜덤 범위
        this.#xRandomRange = window.innerWidth*0.23;
        // x가 시작되는 지점
        this.#xRangeBox = window.innerWidth*0.36;
        // y의 랜덤 범위
        this.#yRandomRange = window.innerHeight*0.15;
        // y가 시작되는 지점
        this.#yRangeBox = window.innerHeight*0.68;
       
        let xRandomRange = this.#xRandomRange;
        let xRangeBox = this.#xRangeBox;
        let yRandomRange = this.#yRandomRange;
        let yRangeBox = this.#yRangeBox;
        this.#img = eval(img);

        // this.#img == document.getElementById("1")
        //this.#clo = document.getElementById("clo");
        this.#x = (Math.floor(Math.random() * xRandomRange)) + xRangeBox;
        this.#y = (Math.floor(Math.random() * yRandomRange)) + yRangeBox;
        // 비율로 바꿔버리기!

        this.#isDragging = false;

        this.#shapeLeft = null;
        this.#shapeRight = null;
        this.#shapeTop = null;
        this.#shapeBottom = null;

        this.#keyId = imageNumber;
        this.#shapeSize = 65;

    }

    set img(img) {
        this.#img = eval(img);
    }

    get keyId() {
        return this.#keyId;
    }

    set isDragging(tf) {

        this.#isDragging = tf;

    }

    set x(x){
        this.#x = x;
    }

    set y(y){
        this.#y = y;
    }

    get isDragging() {
        return this.#isDragging;
    }

    update(ctx){
        this.draw(ctx);
    }

    draw(ctx) {
        let w = this.#width;
        let h = this.#height;
        // window.onload=()=>{
            ctx.drawImage(this.#img, this.#x, this.#y, w, h);
        // }
    }

    isMouseInShape(x, y, shape) {
        let shapeLeft = shape.x;
        let shapeRight = shape.x + shape.width;
        let shapeTop = shape.y;
        let shapeBottom = shape.y + shape.height;

        return (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom);

    }


    mouseOnImageCheck(startX, startY) {


        if(startX >= this.#x &&
        startX <= this.#x + this.#width &&
        startY >= this.#y &&
        startY <= this.#y + this.#height) {
            this.#isDragging = true;
            return true;
        }

        return false;


    }

    resetPotion(x,y){
            this.#x = x - this.#width/2;
            this.#y = y - this.#height/2;
    }

    mouseMoveHandler(dx, dy) {
        // let imageName = this.#keyId;
        if(this.#isDragging) {
            this.#x = dx - this.#width/2;
            this.#y = dy - this.#height/2;

        }
        
    }


}
