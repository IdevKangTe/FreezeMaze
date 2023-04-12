import * as THREE from 'three';
export default class Item {
  textureLoader;
  mini;
  miniLight;
  doorWall;
  door;
  doorLigth;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.mini = this.initmini();
    this.miniLight = this.initminiLight();
    this.door = this.initDoor();
    this.doorWall = this.initDoorWall();

    this.mini.position.set(8, -0.47, 35);
    this.miniLight.position.set(8, 4, 35);
    this.miniLight.rotation.z = Math.PI;
    this.miniLight.castShadow = true;
    this.door.position.set(46.625, 1.5, 8);
    this.doorWall.position.set(46.988, 1.5, 8);
    this.doorLigth = this.initDoorLight();
    this.doorLigth.position.set(48, 1.5, 0);
  }

  load(scene) {
    scene.add(this.mini);
    scene.add(this.miniLight);
    scene.add(this.door);
    scene.add(this.doorWall);

    return { scene, mini: this.mini };
  }

  changeDoor(scene) {
    scene.remove(this.door);
    scene.remove(this.doorWall);
    scene.add(this.doorLigth);
    return scene;
  }

  initmini() {
    const basicTexture = this.textureLoader.load(
      'texture/item/Sci_fi_Metal_Panel_004_basecolor.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const normalTexture = this.textureLoader.load(
      'texture/item/Sci_fi_Metal_Panel_004_normal.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const heightTexture = this.textureLoader.load(
      'texture/item/Sci_fi_Metal_Panel_004_height.png',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const roughnessTexture = this.textureLoader.load(
      'texture/item/Sci_fi_Metal_Panel_004_roughness.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const metalTexture = this.textureLoader.load(
      'texture/item/Sci_fi_Metal_Panel_004_metallic.jpg',
      (texture) => {
        texture.repeat.x = 3;
        texture.repeat.y = 3;
        texture.repeat.z = 3;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const miniMaterial = new THREE.MeshStandardMaterial({
      map: basicTexture,
      normalMap: normalTexture,
      displacementMap: heightTexture,
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      metalnessMap: metalTexture,
    });

    let mini = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1, 0.7), miniMaterial);

    return mini;
  }

  initminiLight() {
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

  initDoorWall() {
    const basicTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_base.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const normalTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_normal.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const heightTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_height.png',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const roughnessTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_rough.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const metalTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_metallic.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const occTexture = this.textureLoader.load(
      'texture/door_wall/door_wall_occ.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 2;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const doorWallMaterial = new THREE.MeshStandardMaterial({
      map: basicTexture,
      normalMap: normalTexture,
      displacementMap: heightTexture,
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      metalnessMap: metalTexture,
      aoMap: occTexture,
    });

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1, 3, 1),
      doorWallMaterial
    );

    return door;
  }

  initDoor() {
    const basicTexture = this.textureLoader.load(
      'texture/door/door_base.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const normalTexture = this.textureLoader.load(
      'texture/door/door_normal.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const heightTexture = this.textureLoader.load(
      'texture/door/door_height.png',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const roughnessTexture = this.textureLoader.load(
      'texture/door/door_rough.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const metalTexture = this.textureLoader.load(
      'texture/door/door_metallic.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const occTexture = this.textureLoader.load(
      'texture/door/door_occ.jpg',
      (texture) => {
        texture.repeat.x = 1;
        texture.repeat.y = 3;
        texture.repeat.z = 1;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const doorMaterial = new THREE.MeshStandardMaterial({
      map: basicTexture,
      normalMap: normalTexture,
      displacementMap: heightTexture,
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      metalnessMap: metalTexture,
      aoMap: occTexture,
      // alphaMap: opacityTexture,
    });

    const doorWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 2.5, 0.9),
      doorMaterial
    );

    return doorWall;
  }

  initDoorLight() {
    const doorGeometry = new THREE.BoxGeometry(1, 3, 0.3);
    let bulbLight = new THREE.PointLight(0xffffff, 1, 30, 2);
    let bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1,
      color: 0x000000,
    });
    bulbLight.add(new THREE.Mesh(doorGeometry, bulbMat));
    return bulbLight;
  }

  miniPositionChange(arr) {
    let x = arr[0];
    let z = arr[1];
    
    this.mini.position.set(x, -0.47, z);
    this.miniLight.position.set(x, 4, z);
  }

  update() {
    this.miniLight.rotation.y += 0.05;
  }

}
