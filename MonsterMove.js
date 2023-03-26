import * as THREE from "./node_modules/three/build/three.module.js";
import {map} from "./map.js";
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
    new THREE.PlaneGeometry(2000,2000,100,100), 
    new THREE.MeshStandardMaterial({ color: 0x000000 })
);
floor.rotateX( - Math.PI / 2 );
scene.add ( floor );

// 구 객체 생성
const geometry = new THREE.SphereGeometry( 0.5,11,3 ); //기본형태
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //재질
const sphere = new THREE.Mesh( geometry, material );


sphere.position.x = 12;
sphere.position.y = 0;
sphere.position.z = 48;
scene.add( sphere );







// x:12, z:48



// 큐브 객체 속성
const { wallGeo, wallMesh } = {
	wallGeo:
		new THREE.BoxGeometry(1, 2, 1), //가로 높이 깊이
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







camera.position.x = 12;
camera.position.z = 48;

// camera.position.z = 0;
camera.position.y = 15;

// 카메라 시야
camera.rotation.x = -1.55;


window.addEventListener("keydown", moveSomething, false); // 키 다운 이벤트 실행시 moveSomting 함수실행



var deltaTime = 0;



// let moveMonster = function(x, y, z){
//     // sphere의 위치를 map의 인덱스에 맞게 1단위로 이동시키기
//     sphere.position.x += 0.5; // map의 x축 인덱스가 0부터 시작하므로 0.5를 더해줌
//     sphere.position.z += 0.5; // map의 z축 인덱스가 0부터 시작하므로 0.5를 더해줌

// }
let direc = [new THREE.Vector3(-1, 0, 0), //왼
new THREE.Vector3(1, 0, 0), // 오
new THREE.Vector3(0, 0, -1), // 앞
new THREE.Vector3(0, 0, 1) // 뒤
];
let nextGo = 0;
function monsterCollison(){
    let collsionDirection = [false, false, false, false]; // 왼오앞뒤 중에  충돌 있는지 검사    

    for(var i=0; i<4; i++){
        let raycaster = new THREE.Raycaster(sphere.position, direc[i],0,0.5); // 원래 0.3
        // scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0x00ff00) ); 
        let intersect = Array();

        for(var j in cube){ 
            intersect.push(raycaster.intersectObject(cube[j]));
            if(intersect[j].length>0){
                collsionDirection[i] = true;
                break;
            }
        }
        
        // sphere.position.add(direc[nextGo]);
    }

    if(nextGo%2==0){ // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
        collsionDirection[nextGo+1] = true;
    } else{
        collsionDirection[nextGo-1] = true;
    }
        return collsionDirection;
           
    }
   
function moveMonster() {
    
    // 벽 충돌 여부 체크
    let collisionDirections = monsterCollison(); // 충돌인 곳이 true가 담겨있음
    let count = 0;
    let notCollision = [];

    for(var i=0; i<4; i++){
        if (collisionDirections[i] == true){
            count++;
        } 
        else{
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


    sphere.position.add(direc[nextGo]);
    

  }


function moveSomething(e) {

    // if(keydown){
    //     return;
    // } else{
        switch(e.keyCode) {
    
            case 37: // left key pressed 
            // keydown = true;
            camera.position.x -=0.5;
            // console.log(keydown);
            break;
    
            case 38: // up key pressed
            camera.position.z -=0.5;
            break;
            
            case 39: // right key pressed
            camera.position.x +=0.5;
            // targetRotationY -= Math.PI / 2;
            
            case 40:
                camera.position.z +=0.5;
                
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

    if((now-MonsterMoveTime)/1000>1){
        moveMonster();
        MonsterMoveTime = now;
        console.log(nextGo);
    }

    
    // 랜더링을 수행합니다.

    
    renderer.render( scene, camera );
    requestAnimationFrame(animate);
};

// animate()함수를 최초에 한번은 수행해주어야 합니다.
animate();