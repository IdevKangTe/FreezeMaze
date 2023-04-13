import * as THREE from 'three';
// import { map } from './map.js';
import Map from './js/map.js';
import Item from './js/item.js';
import Sound from './js/sound.js';
import Player from './js/player.js';
import Monster from './js/monster.js';
import Game1 from './mini1/mini1.js';
import Game2 from './mini2/mini2.js';
import Game3 from './mini3/mini3.js';
// import { RoundedBoxGeometry } from './node_modules/three-rounded-box/package.json';
function main() {
  // ==========================
  // 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
  // ==========================
  // 3차원 세계
  let scene = new THREE.Scene();
  let camera, monster, mini;

  const main = document.createElement('canvas');
  let renderer = new THREE.WebGLRenderer({
    canvas: main,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.insertBefore(renderer.domElement, document.body.firstChild);
  main.tabIndex = 0;
  main.focus();
  main.style.position = "relative";
  main.style.zIndex = 0;


  scene.fog = new THREE.Fog(0x000000, 0, 30);

  const light = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(light);
  let isPause = false;
  const player = new Player();
  player.isPauseCheck = function () {
    isPause = true;
  };
  ({ scene, camera } = player.load(scene));

  const sound = new Sound(player);
  camera = sound.loadPlayerSound(camera);

  let cube = [];
  let map2D = [];
  const map = new Map();
  ({ scene, map3D: cube, map2D } = map.load(scene));

  const enemy = new Monster(map2D);
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


  const miniClear = [true, true, false]; // 미니게임 클리어 여부

  function miniClearUpdate() {
    if (miniClear[0]) {
      document.getElementById('clear1').style.opacity = 1;
    }
    if (miniClear[1]) {
      document.getElementById('clear2').style.opacity = 1;
    }
    if (miniClear[2]) {
      document.getElementById('clear3').style.opacity = 1;
    }
  }

  const miniPosition = [[27, 15], [42, 44]];

  function allMiniGameClear(num) {
    if (miniClear[2] == false) {
      item.miniPositionChange(miniPosition[num - 1]);
      return;
    }
    sound.escapeOpenPlay();
    scene = item.changeDoor(scene);
    scene.remove(item.mini);
    scene.remove(item.miniLight);
  }

  function gameClear() {
    document.getElementById('info').style.display = 'none';
    scene.fog = null;
    scene.remove(monster);
    scene.remove(item.mini);
    scene.remove(item.miniLight);
    scene.remove(item.doorLigth);
    scene.remove(player.spotLight);
    scene.remove(enemy.monsterLight);
    light.intensity = 0.5;
    sound.pause();
    player.gameClearAnimate();
  }

  // ==========================
  // 초기화 부분 끝
  // ==========================

  let deltaTime = 0;
  let prevTime = 0;


  const progress = document.getElementById('progress');

  let animate = function () {
    // 프레임 처리
    let now = performance.now();

    deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
    prevTime = now;


    player.update(deltaTime, cube, mini);
    progress.value = player.stamina;

    item.update();

    if (!player.isLookDown) {
      enemy.update(camera, deltaTime, cube);
    }

    sound.update(player, monster, item);

    // 랜더링을 수행합니다.
    renderer.render(scene, camera);
    if (!isPause) {
      sound.musicPlay();
      requestAnimationFrame(animate);
    }
    else {
      sound.pause();
      playMiniGame();
    }
  };

  animate();

  // 미니게임 실행
  function playMiniGame() {
    for (let idx in miniClear) {
      if (!miniClear[idx]) {
        const game = eval(`new Game${idx * 1 + 1}()`);
        game.isClear = function (num) {
          isPause = false;
          miniClear[num - 1] = true;
          prevTime = performance.now();
          sound.miniBGPause();
          sound.miniClearPlay();
          miniClearUpdate();
          allMiniGameClear(num);
          requestAnimationFrame(animate);
          main.focus();
        }
        sound.miniBGPlay();
        game.run();
        return;
      };
    }
  }


}

window.onload = function () {
  main();
}