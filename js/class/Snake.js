var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GetBodyTypes from './fatories/GetBodyTypes';
import Direction from './fatories/Direction';
export default class Snake {
    constructor(maxX, maxY, type) {
        this._isDead = false;
        this._isEaten = false;
        this._maxX = maxX;
        this._maxY = maxY;
        this._type = type;
        this.bodies = [
            GetBodyTypes(type, maxX, maxY, maxX - 3, maxY - 1),
            GetBodyTypes(type, maxX, maxY, maxX - 2, maxY - 1),
            GetBodyTypes(type, maxX, maxY, maxX - 1, maxY - 1)
        ];
    }
    get size() {
        return this.bodies.length;
    }
    get max() {
        return { x: this._maxX, y: this._maxY };
    }
    get bodies() {
        return this._bodies;
    }
    get head() {
        return this._bodies[0];
    }
    set bodies(v) {
        this._bodies = v;
    }
    eat(x, y) {
        this.bodies = [GetBodyTypes(this._type, this.max.x, this.max.y, x, y), ...this.bodies];
        this._isEaten = true;
    }
    die() {
        this._isDead = true;
    }
    get isDead() {
        return this._isDead;
    }
    move(direction) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
