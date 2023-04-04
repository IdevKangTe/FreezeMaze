import * as THREE from 'three';

export default class Player {
  camera;
  spotLight;
  listner;
  rotationSpeed;
  smoothFactor;
  cameraDirection;

  isFrontDirection;
  isLookDown;
  isRun;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.spotLight = new THREE.SpotLight(0xffffff, 1, 70, Math.PI / 8, 0.7, 1);
    this.listner = new THREE.AudioListener();
    this.camera.position.set(1, 1, 48);
    this.camera.add(this.listner);
    this.spotLight.rotation.x += 45;
    this.spotLight.castShadow = true;

    this.rotationSpeed = 10;
    this.smoothFactor = 0.2;

    this.isFrontDirection = false;
    this.isLookDown = false;
    this.isRun = false;
  }

  load(scene) {
    scene.add(this.camera);
    scene.add(this.spotLight);
    scene.add(this.spotLight.target);
    return { scene, camera: this.camera, cameraLight: this.spotLight };
  }

  light(cameraDirPos, cameraDirection) {
    this.spotLight.position.set(
      this.camera.position.x,
      this.camera.position.y + 0.01,
      this.camera.position.z
    );
    this.spotLight.target.position.set(
      cameraDirPos.x,
      cameraDirPos.y - 0.4,
      cameraDirPos.z
    );
    this.spotLight.lookAt(cameraDirection);
  }

  rotationCheck(target) {
    if (Math.abs(target - this.camera.rotation.y) > 0.05) {
      return true;
    }
    return false;
  }

  movingCheck(target) {
    if (Math.abs(target.distanceTo(this.camera.position)) > 0.07) {
      return true;
    }
    return false;
  }

  isCollison(cube) {
    let Direction = new THREE.Vector3(0, 0, -1);
    this.camera.localToWorld(Direction);
    Direction.sub(this.camera.position).normalize();
    let Raycaster = new THREE.Raycaster(
      this.camera.position,
      Direction,
      0,
      0.6
    );
    let Intersects = [];

    for (var i in cube) {
      Intersects.push(Raycaster.intersectObject(cube[i]));
      if (Intersects[i].length > 0) {
        return true;
      }
    }
    return false;
  }

  cameraRotate(target, deltaTime) {
    // console.log(this.camera.rotation.y);
    let rotationDiff = target - this.camera.rotation.y;
    return rotationDiff * this.rotationSpeed * deltaTime;
  }

  move(target) {
    let newPosition = this.camera.position
      .clone()
      .lerp(target, this.smoothFactor);
    return newPosition;
  }

  lookDownCheck(cameraDirection, downRotation) {
    if (
      Math.round(cameraDirection.z) == 1 &&
      Math.round(cameraDirection.x) == 0
    ) {
      downRotation += Math.PI / 2;
      this.isFrontDirection = true;
    } else if (
      Math.round(cameraDirection.z) == -1 &&
      Math.round(cameraDirection.x) == 0
    ) {
      downRotation -= Math.PI / 2;
      this.isFrontDirection = false;
    }
    this.isLookDown = true;
    return downRotation;
  }

  lookDown(target, deltaTime) {
    let downRotationDiff = target - this.camera.rotation.x;
    return downRotationDiff * this.rotationSpeed * deltaTime;
  }

  lookUp(downRotation) {
    if (this.isFrontDirection) {
      downRotation -= Math.PI / 2;
    } else {
      downRotation += Math.PI / 2;
    }
    return downRotation;
  }

  run() {
    this.rotationSpeed = 20;
    this.smoothFactor = 0.5;
  }

  stopRun() {
    this.rotationSpeed = 10; // 회전 속도
    this.smoothFactor = 0.2; // 이동 보간 계수
  }
}
