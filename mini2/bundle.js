export default class Bundle {

	#w;
	#h;
	#x;

	// 원본
	#bundleImg; // 단선 번들이미지
	#bWidth; // 번들이미지 가로 길이
	#bHeight; // 번들이미지 세로 길이

	// 브라우저 비율에 맞춘 단선 길이
	#rx; // 브라우저용 번들 가로 길이
	#ry; // 브라우저용 번들 세로 길이

	// 단선
	#leftRed;
	#leftYellow;
	#leftGreen;
	#leftBlue;
	#rightRed;
	#rightYellow;
	#rightGreen;
	#rightBlue;

	constructor() {
		this.#w = window.innerWidth/2;
		this.#h = window.innerHeight;
		this.#x = (window.innerWidth - this.#w) / 2;

		// 번들이미지(원본)
		this.#bundleImg = document.getElementById("mini2bg");
		this.#bWidth = 61;
		this.#bHeight = 107;

		// 원본 대비 단선 가로 세로 길이
		this.#rx = this.#bWidth * this.#w / 1280; // 원본이미지 가로 1280
		this.#ry = this.#bHeight * this.#h / 1980; // 원본이미지 세로 1980 

		this.#leftRed = { x: this.#x + this.#w * 0.145, y: this.#h * 0.23 };
		this.#leftYellow = { x: this.#x + this.#w * 0.145, y: this.#h * 0.4 };
		this.#leftBlue = { x: this.#x + this.#w * 0.145, y: this.#h * 0.56 };
		this.#leftGreen = { x: this.#x + this.#w * 0.145, y: this.#h * 0.72 };
		this.#rightYellow = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.23 };
		this.#rightGreen = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.4 };
		this.#rightRed = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.56 };
		this.#rightBlue = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.72 };

	}

	draw(ctx) {
		// 단선 그리기
		// ctx.rotate(20*Math.PI/180);




		ctx.resetTransform();

		ctx.drawImage(this.#bundleImg,
			186, 346 + this.#bHeight, this.#bWidth, this.#bHeight,
			this.#leftRed.x, this.#leftRed.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			186, 346 + this.#bHeight + 320, this.#bWidth, this.#bHeight,
			this.#leftYellow.x, this.#leftYellow.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			186, 346 + this.#bHeight + 680, this.#bWidth, this.#bHeight,
			this.#leftBlue.x, this.#leftBlue.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			186, 346 + this.#bHeight + 1000, this.#bWidth, this.#bHeight,
			this.#leftGreen.x, this.#leftGreen.y, this.#rx, this.#ry
		);

		ctx.drawImage(this.#bundleImg,
			1033, 346 + this.#bHeight, this.#bWidth, this.#bHeight,
			this.#rightYellow.x, this.#rightYellow.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			1033, 346 + this.#bHeight + 320, this.#bWidth, this.#bHeight,
			this.#rightGreen.x, this.#rightGreen.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			1033, 346 + this.#bHeight + 680, this.#bWidth, this.#bHeight,
			this.#rightRed.x, this.#rightRed.y, this.#rx, this.#ry
		);
		ctx.drawImage(this.#bundleImg,
			1033, 346 + this.#bHeight + 1000, this.#bWidth, this.#bHeight,
			this.#rightBlue.x, this.#rightBlue.y, this.#rx, this.#ry
		);

		// console.log(Math.PI);
		// const d = 180 * Math.PI / 180;
		// const sin = Math.sin(Math.PI / 6);
		// const cos = Math.cos(Math.PI / 6);
		// ctx.rotate(25 * (Math.PI / 180));
		// ctx.fillStyle = "red";
		// ctx.fillRect(0, 0, 10, 10);
		// ctx.translate(this.#leftRed.x+this.#rx, this.#leftRed.y);
		// ctx.translate(this.#leftRed.x+this.#rx-2, this.#leftRed.y-1);
		// ctx.fillRect(0, 0, this.#rx, this.#ry);
		// ctx.transform(1, d, 0, 1, this.#leftRed.x+this.#rx-2, this.#leftRed.y-1);
		// ctx.fillRect(0, 0, this.#rx, this.#ry);
		// ctx.drawImage(this.#bundleImg,
		// 	216, 346 + this.#bHeight, this.#bWidth-40, this.#bHeight,
		// 	0, 0, this.#rx, this.#ry
		// );
		// ctx.translate(-this.#leftRed.x, -this.#leftRed.y);
		// ctx.translate(-this.#leftRed.x-this.#rx, -this.#leftRed.y);


	}

	// 클릭 이벤트 좌표정보(전선 크기)
	setPoint() {
		let bundlePoint = {
			startX: this.#rx,
			startY: this.#ry,
			leftRed: this.#leftRed,
			leftYellow: this.#leftYellow,
			leftGreen: this.#leftGreen,
			leftBlue: this.#leftBlue,
			rightRed: this.#rightRed,
			rightYellow: this.#rightYellow,
			rightGreen: this.#rightGreen,
			rightBlue: this.#rightBlue,
		}

		return bundlePoint;
	}

	// 왼쪽 오른쪽
	setSide(x, y) {
		if (
			this.#leftRed.x < x && x < this.#leftRed.x + this.#rx &&
			this.#leftRed.y < y && y < this.#leftRed.y + this.#ry ||
			this.#leftYellow.x < x && x < this.#leftYellow.x + this.#rx &&
			this.#leftYellow.y < y && y < this.#leftYellow.y + this.#ry ||
			this.#leftGreen.x < x && x < this.#leftGreen.x + this.#rx &&
			this.#leftGreen.y < y && y < this.#leftGreen.y + this.#ry ||
			this.#leftBlue.x < x && x < this.#leftBlue.x + this.#rx &&
			this.#leftBlue.y < y && y < this.#leftBlue.y + this.#ry
		)
			return "left";
		if (
			this.#rightRed.x < x && x < this.#rightRed.x + this.#rx &&
			this.#rightRed.y < y && y < this.#rightRed.y + this.#ry ||
			this.#rightYellow.x < x && x < this.#rightYellow.x + this.#rx &&
			this.#rightYellow.y < y && y < this.#rightYellow.y + this.#ry ||
			this.#rightGreen.x < x && x < this.#rightGreen.x + this.#rx &&
			this.#rightGreen.y < y && y < this.#rightGreen.y + this.#ry ||
			this.#rightBlue.x < x && x < this.#rightBlue.x + this.#rx &&
			this.#rightBlue.y < y && y < this.#rightBlue.y + this.#ry
		)
			return "right";
		return null;
	}

	// 색상
	setColor(x, y) {
		if (
			this.#leftRed.x < x && x < this.#leftRed.x + this.#rx &&
			this.#leftRed.y < y && y < this.#leftRed.y + this.#ry ||
			this.#rightRed.x < x && x < this.#rightRed.x + this.#rx &&
			this.#rightRed.y < y && y < this.#rightRed.y + this.#ry
		)
			return "Red";
		if (
			this.#leftYellow.x < x && x < this.#leftYellow.x + this.#rx &&
			this.#leftYellow.y < y && y < this.#leftYellow.y + this.#ry ||
			this.#rightYellow.x < x && x < this.#rightYellow.x + this.#rx &&
			this.#rightYellow.y < y && y < this.#rightYellow.y + this.#ry
		)
			return "Yellow";
		if (
			this.#leftGreen.x < x && x < this.#leftGreen.x + this.#rx &&
			this.#leftGreen.y < y && y < this.#leftGreen.y + this.#ry ||
			this.#rightGreen.x < x && x < this.#rightGreen.x + this.#rx &&
			this.#rightGreen.y < y && y < this.#rightGreen.y + this.#ry
		)
			return "Green";
		if (
			this.#leftBlue.x < x && x < this.#leftBlue.x + this.#rx &&
			this.#leftBlue.y < y && y < this.#leftBlue.y + this.#ry ||
			this.#rightBlue.x < x && x < this.#rightBlue.x + this.#rx &&
			this.#rightBlue.y < y && y < this.#rightBlue.y + this.#ry
		)
			return "Blue";
		return null;
	}

	resize() {
		this.#h = window.innerHeight;
		this.#x = (window.innerWidth - this.#w) / 2;

		this.#rx = this.#bWidth * this.#w / 1280; // 원본이미지 가로 1280
		this.#ry = this.#bHeight * this.#h / 1980; // 원본이미지 세로 1980 

		this.#leftRed = { x: this.#x + this.#w * 0.145, y: this.#h * 0.23 };
		this.#leftYellow = { x: this.#x + this.#w * 0.145, y: this.#h * 0.4 };
		this.#leftBlue = { x: this.#x + this.#w * 0.145, y: this.#h * 0.56 };
		this.#leftGreen = { x: this.#x + this.#w * 0.145, y: this.#h * 0.72 };
		this.#rightYellow = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.23 };
		this.#rightGreen = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.4 };
		this.#rightRed = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.56 };
		this.#rightBlue = { x: window.innerWidth - (this.#x + this.#w * 0.145 + this.#rx), y: this.#h * 0.72 };
	}

	update() {
		
	}
	
}