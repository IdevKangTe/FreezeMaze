/**
 * canvas: 인아웃트로 캔버스
 * index.html, inout.css,
 * ui js들 3개
 * item
 * 
 */

import Logo from './logo.js';
import Background from './background.js';

export default
	class InOutroCanvas {
	#obj;
	#ctx;
	#width;
	#height;
	#display;
	#logo;
	#background;
	#deltaTime;
	#prevTime;
	#now;
	#tid

	#introDelay;
	#outroDelay;

	#mode;
	#isDone;
	#count;

	constructor() {
		this.#obj = document.createElement("canvas");
		this.#ctx = this.#obj.getContext("2d");
		document.body.append(this.#obj);

		this.#obj.width = window.innerWidth;
		this.#obj.height = window.innerHeight;

		this.#obj.tabIndex = 0;
		this.#obj.focus();

		this.#obj.style.position = "absolute";
		this.#obj.style.top = 0;
		this.#obj.style.display = this.#display;

		this.#logo = new Logo();
		this.#background = new Background();
		this.#deltaTime = 0;
		this.#prevTime = 0;
		this.#now = 0;
		this.#tid = null;

		this.#introDelay = 150;
		this.#outroDelay = 150;
		this.#mode = null;

		this.#isDone = null;
		this.#count = 0;
	}

	get ctx() {
		return this.#ctx;
	}

	run() {
		// 프레임 처리
		this.#now = performance.now();

		this.#deltaTime = (this.#now - this.#prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
		this.#prevTime = this.#now;
		// 프레임 시간 계산

		this.#tid = setInterval(() => {
			this.update();
		}, 17);

		/* later 
		clearInterval(this.#tid);
		*/

	}

	paint() {
		let ctx = this.#ctx;
		let logo = this.#logo;
	}

	//호출 시 모드를 바꾸고 run을 하면 됩니다.
	mode(mode) {
		this.#mode = mode;
	}

	update() {
		let ctx = this.#ctx;
		this.#count++;
		switch (this.#mode) {
			case "intro":
				this.#background.update(ctx);
				this.#background.playIntroMusic();
				this.#logo.update(ctx);

				this.#introDelay--;
				if (this.#introDelay == 0) {
					this.#logo.playIntro();
				}
				if (this.#count < 350) return;
				this.#obj.style.display = "none";
				this.#isDone();
				clearInterval(this.#tid);
				break;
			case "outro":

				this.#background.update(ctx);
				this.#logo.update(ctx);
				this.#logo.playIntro();

				this.#outroDelay--;
				if (this.#outroDelay == 0) {
					this.#logo.playOutro();
				}

				break;

			case "gameover":
				this.#background.changeImg();
				this.#background.update(ctx);
				break;
		}
	}

	set isDone(callback) {
		this.#isDone = callback;
	}

}




