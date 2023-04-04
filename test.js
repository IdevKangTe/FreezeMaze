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

const vis = JSON.parse(JSON.stringify(map2D));

const enemy = new Monster();
({ scene, monster } = enemy.load(scene));
monster = sound.loadMonsterSound(monster);

const mini = new Item();
({ scene, item, itemLight } = mini.load(scene));
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
let nextGo = 0;

let monsterTarget = monster.position.clone();
let monstertargetY = 0;
let monsterPosition = monster.position.clone();
let monsterSpeed = 4;

let isRotating = false;
let isMoving = false;
let monsterIsMoving = false;
let isMad = false;
let collison = false;
let run = false;
let notStartMusic = true;
let isGameClear = false;

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
      downRotation = player.lookUp(downRotation);
    } else if (e.keyCode == 75) {
      downRotation = player.lookDown(cameraDirection, downRotation);
      isGameClear = true;
    }
  }
}

function stopRunning(e) {
  player.stopRun(e);
  run = false;
}

document.getElementById('key1').style.opacity = 1;

let direc = [
  new THREE.Vector3(-1, 0, 0), //왼
  new THREE.Vector3(1, 0, 0), // 오
  new THREE.Vector3(0, 0, -1), // 위
  new THREE.Vector3(0, 0, 1), // 아래
];

function isCollison() {
  let Direction = new THREE.Vector3(0, 0, -1);
  camera.localToWorld(Direction);
  Direction.sub(camera.position).normalize();
  let Raycaster = new THREE.Raycaster(camera.position, Direction, 0, 0.8);
  let Intersects = [];

  for (let i in cube) {
    Intersects.push(Raycaster.intersectObject(cube[i]));
    if (Intersects[i].length > 0) {
      return true;
    }
  }
  return false;
}

function monsterCollison() {
  let collsionDirection = [false, false, false, false]; // 왼오위아래 중에  충돌 있는지 검사
  for (let i = 0; i < 4; i++) {
    let raycaster = new THREE.Raycaster(monster.position, direc[i], 0, 0.7);
    let intersect = Array();

    for (let j in cube) {
      intersect.push(raycaster.intersectObject(cube[j]));
      if (intersect[j].length > 0) {
        collsionDirection[i] = true;
        break;
      }
    }
  }

  if (nextGo % 2 == 0) {
    // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
    collsionDirection[nextGo + 1] = true;
  } else {
    collsionDirection[nextGo - 1] = true;
  }
  return collsionDirection;
}

