import * as THREE from 'three';
// import { map } from './map.js';
import load from './map.js';
import { FBXLoader } from './node_modules/three/examples/jsm/loaders/FBXLoader.js';
import * as MONSTER from './monster.js';
import { initItem, initItemLight } from './item.js';
import {
  initItemNotification,
  initMonsterBGM,
  initFootstep,
  initBreath,
  initHeartbeat,
} from './sound.js';
// import { RoundedBoxGeometry } from './node_modules/three-rounded-box/package.json';
// ==========================
// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
// ==========================
// 3차원 세계
let scene = new THREE.Scene();

// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera(
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
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.fog = new THREE.Fog(0x000000, 0, 30);

var light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff, 1, 70, Math.PI / 8, 0.7, 1);
spotLight.rotation.x += 45;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

var cameraDirection = new THREE.Vector3();
var cameraPosition = new THREE.Vector3();

var floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000, 100, 100),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
floor.rotateX(-Math.PI / 2);
scene.add(floor);
let cube = [];
({ scene, map3D: cube } = load(scene));

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

// monsterLight.target.position.set(monster.position.copy());
// const monsterLight = MONSTER.initMonsterLight();
// scene.add(monsterLight);
// scene.add(monsterLight.target);

// monsterLight.rotation.x += 90;
// monsterLight.castShadow = true;

// monsterLight.position.copy(monster.position);
// monsterLight.target.position.x += 1;
// monsterLight.position.y += 2;
// var spotLighthelper = new THREE.SpotLightHelper(monsterLight);
// scene.add(spotLighthelper);

// monster.rotation.y -= Math.PI / 2;
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

var isRotating = false;
var isMoving = false;
let collison = false;
let run = false;
let outOfStamina = false;
let notStartMusic = true;
let isDownDirectionX = true;

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
      // console.log(
      //   Math.round(cameraDirection.x),
      //   Math.round(cameraDirection.y),
      //   Math.round(cameraDirection.z)
      // );
      isRotating = true;
      targetRotationY += Math.PI / 2;
    } else if (e.keyCode == 38) {
      //걷기
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
      // camera.rotation.y -= Math.PI / 2;
      // console.log(targetRotationY);
    } else if (e.keyCode == 32) {
      // 스페이스바
      // camera.rotation.order = 'YXZ'; // 회전 순서 변경
      // camera.rotation.y = Math.PI; // y축 회전
      // camera.rotation.z = -Math.PI / 2; // x축 회전
      // lookDown();
      // camera.rotation.x -= Math.PI / 2;
      // targetRotationY -= Math.PI / 2;
      // camera.rotation.x -= Math.PI / 2;
      // camera.rotation.y += Math.PI / 2;
      // console.log(camera.rotation);
      // console.log(cameraDirection);
      // ({ downRotation, isDownDirectionX } = lookDown());
      // console.log(cameraDirection);
    }
  }
}

