var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Body from './class/Body';
import BodyTypes from './class/fatories/BodyTypes';
import Direction from './class/fatories/Direction';
import Obstacle from './class/fatories/ObstacleType';
import Prey from './class/Prey';
import Snake from './class/Snake';
const canvas = document.getElementById('game-canvas');
const maxX = 30;
const maxY = 35;
const size = 5;
canvas.width = maxX * size;
canvas.height = maxY * size;
const snake = new Snake(maxX, maxY, BodyTypes.Body);
const ctx = canvas.getContext('2d');
function render(ctx) {
    if (ctx) {
        ctx.fillStyle = '#00aeff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const bodies = snake.bodies;
        for (let i = 0; i < bodies.length; i++) {
            if (i === 0) {
                ctx.fillStyle = '#333';
            }
            else {
                ctx.fillStyle = '#666';
            }
            const body = bodies[i];
            ctx.fillRect(body.x * size, body.y * size, size, size);
            //render prey
            ctx.fillStyle = '#333';
            ctx.fillRect(prey.position.x * size, prey.position.y * size, size, size);
        }
    }
}
//init
let intervalTime = 250;
const prey = new Prey(maxX, maxY);
render(ctx);
let direction = Direction.LEFT;
document.addEventListener('keyup', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let intervalCleared = false;
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== Direction.UP && direction !== Direction.DOWN) {
                clearInterval(interval);
                intervalCleared = true;
                direction = Direction.UP;
                yield moving();
            }
            break;
        case 'ArrowDown':
            if (direction !== Direction.UP && direction !== Direction.DOWN) {
                clearInterval(interval);
                intervalCleared = true;
                direction = Direction.DOWN;
                yield moving();
            }
            break;
        case 'ArrowLeft':
            if (direction !== Direction.RIGHT && direction !== Direction.LEFT) {
                clearInterval(interval);
                intervalCleared = true;
                direction = Direction.LEFT;
                yield moving();
            }
            break;
        case 'ArrowRight':
            if (direction !== Direction.RIGHT && direction !== Direction.LEFT) {
                clearInterval(interval);
                intervalCleared = true;
                direction = Direction.RIGHT;
                yield moving();
            }
            break;
    }
    if (intervalCleared) {
        interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            yield moving();
        }), intervalTime);
    }
}));
const moving = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const checkResult = yield check(direction, snake.head.x, snake.head.y);
        if (checkResult === Obstacle.PREY) {
            snake.eat(prey.position.x, prey.position.y);
            prey.skip();
        }
        else if (checkResult === Obstacle.SELF) {
            snake.die();
        }
        else {
            yield snake.move(direction);
        }
        render(ctx);
    });
};
const check = function (direction, snakeX, snakeY) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (direction) {
            case Direction.UP:
                snakeY--;
                break;
            case Direction.DOWN:
                snakeY++;
                break;
            case Direction.LEFT:
                snakeX--;
                break;
            case Direction.RIGHT:
                snakeX++;
        }
        const tempBody = new Body(maxX, maxY, snakeX, snakeY);
        if (tempBody.x === prey.position.x && tempBody.y === prey.position.y) {
            return Obstacle.PREY;
        }
        else if (snake.bodies.some((body) => body.x === tempBody.x && body.y === tempBody.y)) {
            return Obstacle.SELF;
        }
        else {
            return Obstacle.NOTHING;
        }
    });
};
let interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield moving();
    if (snake.isDead) {
        clearInterval(interval);
    }
}), intervalTime);
