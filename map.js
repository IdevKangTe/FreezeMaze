/**
 * 
 * 3D MAP 파일
 * 
 */
import * as THREE from "three";


let stringMap = `1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1
1	1	1	0	0	0	0	1	1	1	1	1	0	0	0	0	0	0	0	1	1	0	0	0	1	0	0	0	1	0	0	0	0	0	1	0	0	0	0	1	1	1	1	1	0	0	0	0	3	1
1	1	1	0	1	1	0	1	1	1	1	1	0	1	1	1	0	1	0	0	0	0	1	0	1	0	1	0	1	0	1	1	1	0	1	0	1	1	0	1	1	1	1	1	0	1	1	1	0	1
1	1	0	0	1	1	0	1	1	1	1	1	0	1	1	1	0	1	1	1	1	0	1	0	0	0	1	0	0	0	1	0	0	0	1	0	0	0	0	1	1	1	0	0	0	0	0	1	0	1
1	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	1	1	1	1	1	1	1	1	0	0	1	0	1	1	0	1	0	1	1	0	0	1	1	1	0	1	0	1
1	0	0	1	1	0	1	1	1	0	1	1	1	1	1	1	1	0	1	0	1	1	1	1	0	0	0	0	0	1	0	1	0	0	1	1	0	1	0	0	0	0	1	0	0	0	0	1	0	1
1	0	1	1	1	0	0	0	0	0	0	1	1	0	0	0	1	0	1	0	0	1	1	1	0	1	1	1	0	1	0	1	0	1	1	1	0	0	0	1	1	0	0	0	1	1	0	0	0	1
1	0	1	1	1	1	1	1	1	1	0	1	0	0	1	0	1	0	0	1	0	0	0	0	0	1	1	0	0	1	0	1	0	1	1	0	0	1	1	1	1	0	1	1	1	1	0	1	0	1
1	0	0	0	0	0	0	0	0	0	0	0	0	1	1	0	1	1	0	1	1	1	0	1	1	0	0	0	1	1	0	0	0	0	1	0	1	0	0	0	1	0	1	0	0	0	0	1	0	1
1	0	1	1	1	1	1	1	1	0	1	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	1	1	1	1	1	1	0	0	0	1	0	1	0	1	0	0	0	1	0	1	1	0	1
1	0	0	1	1	0	0	0	1	0	1	1	1	0	1	1	1	1	1	1	0	1	1	1	1	0	1	0	0	0	1	1	0	0	1	0	1	0	1	0	1	0	1	1	0	0	0	0	0	1
1	1	0	1	1	0	1	0	1	0	1	1	1	0	1	0	0	0	0	1	0	0	0	0	1	0	1	0	1	0	1	1	0	1	1	0	1	0	0	0	0	0	0	0	0	1	1	0	1	1
1	0	0	1	0	0	1	0	0	0	0	1	1	0	0	0	1	1	0	1	0	1	1	0	0	0	0	0	1	0	0	0	0	0	1	0	1	1	1	1	1	0	1	1	1	0	0	0	1	1
1	0	1	1	0	1	1	0	1	1	0	0	0	1	1	0	1	0	0	1	0	1	0	0	1	1	1	1	1	0	1	1	1	0	1	0	0	0	0	0	0	0	1	0	0	0	1	0	1	1
1	0	0	0	0	0	0	0	1	1	0	1	0	0	0	0	1	0	1	1	0	1	0	1	0	0	0	0	0	0	1	1	0	0	1	0	1	1	0	1	1	1	1	0	1	1	0	0	0	1
1	1	0	1	1	1	1	0	0	1	0	1	0	1	0	1	1	0	0	0	0	1	0	0	0	1	0	1	1	0	0	1	0	1	1	0	1	0	0	1	0	0	0	0	1	1	0	1	0	1
1	1	0	0	0	0	1	1	0	1	0	1	0	1	0	1	0	0	1	1	0	1	0	1	1	0	0	1	1	1	0	0	0	1	0	0	1	0	1	0	0	1	1	0	0	0	0	0	0	1
1	1	1	1	1	0	1	1	0	0	0	1	0	1	0	0	0	1	1	0	0	1	0	1	1	0	1	0	0	0	1	1	1	0	0	1	0	0	1	0	1	1	0	0	1	1	1	1	0	1
1	1	1	0	0	0	1	0	0	1	0	1	0	1	0	1	1	0	0	0	1	0	0	1	0	0	0	0	1	0	0	0	0	0	1	1	0	1	0	0	1	1	0	1	1	0	0	0	0	1
1	1	0	0	1	1	1	0	1	1	0	1	0	1	0	0	0	0	1	1	1	0	1	0	0	1	0	1	1	1	1	1	0	1	1	1	0	1	0	1	1	0	0	0	1	0	1	1	1	1
1	1	0	1	1	1	1	0	1	1	0	1	0	1	0	1	1	0	0	0	1	0	1	0	1	1	0	0	0	0	1	0	0	0	0	1	0	1	0	0	0	0	1	0	1	0	0	0	1	1
1	1	0	1	0	0	0	0	0	0	0	1	0	1	0	1	1	1	1	0	1	0	0	0	1	1	1	0	1	0	0	0	1	1	0	0	0	1	0	1	1	0	1	0	0	1	1	0	0	1
1	1	0	1	0	1	1	1	1	1	0	0	0	1	0	1	0	0	0	0	1	0	1	1	1	0	0	0	1	0	1	0	0	1	1	0	1	1	0	1	1	0	0	1	0	0	0	1	0	1
1	1	0	0	0	0	0	0	1	1	1	1	0	0	0	1	0	1	1	0	1	0	0	0	0	0	1	1	0	0	1	1	0	1	1	0	1	0	0	0	1	1	0	1	1	1	0	1	0	1
1	1	1	1	1	1	1	0	0	0	1	1	1	0	1	1	0	1	0	0	1	0	1	1	1	0	0	0	0	1	1	1	0	1	1	0	0	0	1	0	0	0	0	1	1	0	0	1	0	1
1	1	0	0	0	0	1	1	1	0	0	1	1	0	1	0	0	1	0	1	1	0	1	1	0	0	1	1	0	0	0	0	0	1	0	0	1	1	0	0	1	0	1	1	1	0	1	0	0	1
1	0	0	1	1	0	0	0	1	1	0	1	1	0	0	0	1	0	0	1	0	0	0	0	0	1	1	1	1	1	1	0	1	1	0	1	1	0	0	1	1	0	1	1	1	0	1	0	1	1
1	0	1	1	1	1	1	0	0	1	0	1	1	1	0	1	1	0	1	1	0	1	1	0	1	0	0	0	0	0	1	0	0	1	0	1	1	0	1	1	1	0	1	1	0	0	0	0	0	1
1	0	1	0	0	0	1	1	0	1	0	1	1	1	0	1	1	0	0	1	0	1	1	0	1	0	1	1	1	0	1	1	0	1	0	0	0	0	0	0	0	0	1	0	0	1	1	1	0	1
1	0	0	0	1	0	0	0	0	1	0	0	1	0	0	0	0	1	0	0	0	1	0	0	1	0	1	0	0	0	0	1	0	0	1	0	0	1	1	1	1	0	1	0	1	0	0	0	0	1
1	0	1	0	1	0	1	1	0	1	1	0	1	0	1	1	0	1	1	1	0	1	0	1	0	0	0	0	1	1	0	1	1	0	1	1	0	0	1	1	1	0	0	0	1	0	1	0	1	1
1	0	1	0	0	0	1	0	0	1	1	0	0	0	1	0	0	0	0	0	0	1	0	0	0	1	1	1	1	1	0	0	0	0	0	0	1	0	0	1	1	1	1	1	0	0	1	0	1	1
1	0	0	1	1	1	0	0	1	1	1	1	1	1	0	0	1	1	1	1	0	0	1	1	0	0	0	0	0	0	0	1	1	1	1	0	0	1	0	0	0	0	0	0	0	1	1	0	1	1
1	1	0	0	0	0	0	1	1	1	1	1	1	1	0	1	0	0	0	1	1	0	1	0	0	1	0	1	1	0	1	0	0	0	1	1	0	1	0	1	1	1	1	1	1	1	0	0	1	1
1	1	1	1	0	1	1	0	0	0	1	1	1	0	0	0	0	1	0	0	0	0	1	0	1	1	0	1	0	0	0	0	1	0	0	0	0	0	0	1	1	1	1	1	1	1	0	1	1	1
1	1	0	0	0	0	0	0	1	0	1	1	1	0	1	1	1	1	1	1	1	0	1	0	0	0	0	1	0	1	1	1	1	1	1	1	0	1	1	1	1	0	0	0	1	1	0	1	1	1
1	0	0	1	0	1	1	1	1	0	1	1	0	0	0	0	1	1	1	1	0	0	1	1	0	1	1	1	0	0	0	1	1	1	1	0	0	1	1	1	1	0	1	0	0	0	0	1	1	1
1	0	1	1	0	1	0	0	0	0	1	1	0	1	1	0	0	1	0	0	0	1	0	0	0	0	0	1	1	1	0	0	1	0	0	0	1	1	1	1	1	0	1	0	1	1	1	1	1	1
1	0	1	0	0	1	0	1	1	0	1	1	0	1	1	1	0	0	0	1	1	0	0	1	1	1	0	0	1	1	1	0	0	0	1	0	1	1	1	1	0	0	1	0	0	0	1	1	1	1
1	0	0	0	1	0	0	0	1	0	0	0	0	0	0	0	1	1	1	1	0	0	1	1	1	1	1	0	0	0	0	1	1	1	1	0	1	1	1	1	0	1	1	0	1	0	1	1	1	1
1	0	1	0	0	0	1	0	0	0	1	1	0	1	1	0	1	1	1	0	0	1	1	1	1	1	1	1	0	1	0	1	1	1	0	0	0	0	1	0	0	1	0	0	1	0	0	0	1	1
1	0	1	0	1	0	1	1	1	0	1	1	0	1	1	0	0	1	0	0	0	1	1	1	1	1	1	1	0	0	0	0	1	0	0	1	1	0	0	0	1	0	0	1	1	1	1	0	1	1
1	0	1	0	1	0	1	1	1	0	1	0	0	0	0	1	0	1	0	1	0	0	1	1	1	1	1	0	0	1	1	0	1	0	1	1	1	1	0	1	0	0	1	1	0	0	0	0	0	1
1	0	1	0	1	0	1	1	1	0	1	0	1	1	0	0	0	1	0	1	1	0	0	1	1	1	0	0	1	1	1	0	1	0	0	0	1	1	0	0	0	1	0	0	0	1	1	1	0	1
1	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	0	0	1	1	1	0	0	0	0	0	1	1	1	1	0	0	0	1	0	1	1	0	1	1	1	0	1	0	0	0	0	0	1
1	1	0	1	1	1	1	0	1	1	1	1	0	1	0	1	1	1	0	0	0	0	0	1	1	1	0	0	0	0	0	0	1	1	0	0	1	1	0	1	0	0	0	1	0	1	1	1	0	1
1	0	0	1	1	0	0	0	0	0	0	0	0	1	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	1	1	1	0	1	0	1	1	1	0	0	0	0	0	1
1	0	1	1	1	0	1	1	1	1	1	1	0	1	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	0	1	1	1	1	0	1	0	1	1	1	0	1	1	1	0	1
1	3	0	0	0	0	0	0	0	0	0	0	0	1	1	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	1	1	1	1	1	0	0	0	0	0	0	0	0	0	0	0	1
1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1`;

