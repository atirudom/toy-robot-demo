import Robot from "../src/Robot";
import RobotController from "../src/RobotController";
import Table from "../src/Table";

describe('RobotController', () => {

  it('processCommand', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    robotController.processCommand("PLACE 0,2,EAST");
    expect(robot.getReport()).toEqual("0,2,EAST");
    expect(robot.direction).toEqual("EAST");
    expect(robot.position).toEqual({ x: 0, y: 2 });

    robotController.processCommand("MOVE");
    robotController.processCommand("LEFT");
    expect(robot.getReport()).toEqual("1,2,NORTH");
    expect(robot.direction).toEqual("NORTH");
    expect(robot.position).toEqual({ x: 1, y: 2 });
  })

  it('should not move a robot', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    const commands = ["PLACE 0,4,NORTH", "MOVE", "MOVE", "LEFT", "MOVE", "RIGHT", "REPORT"];

    robotController.processCommandChain(commands);
    expect(robot.getReport()).toEqual("0,4,NORTH");
  })

  it('should not place a robot', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    robotController.processCommand("PLACE 0,6,NORTH");
    robotController.processCommand("PLACE 0,0,5");
    robotController.processCommand("PLACE 0,0,EETS");
    robotController.processCommand("PLACE");
    robotController.processCommand("PLACE 01");
    expect(robot.position).toEqual(undefined);
    expect(robot.direction).toEqual(undefined);
    expect(robot.getReport()).toEqual("");
  })

  it('should not allow to control robot', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    robotController.processCommand("MOVE");
    robotController.processCommand("LEFT");
    robotController.processCommand("RIGHT");
    expect(robot.position).toEqual(undefined);
    expect(robot.direction).toEqual(undefined);
    expect(robot.getReport()).toEqual("");
    expect(robot.isPlaced).toEqual(false);
  })

  it('should handle error input properly', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    robotController.processCommand("PLAC");
    expect(robot.getReport()).toEqual("");

    robotController.processCommand("PLACE 0,0,SOUTH");
    robotController.processCommand("MOOVEE");
    expect(robot.getReport()).toEqual("0,0,SOUTH");
  })

  it('should place new position correctly', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    robotController.processCommand("PLACE 0,0,NORTH");
    robotController.processCommand("MOVE");
    expect(robot.getReport()).toEqual("0,1,NORTH");
    robotController.processCommand("PLACE 3,3,NORTH");
    expect(robot.getReport()).toEqual("3,3,NORTH");
    robotController.processCommand("PLACE 3,7,NORTH");
    expect(robot.getReport()).toEqual("3,3,NORTH");
    robotController.processCommand("PLACE 3,1,ddd");
    expect(robot.getReport()).toEqual("3,3,NORTH");
  })

  it('should process command chain from Example A', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    const commands = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];

    robotController.processCommandChain(commands);
    expect(robot.getReport()).toEqual("0,1,NORTH");
  })

  it('should process command chain from Example B', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    const commands = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];

    robotController.processCommandChain(commands);
    expect(robot.getReport()).toEqual("0,0,WEST");
  })

  it('should process command chain from Example C', () => {
    const table = new Table(5, 5);
    const robot = new Robot(table);
    const robotController = new RobotController(table, robot);

    const commands = ["PLACE 1,2,EAST", "MOVE", "MOVE", "LEFT", "MOVE", "REPORT"];

    robotController.processCommandChain(commands);
    expect(robot.getReport()).toEqual("3,3,NORTH");
  })
});