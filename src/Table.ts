import { IPosition } from "./Robot";

export default class Table {

  constructor(public width: number, public height: number) { }

  /**
   * @description check if position is within table
   * @param position position to check
   * @returns {boolean} true if position is within table, false otherwise
   *  */
  public isValidPosition(position: IPosition): boolean {
    return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
  }

}