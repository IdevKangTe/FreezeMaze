// import * as THREE from "../node_modules/three/build/three.js";
import { map } from './map.js';
import { initMonster, madMaterial, normalMaterial } from './H_monster.js';

// ==========================
// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
// ==========================
// 3차원 세계
var scene = new THREE.Scene();

// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 렌더러 정의 및 크기 지정, 문서에 추가하기
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// scene.fog = new THREE.Fog( 0x000000, 0, 10 );

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

// const spotLight = new THREE.SpotLight(0xffffff, 3, 100, Math.PI/5, 0.7, 1);
// spotLight.rotation.x += 45;
// spotLight.castShadow = true;
// scene.add(spotLight);
// scene.add(spotLight.target);

var cameraDirection = new THREE.Vector3();
var cameraPosition = new THREE.Vector3();
camera.getWorldDirection(cameraDirection);
cameraPosition.copy(camera.position);

var floor = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000, 100, 100),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
floor.rotateX(-Math.PI / 2);
scene.add(floor);

// 구 객체 생성
// const geometry = new THREE.SphereGeometry( 0.5,11,3 ); //기본형태
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //재질
// const sphere = new THREE.Mesh( geometry, material );
// let monster = M.initMonster();
const monster = initMonster();

// sphere.position.x = 12
// sphere.position.y = 0;
// sphere.position.z = 48;

// let monsterDirection = 'L';

scene.add(monster);
monster.position.x = 12;
monster.position.y = 0;
monster.position.z = 48;

// x:12, z:48

// 큐브 객체 속성
const { wallGeo, wallMesh } = {
  wallGeo: new THREE.BoxGeometry(1, 2, 1), //가로 높이 깊이
  wallMesh: new THREE.MeshStandardMaterial({
    color: '#00ff00',
    transparent: true,
    opacity: 0.5,
  }),
};

// 맵(큐브) 생성
const cube = [];
let idx = 0;

const map3D = (map) => {
  map.forEach((row1, idx1) => {
    map[idx1].forEach((row2, idx2) => {
      // 값이 1인 위치에 기둥(=벽) 세우기
      if (map[idx1][idx2] === 1) {
        cube.push(new THREE.Mesh(wallGeo, wallMesh));

        cube[idx].position.x = idx2;
        cube[idx].position.y = 0;
        cube[idx].position.z = idx1;

        scene.add(cube[idx]);
        idx++;
      }
    });
  });
};

map3D(map);

camera.position.x = 1;
camera.position.z = 48;

// camera.position.z = 0;
camera.position.y = 20;

// 카메라 시야
camera.rotation.x = -1.55;
// camera.rotation.x = ;

