/**
 * line: 그어질 전선
 */

export default class Line {
	#startX; // 시작 좌표
	#startY;
	#color; // 왼쪽 색상
	#endX; // 도착 좌표
	#endY;

	constructor({startX, startY, color, endX, endY}) {
		this.#startX = startX;
		this.#startY = startY;
		this.#color = color;
		this.#endX = endX;
		this.#endY = endY;
	}

	draw(ctx) {
		ctx.lineWidth = 20;
		ctx.strokeStyle = this.#color;
		ctx.beginPath();
		ctx.moveTo(this.#startX, this.#startY);
		ctx.lineTo(this.#endX, this.#endY);
		ctx.stroke();
	}

	isDupl(color) {
		return this.#color == color;
	}
}