import { UserModel } from './user.model';

export class ReviewModel {
  constructor(
    public id: string | null,
    public text: string,
    public movie: any,
    public user: UserModel | null
  ) {}
}
