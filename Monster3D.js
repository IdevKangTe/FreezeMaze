// import * as THREE from "../node_modules/three/build/three.js";
import {map} from "../map.js";
import { initMonster, madMaterial,normalMaterial } from "./H_monster.js";

// ==========================
// 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
// ==========================
// 3차원 세계
var scene = new THREE.Scene();

// 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000 );

// 렌더러 정의 및 크기 지정, 문서에 추가하기
var renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// scene.fog = new THREE.Fog( 0x000000, 0, 10 );

var light = new THREE.AmbientLight( 0xffffff, 0.5);
scene.add( light );

var cameraDirection = new THREE.Vector3();
var cameraPosition = new THREE.Vector3();
camera.getWorldDirection(cameraDirection);
cameraPosition.copy(camera.position);


var floor = new THREE.Mesh( 
    new THREE.PlaneGeometry(2000,2000,100,100), 
    new THREE.MeshStandardMaterial({ color: 0x000000 })
);
floor.rotateX( - Math.PI / 2 );
scene.add ( floor );

let monster = initMonster();

scene.add( monster );
monster.position.x = 12;
monster.position.y = 3;
monster.position.z = 48;
monster.material = normalMaterial();

let monsterPositionZ = monster.position.z;
let monsterPositionX = monster.position.x;

// 큐브 객체 속성
const { wallGeo, wallMesh } = {
	wallGeo:
		new THREE.BoxGeometry(1, 10, 1), //가로 높이 깊이
	wallMesh:
		new THREE.MeshStandardMaterial({
			color: "#00ff00",
            transparent: true,
            opacity: 0.5
		})
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
			};

		});

	});
};

map3D(map);


camera.position.x = 1;
camera.position.z = 37;

// camera.position.z = 0;
camera.position.y = 20;

// 카메라 시야
camera.rotation.x = -1.55;
// camera.rotation.x = ;


