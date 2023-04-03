import * as THREE from 'three';
// export { initMonster, initMonsterLight };
export default class Monster {
  monster;
  monsterLight;
  nextGo;
  direc;
  monsterMesh;
  monsterSpeed;
  target;
  targetY;

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

    this.monster.position.set(27, 2, 28);
    this.monsterLight.position.set(this.monster.position);
    this.monsterLight.rotation.y += Math.PI / 2;
    this.monsterLight.position.y += 2;
    this.monsterLight.target.position.set(this.monster.position);
    this.nextGo = 0;
    this.target = this.monster.position;
    this.direc = [
      new THREE.Vector3(-1, 0, 0), //왼
      new THREE.Vector3(1, 0, 0), // 오
      new THREE.Vector3(0, 0, -1), // 위
      new THREE.Vector3(0, 0, 1), // 아래
    ];
    this.monsterSpeed = 4;
    this.targetY = 0;

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

  //============================================================================================

  monsterCollison(cube) {
    let collsionDirection = [false, false, false, false]; // 왼오위아래 중에  충돌 있는지 검사
    for (let i = 0; i < 4; i++) {
      let raycaster = new THREE.Raycaster(
        this.monster.position,
        this.direc[i],
        0,
        0.7
      );
      let intersect = Array();

      for (let j in cube) {
        intersect.push(raycaster.intersectObject(cube[j]));
        if (intersect[j].length > 0) {
          collsionDirection[i] = true;
          break;
        }
      }
    }

    if (this.nextGo % 2 == 0) {
      // 전에서 왔던 곳의 반대는 무조건 충돌이라고 가정
      collsionDirection[this.nextGo + 1] = true;
    } else {
      collsionDirection[this.nextGo - 1] = true;
    }
    return collsionDirection;
  }

  isNear(camera) {
    let MonsterDiff = this.monster.position.distanceTo(camera.position.clone());

    if (MonsterDiff < 10) {
      return true;
    } else {
      return false;
    }
  }

