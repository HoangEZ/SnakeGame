import ISnake from './interface/ISnake';
import IBody from './interface/IBody';
import BodyType from './fatories/BodyTypes';
import GetBodyTypes from './fatories/GetBodyTypes';
import Direction from './fatories/Direction';
export default class Snake implements ISnake {
  private _bodies: IBody[];
  private _maxX: number;
  private _maxY: number;
  private _isDead: boolean = false;
  private _isEaten: boolean = false;
  private _type:BodyType;
  constructor(maxX: number, maxY: number, type:BodyType) {
    this._maxX = maxX;
    this._maxY = maxY;
    this._type = type;
    this.bodies = [
        GetBodyTypes(type, maxX, maxY, maxX-3, maxY-1),
        GetBodyTypes(type, maxX, maxY, maxX-2, maxY-1),
        GetBodyTypes(type, maxX, maxY, maxX-1, maxY-1)
    ];
  }
  private get size(): number {
    return this.bodies.length;
  }
  private get max(): { x: number; y: number } {
    return { x: this._maxX, y: this._maxY };
  }
  public get bodies(): IBody[] {
    return this._bodies;
  }
  public get head(): IBody {
    return this._bodies[0];
  }
  private set bodies(v: IBody[]) {
    this._bodies = v;
  }
  public  eat(x: number, y: number): void {
      this.bodies = [GetBodyTypes(this._type, this.max.x, this.max.y, x, y), ...this.bodies];
      this._isEaten = true;
  }
  public die(): void {
    this._isDead = true;
  }
  public get isDead() {
    return this._isDead;
  }
  public async move(direction: Direction) {
    let [x, y] = [this.head.x, this.head.y];
    // let [newX, newY]=[x,y];
    switch (direction) {
      case Direction.UP:
        // newY--;
        // if(newX===prey.position.x && newY === prey.position.y){
          // this.eat(newX, newY);
        // }else {
          // this.head.y = newY;
        // }
        this.head.y--;
        break;
      case Direction.DOWN:
        // newY++;
        // if(newX===prey.position.x && newY === prey.position.y){
        //   this.eat(newX, newY);
        // }else {
        //   this.head.y = newY;
        // }
        this.head.y++;
        break;
      case Direction.LEFT:
        // newX--;
        // if(newX===prey.position.x && newY === prey.position.y){
        //   this.eat(newX, newY);
        // }else {
        //   this.head.x = newX;
        // }
        this.head.x--;
        break;
      case Direction.RIGHT:
        // newX++;
        // if(newX===prey.position.x && newY === prey.position.y){
        //   this.eat(newX, newY);
        // }else {
        //   this.head.x = newX;
        // }
        this.head.x++;
        break;
    }
    // if(this._isEaten) {
    //   prey.skip();
    //   this._isEaten = false;
    // }
    for (let i = 1; i < this.bodies.length; i++) {
      const temp = { x: this.bodies[i].x, y: this.bodies[i].y };
      this.bodies[i].x = x;
      this.bodies[i].y = y;
      x = temp.x;
      y = temp.y;
    }
    return;
  }
}
