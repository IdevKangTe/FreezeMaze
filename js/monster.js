import * as THREE from 'three';
export { initMonster, initMonsterLight };

function initMonster() {
  let monsterMesh = normalMaterial();

  const geometry = new THREE.SphereGeometry(0.5, 100, 100); //기본형태
  const sphere = new THREE.Mesh(geometry, monsterMesh);

  return sphere;
} // initMonster
//=============================================================================//

function madMaterial() {
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

function normalMaterial() {
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

function initMonsterLight() {
  const spotLight = new THREE.SpotLight(0xffffff, 10, 70, 0.5, 0.5, 1);
  return spotLight;
}
