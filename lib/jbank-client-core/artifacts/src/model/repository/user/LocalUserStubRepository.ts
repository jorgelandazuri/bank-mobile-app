import {User} from "../../domain/entity/User";
import {Profile} from "../../domain/entity/Profile";
import {UserRepository} from "./UserRepository";

export class LocalUserStubRepository implements UserRepository {
  load(): User {
    return new User(new Profile('Jorge', 'Landazuri'), 1);
  }
}