  chase(camera, vis) {
    this.isMove = true;
    let dz = [-1, 1, 0, 0]; // 상하좌우 z축 변화
    let dx = [0, 0, -1, 1];

    let cameraRound = camera.position.round();
    let monsterRound = this.monster.position.round();

    let playerZ = cameraRound.z;
    let playerX = cameraRound.x;
    let monsterZ = monsterRound.z;
    let monsterX = monsterRound.x;

    if (playerZ >= 49) playerZ = 48;
    if (playerX >= 49) playerZ = 48;
    if (monsterZ >= 49) monsterZ = 48;
    if (monsterX >= 49) monsterX = 48;

    vis[playerZ][playerX] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
    vis[monsterZ][monsterX] = 1;

    let queue = [[monsterZ, monsterX]]; // 큐에 몬스터 좌표 넣어줌
    let direction = JSON.parse(JSON.stringify(vis));

    while (queue.length > 0) {
      // 큐가 빌 때까지 while문 돌린다.
      let [nowZ, nowX] = queue.shift(); // 큐의 맨 앞에값 꺼냄
      if (nowZ == playerZ && nowX == playerX) {
        // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출
        break;
      }
      // 상하좌우
      for (let k = 0; k < 4; k++) {
        // for문으로 상하좌우 탐색
        let d = '';
        let nz = nowZ + dz[k]; // 다음으로 이동할 곳의 x좌표
        let nx = nowX + dx[k]; // 다음으로 이동할 곳의 y좌표
        switch (k) {
          case 0:
            d = 'U';
            break;
          case 1:
            d = 'D';
            break;
          case 2:
            d = 'L';
            break;
          case 3:
            d = 'R';
            break;
        }

        if (nz < 0 || nz > 49 || nx < 0 || nx > 49) continue; // 범위를 벗어나는 경우
        if (vis[nz][nx] === 1) continue; // 벽이면 continue
        if (vis[nz][nx] === 0) {
          // 아직 방문하지 않은 곳이라면
          vis[nz][nx] = vis[nowZ][nowX] + 1; // 이전 방문까지 걸린 거리 +1
          direction[nz][nx] = d;
          queue.push([nz, nx]); // 다음 탐색을 위해 큐에 push
        }
      }
    }

    let chaseD = [[playerZ, playerX, direction[playerZ][playerX]]]; // 역추적

    let chaseCount = 0;

    while (true) {
      let preDirection =
        direction[chaseD[chaseCount][0]][chaseD[chaseCount][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기

      let preZ = chaseD[chaseCount][0]; // 마지막으로 추적하고 있는 곳의 x좌표
      let preX = chaseD[chaseCount][1]; // 마지막으로 추적하고 있는 곳의 x좌표

      if (preZ == monsterZ && preX == monsterX) {
        // 추적하는 곳이 몬스터 좌표면 while문 탈출
        break;
      }
      // 왼오위아래 상하좌우
      let nextDirection;
      let monsterDirection = '';

      switch (preDirection) {
        case 'U':
          nextDirection = 1;
          monsterDirection = 'D';
          break;
        case 'D':
          nextDirection = 0;
          monsterDirection = 'U';
          break;
        case 'L':
          nextDirection = 3;
          monsterDirection = 'R';
          break;
        case 'R':
          nextDirection = 2;
          monsterDirection = 'L';
          break;
      }

      chaseD.push([
        preZ + dz[nextDirection],
        preX + dx[nextDirection],
        monsterDirection,
      ]); // 바로이전 칸의 위치좌표 추가
      chaseCount += 1;
    }

    // 추적 좌표 reverse
    chaseD.reverse();
    if (chaseD.length < 2) {
      console.log('chase 끝');
      return;
    }

    switch (chaseD[1][2]) {
      case 'L':
        this.nextGo = 1; //1
        break;
      case 'R':
        this.nextGo = 0; //1
        break;
      case 'U':
        this.nextGo = 3; //2
        break;
      case 'D':
        this.nextGo = 2; // 3
        break;
    }
    this.target.x = chaseD[1][1];
    this.target.z = chaseD[1][0];

    return this.target;
  }

  randomMove(cube) {
    this.isMove = true;
    let collisionDirections = this.monsterCollison(cube); // 충돌인 곳이 true가 담겨있음
    let notCollision = [];

    for (let i = 0; i < 4; i++) {
      if (!collisionDirections[i]) {
        notCollision.push(i);
      }
    }
    switch (
      notCollision.length // 충돌이 안난곳의 갯수
    ) {
      case 3: // 3곳중에 랜덤으로 간다
        this.nextGo = notCollision[Math.floor(Math.random() * 3)];
        break;
      case 2: // 2곳중에 랜덤으로 간다.
        this.nextGo = notCollision[Math.floor(Math.random() * 2)];
        break;
      case 1: // 무조건 뚫린곳으로 간다.
        this.nextGo = notCollision[0];
        break;
    }
    let monsterPositionZ = this.monster.position.clone().z;
    let monsterPositionX = this.monster.position.clone().x;
    let nextZ = monsterPositionZ + this.direc[this.nextGo].z;
    let nextX = monsterPositionX + this.direc[this.nextGo].x;
    if (nextX >= 49) nextX = 48;
    if (nextZ >= 49) nextZ = 48;

    this.target.x = nextX;
    this.target.z = nextZ;
  }

  moving(cube, camera, vis) {
    if (this.isNear(camera)) {
      // 가까울경우
      if (!this.isMad) {
        // 이전 값이 random 이었으면
        this.monster.material = this.madMaterial();
        this.isMad = true;
        this.monsterSpeed = 5;
      }
      this.chase(camera, vis);
    } else {
      // 가깝지 않을 경우
      if (this.isMad) {
        // 이전 값이 chase 였으면
        this.monster.material = this.normalMaterial();
        this.isMad = false;
        this.monsterSpeed = 4;
      }
      this.randomMove(cube);
    }
    return this.target;
  }

  enemyLight() {
    this.monsterLight.position.set(
      this.monster.position.x,
      4,
      this.monster.position.z
    );
    this.monsterLight.target.position.copy(this.monster.position);
  }

  isMoving(monster) {
    if (
      Math.abs(this.target.x - monster.position.x) +
        Math.abs(this.target.z - monster.position.z) >
      0.03
    ) {
      this.isMove = true;
      return true;
    } else {
      this.isMove = false;
      return false;
    }
  }

  move(deltaTime, target, targetY) {
    let distance = target.clone().sub(this.monster.position);

    let distanceMoved = distance
      .clone()
      .multiplyScalar(deltaTime * this.monsterSpeed);

    let monsterNewPosition = new THREE.Vector3(
      distanceMoved.x,
      targetY,
      distanceMoved.z
    );

    return monsterNewPosition;
  }

  hover(deltaTime) {
    if (this.targetY >= 0.02) {
      this.targetY = -this.targetY;
    } else {
      this.targetY += 0.01 * deltaTime * 4;
    }
  }
}
