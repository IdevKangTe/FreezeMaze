import * as THREE from 'three';

export default class Player {
  camera;
  spotLight;
  listner;
  rotationSpeed;
  smoothFactor;
  cameraDirection;
  cameraDirPos;
  frontMoveTarget;
  sideRotationTarget;
  downRotationTarget;
  stamina;

  isSideRotating;
  isDownRotating;
  isMoving;
  isRunning;
  isFrontDirection;
  isLookDown;
  isCollison;
  isOutOfStamina;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.spotLight = new THREE.SpotLight(0xffffff, 1, 70, Math.PI / 8, 0.7, 1);
    this.listner = new THREE.AudioListener();
    this.camera.add(this.listner);
    this.camera.position.set(1, 1, 48);
    this.spotLight.rotation.x += 45;
    this.spotLight.castShadow = true;
    this.rotationSpeed = 10;
    this.smoothFactor = 0.2;

    this.frontMoveTarget = this.camera.position.clone();
    this.sideRotationTarget = this.camera.rotation.y;
    this.downRotationTarget = this.camera.rotation.x;
    this.cameraDirection = new THREE.Vector3();
    this.cameraDirPos = this.camera.position.clone().add(this.cameraDirection);
    this.stamina = 100;

    this.isFrontDirection = false;
    this.isLookDown = false;
    this.isCollison = false;
    this.isSideRotating = false;
    this.isDownRotating = false;
    this.isMoving = false;
    this.isRunning = false;
    this.isOutOfStamina = false;
  }

  load(scene) {
    scene.add(this.camera);
    scene.add(this.spotLight);
    scene.add(this.spotLight.target);
    return { scene, camera: this.camera, cameraLight: this.spotLight };
  }

  light() {
    this.spotLight.position.set(
      this.camera.position.x,
      this.camera.position.y + 0.01,
      this.camera.position.z
    );
    this.spotLight.target.position.set(
      this.cameraDirPos.x,
      this.cameraDirPos.y - 0.4,
      this.cameraDirPos.z
    );
    this.spotLight.lookAt(this.cameraDirection);
  }

  sideRotatingCheck() {
    if (Math.abs(this.sideRotationTarget - this.camera.rotation.y) > 0.05) {
      return true;
    }
    return false;
  }

  downRotatingCheck() {
    if (Math.abs(this.camera.rotation.x - this.downRotationTarget) > 0.05) {
      return true;
    }
    return false;
  }

  movingCheck() {
    if (
      Math.abs(this.frontMoveTarget.distanceTo(this.camera.position)) > 0.07
    ) {
      return true;
    }
    return false;
  }

  runningCheck() {
    if (this.rotationSpeed == 20) {
      return true;
    }
    return false;
  }

  staminaCheck() {
    if (this.stamina <= 0) {
      return true;
    }
    if (this.stamina > 15) {
      return false;
    }
  }

  collisonCheck(cube) {
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

  update(deltaTime, cube) {
    this.cameraPosition = this.camera.position.clone();
    this.camera.getWorldDirection(this.cameraDirection);
    this.cameraDirPos = this.cameraPosition.add(this.cameraDirection.clone());
    this.cameraYRotation = this.camera.rotation.y;
    this.isCollison = this.collisonCheck(cube);
    this.isSideRotating = this.sideRotatingCheck();
    this.isDownRotating = this.downRotatingCheck();
    this.isMoving = this.movingCheck();
    this.isRunning = this.runningCheck();
    this.isOutOfStamina = this.staminaCheck();

    this.light();

    if (this.isSideRotating) {
      this.camera.rotation.y += this.sideRotate(deltaTime);
    }
    if (this.isDownRotating) {
      this.camera.rotation.x += this.downRotate(deltaTime);
    }
    if (this.isMoving) {
      this.camera.position.copy(this.moveToTarget());
    }

    if (this.isRunning) {
      this.stamina = this.stamina < 0 ? 0 : this.stamina - 0.4;
    } else {
      this.stamina = this.stamina > 100 ? 100 : this.stamina + 0.3;
    }
  }

  sideRotate(deltaTime) {
    let rotationDiff = this.sideRotationTarget - this.camera.rotation.y;
    return rotationDiff * this.rotationSpeed * deltaTime;
  }

  move(e) {
    if (this.isSideRotating || this.isMoving) {
      return;
    } else {
      if (e.ctrlKey) {
        this.run();
      } else {
        this.stopRun();
      }
      switch (e.keyCode) {
        case 37:
          this.sideRotationTarget += Math.PI / 2;
          break;
        case 38:
          if (!this.isCollison) {
            this.frontMoveTarget = this.camera.position
              .clone()
              .round()
              .add(this.cameraDirection.clone().round());
          }
          break;
        case 39:
          this.sideRotationTarget -= Math.PI / 2;
          break;
        case 32:
          this.getDownRotateTarget();
          break;
        case 40:
          // this.downRotation = this.lookUp(this.downRotation);
          // this.targetLocationY = 0.3;
          // this.downRotation = player.lookDownCheck(this.cameraDirection, this.downRotation);
          break;
      }
    }
  }

  moveToTarget() {
    let newPosition = this.camera.position
      .clone()
      .lerp(this.frontMoveTarget, this.smoothFactor);
    return newPosition;
  }

  getDownRotateTarget() {
    if (
      Math.round(this.cameraDirection.z) == 1 &&
      Math.round(this.cameraDirection.x) == 0
    ) {
      this.downRotationTarget += Math.PI / 2;
      this.isFrontDirection = true;
    } else if (
      Math.round(this.cameraDirection.z) == -1 &&
      Math.round(this.cameraDirection.x) == 0
    ) {
      this.downRotationTarget -= Math.PI / 2;
      this.isFrontDirection = false;
    }
  }

  downRotate(deltaTime) {
    let downRotationDiff = this.downRotationTarget - this.camera.rotation.x;
    return downRotationDiff * this.rotationSpeed * deltaTime;
  }

  lookUp() {
    if (this.isFrontDirection) {
      this.downRotationTarget -= Math.PI / 2;
    } else {
      this.downRotationTarget += Math.PI / 2;
    }
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
