import Body from './class/Body';
import BodyTypes from './class/fatories/BodyTypes';
import Direction from './class/fatories/Direction';
import Obstacle from './class/fatories/ObstacleType';
import Prey from './class/Prey';
import Snake from './class/Snake';
const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
const maxX = 30;
const maxY = 35;
const size = 5;
canvas.width = maxX * size;
canvas.height = maxY * size;
const snake = new Snake(maxX, maxY, BodyTypes.Body);
const ctx = canvas.getContext('2d');

function render(ctx: CanvasRenderingContext2D | null) {
  if (ctx) {
    ctx.fillStyle = '#00aeff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const bodies = snake.bodies;
    for(let i=0;i<bodies.length; i++) {
      if(i===0) {
        ctx.fillStyle = '#333';
      }else {
        ctx.fillStyle = '#666';
      }
      const body = bodies[i];
      ctx.fillRect(body.x * size, body.y * size, size, size);

      //render prey
      ctx.fillStyle = '#333';
      ctx.fillRect(prey.position.x*size, prey.position.y*size, size, size);
    }
  }
}

//init
let intervalTime = 250;
const prey = new Prey(maxX, maxY);
render(ctx);
let direction = Direction.LEFT;
document.addEventListener('keyup',async (e) => {
  e.preventDefault();
  let intervalCleared = false;
  switch(e.key) {
    case 'ArrowUp':
      if(direction !== Direction.UP && direction !== Direction.DOWN) {
        clearInterval(interval);
        intervalCleared = true;
        direction = Direction.UP;
        await moving();
      }
      break;
    case 'ArrowDown':
      if(direction !== Direction.UP && direction !== Direction.DOWN) {
        clearInterval(interval);
        intervalCleared = true;
        direction = Direction.DOWN;
        await moving();
      }
      break;
    case 'ArrowLeft':
      if(direction !== Direction.RIGHT && direction !== Direction.LEFT) {
        clearInterval(interval);
        intervalCleared = true;
        direction = Direction.LEFT;
        await moving();
      }
      break;
    case 'ArrowRight':
      if(direction !== Direction.RIGHT && direction !== Direction.LEFT) {
        clearInterval(interval);
        intervalCleared = true;
        direction = Direction.RIGHT;
        await moving();
      }
      break;
  }
  if(intervalCleared){
    interval = setInterval(async () => {
      await moving();
    }, intervalTime);
  }
})
const moving = async function () {
  const checkResult = await check(direction, snake.head.x, snake.head.y);
  if(checkResult === Obstacle.PREY){
    snake.eat(prey.position.x, prey.position.y);
    prey.skip();
  }else if (checkResult === Obstacle.SELF){
    snake.die();
  }else{
    await snake.move(direction);
  }
  render(ctx);
}
const check = async function (direction:Direction, snakeX:number, snakeY:number) {
  switch(direction) {
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
  if(tempBody.x === prey.position.x && tempBody.y === prey.position.y) {
    return Obstacle.PREY;
  }else if(snake.bodies.some((body)=>body.x === tempBody.x && body.y === tempBody.y)){
    return Obstacle.SELF;
  }else {
    return Obstacle.NOTHING;
  }
}
let interval = setInterval(async () => {
  await moving();
  if(snake.isDead) {
    clearInterval(interval);
  }
}, intervalTime);
