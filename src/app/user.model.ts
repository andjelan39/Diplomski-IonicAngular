export class UserModel {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    if (
      this.tokenExpirationDate == null ||
      this.tokenExpirationDate <= new Date()
    ) {
      return null;
    }
    return this._token;
  }
}
