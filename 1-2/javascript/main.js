"use strict";
getUsers(2);
const users = userOrm.find();
Storagize.counter = users.length + 1;
(() => {
    var _a;
    const userData = Storagize.readStorage("users");
    renderUsersList(0, userData);
    renderPagination(userData);
    (_a = document.getElementById("userInfo")) === null || _a === void 0 ? void 0 : _a.classList.add("d-none");
})();
function cardGenerator(userData) {
    return `
        <div class="col-lg-4 col-md-6 col-12 ">
            <div class="card shadow rounded-4 bg-dark">
              <div  class="card-img-top rounded-4 w-100 rounded-bottom" style="background: url(${userData.avatar});  background-position: center; background-size: cover; background-repeat: no-repeat; padding-top: 100% ;">
              </div>
            <div class="card-body">
              <h5 class="card-title text-center text-warning">${userData.first_name} ${userData.last_name}</h5>
              <p class = "text-light" style = "text-align: justify">
                ${userData.first_name} ${userData.last_name} is Maktab 88 user by UID of ${userData.id}, You can easily get in touch
                with ${userData.first_name} from ${userData.email}
              </p>
              <ul class="list-group my-4">
                <li class="list-group-item list-group-item-dark text-dark">UID: ${userData.id}</li>
                <li class="list-group-item list-group-item-dark text-dark">Email : ${userData.email}</li>
              </ul>
                    <button
                        onclick="readUserData(${userData.id})" 
                        class="btn btn-warning rounded-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    `;
}
function usersListGenerator(index, data) {
    let usersListBody = "";
    for (let i = index; i < index + 6; i++) {
        if (!data[i]) {
            break;
        }
        usersListBody += cardGenerator(data[i]);
    }
    return usersListBody;
}
function renderUsersList(index, data) {
    const usersListContainer = document.createElement("div");
    usersListContainer.classList.value = "container-lg my-4";
    const usersList = document.createElement("div");
    usersList.classList.value = "row gy-4";
    usersList.innerHTML = usersListGenerator(index, data);
    usersListContainer.append(usersList);
    document.getElementsByTagName("body")[0].append(usersListContainer);
}
