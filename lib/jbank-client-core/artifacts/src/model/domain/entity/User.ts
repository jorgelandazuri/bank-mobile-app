import {Profile} from "./Profile";

export class User {
  public readonly profile: Profile;
  public readonly accountId: number;

  constructor(profile: Profile, accountId: number = 0) {
    this.profile = profile;
    this.accountId = accountId;
  }
}
