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

let main = document.createElement('canvas');
let renderer = new THREE.WebGLRenderer({
  canvas: main,
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
main.tabIndex = 0;
main.focus();

scene.fog = new THREE.Fog(0x000000, 0, 30);

const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

const player = new Player();
({ scene, camera, cameraLight } = player.load(scene));

const sound = new Sound(player);
camera = sound.loadPlayerSound(camera);

let cube = [];
({ scene, map3D: cube, map2D } = load(scene));

const vis = JSON.parse(JSON.stringify(map2D));

const enemy = new Monster();
({ scene, monster } = enemy.load(scene));
monster = sound.loadMonsterSound(monster);

const mini = new Item();
({ scene, item, itemLight } = mini.load(scene));
item = sound.loadItemSound(item);

main.addEventListener('keydown', moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
// main.addEventListener('keyup', stopRunning, false);

let deltaTime = 0;
// let nextGo = 0;

// let monsterTarget = monster.position.clone();
// let monstertargetY = 0;
// let monsterPosition = monster.position.clone();
// let monsterSpeed = 4;

// let monsterIsMoving = false;
// let isMad = false;

// const monsterBGM = initMonsterBGM(listner);
// monster.add(monsterBGM);

function moveSomething(e) {
  sound.musicPlay();
  player.move(e);
  if (!sound.footstep.isPlaying) {
    sound.footstep.play();
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

  player.update(deltaTime, cube);
  document.getElementById('progress').value = player.stamina;

  itemLight.rotation.y += 0.05;
  // 아이템 알림 전구 회전

  // enemy.enemyLight();

  // var itemDiff = item.position.distanceTo(cameraPosition);
  // sound.itemNotification.setVolume(
  //   1 / itemDiff < 0.1 ? 0 : 1 / itemDiff > 0.8 ? 0.8 : 1 / itemDiff
  // );
  // 아이템 플레이어의 거리를 계산해 아이템BGM의 볼륨을 조정

  // 랜더링을 수행합니다.
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();
