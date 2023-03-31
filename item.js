import * as THREE from 'three';
export { initItem, initItemLight };

function initItem() {
  const textureLoader = new THREE.TextureLoader();
  const basicTexture = textureLoader.load(
    'texture/item/Sci_fi_Metal_Panel_004_basecolor.jpg',
    (texture) => {
      texture.repeat.x = 3;
      texture.repeat.y = 3;
      texture.repeat.z = 3;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const normalTexture = textureLoader.load(
    'texture/item/Sci_fi_Metal_Panel_004_normal.jpg',
    (texture) => {
      texture.repeat.x = 3;
      texture.repeat.y = 3;
      texture.repeat.z = 3;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const heightTexture = textureLoader.load(
    'texture/item/Sci_fi_Metal_Panel_004_height.png',
    (texture) => {
      texture.repeat.x = 3;
      texture.repeat.y = 3;
      texture.repeat.z = 3;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const roughnessTexture = textureLoader.load(
    'texture/item/Sci_fi_Metal_Panel_004_roughness.jpg',
    (texture) => {
      texture.repeat.x = 3;
      texture.repeat.y = 3;
      texture.repeat.z = 3;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const metalTexture = textureLoader.load(
    'texture/item/Sci_fi_Metal_Panel_004_metallic.jpg',
    (texture) => {
      texture.repeat.x = 3;
      texture.repeat.y = 3;
      texture.repeat.z = 3;

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const itemMaterial = new THREE.MeshStandardMaterial({
    map: basicTexture,
    normalMap: normalTexture,
    displacementMap: heightTexture,
    displacementScale: 0,
    roughnessMap: roughnessTexture,
    // roughness: 0,
    metalnessMap: metalTexture,
  });

  const item = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1, 0.7), itemMaterial);

  return item;
}

function initItemLight() {
  const bulbGeometry = new THREE.ConeGeometry(0.3, 0.7, 4);
  const bulbLight = new THREE.PointLight(0xffcccc, 1, 30, 2);
  const bulbMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  });
  bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
  return bulbLight;
}
