/**
 *
 * 3D MAP 파일
 *
 */
import * as THREE from 'three';

export {map2D};

// class Map{
//   #stringMap;
//   #

//   constructor() {

//   }

// }

// export default map;

let stringMap = `1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1
1	0	0	0	0	0	0	0	1	1	1	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	1	0	0	0	1	0	0	0	1	0	0	0	0	0	0	0	1	1	0	0	0	1 3	1
1	0	1	0	1	1	1	0	0	0	0	0	1	0	1	0	1	1	0	1	1	0	1	0	1	0	0	0	1	0	1	0	1	0	0	0	1	0	1	0	1	0	0	0	0	1	0	1	0	1
1	0	1	0	0	0	1	0	1	1	0	1	1	0	1	0	1	0	0	0	1	0	1	0	1	0	1	1	1	0	1	0	1	0	1	1	1	0	1	0	1	1	1	1	1	1	0	1	0	1
1	0	1	1	1	0	1	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	1	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	1	0	0	0	1	0	1
1	0	0	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	1	0	1	0	1	0	1
1	0	1	0	1	0	1	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	1	0	1
1	0	1	0	1	0	1	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	1	1	0	1	0	1	0	1	0	1
1	0	1	0	0	0	0	0	0	1	1	0	1	1	0	1	1	1	0	1	0	1	0	1	1	0	1	0	1	1	0	1	1	1	1	1	1	1	1	0	1	1	0	0	0	1	0	1	0	1
1	0	1	0	1	0	1	1	0	1	1	0	1	1	0	1	1	1	0	1	0	1	0	1	1	0	0	0	1	1	0	0	0	0	0	0	0	0	0	0	1	1	0	1	0	1	0	1	1	1
1	0	1	0	1	0	1	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	0	0	1
1	0	1	0	1	0	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	0	0	1	1	1	0	1
1	0	0	0	0	0	1	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	1	1	0	0	0	0	0	1
1	1	1	0	1	1	1	1	0	1	1	0	0	0	0	0	0	0	1	0	0	0	0	0	1	0	1	0	1	1	0	1	1	1	0	1	1	1	1	0	1	0	1	1	0	1	0	1	1	1
1	0	0	0	1	0	0	0	0	1	1	0	1	1	0	1	1	0	1	0	1	1	1	0	1	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	1	0	0	0	1
1	0	1	0	0	0	1	1	0	1	1	0	0	0	0	1	0	0	0	0	0	0	0	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	0	0	0	1	1	0	1	0	1	0	1
1	0	1	0	1	1	1	0	0	1	1	0	1	1	0	1	0	1	1	0	1	1	1	0	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	1	0	0	0	0	0	1
1	0	1	0	1	0	0	0	1	1	1	0	1	0	0	0	0	0	1	0	0	0	0	0	1	0	1	0	1	1	0	0	0	0	0	0	0	0	1	1	1	1	0	1	1	0	1	1	1	1
1	0	0	0	0	0	1	0	1	1	1	0	0	0	1	0	1	0	1	1	0	1	0	1	1	0	1	0	1	1	0	1	0	1	1	0	1	0	0	0	1	1	0	0	0	0	0	0	0	1
1	1	0	1	1	0	1	0	1	1	1	0	1	1	1	0	1	0	1	0	0	1	0	0	0	0	0	0	1	1	0	1	0	1	1	0	1	1	1	0	1	1	0	1	1	0	1	1	0	1
1	0	0	0	0	0	1	0	1	1	1	0	0	0	1	0	1	0	0	0	1	1	0	1	1	1	1	0	1	1	0	0	0	0	1	0	0	0	0	0	1	1	0	0	0	0	0	0	0	1
1	0	1	0	1	1	1	0	1	1	1	0	1	0	0	0	0	0	1	1	1	0	0	0	0	0	1	0	1	1	0	1	1	0	1	1	0	1	1	0	1	1	0	1	0	1	0	1	1	1
1	0	1	0	0	0	0	0	1	1	1	0	1	1	1	1	1	0	1	1	1	0	1	1	1	0	1	0	1	1	0	1	0	0	0	0	0	0	0	0	1	1	0	1	0	1	0	0	0	1
1	0	1	1	1	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	1	0	1	0	1	0	1	1	0	0	0	0	1	0	0	0	1	0	1
1	0	0	0	0	0	1	0	1	1	1	1	1	1	0	1	1	1	0	1	1	1	1	1	1	0	1	1	0	1	1	1	0	1	0	1	0	1	1	1	1	1	0	1	0	1	1	1	0	1
1	0	1	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1
1	0	1	0	1	0	1	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	1	0	1
1	0	1	0	0	0	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	0	0	0	1
1	0	1	1	1	1	1	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1
1	0	0	0	0	0	0	0	0	1	1	0	1	0	1	1	1	1	1	0	1	1	1	1	0	0	1	0	1	1	0	1	1	0	1	1	0	1	1	1	0	1	1	1	0	1	0	1	0	1
1	0	1	0	1	1	1	1	0	1	1	0	1	0	0	0	0	0	0	0	0	0	0	1	0	1	1	0	1	1	0	0	0	0	0	1	0	0	0	0	0	0	0	1	0	1	0	0	0	1
1	0	1	0	0	0	0	1	0	1	1	0	1	0	1	1	1	1	1	1	1	1	0	1	0	1	1	0	1	1	0	1	1	1	0	1	0	1	1	1	1	1	0	1	0	1	1	1	0	1
1	0	1	1	0	1	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	1
1	0	0	0	0	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	1	1	0	1	1	1
1	0	1	1	0	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	0	0	0	0	1
1	0	0	0	0	0	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	1	1	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	1
1	0	1	1	0	1	0	1	0	1	1	0	1	0	1	1	1	1	1	1	1	1	1	0	0	0	1	0	1	1	0	1	0	0	0	1	1	1	1	1	0	1	1	0	1	1	0	1	0	1
1	0	0	0	0	1	0	1	0	1	1	0	1	0	0	0	0	0	1	0	0	0	1	1	1	0	0	0	1	1	0	1	1	1	0	1	0	0	0	1	0	1	0	0	1	0	0	1	0	1
1	1	1	0	1	1	0	1	0	1	1	0	1	0	1	0	1	0	1	0	1	0	0	0	0	0	1	0	1	1	0	1	0	0	0	1	0	1	0	1	0	1	1	1	1	0	1	1	0	1
1	0	0	0	0	0	0	1	0	1	1	0	0	0	1	0	0	0	0	0	1	0	1	0	1	0	1	0	1	1	0	1	0	1	1	1	0	1	0	0	0	0	0	1	1	0	1	0	0	1
1	0	1	1	1	0	1	1	0	1	1	0	1	0	1	1	0	1	1	1	1	0	1	0	1	0	1	0	1	1	0	0	0	0	0	0	0	1	1	1	1	1	0	0	0	0	1	0	1	1
1	0	0	0	0	0	0	0	0	1	1	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	1	0	1	0	1	0	1	0	0	0	0	0	1	0	1	1	0	0	0	0	1
1	1	1	0	1	1	0	1	0	1	1	0	1	1	1	0	1	1	1	1	0	1	1	1	1	0	1	0	1	1	0	1	0	1	0	1	1	1	1	1	0	1	0	1	1	1	0	1	0	1
1	0	0	0	1	1	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	1	0	1	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	1
1	0	1	0	0	0	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	0	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	1	1	1	1
1	0	1	0	1	1	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1	0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	0	0	0	0	0	0	1
1	0	1	0	0	0	0	0	1	0	0	0	1	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	1	1	1	0	1	0	1
1	0	1	1	1	1	0	1	1	0	1	0	1	0	1	1	0	1	0	1	0	1	1	0	1	1	1	1	1	1	1	0	1	0	1	1	1	0	1	0	1	0	1	1	0	0	0	1	0	1
1	3	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	1	0	0	0	0	1	0	0	0	1
1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1`;


