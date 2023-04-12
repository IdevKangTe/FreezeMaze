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
class inOutroCanvas {
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

	constructor() {
		console.log("in");
		// canvas 객체 생성 후 body노드의 맨 마지막 자식으로 추가
		this.#obj = document.createElement("canvas");
		this.#ctx = this.#obj.getContext("2d");
		document.body.append(this.#obj);
			
		// window.onresize = this.resize.bind(this);
		// this.resize();

		// 캔버스 설정
		this.#obj.width = window.innerWidth;
		this.#obj.height = window.innerHeight;

		this.#obj.style.position = "absolute";
		this.#obj.style.top = 0;
		this.#obj.style.display = this.#display;

		this.#logo = new Logo();
		this.#bkImage = new Background();
		this.#deltaTime = 0;
		this.#prevTime = 0;
		this.#now = 0;
	}

	get ctx() {
		return this.#ctx;
	}

	run(){
		// 프레임 처리

		this.#now = performance.now();

		this.#deltaTime = (this.#now - this.#prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
		this.#prevTime = this.#now;
		// 프레임 시간 계산
		
		this.#bkImage.update(ctx);
		this.#logo.update(ctx);
		
	   
		// 메인에서 이 메서드를 requestAnimationFrame에 답아서 반복 호출 해주세요.
		// 예시. let animate = function () {
		// 			inOutroCanvas의 객체.run();
		// requestAnimationFrame(animate);}
		// animate();
		// 이런 식으로 구동 필요.
	}


	

	// canvas 크기 변경
	// resize() {
	// 	this.#width = window.innerWidth;
	// 	this.#height = window.innerHeight;
	// }


	// renderer.setSize(window.innerWidth, window.innerHeight);
	// window.onresize = resize.bind(this);

	// function resize() {
	// 	canvas.width = window.innerWidth;
	// 	canvas.height = window.innerHeight;

	// 	camera.aspect = canvas.width / canvas.height;
	// 	camera.updateProjectionMatrix();

	// 	renderer.setSize(canvas.width, canvas.height);
	// };

	





}
