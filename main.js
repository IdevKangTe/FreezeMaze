import * as THREE from "three";
// import load from './map.js';
import load from 'map';
// import { mini1 } from './miniGames/mini1';

/**
	const dataSet = {
		scene,
		camera,
		renderer
		cube
	}
 * 
 */


function main() {
	const canvas = document.querySelector('#game1');
	// ==========================
	// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
	// ==========================
	// 3차원 세계
	let scene = new THREE.Scene();
	let map3D = [];

	// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
	const camera = new THREE.PerspectiveCamera(
		75,
		(window.innerWidth) / window.innerHeight,
		0.01,
		25
	);

	// 렌더러 정의 및 크기 지정, 문서에 추가하기
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
		preserveDrawingBuffer: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	scene.fog = new THREE.Fog(0x000000, 0, 30);

	const light = new THREE.AmbientLight(0xffffff, 0.1);
	scene.add(light);

	const spotLight = new THREE.SpotLight(0xffffff, 1, 70, Math.PI / 8, 0.7, 1);
	spotLight.rotation.x += 45;
	spotLight.castShadow = true;
	scene.add(spotLight);
	scene.add(spotLight.target);

	const cameraDirection = new THREE.Vector3();
	const cameraPosition = new THREE.Vector3();
	camera.getWorldDirection(cameraDirection);
	cameraPosition.copy(camera.position);

	// map
	({scene, map3D} = load(scene));

	// item (miniGame)
	let lightDiff;

	const bulbGeometry = new THREE.ConeGeometry(0.3, 0.7, 4);
	const bulbLight = new THREE.PointLight(0xffcccc, 1, 30, 2);

	const bulbMat = new THREE.MeshStandardMaterial({
		emissive: 0xffffee,
		emissiveIntensity: 1,
		color: 0x000000,
	});
	bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
	bulbLight.position.set(12, 4, 48);
	bulbLight.rotation.z = Math.PI;
	bulbLight.castShadow = true;
	scene.add(bulbLight);

	// 카메라 시점
	camera.position.x = 1;
	camera.position.z = 48;
	camera.position.y = 1;
	// camera.position.x = 12;
	// camera.position.z = 48;
	// camera.position.y = 15;

	// camera.rotation.x = -1.55;

	// 충돌함수
	function isCollison() {
		const Direction = new THREE.Vector3(0, 0, -1);
		camera.localToWorld(Direction);
		Direction.sub(camera.position).normalize();
		const Raycaster = new THREE.Raycaster(camera.position, Direction, 0, 0.3);
		let Intersects = [];

		for (let i in map3D) {
			Intersects.push(Raycaster.intersectObject(map3D[i]));
			if (Intersects[i].length > 0) {
				return true;
			}
		}
		return false;
	}

	let deltaTime = 0;
	let targetRotationY = camera.rotation.y; // 목표 회전 각도
	let targetLocation = camera.position;
	const deltaSpeed = 70; // 카메라 이동 속도
	const rotationSpeed = 5; // 회전 속도
	const smoothFactor = 0.1; // 이동 보간 계수

	let isRotating = false;
	let collison = false;


	// movement



	let isWalk = false;
	let spacePressed = false;

	function moveSomething(e) {
		// 해당 키보드 기본 동작 취소
		e.preventDefault();
		// console.log(e.code);
		if (isRotating) {
			return;
		}

		if (e.code === "Space") {
			playGame(e);
			spacePressed = true;
		}
		if (["ArrowLeft", "ArrowUp", "Space", "ArrowDown", "ArrowRight", "ControlLeft"].includes(e.code)) {
			if (e.code === "ArrowLeft") {
				isRotating = true;
				targetRotationY += Math.PI / 2;
			}
			else if (e.code === "ArrowUp") {
				walk(e);
				isWalk = true;
			}
			else if (e.code === "ArrowRight") {
				targetRotationY -= Math.PI / 2;
			}

		}
	}


	const item1 = {
		position: {
			x: 12,
			y: 1,
			z: 48
		}
	};


	function walk(e) {
		// up key pressed
		collison = isCollison();
		// playGame(e);

		if (!collison) {
			const targetLocation = camera.position
				.clone()
				.add(
					cameraDirection.clone().multiplyScalar(deltaSpeed * deltaTime)
				);
			const positionDiff = targetLocation.clone().sub(camera.position);
			const positionAmount = positionDiff.multiplyScalar(smoothFactor);
			camera.position.add(positionAmount);
		}

		if (spacePressed) {
			// walk(e);
		}
	}


	function playGame(e) {
		// 기본 동작 취소
		// 아이템 사정거리 +- 1 안으로 들어왔을 때 space 누르면 동작
		if (item1.position.x - 1 < camera.position.x && camera.position.x < item1.position.x + 1 &&
			item1.position.z - 1 < camera.position.z && camera.position.z < item1.position.z + 1) {
			alert('space');
			if (e.code === "Space") {
				miniGame();
			}
		}
	}


	function miniGame() {
		const mini = document.querySelector('#mini');
		mini.style.display = 'flex';
	}



	window.addEventListener('keydown', moveSomething); // 키 다운 이벤트 실행시 moveSomting 함수실행

	// ==========================
	// 초기화 부분 끝
	// ==========================





	let prevTime = 0;

	// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
	const animate = function () {
		// 프레임 처리
		const now = performance.now();

		deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
		prevTime = now;

		// 현재 회전 각도와 목표 회전 각도 사이의 차이를 계산합니다.
		const rotationDiff = targetRotationY - camera.rotation.y;

		// 회전 각도를 서서히 변화시킵니다.
		camera.rotation.y += rotationDiff * rotationSpeed * deltaTime;

		if (Math.abs(targetRotationY - camera.rotation.y) > 0.02) {
			isRotating = true;
		} else {
			isRotating = false;
		}

		// moveSomething 함수 등에서 사용할 cameraDirection, cameraPosition 변수 업데이트
		camera.getWorldDirection(cameraDirection);
		cameraPosition.copy(camera.position);

		//   lightDiff = bulbLight.position.distanceTo(cameraPosition);
		// bulbLight.intensity = (lightDiff)/10 >1? 1: lightDiff/10;
		bulbLight.rotation.y += 0.05;

		var cameraDirPos = cameraPosition.add(cameraDirection);
		spotLight.position.set(
			camera.position.x,
			camera.position.y + 0.01,
			camera.position.z
		);
		spotLight.target.position.set(
			cameraDirPos.x,
			cameraDirPos.y - 0.4,
			cameraDirPos.z
		);
		spotLight.lookAt(cameraDirection);

		// 랜더링을 수행합니다.
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	};

	// animate()함수를 최초에 한번은 수행해주어야 합니다.
	animate();
}

main();