function chase(targetLocation) {
  monsterIsMoving = true;
  let dz = [-1, 1, 0, 0]; // 상하좌우 z축 변화  확인필요
  let dx = [0, 0, -1, 1];

  let cameraRound = camera.position.clone().round();
  let monsterRound = monster.position.clone().round();

  let playerZ = cameraRound.z;
  let playerX = cameraRound.x;
  let monsterZ = monsterRound.z;
  let monsterX = monsterRound.x;

  if (playerZ >= 49) playerZ = 48;
  if (playerX >= 49) playerZ = 48;
  if (monsterZ >= 49) monsterZ = 48;
  if (monsterX >= 49) monsterX = 48;

  let distanceDiff = 0;
  let vis = JSON.parse(JSON.stringify(map2D));

  vis[playerZ][playerX] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
  vis[monsterZ][monsterX] = 1;

  let queue = [[monsterZ, monsterX]]; // 큐에 몬스터 좌표 넣어줌
  let direction = JSON.parse(JSON.stringify(vis));

  while (queue.length > 0) {
    // 큐가 빌 때까지 while문 돌린다.
    let [nowZ, nowX] = queue.shift(); // 큐의 맨 앞에값 꺼냄
    if (nowZ == playerZ && nowX == playerX) {
      // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출
      break;
    }
    // 상하좌우
    for (let i = 0; i < 4; i++) {
      // for문으로 상하좌우 탐색
      let d = '';
      let nz = nowZ + dz[i]; // 다음으로 이동할 곳의 x좌표
      let nx = nowX + dx[i]; // 다음으로 이동할 곳의 y좌표
      switch (i) {
        case 0:
          d = 'U';
          break;
        case 1:
          d = 'D';
          break;
        case 2:
          d = 'L';
          break;
        case 3:
          d = 'R';
          break;
      }
      if (nz < 0 || nz > 50 || nx < 0 || nx > 50) continue; // 범위를 벗어나는 경우
      if (vis[nz][nx] === 1) continue; // 벽이면 continue
      if (vis[nz][nx] === 0) {
        // 아직 방문하지 않은 곳이라면
        vis[nz][nx] = vis[nowZ][nowX] + 1; // 이전 방문까지 걸린 거리 +1
        direction[nz][nx] = d;
        queue.push([nz, nx]); // 다음 탐색을 위해 큐에 push
      }
    }
  }
  distanceDiff = vis[playerZ][playerX];

  let chaseD = [[playerZ, playerX, direction[playerZ][playerX]]]; // 역추적

  let chaseCount = 0;

  while (true) {
    let preDirection = direction[chaseD[chaseCount][0]][chaseD[chaseCount][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기
    let preZ = chaseD[chaseCount][0]; // 마지막으로 추적하고 있는 곳의 x좌표
    let preX = chaseD[chaseCount][1]; // 마지막으로 추적하고 있는 곳의 x좌표

    if (preZ == monsterZ && preX == monsterX) {
      // 추적하는 곳이 몬스터 좌표면 while문 탈출
      break;
    }
    // 왼오위아래 상하좌우
    let nextDirection;
    let monsterDirection = '';
    switch (preDirection) {
      case 'U':
        nextDirection = 1;
        monsterDirection = 'D';
        break;
      case 'D':
        nextDirection = 0;
        monsterDirection = 'U';
        break;
      case 'L':
        nextDirection = 3;
        monsterDirection = 'R';
        break;
      case 'R':
        nextDirection = 2;
        monsterDirection = 'L';
        break;
    }

    chaseD.push([
      preZ + dz[nextDirection],
      preX + dx[nextDirection],
      monsterDirection,
    ]); // 바로이전 칸의 위치좌표 추가
    chaseCount += 1;
  }

  // 추적 좌표 reverse
  chaseD.reverse();
  if (chaseD.length < 2) {
    console.log('chase 끝');
    return targetLocation;
  }

  switch (chaseD[1][2]) {
    case 'L':
      nextGo = 1; //1
      break;
    case 'R':
      nextGo = 0; //1
      break;
    case 'U':
      nextGo = 3; //2
      break;
    case 'D':
      nextGo = 2; // 3
      break;
  }
  targetLocation.x = chaseD[1][1];
  targetLocation.z = chaseD[1][0];
  return targetLocation;
}

function isNear() {
  let MonsterDiff = monster.position.distanceTo(cameraPosition);

  if (MonsterDiff < 15) {
    return true;
  } else {
    return false;
  }
}

function randomMove(targetLocation) {
  monsterIsMoving = true;
  let collisionDirections = monsterCollison(); // 충돌인 곳이 true가 담겨있음
  let count = 0;
  let notCollision = [];

  for (let i = 0; i < 4; i++) {
    if (collisionDirections[i] == true) {
      count++;
    } else {
      notCollision.push(i);
    }
  }
  switch (
    notCollision.length // 충돌이 안난곳의 갯수
  ) {
    case 3: // 3곳중에 랜덤으로 간다
      nextGo = notCollision[Math.floor(Math.random() * 3)];
      break;
    case 2: // 2곳중에 랜덤으로 간다.
      nextGo = notCollision[Math.floor(Math.random() * 2)];
      break;
    case 1: // 무조건 뚫린곳으로 간다.
      nextGo = notCollision[0];
      break;
  }
  let monsterPositionZ = monster.position.clone().z;
  let monsterPositionX = monster.position.clone().x;
  let nextZ = monsterPositionZ + direc[nextGo].z;
  let nextX = monsterPositionX + direc[nextGo].x;
  if (nextX >= 49) nextX = 48;
  if (nextZ >= 49) nextZ = 48;

  targetLocation.x = nextX;
  targetLocation.z = nextZ;
  return targetLocation;
}

function moving(targetLocation) {
  if (isNear()) {
    console.log('chase');
    // 가까울경우
    if (!isMad) {
      // 이전 값이 random 이었으면
      sound.chase();
      monster.material = enemy.madMaterial();
      isMad = true;
      monsterSpeed = 8;
      enemy.madLight();
    }
    targetLocation = chase(targetLocation);
  } else {
    console.log('random');
    // 가깝지 않을 경우
    if (isMad) {
      // 이전 값이 chase 였으면
      sound.notChase();
      monster.material = enemy.normalMaterial();
      isMad = false;
      monsterSpeed = 4;
      enemy.normalLight();
    }
    targetLocation = randomMove(targetLocation);
  }

  return targetLocation;
}

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

  camera.rotation.y += player.cameraRotate(targetRotationY, deltaTime);
  camera.rotation.x += player.lookDown(downRotation, deltaTime);

  // 카메라가 아직 돌고 있는지 확인
  isRotating = player.rotationCheck(targetRotationY);
  // 카메라가 아직 움직이고 있는지 확인
  isMoving = player.movingCheck(targetLocation);

  if (camera.rotation.x - downRotation < 0.05 && player.isLookDown) {
    // z축 회전이 끝났을 때 카메라의 y축이 가까워지기 시작
    if (isGameClear) {
      scene.fog = null;
      targetLocation.position.set(25, 50, 25);
      camera.position.copy(player.move(targetLocation));
    } else {
      locationDiffY = Math.abs(camera.position.y - targetLocationY);
      camera.position.y -= locationDiffY * deltaTime * 0.5;
      if (locationDiffY < 0.2) {
        player.isLookDown = false; // 원하는 높이만큼 낮아졌을 때 y축 감소 멈춤
      }
    }
  } else {
    camera.position.copy(player.move(targetLocation));
  }

  itemLight.rotation.y += 0.05;
  // 아이템 알림 전구 회전

  enemy.enemyLight();

  //=============================================================================

  monsterPosition.copy(monster.position);

  if (monstertargetY >= 0.02) {
    monstertargetY = -monstertargetY;
  } else {
    monstertargetY += 0.01 * deltaTime * 4;
  }

  if (
    Math.abs(monsterTarget.x - monster.position.x) +
      Math.abs(monsterTarget.z - monster.position.z) >
    0.03
  ) {
    // 몬스터가 이동 중인 경우
    monsterIsMoving = true;
  } else {
    // 몬스터가 이동을 완료한 경우
    monster.position.x = monsterTarget.x;
    monster.position.z = monsterTarget.z;
    monsterIsMoving = false;
  }

  if (!monsterIsMoving) {
    monsterTarget = moving(monsterTarget);
  }

  let distance = monsterTarget.clone().sub(monsterPosition);

  let distanceMoved = distance.clone().multiplyScalar(deltaTime * monsterSpeed);

  let monsterNewPosition = new THREE.Vector3(
    distanceMoved.x,
    monstertargetY,
    distanceMoved.z
  );

  monster.position.copy(monsterPosition.clone().add(monsterNewPosition));

  //===========================================================

  document.getElementById('progress').value = stamina;
  // 스태미나의 값에 맞춰서 progress 바 변화

  if (run) {
    stamina = stamina < 0 ? 0 : stamina - 0.4;
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
