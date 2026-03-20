// Do your work here...
const localStorageKey = "BOOK_SHELF";
let books = [];

function saveBooks() {
  localStorage.setItem(localStorageKey, JSON.stringify(books));
}

function loadBooks() {
  // if (localStorageKey !== undefined) {
  //   localStorage.setItem(localStorageKey, []);
  // } else {
    const data = localStorage.getItem(localStorageKey);
    books = JSON.parse(data);
  }

function renderBooks() {
  const incompleteBooks = document.getElementById("incompleteBookList");
  const completeBooks = document.getElementById("completeBookList");

  incompleteBooks.innerHTML = "";
  completeBooks.innerHTML = "";

  const data = JSON.parse(localStorage.getItem(localStorageKey));

  for (let i = 0; i < data.length; i++) {
    const container = document.createElement("div");
    container.setAttribute("data-bookid", data[i].id);
    container.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = data[i].title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${data[i].author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${data[i].year}`;

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(year);
    completeBooks.appendChild(container);
    incompleteBooks.appendChild(container);
  }
}

const addBooks = document.getElementById("bookForm");
addBooks.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = Number(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const newBook = {
    id: new Date().getTime(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  loadBooks();
  books.push(newBook);
  saveBooks();
  renderBooks();
});
