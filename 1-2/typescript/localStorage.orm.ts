class Storagize {
  static counter: number = 0;

  static writeStorage(key: string, data: any[] | any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static readStorage(key: string) {
    const data = localStorage.getItem(key);
    if (!!data) {
      return JSON.parse(data);
    }
    return [];
  }
}

class User {
  public id: number;
  public email: string;
  public first_name: string;
  public last_name: string;
  public avatar: string;

  constructor(newUserInfo: any) {
    this.id = this.idGenerator(Storagize.readStorage("freeIds"));
    this.email = newUserInfo.email;
    this.first_name = newUserInfo.first_name;
    this.last_name = newUserInfo.last_name;
    this.avatar = newUserInfo.avatar;
  }

  private idGenerator = function (freeIds: number[]): number {
    if (!!freeIds.length) {
      freeIds.sort((a: number, b: number) => a - b);
      const id = freeIds[0];
      freeIds.shift();
      Storagize.writeStorage("freeIds", freeIds);
      return id;
    }
    return Storagize.counter++;
  };
}

class UserORM {
  private readonly storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  public find() {
    return Storagize.readStorage(this.storageKey);
  }
  public findOneById(id: number) {
    const data: any[] = Storagize.readStorage(this.storageKey);
    return data.find((doc) => doc.id === id);
  }

  public insertMany(newData: any[]) {
    let data = Storagize.readStorage(this.storageKey);
    data = [
      ...data,
      ...newData.map((user) => {
        user = new User(user);
        const validationErrors: string[] = validateCreateUser(user);
        if (!!validationErrors.length) {
          return { user, errors: validationErrors.join("\n") };
        }
        return user;
      }),
    ];
    let creationErrors: string[] = [];

    for (const user of data) {
      if (Object.keys(user).includes("errors")) {
        creationErrors.push(user.errors);
      }
    }
    if (!!creationErrors.length) return creationErrors.join("\n");

    Storagize.writeStorage(this.storageKey, data);
    return newData;
  }
  public insertOne(newData: any) {
    let data = Storagize.readStorage(this.storageKey);
    const newUser: User = new User(newData);

    const validationErrors: string[] = validateCreateUser(newUser);
    if (!!validationErrors.length) {
      return validationErrors.join("\n");
    }

    data = [...data, newUser];
    Storagize.writeStorage(this.storageKey, data);
    return newUser;
  }

  public deleteOne(id: number) {
    let targetUser: User = this.findOneById(id);
    if (!targetUser) {
      return new Error("User not found");
    }
    let freeIds: Set<number> = new Set(Storagize.readStorage("freeIds"));
    freeIds.add(id);
    Storagize.writeStorage("freeIds", Array.from(freeIds));
    let data = Storagize.readStorage(this.storageKey);
    data = data.filter((user: User) => user.id !== id);
    Storagize.writeStorage(this.storageKey, data);
    return targetUser;
  }

  public updateById(id: number, updatedInfo: any) {
    let targetUser: User = this.findOneById(id);
    if (!targetUser) return new Error("User not found");

    targetUser.first_name = updatedInfo.first_name ?? targetUser.first_name;
    targetUser.last_name = updatedInfo.last_name ?? targetUser.last_name;
    targetUser.email = updatedInfo.email ?? targetUser.email;
    targetUser.avatar = updatedInfo.avatar ?? targetUser.avatar;
    targetUser = new User(targetUser);

    const validationErrors = validateCreateUser(targetUser);
    if (!!validationErrors.length) {
      return validationErrors.join(`\n`);
    }

    const users: User[] = this.find();
    let newUsers: any[] = users.map((user) => {
      if (user.id === id) {
        return { ...user, ...targetUser };
      }
      return user;
    });

    Storagize.writeStorage(this.storageKey, newUsers);
    return targetUser;
  }
}

const userOrm = new UserORM("users");
