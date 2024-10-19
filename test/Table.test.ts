import Table from "../src/Table";

describe('Table', () => {
  it('isValidPosition', () => {
    const table = new Table(5, 5);
    expect(table.isValidPosition({ x: 0, y: 4 })).toEqual(true);
    expect(table.isValidPosition({ x: 6, y: 0 })).toEqual(false);
    expect(table.isValidPosition({ x: 2, y: -1 })).toEqual(false);

    const table1 = new Table(3, 3);
    expect(table1.isValidPosition({ x: 0, y: 2 })).toEqual(true);
    expect(table1.isValidPosition({ x: 3, y: 0 })).toEqual(false);
    expect(table1.isValidPosition({ x: 2, y: -1 })).toEqual(false);
  })
});