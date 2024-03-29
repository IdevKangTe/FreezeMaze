import * as THREE from "three";
import Map from "./js/map.js";
import Item from "./js/item.js";
import Sound from "./js/sound.js";
import Player from "./js/player.js";
import Monster from "./js/monster.js";
import Game1 from "./mini1/mini1.js";
import Game2 from "./mini2/mini2.js";
import Game3 from "./mini3/mini3.js";
import TutorialCanvas from "./js/tutorialCanvas.js";
import InOutroCanvas from "./in-outro/inOutroCanvas.js";

export default function main() {
  // ==========================
  // 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
  // ==========================
  // 3차원 세계
  let scene = new THREE.Scene();
  let camera, monster, mini;

  const main = document.createElement("canvas");
  let renderer = new THREE.WebGLRenderer({
    canvas: main,
    antialias: true,
    preserveDrawingBuffer: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.insertBefore(renderer.domElement, document.body.firstChild);
  const info = document.getElementById("info");

  let tutorial = null;

  tutorial = new TutorialCanvas();

  tutorial.run();
  tutorial.isClear = function () {
    main.tabIndex = 1;
    main.focus();
    main.addEventListener("keydown", onKeyDown, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
    main.addEventListener("keyup", onKeyUp, false);
    info.style.display = "block";
  };

  function onKeyDown(e) {
    sound.musicPlay();
    player.move(e);
  }

  function onKeyUp(e) {
    player.ctrlUp(e);
  }

  main.style.position = "relative";
  main.style.zIndex = 0;

  window.onresize = resize.bind(this);

  function resize() {
    main.width = window.innerWidth;
    main.height = window.innerHeight;

    camera.aspect = main.width / main.height;
    camera.updateProjectionMatrix();

    renderer.setSize(main.width, main.height);
  }

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
  ({ scene, cube, map2D } = map.load(scene));

  const enemy = new Monster(map2D);
  ({ scene, monster } = enemy.load(scene));
  monster = sound.loadMonsterSound(monster);
  let isGameOver = false;
  enemy.isCatch = function () {
    isGameOver = true;
    isPause = true;
  }.bind(this);

  const item = new Item();
  ({ scene, mini } = item.load(scene));
  mini = sound.loadItemSound(mini);

  const miniClear = [false, false, false]; // 미니게임 클리어 여부
  const miniPosition = [
    [27, 15],
    [42, 44],
    [2000, 2000],
  ];
  let allMiniGameClearCheck = false;
  let gameClearCheck = false;

  function miniClearUpdate() {
    if (miniClear[0]) {
      document.getElementById("clear1").style.opacity = 1;
    }
    if (miniClear[1]) {
      document.getElementById("clear2").style.opacity = 1;
    }
    if (miniClear[2]) {
      document.getElementById("clear3").style.opacity = 1;
    }
  }

  function allMiniGameClear(num) {
    item.miniPositionChange(miniPosition[num - 1]);
    if (miniClear[2] == false) {
      return;
    }

    sound.escapeOpenPlay();
    scene = map.deleteDoor(scene);
    scene = item.changeDoor(scene);
    scene.remove(item.mini);
    scene.remove(item.miniLight);
    allMiniGameClearCheck = true;
  }

  function gameClear() {
    info.style.display = "none";
    scene.fog = null;
    sound.pause();
    sound.quite();
    scene.remove(monster);
    scene.remove(item.mini);
    scene.remove(item.miniLight);
    scene.remove(item.doorLigth);
    scene.remove(player.spotLight);
    scene.remove(enemy.monsterLight);
    light.intensity = 0.5;
    scene = map.changeWallHeight(scene);
    player.gameClearAnimate();
    gameClearCheck = true;
  }

  // ==========================
  // 초기화 부분 끝
  // ==========================

  let deltaTime = 0;
  let prevTime = 0;

  const progress = document.getElementById("progress");
  let tid = null;

  let animate = function () {
    // 프레임 처리
    let now = performance.now();

    deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
    prevTime = now;

    player.update(deltaTime, cube, mini);
    progress.value = player.stamina;

    if (
      Math.abs(camera.position.x - 48) < 0.3 &&
      Math.abs(camera.position.z - 1) < 0.3
    ) {
      main.removeEventListener("keydown", onKeyDown, false);
      main.removeEventListener("keyup", onKeyUp, false);
      gameClear();
    }

    item.update();

    if (!player.isLookDown && !isGameOver) {
      enemy.update(camera, deltaTime, cube);
    }

    if (!gameClearCheck) {
      sound.update(player, enemy, item, allMiniGameClearCheck);
    }

    // 랜더링을 수행합니다.
    renderer.render(scene, camera);
    if (!isPause && camera.position.y < 60) {
      sound.musicPlay();
      tid = requestAnimationFrame(animate);
    } else {
      sound.pause();
      playMiniGame();
    }
  };

  animate();

  // 미니게임 실행
  function playMiniGame() {
    info.style.display = "none";
    if (isGameOver) {
      console.log("gameover");
      const gameOver = new InOutroCanvas();
      gameOver.mode("gameover");
      gameOver.run();
      cancelAnimationFrame(tid);
      return;
    }

    if (miniClear.filter((bool) => bool === true).length == 3) {
      const outro = new InOutroCanvas();
      outro.mode("outro");
      outro.run();
      return;
    }

    for (let idx in miniClear) {
      if (!miniClear[idx]) {
        let game = eval(`new Game${idx * 1 + 1}()`);
        game.isClear = function (num) {
          isPause = false;
          miniClear[num - 1] = true;
          prevTime = performance.now();
          if (idx == 0) {
            sound.mini1BGPause();
          }
          if (idx == 1) {
            sound.mini2BGPause();
          }
          sound.miniBGPause();
          sound.miniClearPlay();
          allMiniGameClear(num);
          requestAnimationFrame(animate);
          main.focus();
          info.style.display = "block";
          miniClearUpdate();
          game = null;
        };
        if (idx == 0) {
          sound.mini1BGPlay();
        }
        if (idx == 1) {
          sound.mini2BGPlay();
        }
        sound.miniBGPlay();
        game.run();
        return;
      }
    }
  }
}
