import IBody from './interface/IBody';
export default class Body implements IBody {
  private _x: number = 0;
  private _y: number = 0;
  private _maxx: number;
  private _maxy: number;

  public constructor(maxx: number, maxy: number, xx?: number, yy?:number) {
    this._maxx = maxx;
    this._maxy = maxy;
    if(xx){
        this.x = xx;
    }
    if(yy){
        this.y =  yy;
    }
  }
  public get maxX(): number {
    return this._maxx;
  }
  public get maxY(): number {
    return this._maxy;
  }

  public get x(): number {
    return this._x;
  }

  public set x(v: number) {
    if (v < 0) this._x = this.maxX - 1;
    else if (v >= this.maxX) this._x = 0;
    else this._x = v;
  }

  public get y(): number {
    return this._y;
  }

  public set y(v: number) {
    if (v < 0) this._y = this.maxY - 1;
    else if (v >= this.maxY) this._y = 0;
    else this._y = v;
  }

  public increaseX(): void {
    this.x++;
  }
  public decreaseX(): void {
    this.x--;
  }
  public increaseY(): void {
    this.y++;
  }
  public decreaseY(): void {
    this.y--;
  }
}
