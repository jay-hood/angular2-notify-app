export class Item {
  constructor(
    public id: number,
    public details: string,
    public date: Date,
    public items?: Item[]
  ) {}
}
// There is literally no reason to have details when you can just
// change the item data structure to better reflect your needs
