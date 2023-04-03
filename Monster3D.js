// import * as THREE from "../node_modules/three/build/three.js";
import load from "../map.js";
import {initMonster, madMaterial, normalMaterial} from "./H_monster.js";

// ========================== 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
// ========================== 3차원 세계
var scene = new THREE.Scene();

// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 렌더러 정의 및 크기 지정, 문서에 추가하기
var renderer = new THREE.WebGLRenderer(
    {antialias: true, preserveDrawingBuffer: true}
);
renderer.setSize(window.innerWidth, window.innerHeight);

document
    .body
    .appendChild(renderer.domElement);

// scene.fog = new THREE.Fog( 0x000000, 0, 10 );

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff, 1, 70, Math.PI / 8, 0.7, 1);
spotLight.rotation.x += 45;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

var cameraDirection = new THREE.Vector3();
var cameraPosition = new THREE.Vector3();

camera.getWorldDirection(cameraDirection);
// camera.rotation.x = -1.55;  카메라 시야

cameraPosition.copy(camera.position);

let monster = initMonster();

scene.add(monster);
monster.position.x = 11;
monster.position.y = 2;
monster.position.z = 48;
monster.material = normalMaterial();

let monsterPositionZ = monster.position.z;
let monsterPositionX = monster.position.x;
let cube = [];
let map = [];
({scene, map3D: cube, map2D: map} = load(scene));

camera.position.x = 1;
camera.position.z = 48;
camera.position.y = 1;

