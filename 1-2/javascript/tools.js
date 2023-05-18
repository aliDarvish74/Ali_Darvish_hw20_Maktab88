"use strict";
const getUsers = async (pages) => {
    let users = [];
    try {
        for (let i = 0; i < pages; i++) {
            const pageResponse = await fetch(`https://reqres.in/api/users?page=${i + 1}`);
            const pageUsers = await pageResponse.json();
            users = [...users, ...pageUsers.data];
        }
        const StorageUsers = userOrm.find();
        if (!StorageUsers.length) {
            userOrm.insertMany(users);
        }
    }
    catch (error) {
        console.log(error);
    }
};
