<div align=center>
  <img width="70%" src="https://github.com/cst52o/Gookie/assets/126298725/449c6c74-033e-49bb-b941-a28f9a1a7564"/>
  <h1>Freeze Maze</h1>
  <h2><a href="https://idevkangte.github.io/FreezeMaze/">Freeze Maze 링크</a></h2>
<h3>리얼한 공포 테마의 1인칭 시점 3D 탈출 게임</h3>
</div>

<br>

---

<br>

## 목차

1. [개발 환경](#개발-환경)
2. [주요 기능 소개](#주요-기능-소개)
3. [팀원 소개](#팀원-소개)
4. [외부 리소스](#외부-리소스)

<br>

## 개발 환경

### 운영체제
<img src="https://img.shields.io/badge/Windows__10-0078D6?style=flat&logo=windows&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/Thymleaf-005F0F?style=flat&logo=thymeleaf&logoColor=white">
<img src="https://img.shields.io/badge/Ajax-E23744?style=flat">
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white">


### 개발 도구
<img src="https://img.shields.io/badge/Eclipse__IDE-2C2255?style=flat&logo=eclipseide&logoColor=white"> <img src="https://img.shields.io/badge/Visual__Studio__Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white">
<img src="https://img.shields.io/badge/diagrams.net-F08705?style=flat&logo=diagramsdotnet&logoColor=white">
<img src="https://img.shields.io/badge/IntelliJ__IDEA-000000?style=flat&logo=intellijidea&logoColor=white">
<img src="https://img.shields.io/badge/Canvas__API-E05F2C?style=flat">
<img src="https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=flat&logo=git&logoColor=white">


### Language
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white">


### 디자인 툴
<img src="https://img.shields.io/badge/Adobe__Photoshop-31A8FF?style=flat&logo=adobephotoshop&logoColor=white"> <img src="https://img.shields.io/badge/Microsoft__PowerPoint-B7472A?style=flat&logo=microsoftpowerpoint&logoColor=white">
<img src="https://img.shields.io/badge/Blender-F5792A?style=flat&logo=blender&logoColor=black">

<br>

---

<br>

## 주요 기능 소개

### 3D 맵
Three.js를 활용한 3D 맵 구현



<div align=center>
<img width="30%" src="https://github.com/cst52o/Gookie/assets/126298725/14677589-610f-49f9-9c99-c81b4d67ccbe"/>  
<img width="60%" src="https://github.com/cst52o/Gookie/assets/126298725/0be4ff63-cfd8-4c99-bd6f-8900083f3240"/>  
</div>

### 몬스터 추적 로직
BPS 알고리즘을 이용한 몬스터의 미로 추적 로직 구현

<details>
<summary>몬스터 로직 코드</summary>
<div markdown="1">       

````
  chase(camera) {

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

    let vis = JSON.parse(JSON.stringify(this.map2D));
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
}
````

</div>
</details>


### 첫번째 미니 게임
파이프 맞추기 타이밍 게임
<div align=center>
  <img width="60%" src="https://github.com/cst52o/Gookie/assets/126298725/0f974f65-cce6-4797-ba13-89dc705d47d3"/>
</div>

### 두번째 미니 게임
색깔 전선 연결 그리기 게임
<div align=center>
<img width="60%" src="https://github.com/cst52o/Gookie/assets/126298725/1e8a5aad-047e-4dd7-b8f3-1828fa5e3c8e"/>
</div>

### 세번째 미니 게임
열쇠 모양 맞추기 게임
<div align=center>
<img width="80%" src="https://github.com/cst52o/Gookie/assets/126298725/c26a6fd6-3626-4a3f-9a32-d445276d4df3"/>
</div>

<br>

---

<br>

## 팀원 소개

|<img src="https://github.com/cst52o/Gookie/assets/126298725/605307f2-2768-4322-98df-032ab50c4ab7"/>|<img src="https://github.com/cst52o/Gookie/assets/126298725/34671ddd-f6a1-4f4d-95f8-5ab225131c8b"/>|<img src="https://github.com/cst52o/Gookie/assets/126298725/62cc7bd1-0d8a-4da8-9962-110e7d57e611"/>|<img src="https://github.com/cst52o/Gookie/assets/126298725/db950b9e-0b8f-4095-95d1-94f8e1893749"/>|<img src="https://github.com/cst52o/Gookie/assets/126298725/33500b71-38a7-48fd-993d-623f4423af40"/>|
|:---:|:---:|:---:|:---:|:---:|
|**전희재**|**강윤지**|**오미경**|**최혜인**|**김미리**|
|Player<br>3D 애니메이션<br>3D 파일 구조화<br>사운드<br>디자인|Monster<br>몬스터 랜덤 이동<br>몬스터 추격 로직|Map<br>전선 게임<br>2D 파일 구조화<br>전체 파일 머지<br>2D 3D 캔버스 전환|Effect<br>열쇠 게임<br>파이프 게임<br>인아웃트로|Mini Game<br>전선 게임<br>파이프 게임|

<br>

---

<br>

## 외부 리소스

[3D Textures](https://3dtextures.me/)
