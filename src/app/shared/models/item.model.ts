import { Details } from './details.model';
export class Item {
  constructor(
    public title: string,
    public date: Date,
    public details: Details[]
  ) {}
}
