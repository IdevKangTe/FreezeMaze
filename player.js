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
  isMiniPosition;
  isPauseCheck;
  isGameClear;

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
    this.rotationSpeed = 13;
    this.smoothFactor = 0.2;

    this.frontMoveTarget = this.camera.position.clone();
    this.sideRotationTarget = this.camera.rotation.y;
    this.downRotationTarget = this.camera.rotation.x;
    this.downLocationTarget = this.camera.position.y;
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
    this.isMiniPosition = false;
    this.isPauseCheck = null;
    this.isGameClear = false;
  }

  load(scene) {
    scene.add(this.camera);
    scene.add(this.spotLight);
    scene.add(this.spotLight.target);
    return { scene, camera: this.camera };
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
    if (Math.abs(this.camera.rotation.x - this.downRotationTarget) > 0.005) {
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

  miniPositionCheck(mini) {
    return Math.abs(mini.position.x - this.camera.position.x) + Math.abs(mini.position.z - this.camera.position.z) <=0.3;
  }

  update(deltaTime, cube, mini) {
    this.cameraPosition = this.camera.position.clone();
    this.camera.getWorldDirection(this.cameraDirection);
    this.cameraDirPos = this.cameraPosition.add(this.cameraDirection.clone());
    this.cameraYRotation = this.camera.rotation.y;
    this.isCollison = this.collisonCheck(cube);
    this.isSideRotating = this.sideRotatingCheck();
    this.isDownRotating = this.downRotatingCheck();
    this.isMoving = this.movingCheck();
    this.isRunning = this.runningCheck();
    this.isMiniPosition = this.miniPositionCheck(mini);

    this.light();

    this.camera.rotation.y += this.sideRotate(deltaTime);

    if (this.isDownRotating) {
      this.camera.rotation.x += this.downRotate(deltaTime);
    } else {
      this.camera.rotation.x = this.downRotationTarget;
    }

    if(this.isLookDown && !this.isDownRotating && !this.isGameClear){
      this.downLocation(deltaTime);
    } else {
      this.camera.position.copy(this.moveToTarget());
    }

    if (this.stamina <= 0) {
      this.stopRun();
    }

    if (this.isRunning) {
      this.stamina = this.stamina < 0 ? 0 : this.stamina - 0.45;
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
      if (e.keyCode == 17) {
        this.run();
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
          if(this.isMiniPosition){
            this.getDownRotateTarget();
            this.downLocationTarget = 0.3;

          }
          break;
        case 75:
          this.GameClearAnimate();
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
    this.isLookDown = true;
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

  downLocation(deltaTime){
    let locationDiffY = Math.abs(this.camera.position.y - this.downLocationTarget);
      this.camera.position.y -= locationDiffY * deltaTime * 0.5;
      if (locationDiffY < 0.2) {
        this.isPauseCheck();
        this.lookUp();
        this.isLookDown = false;
      }
  }

  lookUp() {
    if (this.isFrontDirection) {
      this.downRotationTarget -= Math.PI / 2;
    } else {
      this.downRotationTarget += Math.PI / 2;
    }
  }

  ctrlUp(e) {
    if (e.keyCode == 17) {
      this.stopRun();
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

  isPauseCheck(callback) {
    this.isPauseCheck = callback;
  }

  GameClearAnimate(){
    this.isGameClear = true;
    this.getDownRotateTarget();
    this.smoothFactor = 0.003;
    this.rotationSpeed = 5;
    this.frontMoveTarget = new THREE.Vector3(25,100,25);
  }

}
