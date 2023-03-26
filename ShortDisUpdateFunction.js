let dx = [-1, 1, 0, 0]; // 상하좌우
let dy = [0, 0, -1, 1];
let targetDistance = 5; // 기준거리 (임시값 5)
    
let map = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 0, -1, 0, -1],
        [-1, 0, 0, -1, 3, 0, 0, -1],
        [-1, -1, 0, 0, 0, -1, -1, -1],
        [-1, -1, 0, -1, 0, 0, 0, -1],
        [-1, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, 2, 0, 0, 0, 0, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
        ];
let Player = [6, 2]; // 플레이어 좌표
let Monster = [2, 4]; // 몬스터 좌표

function ShortestDistanceTracking(){   // 몬스터와 플레이어의 최단 거리 위치 거리차 
    let distanceDiff = 0;
    let vis = []; // 방문했던 곳을 표기하기 위해서 맵 카피
    for (var i = 0; i < map.length; i++) {
        vis.push(map[i]);
    }
    
    vis[Player[0]][Player[1]] = 0; // 몬스터 -> 사람 까지의 방문 여부를 표기하기 위해서 사람 좌표 0으로 셋팅
    vis[Monster[0]][Monster[1]] = 'M'; // 몬스터 위치 표시를 위해 M으로 표기
    
    const queue = [[Monster[0], Monster[1]]]; // 큐에 몬스터 좌표 넣어줌
    
    const direction = new Array(8).fill(new Array(8).fill('z')); // 해당 위치로 이동하는데 누른 상하좌우 표시
    
    while (queue.length !== 0) { // 큐가 빌 때까지 while문 돌린다.
        const now = queue.shift(); // 큐의 맨 앞에값 꺼냄
        const now_x = now[0]; // 탐색하고 있는 곳의 x좌표
        const now_y = now[1]; // 탐색하고 있는 곳의 y좌표
        if (now_x == Player[0] && now_y == Player[1]) { // 탐색하는 좌표가 플레이어의 좌표라면 while문 탈출
            break;
        }
        for (let i = 0; i < 4; i++) { // for문으로 상하좌우 탐색
            let d;
            if (i === 0) { // 상
                d = 'U';
            } else if (i === 1) { // 하
                d = 'D';
            } else if (i === 2) { // 좌
                d = 'L';
            } else {
                d = 'R'; // 우
            }
            const nx = now_x + dx[i]; // 다음으로 이동할 곳의 x좌표
            const ny = now_y + dy[i]; // 다음으로 이동할 곳의 y좌표
    
            if (vis[nx][ny] === 0) { // 아직 방문하지 않은 곳이라면
                if (vis[now_x][now_y] === 'M') { // 이전 방문했던 곳이 M였던경우
                    vis[nx][ny] = 1; // 1칸 전진
                    direction[nx][ny] = d; // 방향설정
                } else {
                    vis[nx][ny] = vis[now_x][now_y] + 1; // 이전 방문까지 걸린 거리 +1
                    direction[nx][ny] = d;
                }
                queue.push([nx, ny]); // 다음 탐색을 위해 큐에 push
            }
        }
    }
    distanceDiff = vis[Player[0]][Player[1]];

    if(distanceDiff<=targetDistance){ // 현재 최소경로가 목표거리 이내에 있다면
        console.log(distanceDiff);
        ShortestCoordinate(direction); // 경로 추적 함수 실행
    }
    else{
        console.log("아직 사정거리 이내에 있지 않습니다.");
        return false;
    }
}

function ShortestCoordinate(direction) { //경로 추적 함수
    /* 경로 추적 logic*/
    const chase = [[Player[0], Player[1]]]; // 플레이어 좌표부터 시작
    let count = 0;
    while (true) {
        const preDirection = direction[chase[count][0]][chase[count][1]]; // 현재좌표가 상하좌우 중 어디서 왔는지 표기
        const preX = chase[count][0]; // 마지막으로 추적하고 있는 곳의 x좌표
        const preY = chase[count][1]; // 마지막으로 추적하고 있는 곳의 x좌표
        if (preX === Monster[0] && preY === Monster[1]) { // 추적하는 곳이 몬스터 좌표면 while문 탈출
            break;
        }
        let nextDirection;
        if (preDirection === 'U') { // 위면 아래쪽 좌표를 가져옴
            nextDirection = 1;
        } else if (preDirection === 'D') { // 아래면 위쪽 좌표 가져옴
            nextDirection = 0;
        } else if (preDirection === 'L') // 왼쪽이면 오른 좌표 가져옴
            nextDirection = 3;
        else {
            nextDirection = 2; //우측이면 왼쪽 좌표
        }
        chase.push([
            preX + dx[nextDirection],
            preY + dy[nextDirection]
        ]); // 바로이전 칸의 위치좌표 추가
        count += 1;
    }
    // 추적 좌표 reverse
    console.log(chase.reverse());
}

ShortestDistanceTracking();    



