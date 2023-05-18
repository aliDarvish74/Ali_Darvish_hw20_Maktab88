"use strict";
class Storagize {
    static writeStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    static readStorage(key) {
        const data = localStorage.getItem(key);
        if (!!data) {
            return JSON.parse(data);
        }
        return [];
    }
}
Storagize.counter = 0;
class User {
    constructor(newUserInfo) {
        this.idGenerator = function (freeIds) {
            if (!!freeIds.length) {
                freeIds.sort((a, b) => a - b);
                const id = freeIds[0];
                freeIds.shift();
                Storagize.writeStorage("freeIds", freeIds);
                return id;
            }
            return Storagize.counter++;
        };
        this.id = this.idGenerator(Storagize.readStorage("freeIds"));
        this.email = newUserInfo.email;
        this.first_name = newUserInfo.first_name;
        this.last_name = newUserInfo.last_name;
        this.avatar = newUserInfo.avatar;
    }
}
class UserORM {
    constructor(key) {
        this.storageKey = key;
    }
    find() {
        return Storagize.readStorage(this.storageKey);
    }
    findOneById(id) {
        const data = Storagize.readStorage(this.storageKey);
        return data.find((doc) => doc.id === id);
    }
    insertMany(newData) {
        let data = Storagize.readStorage(this.storageKey);
        data = [
            ...data,
            ...newData.map((user) => {
                user = new User(user);
                const validationErrors = validateCreateUser(user);
                if (!!validationErrors.length) {
                    return { user, errors: validationErrors.join("\n") };
                }
                return user;
            }),
        ];
        let creationErrors = [];
        for (const user of data) {
            if (Object.keys(user).includes("errors")) {
                creationErrors.push(user.errors);
            }
        }
        if (!!creationErrors.length)
            return creationErrors.join("\n");
        Storagize.writeStorage(this.storageKey, data);
        return newData;
    }
    insertOne(newData) {
        let data = Storagize.readStorage(this.storageKey);
        const newUser = new User(newData);
        const validationErrors = validateCreateUser(newUser);
        if (!!validationErrors.length) {
            return validationErrors.join("\n");
        }
        data = [...data, newUser];
        Storagize.writeStorage(this.storageKey, data);
        return newUser;
    }
    deleteOne(id) {
        let targetUser = this.findOneById(id);
        if (!targetUser) {
            return new Error("User not found");
        }
        let freeIds = new Set(Storagize.readStorage("freeIds"));
        freeIds.add(id);
        Storagize.writeStorage("freeIds", Array.from(freeIds));
        let data = Storagize.readStorage(this.storageKey);
        data = data.filter((user) => user.id !== id);
        Storagize.writeStorage(this.storageKey, data);
        return targetUser;
    }
    updateById(id, updatedInfo) {
        var _a, _b, _c, _d;
        let targetUser = this.findOneById(id);
        if (!targetUser)
            return new Error("User not found");
        targetUser.first_name = (_a = updatedInfo.first_name) !== null && _a !== void 0 ? _a : targetUser.first_name;
        targetUser.last_name = (_b = updatedInfo.last_name) !== null && _b !== void 0 ? _b : targetUser.last_name;
        targetUser.email = (_c = updatedInfo.email) !== null && _c !== void 0 ? _c : targetUser.email;
        targetUser.avatar = (_d = updatedInfo.avatar) !== null && _d !== void 0 ? _d : targetUser.avatar;
        targetUser = new User(targetUser);
        const validationErrors = validateCreateUser(targetUser);
        if (!!validationErrors.length) {
            return validationErrors.join(`\n`);
        }
        const users = this.find();
        let newUsers = users.map((user) => {
            if (user.id === id) {
                return Object.assign(Object.assign({}, user), targetUser);
            }
            return user;
        });
        Storagize.writeStorage(this.storageKey, newUsers);
        return targetUser;
    }
}
const userOrm = new UserORM("users");
