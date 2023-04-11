export default
    class Key {

    #width;
    #height;
    #xRange;
    #xRangeBox;
    #yRange;
    #yRangeBox;
    #img;
    #x;
    #y;
    #isDragging

    #shapeLeft;
    #shapeRight;
    #shapeTop;
    #shapeBottom;

    #currentShape;
    // 드레그 전 체크를 위한 size (이미지보다 조금 작다)
    #shapeSize;
    constructor(img=null, imageNumber=-1) {
        
        this.#width = 75;
        this.#height = 75;
        //비율로 바꾸기

        // x의 랜덤 범위
        this.#xRange = 300;
        // x가 시작되는 지점
        this.#xRangeBox = window.innerWidth / 2 - 190;
        // y의 랜덤 범위
        this.#yRange = 125;
        // y가 시작되는 지점
        this.#yRangeBox = 575;
       
        let xRange = this.#xRange;
        let xRangeBox = this.#xRangeBox;
        let yRange = this.#yRange;
        let yRangeBox = this.#yRangeBox;

        this.#img = img;
        this.#x = (Math.floor(Math.random() * xRange)) + xRangeBox;
        this.#y = (Math.floor(Math.random() * yRange)) + yRangeBox;
        // 비율로 바꿔버리기!

        this.#isDragging = false;

        this.#shapeLeft = null;
        this.#shapeRight = null;
        this.#shapeTop = null;
        this.#shapeBottom = null;

        this.#currentShape = imageNumber;
        this.#shapeSize = 65;

    }

    get currentShape() {
        return this.#currentShape;
    }

    set isDragging(tf) {

        this.#isDragging = tf;

    }

    get isDragging() {
        return this.#isDragging;
    }


    draw(ctx) {
        // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let w = this.#width;
        let h = this.#height;
        ctx.drawImage(this.#img, this.#x, this.#y, w, h);

    }

    update(ctx){
        this.draw(ctx);
    }

    isMouseInShape(x, y, shape) {
        let shapeLeft = shape.x;
        let shapeRight = shape.x + shape.width;
        let shapeTop = shape.y;
        let shapeBottom = shape.y + shape.height;

        return (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom);

    }

    

}
