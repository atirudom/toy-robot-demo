import { createInterface } from 'readline';
import RobotController from './RobotController';
import Table from './Table';
import Robot from './Robot';

const table = new Table(5, 5);
const robot = new Robot(table);
const engine = new RobotController(table, robot);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("------ Welcome to Toy Robot Simulator ------");
console.log("Table Top size: ", table.width, "x", table.height);
console.log("");
console.log("Please enter your command: (PLACE X,Y,F | MOVE | LEFT | RIGHT | REPORT)");
rl.prompt(true);


rl.on('line', (line) => {
  engine.processCommand(line);
  rl.prompt(true);
});