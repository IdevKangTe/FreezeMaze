import * as THREE from 'three';
// export { initMonster, initMonsterLight };
export default class Monster {
  monster;
  monsterLight;
  nextGo;
  direc;
  monsterMesh;
  monsterSpeed;

  isMad;

  constructor() {
    this.monsterMesh = this.normalMaterial();
    const geometry = new THREE.SphereGeometry(0.5, 100, 100); //기본형태
    this.monster = new THREE.Mesh(geometry, this.monsterMesh);
    this.monsterLight = new THREE.SpotLight(
      0x99ffcc,
      3,
      20,
      Math.PI / 10,
      0.5,
      1
    );

    this.monster.position.set(26, 2, 28);
    this.monsterLight.position.set(this.monster.position);
    this.monsterLight.rotation.y += Math.PI / 2;
    this.monsterLight.position.y += 2;
    this.monsterLight.target.position.set(this.monster.position);
    this.nextGo = 0;
    this.direc = [
      new THREE.Vector3(-1, 0, 0), //왼
      new THREE.Vector3(1, 0, 0), // 오
      new THREE.Vector3(0, 0, -1), // 위
      new THREE.Vector3(0, 0, 1), // 아래
    ];
    this.monsterSpeed = 4;

    this.isMad = false;
  } // initMonster

  load(scene) {
    scene.add(this.monster);
    scene.add(this.monsterLight);
    scene.add(this.monsterLight.target);

    return { scene, monster: this.monster };
  }

  //=============================================================================//

  madMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const basicTexture = textureLoader.load(
      'texture/monster_mad/Alien_Muscle_001_COLOR.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const normalTexture = textureLoader.load(
      'texture/monster_mad/Alien_Muscle_001_NORM.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const heightTexture = textureLoader.load(
      'texture/monster_mad/Alien_Muscle_001_DISP.png',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const roughnessTexture = textureLoader.load(
      'texture/monster_mad/Alien_Muscle_001_SPEC.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const occTexture = textureLoader.load(
      'texture/monster_mad/Alien_Muscle_001_OCC.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const monsterMesh = new THREE.MeshPhysicalMaterial({
      map: basicTexture,
      normalMap: normalTexture,
      displacementMap: heightTexture,
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      // roughness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1,
      aoMap: occTexture,
      aoMapIntensity: 1,
    });

    return monsterMesh;
  }

  madLight() {
    this.monsterLight.color.set(0xff6666);
  }

  normalLight() {
    this.monsterLight.color.set(0x99ffcc);
  }

  normalMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const basicTexture = textureLoader.load(
      'texture/monster/Abstract_Organic_002_COLOR.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const normalTexture = textureLoader.load(
      'texture/monster/Abstract_Organic_002_NORM.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const heightTexture = textureLoader.load(
      'texture/monster/Abstract_Organic_002_DISP.png',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const roughnessTexture = textureLoader.load(
      'texture/monster/Abstract_Organic_002_ROUGH.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const occTexture = textureLoader.load(
      'texture/monster/Abstract_Organic_002_OCC.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const monsterMesh = new THREE.MeshPhysicalMaterial({
      map: basicTexture,
      normalMap: normalTexture,
      displacementMap: heightTexture,
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      // roughness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1,
      aoMap: occTexture,
      aoMapIntensity: 1,
    });

    return monsterMesh;
  }

  //=============================================================================

  enemyLight() {
    this.monsterLight.position.set(
      this.monster.position.x,
      4,
      this.monster.position.z
    );
    this.monsterLight.target.position.copy(this.monster.position);
  }
}