// console.log(excelNum);

// 문자열 전체(g)에서 숫자0~9가 아닌 것 삭제 (string -> array)
stringMap = stringMap.split(/[^0-9]/g);
// console.log(excelNum);

// 문자열 숫자로 변환
const numMap = stringMap.map(row => row *= 1);
// console.log(mapNum);

// 이차원 배열에 담기
const map2D = [];
let mapX = [];

numMap.forEach((num) => {
    mapX.push(num);
    if (mapX.length === 50) {
        map2D.push(mapX);
        mapX = [];
    }
});
// console.log(map);

// map 배열 값 타입 확인
// const g = (map) => {
//     for(i in map) {
//         if (typeof map[i] !== "number") {
//             console.log(i);
//         }
//         else {
//             console.log('nothing');
//         }
//     }
// };
// console.log(g(map));



// 바닥, 벽 재질
const onLoad = {
    floor: (texture) => {

    },
    wall: (texture) => {
        texture.repeat.y = 10; // 세로로 10개 반복
        
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    }
};

const textureLoader = new THREE.TextureLoader();
const basicTexture = textureLoader.load(
    'texture/ice/ice_001_COLOR.jpg', onLoad.wall
);
const normalTexture = textureLoader.load(
    'texture/ice/ice_001_NRM.jpg', onLoad.wall
);
const heightTexture = textureLoader.load(
    'texture/ice/ice_001_DISP.png', onLoad.wall
);
const roughnessTexture = textureLoader.load(
    'texture/ice/ice_001_SPEC.jpg', onLoad.wall
);

