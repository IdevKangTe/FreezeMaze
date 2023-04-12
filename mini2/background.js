/**
 * background: 배경이미지, 왼쪽/오른쪽 전선 이미지
 */

export default class Background {
	#img;	// 배경이미지
	#dw; // 이미지 가로 길이
	#dh; // 이미지 세로 길이
	#dx; // 이미지 위치좌표 x
	#dy; // 이미지 위치좌표 y

	constructor() {
		this.#img = document.getElementById("mini2-bg");
		this.#dw = 800;
		this.#dh = window.innerHeight;
		this.#dx = (window.innerWidth - this.#dw)/2;
		this.#dy = 0;

		// window.onresize = this.resize.bind(this);
	}

	draw(ctx) {
		ctx.drawImage(this.#img, this.#dx, this.#dy, this.#dw, this.#dh);
	}

	// canvas 크기 변경
	resize() {
		this.#dh = window.innerHeight;
		this.#dx = (window.innerWidth - this.#dw)/2;
	}
}