window.addEventListener("keydown", moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행



var deltaTime = 0;

let direc = [new THREE.Vector3(-1, 0, 0), //왼
new THREE.Vector3(1, 0, 0), // 오
new THREE.Vector3(0, 0, -1), // 위
new THREE.Vector3(0, 0, 1) // 아래
];
let nextGo = 0;


// monster 이동 시 충돌 검사 함수
function monsterCollison(){
    let collsionDirection = [false, false, false, false]; // 왼오앞뒤 중에  충돌 있는지 검사    

    if(nextGo%2==0){ // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
        collsionDirection[nextGo+1] = true;
    } else{
        collsionDirection[nextGo-1] = true;
    }

    for(let i=0; i<4; i++){
        let raycaster = new THREE.Raycaster(monster.position, direc[i],0,1); // 원래 0.3
        let intersect = Array();

        for(let j in cube){ 
            intersect.push(raycaster.intersectObject(cube[j]));
            if(intersect[j].length>0){
                collsionDirection[i] = true;
                break;
            }
        }
    }
        return collsionDirection;      
}

function chase(){
    if(isMove){
        return;
    }
    else{
        isMove = true;
        let dz = [-1, 1, 0, 0]; // 상하좌우 z축 변화 // 확인필요
        let dx = [0, 0, -1, 1];
        let d = '';
        let nextDirection = 1;
        let monsterDirection = 'U';

        let cameraRound = camera.position.clone().round();
        let monsterRound = monster.position.clone().round();
            
        const playerZ = cameraRound.z;
        const playerX = cameraRound.x;
        
        const monsterZ = monsterRound.z;
        const monsterX = monsterRound.x;
        
        const vis = JSON.parse(JSON.stringify(map));    
            
        vis[playerZ][playerX] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
        vis[monsterZ][monsterX] = 1; // 몬스터 좌표는 방문한 것으로 처리
            
        let queue = [[monsterZ, monsterX]]; // 큐에 몬스터 좌표 넣어줌
            
        // const direction = new Array(50).fill(new Array(50).fill('z')); // 해당 위치로 이동하는데 누른 상하좌우 표시
        const direction = JSON.parse(JSON.stringify(vis)); 
        while (queue.length > 0) { // 큐가 빌 때까지 while문 돌린다.
            const [nowZ, nowX] = queue.shift(); // 큐의 맨 앞에값 꺼냄
            
            if (nowZ == playerZ && nowX == playerX) { // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출        
                break;
            }
            
            for (let i = 0; i < 4; i++) { // for문으로 상하좌우 탐색
                let nz = nowZ + dz[i]; // 다음으로 이동할 곳의 x좌표
                let nx = nowX + dx[i]; // 다음으로 이동할 곳의 y좌표
                switch(i){
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

                if (nz < 0 || nz >= 50 || nx < 0 || nx >= 50) continue; // 범위를 벗어나는 경우
                if (vis[nz][nx] === 1) continue; // 벽이면 continue
                if (vis[nz][nx] === 0) { // 아직 방문하지 않은 곳이라면
                    vis[nz][nx] = vis[nowZ][nowX] + 1; // 이전 방문까지 걸린 거리 +1
                    direction[nz][nx] = d;
                    queue.push([nz, nx]); // 다음 탐색을 위해 큐에 push
                    }                                
                }
            }
            
            let chaseD = [[playerZ, playerX, direction[playerZ][playerX]]]; // 역추적
            let chaseCount = 0;

            while (true) {    
                let preDirection = direction[chaseD[chaseCount][0]][chaseD[chaseCount][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기
                let preZ = chaseD[chaseCount][0]; // 마지막으로 추적하고 있는 곳의 x좌표        
                let preX = chaseD[chaseCount][1]; // 마지막으로 추적하고 있는 곳의 x좌표
                
                if (preZ === monsterZ && preX === monsterX) { // 추적하는 곳이 몬스터 좌표면 while문 탈출
                    break;
                }

                switch(preDirection){
                    case 'U':
                        nextDirection = 1;
                        monsterDirection = 'U';
                        break;
                    case 'D':
                        nextDirection = 0;
                        monsterDirection = 'D';
                        break;
                    case 'L':
                        nextDirection = 3;
                        monsterDirection = 'L';
                        break;
                    case 'R':
                        nextDirection = 2; //우측이면 왼쪽 좌표
                        monsterDirection = 'R';
                        break;
                }

                chaseD.push([preZ + dz[nextDirection],preX + dx[nextDirection], monsterDirection]); // 바로이전 칸의 위치좌표 추가
                chaseCount += 1;
            }
    
            chaseD.reverse(); // 추적 좌표 reverse

            targetLocation.x = chaseD[1][1];
            targetLocation.y = 0;
            targetLocation.z = chaseD[1][0];
            switch(chaseD[1][2]){
                case 'L':
                    nextGo = 0;
                    break;
                case 'R':
                    nextGo = 1;
                    break;
                case 'U':
                    nextGo = 2;
                    break;
                case 'D':
                    nextGo = 3;
                    break;
            }    
        }
    }       

function isNear(){
    let MonsterDiff = monster.position.distanceTo(cameraPosition);
    console.log(MonsterDiff);
    if(MonsterDiff>43){
        return true;
    } else {
        return false;
    }
}

function randomMove(){
    if(isMove){
        return;
    }
    else{
        isMove = true;
        let collisionDirections = monsterCollison(); // 충돌인 곳이 true가 담겨있음
        let notCollision = [];
    
        for(let i=0; i<4; i++){
            if(collisionDirections[i] == false){
                notCollision.push(i);
            }
        }
    
        switch(notCollision.length){// 충돌이 안난곳의 갯수
            case 3: // 3곳중에 랜덤으로 간다
                nextGo = notCollision[Math.floor(Math.random()*3)];
                break;
            case 2: // 2곳중에 랜덤으로 간다.
                nextGo = notCollision[Math.floor(Math.random()*2)];
                break; 
            case 1: // 무조건 뚫린곳으로 간다.
                nextGo = notCollision[0];
                break;
        }

        monsterPositionZ = monster.position.clone().z;
        monsterPositionX = monster.position.x;
        let nextZ = monsterPositionZ + direc[nextGo].z;
        let nextX = monsterPositionX + direc[nextGo].x;
    
        targetLocation.x = nextX;
        targetLocation.y = 0;
        targetLocation.z = nextZ;
        return;
    }
}

function moving() {
    if(isMove){
        return;
    }else{
        if(isNear()){
            console.log("chase로 이동")
            monster.material = madMaterial();
            chase();
        }
        else{
            monster.material = normalMaterial();
            randomMove();
        }
    }
}


function moveSomething(e) {
        switch(e.keyCode) {
    
            case 37: // left key pressed 
            // keydown = true;
            camera.position.x -=1;
            // console.log(keydown);
            break;
    
            case 38: // up key pressed
            camera.position.z -=1;
            break;
            
            case 39: // right key pressed
            camera.position.x +=1;
            // targetRotationY -= Math.PI / 2;
            
            case 40:
                camera.position.z +=1;
                
            break;
   }   
}




// ==========================
// 초기화 부분 끝
// ========================== 

let prevTime = 0;
let MonsterMoveTime = 0;
let targetLocation = monster.position;
let isMove = false;

// 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.

var animate = function () {
    // 프레임 처리
    var now = performance.now();
    
    deltaTime = (now - prevTime) / 1000; // 이전 프레임과 현재 프레임의 시간 간격을 초 단위로 계산
    prevTime = now;

    // 랜더링을 수행합니다.

    if(!isMove){
        // 
        if((now-MonsterMoveTime)/1000>0.5){
            moving();  
            setTimeout(() => {
                isMove = true;
            }, 100); // 0.5초 딜레이
            MonsterMoveTime = now;
        }

    }
    else{
        let newPosition = monster.position.clone().lerp(targetLocation, 0.5);
        console.log(newPosition);
        monster.position.copy(newPosition);
        if (Math.abs(targetLocation.distanceTo(monster.position) > 0.01)) { // 몬스터가 이동 중인 경우
            moving();
            isMove = true;
        } else {// 몬스터가 이동을 완료한 경우
            isMove = false;
        }
    }
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.

animate();