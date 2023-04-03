import * as THREE from 'three';
// import { map } from './map.js';
import load from './map.js';
import Item from './item.js';
import Sound from './sound.js';
import Player from './player.js';
import Monster from './monster.js';
// import { RoundedBoxGeometry } from './node_modules/three-rounded-box/package.json';
// ==========================
// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
// ==========================
// 3차원 세계
let scene = new THREE.Scene();
let camera, cameraLight, monster, map2D, item, itemLight;

// 렌더러 정의 및 크기 지정, 문서에 추가하기
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.fog = new THREE.Fog(0x000000, 0, 30);

const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

const player = new Player();
({ scene, camera, cameraLight } = player.load(scene));

const sound = new Sound(player);
camera = sound.loadPlayerSound(camera);

let cameraDirection = new THREE.Vector3();
let cameraPosition = new THREE.Vector3();

let cube = [];
({ scene, map3D: cube, map2D } = load(scene));

let vis = JSON.parse(JSON.stringify(map2D));

const enemy = new Monster();
({ scene, monster } = enemy.load(scene));
monster = sound.loadMonsterSound(monster);

const mini = new Item();
({scene, item, itemLight} = mini.load(scene));
item = sound.loadItemSound(item);

window.addEventListener('keydown', moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
window.addEventListener('keyup', stopRunning, false);

let deltaTime = 0;
let targetRotationY = camera.rotation.y; // 목표 회전 각도
let downRotation = camera.rotation.x;
let targetLocation = camera.position;
let cameraDirPos = cameraPosition.add(cameraDirection);
let stamina = 100;
let targetLocationY = camera.position.y;
let locationDiffY = 0;

let monsterTarget = monster.position.clone();
let monstertargetY = 0;

let isRotating = false;
let isMoving = false;
let monsterIsMoving = false;
let collison = false;
let run = false;
let notStartMusic = true;


// const monsterBGM = initMonsterBGM(listner);
// monster.add(monsterBGM);

function moveSomething(e) {
  if (notStartMusic) {
    sound.musicPlay();
    notStartMusic = false;
  }

  if (isRotating || isMoving) {
    return;
  } else {
    if (!sound.footstep.isPlaying) {
      sound.footstep.play();
    }

    if (e.ctrlKey) {
      player.run();
      run = true;
    }
    if (e.keyCode == 37) {
      isRotating = true;
      targetRotationY += Math.PI / 2;
    } else if (e.keyCode == 38) {
      collison = player.isCollison(cube);

      if (!collison) {
        isMoving = true;
        targetLocation = camera.position
          .clone()
          .round()
          .add(cameraDirection.clone().round());
      }
    } else if (e.keyCode == 39) {
      targetRotationY -= Math.PI / 2;
    } else if (e.keyCode == 32) {
      targetLocationY = 0.3;
      downRotation = player.lookDownCheck(cameraDirection, downRotation);
    } else if (e.keyCode == 40) {
      downRotation = lookUp(downRotation);
    }
  }
}

function stopRunning(e) {
  player.stopRun(e);
  run = false;
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
  cameraPosition.copy(camera.position);
  camera.getWorldDirection(cameraDirection);
  cameraDirPos = cameraPosition.add(cameraDirection);

  player.light(cameraDirPos, cameraDirection);

  camera.position.copy(player.move(targetLocation));
  camera.rotation.y += player.cameraRotate(targetRotationY, deltaTime);
  camera.rotation.x += player.lookDown(downRotation, deltaTime);

  // 카메라가 아직 돌고 있는지 확인
  isRotating = player.rotationCheck(targetRotationY);
  // 카메라가 아직 움직이고 있는지 확인
  isMoving = player.movingCheck(targetLocation);

  if (camera.rotation.x - downRotation < 0.05 && player.isLookDown) {
    // z축 회전이 끝났을 때 카메라의 y축이 가까워지기 시작
    locationDiffY = Math.abs(camera.position.y - targetLocationY);
    camera.position.y -= locationDiffY * deltaTime * 0.5;
    if (locationDiffY < 0.2) {
      player.isLookDown = false; // 원하는 높이만큼 낮아졌을 때 y축 감소 멈춤
    }
  }

  itemLight.rotation.y += 0.05;
  // 아이템 알림 전구 회전

  enemy.enemyLight();

  if (monstertargetY >= 0.02) {
    monstertargetY = -monstertargetY;
  } else {
    monstertargetY += 0.01 * deltaTime * 4;
  }

  monsterIsMoving = enemy.movingCheck(monsterTarget);

  if (!monsterIsMoving) {
    // 몬스터가 이동을 완료한 경우
    monster.position.x = monsterTarget.x;
    monster.position.z = monsterTarget.z;
    monsterTarget = enemy.moving(cube, camera, vis, monsterTarget);
  }
  monster.position.copy(monster.position.clone().add(enemy.move(deltaTime, monsterTarget, monstertargetY)));

  document.getElementById('progress').value = stamina;
  // 스태미나의 값에 맞춰서 progress 바 변화

  if (run) {
    stamina = stamina < 0 ? 0 : stamina - 0.3;
    sound.run();
  } else {
    stamina = stamina > 100 ? 100 : stamina + 0.3;
    sound.notRun();
  }

  if (
    Math.abs(targetLocation.distanceTo(camera.position)) +
      Math.abs(targetRotationY - camera.rotation.y) <
    0.01
  ) {
    sound.footstep.pause();
  }

  if (stamina <= 0) {
    // 스태미나를 전부 썼을 때
    player.stopRun();
    run = false;
    
  }

  var MonsterDiff = monster.position.distanceTo(cameraPosition);
  sound.monsterBGM.setVolume(1 / MonsterDiff < 0.07 ? 0 : 1 / MonsterDiff);
  // 몬스터와 플레이어의 거리를 계산해 몬스터BGM의 볼륨을 조정

  var itemDiff = item.position.distanceTo(cameraPosition);
  sound.itemNotification.setVolume(
    1 / itemDiff < 0.1 ? 0 : 1 / itemDiff > 0.8 ? 0.8 : 1 / itemDiff
  );
  // 아이템 플레이어의 거리를 계산해 아이템BGM의 볼륨을 조정

  // 랜더링을 수행합니다.
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();
