export class Note {
  constructor(
    public id: number,
    public details: string,
    public date: Date,
    public notes?: Note[]
  ) {}
}
