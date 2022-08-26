export default class Body {
    constructor(maxx, maxy, xx, yy) {
        this._x = 0;
        this._y = 0;
        this._maxx = maxx;
        this._maxy = maxy;
        if (xx) {
            this.x = xx;
        }
        if (yy) {
            this.y = yy;
        }
    }
    get maxX() {
        return this._maxx;
    }
    get maxY() {
        return this._maxy;
    }
    get x() {
        return this._x;
    }
    set x(v) {
        if (v < 0)
            this._x = this.maxX - 1;
        else if (v >= this.maxX)
            this._x = 0;
        else
            this._x = v;
    }
    get y() {
        return this._y;
    }
    set y(v) {
        if (v < 0)
            this._y = this.maxY - 1;
        else if (v >= this.maxY)
            this._y = 0;
        else
            this._y = v;
    }
    increaseX() {
        this.x++;
    }
    decreaseX() {
        this.x--;
    }
    increaseY() {
        this.y++;
    }
    decreaseY() {
        this.y--;
    }
}
