class Position {
    constructor(xx, yy) {
        this.x = xx;
        this.y = yy;
    }
}
export default class Prey {
    constructor(maxx, maxy) {
        this.max = new Position(maxx, maxy);
        this.skip();
    }
    set position(position) {
        if (!this._position) {
            this._position = new Position(position.x, position.y);
        }
        else {
            this._position.x = position.x;
            this._position.y = position.y;
        }
    }
    get position() {
        return this._position;
    }
    get max() {
        return this._max;
    }
    set max(max) {
        this._max = max;
    }
    skip() {
        const y = Math.floor(Math.random() * this.max.y);
        const x = Math.floor(Math.random() * this.max.x);
        this.position = new Position(x, y);
    }
}
