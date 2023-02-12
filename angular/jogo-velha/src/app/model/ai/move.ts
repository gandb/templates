
export class Move {

  private _data: Array<Array<number>>;

  private _x: number;

  private _y: number;


  constructor(data: Array<Array<number>>, x: number, y: number) {
    this._data = data;
    this._x = x;
    this._y = y;
  }

  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }
  public get data(): Array<Array<number>> {
    return this._data;
  }

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  public set data(value: Array<Array<number>>) {
    this._data = value;
  }


}
