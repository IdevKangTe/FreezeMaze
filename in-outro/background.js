// inOutroCanvas의 UI중 두번째 (2/3)

import Music from '../music.js';

export default
class Background {
	#img;
	#x;
	#y;
	#w;
	#h;
	#opacity;
	#opacityStep;
	#animimationName;
	
	// 밖에서 "Background객체.isGameover"의 t/f 조정하기
	#isGameover

	constructor(w= window.innerWidth, h= window.innerHeight) {
		this.#img = document.getElementById("background");
		this.#w = w;
		this.#h = h;
		this.#x = 0;
		this.#y = 0;
		this.#opacity = 0;
		this.#opacityStep = 0.008;
		this.#animimationName;
		
		this.#isGameover = false;		
	}

	get img(){
		return this.#img;
	}

	set img(img){
		this.#img = img;
	}

	changeBackgroundImg(){
		this.#img.src = "gameoverImg.jpg";
	}
	

	draw(ctx) {

		if(this.#isGameover){
			this.changeBackgroundImg();
		}

		let img = this.#img;
		let x = this.#x;
		let y = this.#y;
		let w = this.#w;
		let h = this.#h;


		ctx.drawImage(img,x,y,w,h);		
		
	}

	// 지우고 다시 그리기 위한 reDraw 메서드
	reDrawBackground(ctx) {
		let x = this.#x;
		let y = this.#y;
		let w = this.#w;
		let h = this.#h;
		
		ctx.clearRect(x, y, w, h);
		ctx.globalAlpha = this.#opacity;
		this.draw(ctx);

	}

	
	  
	update(ctx) {

		if (this.#opacity < 1) {
			this.#opacity += this.#opacityStep;
			
		}
		
		if( 0.99 < this.#opacity )
		return;

		this.reDrawBackground(ctx);

	}

	invisible(){
		// style에 영향을 주는 게 가능하나?
			this.#img.style.display="none";
	}



	




}
