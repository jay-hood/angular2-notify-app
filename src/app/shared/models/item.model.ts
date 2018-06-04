export class Item {
  constructor(
    public id: number,
    public details: string,
    public date: Date,
    public items?: Item[]
  ) {}
}
