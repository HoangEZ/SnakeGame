import IPrey from './interface/IPrey';
class Position {
  public x: number;
  public y: number;
  constructor(xx: number, yy: number) {
    this.x = xx;
    this.y = yy;
  }
}
export default class Prey implements IPrey {
  private _position: Position;
  private _max: Position;
  public set position(position: Position) {
    if(!this._position) {
      this._position = new Position(position.x, position.y);
    }else {
      this._position.x = position.x;
      this._position.y = position.y;
    }
  }
  public get position(): Position {
    return this._position;
  }
  public get max(): Position {
    return this._max;
  }
  private set max(max) {
    this._max = max;
  }
  constructor(maxx: number, maxy: number) {
    this.max = new Position(maxx, maxy);
    this.skip();
  }
  skip(): void {
    const y = Math.floor(Math.random() * this.max.y);
    const x = Math.floor(Math.random() * this.max.x);
    this.position = new Position(x, y);
  }
}
