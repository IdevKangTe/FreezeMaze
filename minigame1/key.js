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


    #keyId;
    // 드레그 전 체크를 위한 size (이미지보다 조금 작다)
    #shapeSize;


    constructor(img=null, imageNumber=-1) {
        
        this.#width = 75;
        this.#height = 75;
        //비율로 바꾸기

        // x의 랜덤 범위
        this.#xRandomRange = 300;
        // x가 시작되는 지점
        this.#xRangeBox = window.innerWidth / 2 - 190;
        // y의 랜덤 범위
        this.#yRandomRange = 125;
        // y가 시작되는 지점
        this.#yRangeBox = 575;
       
        let xRandomRange = this.#xRandomRange;
        let xRangeBox = this.#xRangeBox;
        let yRandomRange = this.#yRandomRange;
        let yRangeBox = this.#yRangeBox;

        this.#img = img;
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

    get keyId() {
        return this.#keyId;
    }

    set isDragging(tf) {

        this.#isDragging = tf;

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
        ctx.drawImage(this.#img, this.#x, this.#y, w, h);
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

    mouseMoveHandler(dx, dy) {
        let imageName = this.#keyId;
        this.positionChange(dx, dy, imageName);
    }

    positionChange(dx, dy, imageName){

        switch (imageName) {
            case 1:
                this.#x1 = dx;
                this.#y1 = dy; 
                break;
            case 2:
                this.#x2 = dx;
                this.#y2 = dy;
                break;
            case 3:
                this.#x3 = dx;
                this.#y3 = dy;
                break;
            case 4:
                this.#x4 = dx;
                this.#y4 = dy;
                break;
            case 5:
                this.#x5 = dx;
                this.#y5 = dy;
                break;
            case 6:
                this.#x6 = dx;
                this.#y6 = dy;
                break;
            case 7:
                this.#x7 = dx;
                this.#y7 = dy;
                break;
            case 8:
                this.#x8 = dx;
                this.#y8 = dy;
                break;
            case 9:
                this.#x9 = dx;
                this.#y9 = dy;
                break;
            case 10:
                this.#x10 = dx;
                this.#y10 = dy;
                break;
            case 11:
                this.#x11 = dx;
                this.#y11 = dy;
                break;
        }
    }

}
