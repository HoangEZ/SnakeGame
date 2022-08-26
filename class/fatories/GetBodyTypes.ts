import Body from "../Body";
import BodyTypes from "./BodyTypes";

export default function(type:BodyTypes, maxX:number, maxY:number, xx?:number, yy?:number) {
    switch(type){
        case BodyTypes.Body:
            return new Body(maxX, maxY, xx, yy);
    }
}