function lookDown() {
  // 바닥 방향을 나타내는 벡터를 설정합니다.
  // const downDirection = new THREE.Vector3(0, 1, 0).add(cameraDirection);

  // camera.lookAt(downDirection);
  // // 바닥 방향 벡터와 카메라 방향 벡터의 각도를 계산합니다.
  // const angle = downDirection.angleTo(cameraDirection);
  // console.log(angle);

  // // 카메라가 바닥을 보도록 회전값을 설정합니다.
  // const downRotation = angle + Math.PI / 2;
  // console.log(downRotation);

  // 카메라의 z 축 회전값을 설정합니다.
  // camera.rotation.z = 0;

  // lookDown() 함수를 호출하여 카메라 회전값을 적용합니다.
  // console.log(downRotation);
  // // downRotation = camera.rotation.x;
  if (
    Math.round(cameraDirection.x) == 1 &&
    Math.round(cameraDirection.z) == 0
  ) {
    isDownDirectionX = false;
    downRotation -= Math.PI / 2;
  } else if (
    Math.round(cameraDirection.x) == -1 &&
    Math.round(cameraDirection.z) == 0
  ) {
    isDownDirectionX = false;
    downRotation -= Math.PI / 2;
  } else if (
    Math.round(cameraDirection.x) == 0 &&
    Math.round(cameraDirection.z) == -1
  ) {
    downRotation = camera.rotation.z;
    isDownDirectionX = true;
    downRotation += Math.PI / 2;
  } else if (
    Math.round(cameraDirection.x) == 0 &&
    Math.round(cameraDirection.z) == 1
  ) {
    downRotation = camera.rotation.z;
    isDownDirectionX = true;
    downRotation += Math.PI / 2;
  }
  console.log(isDownDirectionX);
  return { downRotation, isDownDirectionX };
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

var prevTime = 0;
var staminaTime = 0;

// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
var animate = function () {
  // 프레임 처리
  var now = performance.now();

  deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
  prevTime = now;

  // 현재 회전 각도와 목표 회전 각도 사이의 차이를 계산합니다.
  var rotationDiff = targetRotationY - camera.rotation.y;

  // 회전 각도를 서서히 변화시킵니다.
  camera.rotation.y += rotationDiff * rotationSpeed * deltaTime;

  // if (isDownDirectionX) {
  //   let downRotationDiff = downRotation - camera.rotation.x;
  //   camera.rotation.x += downRotationDiff * rotationSpeed * deltaTime;
  // } else {
  //   let downRotationDiff = camera.rotation.x - downRotation;
  //   camera.rotation.x -= downRotationDiff * rotationSpeed * deltaTime;
  // }

  //   let rotationDiffX = downRotation - camera.rotation.x;
  //   camera.rotation.x += rotationDiffX * rotationSpeed * deltaTime;
  // }
  // camera.position.y = camera.position.y < 0.5 ? 0.5 : camera.position.y - 0.1;

  if (Math.abs(targetRotationY - camera.rotation.y) > 0.05) {
    isRotating = true;
  } else {
    isRotating = false;
  }

  // moveSomething 함수 등에서 사용할 cameraDirection, cameraPosition 변수 업데이트
  camera.getWorldDirection(cameraDirection);
  cameraPosition.copy(camera.position);

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

  // monsterLight.position.set(
  //   monster.position.x,
  //   monster.position.y + 2,
  //   monster.position.z
  // );
  // // monsterLight.lookAt(monsterLight.target);
  // // monsterLight.target.rotation.y += 0.1;
  // monsterLight.target.position.set(monster.position.copy());
  // monsterLight.target.position.x += 1;

  var newPosition = camera.position.clone().lerp(targetLocation, smoothFactor); // 현재 위치와 목표 위치를 보간하여 새로운 위치 계산
  camera.position.copy(newPosition);
  // console.log(newPosition.sub(camera.position));

  if (Math.abs(targetLocation.distanceTo(camera.position)) > 0.07) {
    isMoving = true;
  } else {
    isMoving = false;
  }

  if (run) {
    stamina = stamina < 0 ? 0 : stamina - 0.3;
    footstep.setVolume(1);
    footstep.setPlaybackRate(2);
  } else {
    stamina = stamina > 100 ? 100 : stamina + 0.3;
    footstep.setVolume(0.3);
    footstep.setPlaybackRate(1.2);
  }

  if (
    Math.abs(targetLocation.distanceTo(camera.position)) +
      Math.abs(targetRotationY - camera.rotation.y) <
    0.01
  ) {
    footstep.pause();
  }

  document.getElementById('progress').value = stamina;

  if (stamina <= 0) {
    outOfStamina = true;
    staminaTime = now;
    rotationSpeed = 10; // 회전 속도
    smoothFactor = 0.2; // 이동 보간 계수
    run = false;
    if (!breath.isPlaying) {
      breath.play();
    }
  }

  var MonsterDiff = monster.position.distanceTo(cameraPosition);
  monsterBGM.setVolume(1 / MonsterDiff < 0.07 ? 0 : 1 / MonsterDiff);

  var itemDiff = item1.position.distanceTo(cameraPosition);
  itemSound.setVolume(1 / itemDiff < 0.1 ? 0 : 1 / itemDiff);

  // setTimeout(moveMonster, 3000);

  // 랜더링을 수행합니다.
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();