window.addEventListener('keydown', moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행

var deltaTime = 0;

let direc = [
  new THREE.Vector3(-1, 0, 0), //왼
  new THREE.Vector3(1, 0, 0), // 오
  new THREE.Vector3(0, 0, -1), // 위
  new THREE.Vector3(0, 0, 1), // 아래
];
let nextGo = 0;
function monsterCollison() {
  let collsionDirection = [false, false, false, false]; // 왼오앞뒤 중에  충돌 있는지 검사

  if (nextGo % 2 == 0) {
    // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
    collsionDirection[nextGo + 1] = true;
  } else {
    collsionDirection[nextGo - 1] = true;
  }

  for (var i = 0; i < 4; i++) {
    let raycaster = new THREE.Raycaster(monster.position, direc[i], 0, 1); // 원래 0.3
    // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0x00ff00) );
    let intersect = Array();

    for (var j in cube) {
      intersect.push(raycaster.intersectObject(cube[j]));
      if (intersect[j].length > 0) {
        collsionDirection[i] = true;
        break;
      }
    }

    // sphere.position.add(direc[nextGo]);
  }

  return collsionDirection;
}

function chase() {
  let dz = [-1, 1, 0, 0]; // 상하좌우 z축 변화 // 확인필요
  let dx = [0, 0, -1, 1];

  const playerZ = Math.round(camera.position.z);
  const playerX = Math.round(camera.position.x);

  const monsterZ = Math.round(monster.position.z);
  const monsterX = Math.round(monster.position.x);

  let distanceDiff = 0;
  const vis = JSON.parse(JSON.stringify(map));

  vis[playerZ][playerX] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
  vis[monsterZ][monsterX] = 1; // 몬스터 위치 표시를 위해 M으로 표기

  const queue = [[monsterZ, monsterX]]; // 큐에 몬스터 좌표 넣어줌

  // const direction = new Array(50).fill(new Array(50).fill('z')); // 해당 위치로 이동하는데 누른 상하좌우 표시
  const direction = JSON.parse(JSON.stringify(vis));
  while (queue.length > 0) {
    // 큐가 빌 때까지 while문 돌린다.
    const [nowZ, nowX] = queue.shift(); // 큐의 맨 앞에값 꺼냄

    if (nowZ == playerZ && nowX == playerX) {
      // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출
      break;
    }
    for (var i = 0; i < 4; i++) {
      // for문으로 상하좌우 탐색
      const nz = nowZ + dz[i]; // 다음으로 이동할 곳의 x좌표
      const nx = nowX + dx[i]; // 다음으로 이동할 곳의 y좌표
      if (i === 0) {
        // 상
        var d = 'U';
      } else if (i === 1) {
        // 하
        var d = 'D';
      } else if (i === 2) {
        // 좌
        var d = 'L';
      } else {
        var d = 'R'; // 우
      }
      if (nz < 0 || nz >= 50 || nx < 0 || nx >= 50) continue; // 범위를 벗어나는 경우
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
    const preDirection =
      direction[chaseD[chaseCount][0]][chaseD[chaseCount][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기
    const preZ = chaseD[chaseCount][0]; // 마지막으로 추적하고 있는 곳의 x좌표
    const preX = chaseD[chaseCount][1]; // 마지막으로 추적하고 있는 곳의 x좌표

    if (preZ === monsterZ && preX === monsterX) {
      // 추적하는 곳이 몬스터 좌표면 while문 탈출
      break;
    }

    if (preDirection === 'U') {
      // 위면 아래쪽 좌표를 가져옴
      var nextDirection = 1;
      var monsterDirection = 'U';
    } else if (preDirection === 'D') {
      // 아래면 위쪽 좌표 가져옴
      var nextDirection = 0;
      var monsterDirection = 'D';
    } else if (preDirection === 'L') {
      // 왼쪽이면 오른 좌표 가져옴
      var nextDirection = 3;
      var monsterDirection = 'L';
    } else {
      var nextDirection = 2; //우측이면 왼쪽 좌표
      var monsterDirection = 'R';
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
  let cnt = 0;
  for (var i in chaseD) {
    if (!isNear()) {
      if (chaseD[i][2] === 'L') nextGo = 1;
      else if (chaseD[i][2] === 'R') nextGo = 0;
      else if (chaseD[i][2] === 'U') nextGo = 3;
      else nextGo = 2;
      return false;
    } else {
      console.log('chase로 쫓아가기' + cnt);
      monster.material = madMaterial();
      oneStepMove[(chaseD[i][0], chaseD[i][1], chaseD[i][2])];
    }
  }
  // 여기 살려...
  // console.log("쫓아가기");
  // monster.material = madMaterial();
  // oneStepMove(chaseD[0][0], chaseD[0][1], chaseD[0][2]);
  // if(chaseD[0][2]==='L') nextGo = 1;
  // else if(chaseD[0][2]==='R') nextGo = 0;
  // else if(chaseD[0][2]==='U') nextGo = 3;
  // else nextGo = 2;
  // if(!isNear()) return false;
}

function isNear() {
  var MonsterDiff = monster.position.distanceTo(cameraPosition);
  console.log(MonsterDiff);
  if (MonsterDiff < 48 && MonsterDiff > 40) {
    return true;
  } else {
    monster.material = normalMaterial();
    console.log('사정거리 내에 있지 않습니다.');
    return false;
  }
}

function randomMove() {
  let collisionDirections = monsterCollison(); // 충돌인 곳이 true가 담겨있음
  let count = 0;
  let notCollision = [];

  for (var i = 0; i < 4; i++) {
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
  var nextZ = monster.position.z + direc[nextGo].z;
  var nextX = monster.position.x + direc[nextGo].x;
  if (nextGo == 0) var nextD = 'L';
  else if (nextGo == 1) var nextD = 'R';
  else if (nextGo == 2) var nextD = 'U';
  else var nextD = 'D';

  oneStepMove(nextZ, nextX, nextD);
}

function oneStepMove(nextZ, nextX, nextD) {
  monster.position.x = nextX;
  monster.position.z = nextZ;
}

function moving() {
  //     if(isNear()){
  //         // console.log("사정 거리 내에 있습니다.");
  //         if(!chase()){
  //             randomMove();
  //         }
  //     }
  //     else{
  //         randomMove();
  //   }
  if (isNear()) {
    if (!chase()) {
      randomMove();
    }
  } else {
    randomMove();
    return;
  }
}

function moveSomething(e) {
  // if(keydown){
  //     return;
  // } else{
  switch (e.keyCode) {
    case 37: // left key pressed
      // keydown = true;
      camera.position.x -= 1;
      // console.log(keydown);
      break;

    case 38: // up key pressed
      camera.position.z -= 1;
      break;

    case 39: // right key pressed
      camera.position.x += 1;
    // targetRotationY -= Math.PI / 2;

    case 40:
      camera.position.z += 1;

      break;

    // }
  }
}

// ==========================
// 초기화 부분 끝
// ==========================

var prevTime = 0;
var MonsterMoveTime = 0;

// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.

var animate = function () {
  // 프레임 처리
  var now = performance.now();

  deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
  prevTime = now;

  // MonsterDiff = sphere.position.distanceTo(cameraPosition);

  // 랜더링을 수행합니다.
  const mosterHighest = 2;
  const mosterShortest = 0;

  if (monster.y < mosterHighest) {
    monster.y += 0.2;
  } else if (monster.y >= mosterShortest) {
    monster.y -= 0.2;
  }

  var targetLocation = monster.position.clone().round();
  if ((now - MonsterMoveTime) / 1000 > 0.8) {
    moving();
    MonsterMoveTime = now;
  }
  var newPosition = monster.position.clone().lerp(targetLocation, 0.3);
  monster.position.copy(newPosition);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.

animate();
