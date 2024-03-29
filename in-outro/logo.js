// inOutroCanvas의 UI중 첫번째 (1/3)
import Background from './background.js';
import Music from './music.js';

export default
    class Logo {
    #imgLogo;
    #widthLogo;
    #heightLogo;
    #x;
    #y;

    #imgLogoZe;
    #widthLogoZe;
    #heightLogoZe;
    #xZe;
    #yZe;

    #opacityStep;
    #opacity;
    #zeOpacity;
    #background;
    #musicOutro;
    #isOutroMusicPlay;

    // 밖에서 "Logo객체.isIntro"의 t/f 조정하기
    #isIntro
    // 밖에서 "Logo객체.isOutro"의 t/f 조정하기
    #isOutro
    // 아마 이거 캔버스에서 만들어서 해야 할 수도 있을 거 같음.

    constructor() {


        this.#imgLogo = document.getElementById("logo");
        this.#imgLogoZe = document.getElementById("logoze");
        // none -> block가 안되더라.
        // this.#style.display = "none";

        // Free 로고의 크기, 위치
        this.#widthLogo = this.#imgLogo.width;
        this.#heightLogo = this.#imgLogo.height;
        this.#x = window.innerWidth / 2 - this.#widthLogo / 2;
        this.#y = window.innerHeight / 2 - this.#heightLogo / 2;

        // ze 로고의 크기, 위치
        this.#widthLogoZe = this.#imgLogoZe.width;
        this.#heightLogoZe = this.#imgLogoZe.height;
        this.#xZe = this.#x + 307;
        this.#yZe = this.#y + 17;

        this.#opacityStep = 0.008;
        this.#opacity = 0;
        this.#zeOpacity = 1;

        //이거 지금 true로 잠깐 바꿔놓음
        this.#isIntro = false;
        this.#isOutro = false;
        this.#isOutroMusicPlay = false;

        this.#background = new Background();
        this.#musicOutro = new Music("../sound/game/in-outro/outro.mp3", 8);
    }

    resize() {
        this.#x = window.innerWidth / 2 - this.#widthLogo / 2;
        this.#y = window.innerHeight / 2 - this.#heightLogo / 2;
        this.#xZe = this.#x + 307;
        this.#yZe = this.#y + 17;
    }

    get img() {
        return this.#imgLogo;
    }


    draw(ctx, a) {

        let img;
        let x;
        let y;
        let w;
        let h;

        if (a == "logo") {
            img = this.#imgLogo;
            x = this.#x;
            y = this.#y;
            w = this.#widthLogo;
            h = this.#heightLogo;


        } else if (a == "ze") {
            img = this.#imgLogoZe;
            x = this.#xZe;
            y = this.#yZe;
            w = this.#widthLogoZe;
            h = this.#heightLogoZe;
        }

        ctx.drawImage(img, x, y, w, h);
    }

    playIntro() {
        this.#isIntro = true;
    }

    playOutro() {
        this.#isOutro = true;
    }

    animateLogoFadeIn(ctx) {


        if (this.#opacity < 1) {
            this.#opacity += this.#opacityStep;
        }

        this.#background.draw(ctx);

        ctx.save(); // 현재 canvas context의 상태를 저장합니다.

        ctx.globalAlpha = this.#opacity;
        this.draw(ctx, "logo");
        this.draw(ctx, "ze");

        ctx.restore(); // canvas context의 상태를 저장한 시점으로 되돌립니다.


    }

    animateLogoFadeOut(ctx) {

        if (!this.#isOutroMusicPlay) {
            this.#musicOutro.playMusic();
            this.#musicOutro.volumeDown();
            this.#isOutroMusicPlay = true;
        }

        if (Math.abs(this.#zeOpacity) >= 0.001) {
            this.#zeOpacity -= this.#opacityStep;
        }

        this.#background.draw(ctx);
        this.draw(ctx, "logo");

        ctx.save(); // 현재 canvas context의 상태를 저장합니다.
        ctx.globalAlpha = this.#zeOpacity;
        if (Math.abs(this.#zeOpacity) >= 0.001) {
            this.draw(ctx, "ze");
        }
        ctx.restore(); // canvas context의 상태를 저장한 시점으로 되돌립니다.

    }

    update(ctx) {

        if (this.#isIntro) {
            this.animateLogoFadeIn(ctx);
        }

        if (this.#isOutro) {
            this.animateLogoFadeOut(ctx);
        }


    }


}