// 문자열 전체(g)에서 숫자0~9가 아닌 것 삭제 (string -> array)
stringMap = stringMap.split(/[^0-9]/g);
// console.log(excelNum);

// 문자열 숫자로 변환
const numMap = stringMap.map((row) => (row *= 1));
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
function onLoad(x, y, z) {
  return (texture) => {
    texture.repeat.x = x; // x축 반복
    texture.repeat.y = y; // y축 반복
    texture.repeat.z = z; // z축 반복

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  };
}

const textureLoader = new THREE.TextureLoader();

// 바닥
const floorBasic = textureLoader.load(
  'texture/floor/Floor_BaseColor.jpg',
  onLoad(100, 100, 1)
);
const floorNormal = textureLoader.load(
  'texture/floor/Floor_Normal.jpg',
  onLoad(100, 100, 1)
);
const floorHeight = textureLoader.load(
  'texture/floor/Floor_Height.png',
  onLoad(100, 100, 1)
);
const floorRoughness = textureLoader.load(
  'texture/floor/Floor_Roughness.jpg',
  onLoad(100, 100, 1)
);

// 벽
const basicTexture = textureLoader.load(
  'texture/ice/ice_001_COLOR.jpg',
  onLoad(1, 10, 1)
);
const normalTexture = textureLoader.load(
  'texture/ice/ice_001_NRM.jpg',
  onLoad(1, 10, 1)
);
const heightTexture = textureLoader.load(
  'texture/ice/ice_001_DISP.png',
  onLoad(1, 10, 1)
);
const roughnessTexture = textureLoader.load(
  'texture/ice/ice_001_SPEC.jpg',
  onLoad(1, 10, 1)
);

// 바닥 속성
const floor = {
  geometry: new THREE.PlaneGeometry(2000, 2000, 1, 1),
  material: new THREE.MeshStandardMaterial({
    map: floorBasic,
    normalMap: floorNormal,
    displacementMap: floorHeight,
    displacementScale: 0,
    roughnessMap: floorRoughness,
  }),
};

// 벽 속성
const wall = {
  geometry: new THREE.BoxGeometry(1, 1, 1),
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
    opacity: 0.8,
  }),
};

// 맵
const map = new THREE.Object3D();
map.name = '맵';

// 바닥
const floors = new THREE.Mesh(floor.geometry, floor.material);
floors.name = '바닥';
floors.rotateX(-Math.PI / 2);

// 벽
const walls = new THREE.Object3D();
walls.name = '벽';

const map3D = [];
let idx = 0;

map2D.forEach((num1, zIndex) => {
  let _map2D = map2D[zIndex];
  _map2D.forEach((num2, xIndex) => {
    // 값이 1인 위치에 기둥(=벽) 세우기
    if (_map2D[xIndex] === 1) {
      const mesh = new THREE.Mesh(wall.geometry, wall.material);
      map3D.push(mesh);
      
      map3D[idx].position.x = xIndex;
      map3D[idx].position.y = 0;
      map3D[idx].position.z = zIndex;

      walls.add(map3D[idx]);
      idx++;
    }
  });
});

export default function load(scene) {
  map.add(floors, walls);
  scene.add(map);

  return {scene, map3D};
}

// removeExitWall() {
//   const endingMap = map3D.map();
//   scene.add(endingMap);
// }

