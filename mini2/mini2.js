/**
 * canvas: 미니게임 캔버스
 */

import Background from "./background.js";
import Bundle from './bundle.js';
import Line from './line.js';

export default class Game2 {
	#canvas;
	#ctx;
	#width;
	#height;
	#display;

	#background;
	#bundle;
	#bundlePoint;
	#lines;
	#color;
	#side;
	#isPainting;

	#startX;
	#startY;
	#endX;
	#endY;

	#isClear;

	constructor() {
		// canvas 객체 생성 후 body노드의 맨 마지막 자식으로 추가
		this.#canvas = document.createElement("canvas");
		document.body.append(this.#canvas);
		// window.onresize = this.resize.bind(this);
		this.init();

		// 이벤트 함수
		// this.#canvas.onclick = this.click.bind(this);
		this.#canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.#canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.#canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.#isClear = null;

		// this.resize();
	}

	init() {
		// 캔버스 설정
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = window.innerHeight;
		this.#canvas.style.position = "absolute";
		this.#canvas.style.top = 0;
		this.#canvas.style.left = 0;

		this.#background = new Background(); // 배경
		this.#bundle = new Bundle(); // 양쪽 전선
		this.#bundlePoint = this.#bundle.setPoint();
		this.#ctx = this.#canvas.getContext("2d"); // 2D context
		this.#ctx.lineWidth = 16;
		this.#ctx.lineCap = "round";
		this.#lines = [];
		this.#color = null;
		this.#side = null;
		this.#isPainting = false;
		this.#startX = null;
		this.#startY = null;
		this.#endX = null;
		this.#endY = null;
	}

	mouseDownHandler(e) {
		this.#side = this.#bundle.setSide(e.x, e.y);
		this.#color = this.#bundle.setColor(e.x, e.y);

		// 왼쪽 전선에서만 선 그리기 실행
		if (this.#side !== "left" || this.#isPainting) return;
		let isDupl = false;
		for (let line of this.#lines) {
			isDupl = line.isDupl(this.#color);
			if (isDupl) return;
		}
		if (isDupl) return;
		this.#isPainting = true;
	}

	mouseMoveHandler(e) {
		this.#ctx.lineWidth = 16;
		this.#ctx.strokeStyle = this.#color;
		if (!this.#isPainting) {
			this.#ctx.beginPath();
			this.#startX = e.x;
			this.#startY = e.y;
			this.#ctx.moveTo(this.#startX, this.#startY);
			return;
		}
		this.#endX = e.x;
		this.#endY = e.y;
		this.#ctx.lineTo(this.#endX, this.#endY);
		this.#ctx.stroke();
		this.#bundle.draw(this.#ctx);
	}

	mouseUpHandler(e) {
		this.#isPainting = false;
		const side = this.#bundle.setSide(e.x, e.y);
		const color = this.#bundle.setColor(e.x, e.y);
		this.#ctx.reset();
		this.#background.draw(this.#ctx);
		this.#bundle.draw(this.#ctx);
		
		if (side !== "right" || this.#isPainting || this.#color !== color) {
			this.#lines = [];
			return;
		}
		const line = new Line({
			startX: this.#startX,
			startY: this.#startY,
			color: this.#color,
			endX: this.#endX,
			endY: this.#endY
		});
		this.#lines.push(line);
		this.#lines.forEach(line => {
			line.draw(this.#ctx);
		});
		this.#bundle.draw(this.#ctx);

		if (this.#lines.length == 4 && this.#isClear) {
			setTimeout(() => {
				this.#canvas.style.display = "none";
				this.#isClear(2);
			}, 830);
		}
	}

	// canvas 크기 변경
	resize() {
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = window.innerHeight;
		this.#background.resize();
		this.#bundle.resize();
	}

	run() {
		window.onresize = this.resize.bind(this);
		this.#ctx.reset();
		this.#background.draw(this.#ctx);
		this.#bundle.draw(this.#ctx);
	}

	set isClear(callback) {
		this.#isClear = callback;
	}

}