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
let camera, monster, mini;

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
({ scene, camera } = player.load(scene));

const sound = new Sound(player);
camera = sound.loadPlayerSound(camera);

let cube = [];
({ scene, map3D: cube} = load(scene));

const enemy = new Monster();
({ scene, monster } = enemy.load(scene));
monster = sound.loadMonsterSound(monster);

const item = new Item();
({ scene, mini } = item.load(scene));
mini = sound.loadItemSound(mini);

main.addEventListener('keydown', onKeyDown, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
main.addEventListener('keyup', onKeyUp, false);

function onKeyDown(e) {
  sound.musicPlay();
  player.move(e);
  // scene = mini.changeDoor(scene);
}

function onKeyUp(e) {
  player.ctrlUp(e);
}

let miniClear = [false,false,false];

function miniClearUpdate(miniClear){
  if(miniClear[0]){
    document.getElementById('clear1').style.opacity = 1;
  }
  if(miniClear[1]){
    document.getElementById('clear2').style.opacity = 1;
  }
  if(miniClear[2]){
    document.getElementById('clear3').style.opacity = 1;
  }
}

// ==========================
// 초기화 부분 끝
// ==========================

let deltaTime = 0;
let prevTime = 0;

let animate = function () {
  // 프레임 처리
  let now = performance.now();

  deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
  prevTime = now;

  player.update(deltaTime, cube, mini);
  document.getElementById('progress').value = player.stamina;

  miniClearUpdate(miniClear);

  item.update();

  if(!player.isLookDown){
    enemy.update(camera, deltaTime, cube);
  }

  sound.update(player, monster, item);

  // 랜더링을 수행합니다.
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
