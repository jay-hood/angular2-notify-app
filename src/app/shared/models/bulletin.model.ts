export class Bulletin {
  constructor(
    public poster: string,
    public title: string,
    public postDate: Date,
    public content: string,
    public id: number,
    public userid: string,
    public comments?: Bulletin[]
  ) {}
}
