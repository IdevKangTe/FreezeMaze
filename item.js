import * as THREE from 'three';
export default class Item {
  item;
  light;

  constructor() {
    this.item = this.initItem();
    this.light = this.initItemLight();

    this.item.position.set(8, -0.47, 35);
    this.light.position.set(8, 4, 35);
    this.light.rotation.z = Math.PI;
    this.light.castShadow = true;
  }

  load(scene) {
    scene.add(this.item);
    scene.add(this.light);

    return { scene, item: this.item };
  }

  initItem() {
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

    let item = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1, 0.7), itemMaterial);

    return item;
  }

  initItemLight() {
    let bulbGeometry = new THREE.ConeGeometry(0.3, 0.7, 4);
    let bulbLight = new THREE.PointLight(0xffcccc, 1, 30, 2);
    let bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000,
    });
    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
    return bulbLight;
  }

  itemPositionChange(x, z) {
    this.item.position.set(x, -0.47, z);
    this.light.position.set(x, 4, z);
  }

  update() {
    this.light.rotation.y += 0.05;
  }
}
