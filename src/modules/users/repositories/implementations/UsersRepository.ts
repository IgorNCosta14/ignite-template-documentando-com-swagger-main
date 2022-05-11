import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const filterUsers = this.users.filter(
      (user) => user.id !== receivedUser.id
    );
    const updatedUser = new User();
    Object.assign(updatedUser, {
      id: receivedUser.id,
      name: receivedUser.name,
      email: receivedUser.email,
      admin: true,
      created_at: receivedUser.created_at,
    });

    filterUsers.push(updatedUser);
    this.users = filterUsers;

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
