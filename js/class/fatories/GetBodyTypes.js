import Body from "../Body";
import BodyTypes from "./BodyTypes";
export default function (type, maxX, maxY, xx, yy) {
    switch (type) {
        case BodyTypes.Body:
            return new Body(maxX, maxY, xx, yy);
    }
}
