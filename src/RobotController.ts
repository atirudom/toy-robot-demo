import Robot, { Direction, IRobotInitialConfig } from "./Robot";
import Table from "./Table";

export default class RobotController {
  private robot: Robot;
  private table: Table;

  constructor(table: Table, robot: Robot) {
    this.table = table;
    this.robot = robot;
  }

  processCommandChain(commands: string[]): void {
    for (const command of commands) {
      this.processCommand(command);
    }
  }

  processCommand(line: string) {
    const command = line.trim();

    switch (command) {
      case 'MOVE':
        this.robot.moveForward();
        break;
      case 'LEFT':
        this.robot.turnLeft();
        break;
      case 'RIGHT':
        this.robot.turnRight();
        break;
      case 'REPORT':
        if (this.robot.isPlaced) {
          console.log("Output:", this.robot.getReport());
        }
        break;
      default:
        if (command.startsWith('PLACE')) {
          this.parsePlaceCommand(command);
          break;
        }
        console.log("Invalid command");
        break;
    }
  }

  private parsePlaceCommand(command: string): void {
    try {
      const [xStr, yStr, directionStr] = command.split(' ')[1].split(',');
      const x = parseInt(xStr);
      const y = parseInt(yStr);
      const direction: Direction = Direction[directionStr as keyof typeof Direction];

      const config: IRobotInitialConfig = {
        position: { x, y },
        direction
      };

      this.robot.place(config);
      return;
    } catch (e) {
      console.log("Invalid PLACE command:", e.message);
      return;
    }
  }
}