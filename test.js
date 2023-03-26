import { deepCopy } from "copy"; // assuming there is a function to deep copy an array in the copy module
import { Queue } from "queue"; // assuming there is a Queue class in the queue module

const dx = [-1, 1, 0, 0]; // 상하좌우
const dy = [0, 0, -1, 1];

const map = [[-1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, 0, 0, 0, -1, 0, -1],
[-1, 0, 0, -1, 3, 0, 0, -1],
[-1, -1, 0, 0, 0, -1, -1, -1],
[-1, -1, 0, -1, 0, 0, 0, -1],
[-1, -1, 0, -1, 0, -1, 0, -1],
[-1, 0, 2, 0, 0, 0, 0, -1],
[-1, -1, -1, -1, -1, -1, -1, -1]
];
const Player = [6, 2];
const Monster = [2, 4];

let vis = deepCopy(map);
vis[Player[0]][Player[1]] = 0;
vis[Monster[0]][Monster[1]] = 'M';

const queue = new Queue();
queue.enqueue([Monster[0], Monster[1]]);

const N = 8;
const direction = [['z']*N for _ in range(N)];

while (!queue.isEmpty()) {
const now = queue.dequeue();
const now_x = now[0];
const now_y = now[1];
if (now_x == Player[0] && now_y == Player[1]) {
break;
}
for (let i = 0; i < 4; i++) {
    let d;
    if (i === 0) {
        d = 'U';
    } else if (i === 1) {
        d = 'D';
    } else if (i === 2) {
        d = 'L';
    } else {
        d = 'R';
    }
    const nx = now_x + dx[i];
    const ny = now_y + dy[i];

    if (vis[nx][ny] === 0) {
        if (vis[now_x][now_y] === 'M') {
            vis[nx][ny] = 1;
            direction[nx][ny] = d;
        } else {
            vis[nx][ny] = vis[now_x][now_y]+1;
            direction[nx][ny] = d;
        }
        queue.enqueue([nx, ny]);
    }
}
}

const chase = [[Player[0], Player[1]]];
let count = 0;

while (true) {
const preDirection = direction[chase[count][0]][chase[count][1]];
const preX = chase[count][0];
const preY = chase[count][1];
if (preX === Monster[0] && preY === Monster[1]) {
break;
}
let nextDirection;
if (preDirection === 'U') {
nextDirection = 1;
} else if (preDirection === 'D') {
nextDirection = 0;
} else if (preDirection === 'L')
nextDirection = 3;
else{
    nextDirection = 2
}
chase.push([preX+dx[nextDirection],preY+dy[nextDirection]]);
count +=1;
}
console.log(vis[Player[0]][Player[1]]);
console.log(chase);