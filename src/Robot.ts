import Table from "./Table";

export interface IPosition {
  x: number;
  y: number;
}

export enum Direction {
  NORTH = "NORTH",
  EAST = "EAST",
  WEST = "WEST",
  SOUTH = "SOUTH"
}

const leftTurnCommandsMap = {
  [Direction.NORTH]: Direction.WEST,
  [Direction.WEST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.EAST,
  [Direction.EAST]: Direction.NORTH,
};

const rightTurnCommandsMap = {
  [Direction.NORTH]: Direction.EAST,
  [Direction.EAST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.WEST,
  [Direction.WEST]: Direction.NORTH,
}

export interface IRobotInitialConfig {
  position: IPosition;
  direction: Direction;
}

export default class Robot {
  public isPlaced: boolean = false;
  public position: IPosition;
  public direction: Direction;
  public table: Table;

  constructor(table: Table) {
    this.table = table;
  }

  public turnLeft(): void {
    if (!this.isPlaced) {
      return;
    }

    this.direction = leftTurnCommandsMap[this.direction];
  }

  public turnRight(): void {
    if (!this.isPlaced) {
      return;
    }

    this.direction = rightTurnCommandsMap[this.direction];
  }

  public moveForward(): void {
    if (!this.isPlaced) {
      return;
    }

    let newPos: IPosition = { ...this.position };

    switch (this.direction) {
      case Direction.NORTH:
        newPos.y++;
        break;
      case Direction.EAST:
        newPos.x++;
        break;
      case Direction.SOUTH:
        newPos.y--;
        break;
      case Direction.WEST:
        newPos.x--;
        break;
      default:
        throw new Error("Invalid direction");
    }

    try {
      this.setPositionSafely(newPos);
    } catch (e) {
      // ignore invalid move
    }
  }

  private setPositionSafely(newPos: IPosition): void {
    if (!this.table.isValidPosition(newPos)) {
      throw new Error("Invalid position -> out of table");
    }

    this.position = newPos;
  }

  public place(config: IRobotInitialConfig): void {
    const { position, direction } = config;
    if (isNaN(position.x) || isNaN(position.y)) {
      throw new Error("Invalid x or y value");
    }

    if (direction === undefined) {
      throw new Error("Invalid direction");
    }

    this.setPositionSafely(config.position);
    this.direction = config.direction;
    this.isPlaced = true;
  }

  public getReport(): string {
    if (!this.isPlaced) {
      return "";
    }

    return `${this.position.x},${this.position.y},${Direction[this.direction]}`;
  }

}