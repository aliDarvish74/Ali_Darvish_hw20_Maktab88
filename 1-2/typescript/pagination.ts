const pageActive = "page-link bg-warning border-dark text-dark";

const paginationGenerator = (data: User[]) => {
  let paginationBody: HTMLElement = document.createElement("div");
  const pageCount = Math.ceil(data.length / 6);
  let startIndex = 0;
  for (let i = 0; i < pageCount; i++) {
    paginationBody += `
    <li class="page-item">
      <a
        class="page-link bg-dark border-dark text-warning"
        href="#"
        onclick="pageRender(${startIndex},this)"
        >${i + 1}</a
      >
    </li>`;
    const li: HTMLElement = document.createElement("li");
    li.classList.value = "page-item";
    cont a: HTMLElement = document.rele
    startIndex += 6;
  }
  return paginationBody;
};

const renderPagination = (data: User[]) => {
  const paginationNav: HTMLElement = document.createElement("nav");
  const paginationList: HTMLElement = document.createElement("ul");
  paginationList.classList.value = "pagination justify-content-center";
  paginationNav.append(paginationList);
  paginationList.innerHTML = paginationGenerator(data);
  const firstLink: Element = document.querySelectorAll(".page-link")[0];
  firstLink.classList.remove("bg-dark", "text-warning");
  firstLink.classList.add("bg-warning", "text-dark");
};

const pageRender = function (index: number, self: HTMLElement) {
  const pageLinks: NodeListOf<Element> =
    document.querySelectorAll(".page-link");
  pageLinks.forEach((link) => {
    link.classList.remove("bg-warning", "text-dark");
    link.classList.add("bg-dark", "text-warning");
  });
  self.className = pageActive;
  const userData = Storagize.readStorage("users");
  renderUsersList(index, userData);
};
