import * as THREE from "three";
import load from "map";
import * as MONSTER from 'monster';
import { initItem, initItemLight } from 'item';
import {
	initItemNotification,
	initMonsterBGM,
	initFootstep,
	initBreath,
	initHeartbeat,
} from 'sound';

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
	const canvas = document.querySelector('#main');
	// ==========================
	// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
	// ==========================
	// 3차원 세계
	let scene = new THREE.Scene();
	let cube = [];

	// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.01,
		1000
	);

	const listner = new THREE.AudioListener();
	camera.add(listner);
	const footstep = initFootstep(listner);
	camera.add(footstep);
	const breath = initBreath(listner);
	camera.add(breath);
	const heartbeat = initHeartbeat(listner);
	camera.add(heartbeat);

	// 렌더러 정의 및 크기 지정, 문서에 추가하기
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
		preserveDrawingBuffer: true,
	});

	//캔버스 사이즈 지정하는 함수
	renderer.setSize(window.innerWidth, window.innerHeight);
	window.onresize = resize.bind(this);
	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		camera.aspect = canvas.width / canvas.height;
		camera.updateProjectionMatrix();

		renderer.setSize(canvas.width, canvas.height);
	};

	// document.body.appendChild(renderer.domElement);

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
	({ scene, map3D: cube } = load(scene));

	let isPause = false;

	// item (miniGame)
	const bulbLight = initItemLight();

	bulbLight.position.set(12, 4, 48);
	bulbLight.rotation.z = Math.PI;
	bulbLight.castShadow = true;
	scene.add(bulbLight);

	let item1 = initItem();

	item1.position.set(12, -0.47, 48);
	scene.add(item1);
	let itemSound = initItemNotification(listner);
	item1.add(itemSound);

	camera.position.set(1, 1, 48);

	const monster = MONSTER.initMonster();
	scene.add(monster);

	monster.position.set(48, 2, 2);

	function isCollison() {
		let Direction = new THREE.Vector3(0, 0, -1);
		camera.localToWorld(Direction);
		Direction.sub(camera.position).normalize();
		let Raycaster = new THREE.Raycaster(camera.position, Direction, 0, 0.6);
		let Intersects = [];

		for (var i in cube) {
			Intersects.push(Raycaster.intersectObject(cube[i]));
			if (Intersects[i].length > 0) {
				return true;
			}
		}
		return false;
	}

	window.addEventListener('keydown', moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
	window.addEventListener('keyup', stopRunning, false);

	var deltaTime = 0;
	var targetRotationY = camera.rotation.y; // 목표 회전 각도
	let downRotation = camera.rotation.x;
	var targetLocation = camera.position;
	var rotationSpeed = 10; // 회전 속도
	var smoothFactor = 0.2; // 이동 보간 계수
	var stamina = 100;
	let targetLocationY = camera.position.y;
	let locationDiffY = 0;

	var isRotating = false;
	var isMoving = false;
	let collison = false;
	let run = false;
	let notStartMusic = true;
	let isLookDown = false;
	let isFrontDirection = false;

	const monsterBGM = initMonsterBGM(listner);
	monster.add(monsterBGM);

	function moveSomething(e) {
		if (notStartMusic) {
			monsterBGM.play(); // 오디오를 재생합니다.
			itemSound.play();
			heartbeat.play();
			notStartMusic = false;
		}

		if (isRotating || isMoving) {
			return;
		} else {
			if (!footstep.isPlaying) {
				footstep.play();
			}

			if (e.keyCode == 17) {
				// 달리기
				rotationSpeed = 20;
				smoothFactor = 0.5;
				run = true;
				return;
			}

			if (e.keyCode == 37) {
				// 왼쪽 회전
				isRotating = true;
				targetRotationY += Math.PI / 2;
			} else if (e.keyCode == 38) {
				// 걷기
				collison = isCollison();

				if (!collison) {
					isMoving = true;
					targetLocation = camera.position
						.clone()
						.round()
						.add(cameraDirection.clone().round());
				}
			} else if (e.keyCode == 39) {
				// 오른쪽 회전
				targetRotationY -= Math.PI / 2;
			} else if (e.keyCode == 32) {
				// 스페이스바
				lookDown();
				setTimeout(() => {
					showGame2();
					console.log("isPause", isPause);
				}, 5000);
			} else if (e.keyCode == 40) {
				lookUp();
			}
		}
	}

	function lookDown() {
		let pause;
		if (
			Math.round(cameraDirection.z) == 1 &&
			Math.round(cameraDirection.x) == 0
		) {
			downRotation += Math.PI / 2;
			isFrontDirection = true;
		}
		if (
			Math.round(cameraDirection.z) == -1 &&
			Math.round(cameraDirection.x) == 0
		) {
			downRotation -= Math.PI / 2;
			isFrontDirection = false;
		}
		isLookDown = true;
		console.log('lookdown');
		targetLocationY = 0.3;

	}

	// 게임 실행
	function showGame2() {
		console.log("mini2");
		return false;
		// window.open("./mini2/mini1.html", "mini2");
	}

	function lookUp() {
		console.log("up");
		if (isFrontDirection) {
			downRotation -= Math.PI / 2;
		} else {
			downRotation += Math.PI / 2;
		}
		return false;
	}

	function stopRunning(e) {
		if (e.keyCode == 17) {
			rotationSpeed = 10; // 회전 속도
			smoothFactor = 0.2; // 이동 보간 계수
			run = false;
		}
	}

	document.getElementById('key1').style.opacity = 1;

	// ==========================
	// 초기화 부분 끝
	// ==========================

	let prevTime = 0;

	// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
	let animate = function () {
		// 프레임 처리
		let now = performance.now();

		deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
		prevTime = now;
		// 프레임 시간 계산

		// moveSomething 함수 등에서 사용할 cameraDirection, cameraPosition 변수 업데이트
		camera.getWorldDirection(cameraDirection);
		cameraPosition.copy(camera.position);

		let rotationDiff = targetRotationY - camera.rotation.y;
		camera.rotation.y += rotationDiff * rotationSpeed * deltaTime;
		// 카메라 y축 회전 구현

		let downRotationDiff = downRotation - camera.rotation.x;
		camera.rotation.x += downRotationDiff * rotationSpeed * deltaTime;
		// 카메라 z축 회전 구현

		if (camera.rotation.x - downRotation < 0.05 && isLookDown) {
			// z축 회전이 끝났을 때 카메라의 y축이 가까워지기 시작
			locationDiffY = Math.abs(camera.position.y - targetLocationY);
			camera.position.y -= locationDiffY * deltaTime * 0.5;
			if (locationDiffY < 0.2) {
				isLookDown = false; // 원하는 높이만큼 낮아졌을 때 y축 감소 멈춤
				isPause = true;
			}
		} else {
			// 카메라 이동시 부드러운 이동을 하도록 하는 함수
			var newPosition = camera.position
				.clone()
				.lerp(targetLocation, smoothFactor);
			// 현재 위치와 목표 위치를 보간하여 새로운 위치 계산
			camera.position.copy(newPosition);
			// console.log("newPosition");
		}

		// 카메라가 아직 돌고 있는지 확인
		if (Math.abs(targetRotationY - camera.rotation.y) > 0.05) {
			isRotating = true;
		} else {
			isRotating = false;
		}

		// 카메라가 아직 움직이고 있는지 확인
		// console.log(Math.abs(targetLocation.distanceTo(camera.position)));
		if (Math.abs(targetLocation.distanceTo(camera.position)) > 0.07) {
			isMoving = true;
		} else {
			isMoving = false;
		}

		bulbLight.rotation.y += 0.05;
		// 아이템 알림 전구 회전

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
		// 플레이어의 손전등 방향 및 위치 설정

		document.getElementById('progress').value = stamina;
		// 스태미나의 값에 맞춰서 progress 바 변화

		if (run) {
			// 달리는 중일 때
			stamina = stamina < 0 ? 0 : stamina - 0.3;
			// 스태미나 감소
			footstep.setVolume(1);
			footstep.setPlaybackRate(2);
			// 발걸음 소리 조정
		} else {
			// 달리지 않고 있을 때
			stamina = stamina > 100 ? 100 : stamina + 0.3;
			// 스태미나 증가
			footstep.setVolume(0.3);
			footstep.setPlaybackRate(1.2);
			// 발걸음 소리 조정
		}

		if (
			Math.abs(targetLocation.distanceTo(camera.position)) +
			Math.abs(targetRotationY - camera.rotation.y) <
			0.01
		) {
			// 플레이어가 움직이지도 돌지도 않을 경우
			footstep.pause();
		} // 발걸음 소리 중지

		if (stamina <= 0) {
			// 스태미나를 전부 썼을 때
			rotationSpeed = 10; // 회전 속도
			smoothFactor = 0.2; // 이동 보간 계수
			run = false;
			if (!breath.isPlaying) {
				// 숨소리가 재생중이 아니었다면
				breath.play(); // 숨소리 재생
			}
		}

		var MonsterDiff = monster.position.distanceTo(cameraPosition);
		monsterBGM.setVolume(1 / MonsterDiff < 0.07 ? 0 : 1 / MonsterDiff);
		// 몬스터와 플레이어의 거리를 계산해 몬스터BGM의 볼륨을 조정

		var itemDiff = item1.position.distanceTo(cameraPosition);
		itemSound.setVolume(
			1 / itemDiff < 0.1 ? 0 : 1 / itemDiff > 0.8 ? 0.8 : 1 / itemDiff
		);
		// 아이템 플레이어의 거리를 계산해 아이템BGM의 볼륨을 조정

		// setTimeout(moveMonster, 3000);

		// 랜더링을 수행합니다.
		renderer.render(scene, camera);
		if (!isPause) {
			requestAnimationFrame(animate);
		}
		else {
			console.log("pause");
			isPause = showGame2();
			!isPause && requestAnimationFrame(animate);
		}
	};


	// animate()함수를 최초에 한번은 수행해주어야 합니다.
	animate();
}

main();