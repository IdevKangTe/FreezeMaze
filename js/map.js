/**
 *
 * 3D MAP 파일
 *
 */
import * as THREE from "three";

export default class Map {
  // 맵
  #string;
  #map2D;
  #map3D;
  #map;

  // 바닥
  #floors;

  // 벽
  #walls;
  #outroGeometryW;
  #geometryW;
  #materialW;

  constructor() {
    this.#string = `1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0	1
    1	0	0	0	0	0	0	0	1	1	1	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	1	0	0	0	1	0	0	0	1	0	0	0	0	0	0	0	1	1	0	0	0	1	3	1
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
    1	0	1	0	0	0	0	0	1	1	1	0	1	1	1	1	1	0	1	1	1	0	1	1	1	0	1	0	1	1	0	1	0	0	0	1	0	0	0	0	1	1	0	1	0	1	0	0	0	1
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
    1	0	0	0	0	1	0	1	0	1	1	0	1	0	0	0	0	0	1	0	0	0	1	1	1	0	0	0	1	1	0	1	1	1	0	1	0	0	0	1	0	1	1	0	0	0	0	1	0	1
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

    this.#map2D = [];
    this.#map3D = [];
    this.initMap();

    this.#map = new THREE.Object3D();
    this.#map.name = "맵";
    this.#floors = null;
    this.#walls = new THREE.Object3D();
    this.#walls.name = "벽";

    this.initFloor();
    this.initWall();
  }

  initMap() {
    // 문자열 전체(g)에서 숫자0~9가 아닌 것 삭제 (string -> array)
    const stringMap = this.#string.split(/\r|\t|\s*/g);
    const numMap = stringMap.map((row) => (row *= 1));
    let zMap = [];
    numMap.forEach((num, idx) => {
      zMap.push(num);
      if (zMap.length == 50) {
        this.#map2D.push(zMap);
        zMap = [];
      }
    });
  }

  initFloor() {
    // 바닥
    const floorBasic = new THREE.TextureLoader().load(
      "texture/floor/Floor_BaseColor.jpg",
      this.onLoad(100, 100, 1)
    );
    const floorNormal = new THREE.TextureLoader().load(
      "texture/floor/Floor_Normal.jpg",
      this.onLoad(100, 100, 1)
    );
    const floorHeight = new THREE.TextureLoader().load(
      "texture/floor/Floor_Height.png",
      this.onLoad(100, 100, 1)
    );
    const floorRoughness = new THREE.TextureLoader().load(
      "texture/floor/Floor_Roughness.jpg",
      this.onLoad(100, 100, 1)
    );

    // 바닥 속성
    const geometry = new THREE.PlaneGeometry(2000, 2000, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      map: floorBasic,
      normalMap: floorNormal,
      displacementMap: floorHeight,
      displacementScale: 0,
      roughnessMap: floorRoughness,
    });

    this.#floors = new THREE.Mesh(geometry, material);
    this.#floors.name = "바닥";
    this.#floors.rotateX(-Math.PI / 2);
    this.#map.add(this.#floors);
  }

  initWall() {
    // 벽
    const wallBasic = new THREE.TextureLoader().load(
      "texture/ice/ice_001_COLOR.jpg",
      this.onLoad(1, 10, 1)
    );
    const wallNormal = new THREE.TextureLoader().load(
      "texture/ice/ice_001_NRM.jpg",
      this.onLoad(1, 10, 1)
    );
    const wallHeight = new THREE.TextureLoader().load(
      "texture/ice/ice_001_DISP.png",
      this.onLoad(1, 10, 1)
    );
    const wallRoughness = new THREE.TextureLoader().load(
      "texture/ice/ice_001_SPEC.jpg",
      this.onLoad(1, 10, 1)
    );

    // 벽 속성
    this.#outroGeometryW = new THREE.BoxGeometry(1, 1, 1);
    this.#geometryW = new THREE.BoxGeometry(1, 10, 1);
    this.#materialW = new THREE.MeshPhysicalMaterial({
      map: wallBasic,
      normalMap: wallNormal,
      displacementMap: wallHeight,
      color: 0xafe0ff,
      displacementScale: 0,
      roughnessMap: wallRoughness,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1,
      transparent: true,
      opacity: 0.8,
    });

    let idx = 0;

    this.#map2D.forEach((z, zIdx) => {
      z.forEach((x, xIdx) => {
        if (x != 1) return;
        const mesh = new THREE.Mesh(this.#geometryW, this.#materialW);
        this.#map3D.push(mesh);

        this.#map3D[idx].position.x = xIdx;
        this.#map3D[idx].position.y = 0;
        this.#map3D[idx].position.z = zIdx;

        this.#walls.add(this.#map3D[idx]);
        idx++;
      });
    });

    this.#map.add(this.#walls);
  }

  onLoad(x, y, z) {
    return (texture) => {
      texture.repeat.x = x; // x축 반복
      texture.repeat.y = y; // y축 반복
      texture.repeat.z = z; // z축 반복

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    };
  }

  load(scene) {
    scene.add(this.#map);
    return { scene, cube: this.#map3D, map2D: this.#map2D };
  }

  deleteDoor(scene) {
    this.#map3D[242].position.y = -999;
    return scene;
  }

  changeWallHeight(scene) {
    for (let box of this.#map3D) {
      box.geometry = this.#outroGeometryW;
    }
    return scene;
  }
}