window.addEventListener("keydown", moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행
// window.addEventListener('keyup', stopRunning, false);

var deltaTime = 0;

let direc = [
    new THREE.Vector3(-1, 0, 0), //왼
    new THREE.Vector3(1, 0, 0), // 오
    new THREE.Vector3(0, 0, -1), // 위
    new THREE.Vector3(0, 0, 1) // 아래
];

function isCollison() {
    let Direction = new THREE.Vector3(0, 0, -1);
    camera.localToWorld(Direction);
    Direction
        .sub(camera.position)
        .normalize();
    let Raycaster = new THREE.Raycaster(camera.position, Direction, 0, 0.8);
    let Intersects = [];

    for (var i in cube) {
        Intersects.push(Raycaster.intersectObject(cube[i]));
        if (Intersects[i].length > 0) {
            return true;
        }
    }
    return false;
}

function monsterCollison() {
    if (firstMove) {
        nextGo = 0;
        firstMove = false;
    }
    let collsionDirection = [false, false, false, false]; // 왼오위아래 중에  충돌 있는지 검사
    for (let i = 0; i < 4; i++) {
        let raycaster = new THREE.Raycaster(monster.position, direc[i], 0, 0.7); // 원래 0.3
        let intersect = Array();

        for (let j in cube) {
            intersect.push(raycaster.intersectObject(cube[j]));
            if (intersect[j].length > 0) {
                collsionDirection[i] = true;
                break;
            }
        }
    }

    
    if (nextGo % 2 == 0) { // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
        collsionDirection[nextGo + 1] = true;
    } else {
        collsionDirection[nextGo - 1] = true;
    }
    return collsionDirection;
}

function chase(targetLocation) {
    isMove = true;
    let dz = [-1, 1, 0, 0]; // 상하좌우 z축 변화  확인필요
    let dx = [0, 0, -1, 1];

    let cameraRound = camera
        .position
        .clone()
        .round();

    let monsterRound = monster
        .position
        .clone()
        .round();


    let playerZ = cameraRound.z;
    let playerX = cameraRound.x;
    let monsterZ = monsterRound.z;
    let monsterX = monsterRound.x;

    if(playerZ >= 49) playerZ = 48;
    if(playerX >= 49) playerZ = 48;
    if(monsterZ >= 49) monsterZ = 48;
    if(monsterX >= 49) monsterX = 48;

    let distanceDiff = 0;
    let vis = JSON.parse(JSON.stringify(map));


    vis[playerZ][playerX] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
    vis[monsterZ][monsterX] = 1; 

    const queue = [[monsterZ, monsterX]]; // 큐에 몬스터 좌표 넣어줌

    // const direction = new Array(50).fill(new Array(50).fill('z'));  해당 위치로 이동하는데 누른 상하좌우 표시
    const direction = JSON.parse(JSON.stringify(vis));
    while (queue.length > 0) { // 큐가 빌 때까지 while문 돌린다.
        let [nowZ, nowX] = queue.shift(); // 큐의 맨 앞에값 꺼냄
        if (nowZ == playerZ && nowX == playerX) { // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출
            break;
        }
        // 상하좌우
        for (var i = 0; i < 4; i++) { // for문으로 상하좌우 탐색
            let nz = nowZ + dz[i]; // 다음으로 이동할 곳의 x좌표
            let nx = nowX + dx[i]; // 다음으로 이동할 곳의 y좌표
            if (i === 0) { // 상
                var d = 'U';
            } else if (i === 1) { // 하
                var d = 'D';
            } else if (i === 2) { // 좌
                var d = 'L';
            } else {
                var d = 'R'; // 우
            }

            if (nz < 0 || nz >= 50 || nx < 0 || nx >= 50)
                continue; // 범위를 벗어나는 경우
            if (vis[nz][nx] === 1) 
                continue; // 벽이면 continue
            if (vis[nz][nx] === 0) { // 아직 방문하지 않은 곳이라면
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
        const preDirection = direction[chaseD[chaseCount][0]][chaseD[chaseCount][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기
        const preZ = chaseD[chaseCount][0]; // 마지막으로 추적하고 있는 곳의 x좌표
        const preX = chaseD[chaseCount][1]; // 마지막으로 추적하고 있는 곳의 x좌표

        if (preZ === monsterZ && preX === monsterX) { // 추적하는 곳이 몬스터 좌표면 while문 탈출
            break;
        }
        // 왼오위아래 상하좌우
        if (preDirection === 'U') { // 위면 아래쪽 좌표를 가져옴
            var nextDirection = 1;
            var monsterDirection = 'D';
        } else if (preDirection === 'D') { // 아래면 위쪽 좌표 가져옴
            var nextDirection = 0;
            var monsterDirection = 'U';
        } else if (preDirection === 'L') { // 왼쪽이면 오른 좌표 가져옴
            var nextDirection = 3;
            var monsterDirection = 'R';
        } else {
            var nextDirection = 2; //우측이면 왼쪽 좌표
            var monsterDirection = 'L';
        }
        chaseD.push([
            preZ + dz[nextDirection],
            preX + dx[nextDirection],
            monsterDirection
        ]); // 바로이전 칸의 위치좌표 추가
        chaseCount += 1;
    }

    // 추적 좌표 reverse
    chaseD.reverse();
    if (chaseD.length < 2) {
        console.log("chase 끝");
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
    console.log(targetLocation.x,targetLocation.z);
    return targetLocation;

}

function isNear() {
    let MonsterDiff = monster
        .position
        .distanceTo(cameraPosition);
    console.log(MonsterDiff);

    if (MonsterDiff < 10) {
        return true;
    } else {
        return false;
    }
}

function randomMove(targetLocation) {
    
    isMove = true;
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
    switch (notCollision.length) { // 충돌이 안난곳의 갯수
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
    monsterPositionZ = monster
        .position
        .clone()
        .z;
    monsterPositionX = monster
        .position
        .clone()
        .x;
    let nextZ = monsterPositionZ + direc[nextGo].z;
    let nextX = monsterPositionX + direc[nextGo].x;
    if(nextX>=49) nextX = 48;
    if(nextZ>=49) nextZ = 48;

    // if (nextGo == 0) 
    //     var nextD = 'L';
    // else if (nextGo == 1) 
    //     var nextD = 'R';
    // else if (nextGo == 2) 
    //     var nextD = 'U';
    // else 
    //     var nextD = 'D';



    
    // targetLocation.set(nextX, 2, nextZ);
    targetLocation.x = nextX;
    targetLocation.z = nextZ;
    return targetLocation;
    

}

function moving(targetLocation) {
    if (firstMove) {
        nextGo = 0;
        firstMove = false;
    }

    if (isNear()) { // 가까울경우
        if (!isMad) { // 이전 값이 random 이었으면
            monster.material = madMaterial();
            isMad = true;
            monsterSpeed = 5;
        }
        console.log("chase");
        targetLocation = chase(targetLocation);
    } else { // 가깝지 않을 경우
        if (isMad) { // 이전 값이 chase 였으면
            monster.material = normalMaterial();
            isMad = false;
            monsterSpeed = 4;
        }
        targetLocation = randomMove(targetLocation);
    }

    return targetLocation;

}

function moveSomething(e) {

    if (isRotating || isMoving) {
        return;
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
            cameraTargetLocation = camera
                .position
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
    } else if (e.keyCode == 40) {
        lookUp();
    }
}
function lookDown() {
    if (Math.round(cameraDirection.z) == 1 && Math.round(cameraDirection.x) == 0) {
        downRotation += Math.PI / 2;
        isFrontDirection = true;
    } else if (Math.round(cameraDirection.z) == -1 && Math.round(cameraDirection.x) == 0) {
        downRotation -= Math.PI / 2;
        isFrontDirection = false;
    }
    isLookDown = true;
    targetLocationY = 0.3;

    return downRotation;
}

function lookUp() {
    if (isFrontDirection) {
        downRotation -= Math.PI / 2;
    } else {
        downRotation += Math.PI / 2;
    }
}

// ========================== 초기화 부분 끝 ==========================

var prevTime = 0;
var targetLocation = monster
    .position
    .clone();
let monsterPosition = monster
    .position
    .clone();
let monsterTargetLocationY = 0;
var isMove = false;
let monsterSpeed = 4;

var targetRotationY = camera.rotation.y; // 목표 회전 각도
let downRotation = camera.rotation.x;
var cameraTargetLocation = camera.position;
var rotationSpeed = 10; // 회전 속도
var smoothFactor = 0.2; // 이동 보간 계수
// var stamina = 100;
let targetLocationY = camera.position.y;
let locationDiffY = 0;
let nextGo;

var isRotating = false;
var isMoving = false;
let collison = false;
let run = false;
let notStartMusic = true;
let isLookDown = false;
let isFrontDirection = false;
let isMad = false;
let firstMove = true;

var animate = function () {
    // 프레임 처리
    var now = performance.now();

    deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
    prevTime = now;

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
        }
    } else {
        // 카메라 이동시 부드러운 이동을 하도록 하는 함수
        var newPosition = camera
            .position
            .clone()
            .lerp(cameraTargetLocation, smoothFactor);
        // 현재 위치와 목표 위치를 보간하여 새로운 위치 계산
        camera
            .position
            .copy(newPosition);

    }

    // 카메라가 아직 돌고 있는지 확인
    if (Math.abs(targetRotationY - camera.rotation.y) > 0.05) {
        isRotating = true;
    } else {
        isRotating = false;
    }

    // 카메라가 아직 움직이고 있는지 확인
    if (Math.abs(cameraTargetLocation.distanceTo(camera.position)) > 0.07) {
        isMoving = true;
    } else {
        isMoving = false;
    }

    var cameraDirPos = cameraPosition.add(cameraDirection);
    spotLight
        .position
        .set(camera.position.x, camera.position.y + 0.01, camera.position.z);
    spotLight
        .target
        .position
        .set(cameraDirPos.x, cameraDirPos.y - 0.4, cameraDirPos.z);
    spotLight.lookAt(cameraDirection);
    // 플레이어의 손전등 방향 및 위치 설정
    // ============================================================================

    monsterPosition.copy(monster.position);

    if (monsterTargetLocationY >= 0.02) {
        monsterTargetLocationY = -monsterTargetLocationY;
    } else {
        monsterTargetLocationY += 0.01 * deltaTime * 4;
    }

    if (Math.abs(targetLocation.x-monster.position.x)+Math.abs(targetLocation.z-monster.position.z) > 0.03) {
        // 몬스터가 이동 중인 경우
        isMove = true;
    } else {
        // 몬스터가 이동을 완료한 경우
        monster.position.x = targetLocation.x;
        monster.position.z = targetLocation.z;
        isMove = false;
    }
    
    if(!isMove){
        targetLocation = moving(targetLocation);
    }

    let distance = targetLocation
        .clone()
        .sub(monsterPosition);

    let distanceMoved = distance
        .clone()
        .multiplyScalar(deltaTime * monsterSpeed);
        
    let monsterNewPosition = new THREE.Vector3(
        distanceMoved.x,
        monsterTargetLocationY,
        distanceMoved.z
    );

    monster
        .position
        .copy(monsterPosition.clone().add(monsterNewPosition));

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

};

// animate()함수를 최초에 한번은 수행해주어야 합니다.

animate();