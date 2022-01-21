import {User} from "../../domain/entity/User";

export interface UserRepository {
  load(): User
}