// 바닥 속성
const floor = {
    geometry: new THREE.PlaneGeometry(2000, 2000, 100, 100),
    material: new THREE.MeshStandardMaterial({ color: 0xffffff })
}

// 벽 속성
const wall = {
    geometry: new THREE.BoxGeometry(1, 10, 1),
    material: new THREE.MeshPhysicalMaterial({
        map: basicTexture,
        normalMap: normalTexture,
        displacementMap: heightTexture,
        color: 0xafe0ff,
        displacementScale: 0,
        roughnessMap: roughnessTexture,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        transparent: true,
        opacity: 0.5,
    })
};


        
export default function load(scene) {
    // 맵
    const map = new THREE.Object3D();
    map.name = '맵';
    scene.add(map);

    // 바닥
    const floors = new THREE.Mesh(floor.geometry, floor.material);
    floors.name = '바닥';
    floors.rotateX(-Math.PI / 2);
    map.add(floors);

    // 벽
    const walls = new THREE.Object3D();
    walls.name = '벽'
    map.add(walls);
    const map3D = [];
    let idx = 0;
    
    map2D.forEach((num1, idx1) => {
        let _map2D = map2D[idx1];
        _map2D.forEach((num2, idx2) => {
            // 값이 1인 위치에 기둥(=벽) 세우기
            if (_map2D[idx2] === 1) {
                map3D.push(new THREE.Mesh(wall.geometry, wall.material));

                map3D[idx].position.x = idx2;
                map3D[idx].position.y = 0;
                map3D[idx].position.z = idx1;

                walls.add(map3D[idx]);
                idx++;
            }
        });
    });

    return { scene, map3D };
};

