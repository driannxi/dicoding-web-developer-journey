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

function createElementBooks(book) {
  const container = document.createElement("div");
  container.setAttribute("data-bookid", book.id);
  container.setAttribute("data-testid", "bookItem");

  const title = document.createElement("h3");
  title.setAttribute("data-testid", "bookItemTitle");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.setAttribute("data-testid", "bookItemAuthor");
  author.textContent = `Penulis: ${book.author}`;

  const year = document.createElement("p");
  year.setAttribute("data-testid", "bookItemYear");
  year.textContent = `Tahun: ${book.year}`;

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "gatau");

  const completeBtn = document.createElement("button");
  completeBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
  completeBtn.textContent = book.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
  deleteBtn.textContent = "Hapus Buku";

  const editBtn = document.createElement("button");
  editBtn.setAttribute("data-testid", "bookItemEditButton");
  editBtn.textContent = "Edit Buku";
}

function renderBooks() {
  const incompleteBooks = document.getElementById("incompleteBookList");
  const completeBooks = document.getElementById("completeBookList");

  incompleteBooks.innerHTML = "";
  completeBooks.innerHTML = "";

  const data = JSON.parse(localStorage.getItem(localStorageKey));

  for (let i = 0; i < data.length; i++) {
    const bookElement = data[i];

    const container = document.createElement("div");
    container.setAttribute("data-bookid", data.id);
    container.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = data.title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${data.author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${data.year}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "gatau");

    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeBtn.textContent = data.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
    deleteBtn.textContent = "Hapus Buku";

    const editBtn = document.createElement("button");
    editBtn.setAttribute("data-testid", "bookItemEditButton");
    editBtn.textContent = "Edit Buku";
    // if (data[i].isComplete === true) {
    //   incompleteBooks.appendChild(bookElement);
    // } else {
    completeBooks.appendChild(container, title, author, year);
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
