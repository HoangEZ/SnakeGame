import Direction from '../fatories/Direction';
import IBody from './IBody';
import IPrey from './IPrey';
export default interface ISnake {
  bodies: IBody[];
  head: IBody;
  die(): void;
  move(direction: Direction): void;
}
