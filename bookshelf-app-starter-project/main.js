// Do your work here...
const localStorageKey = "BOOK_SHELF";
let books = [];

function saveBooks() {
  localStorage.setItem(localStorageKey, JSON.stringify(books));
}

function loadBooks() {
  if (localStorage.getItem(localStorageKey) === null) {
    localStorage.setItem(localStorageKey, JSON.stringify([]));
    books = [];
  } else {
    const data = localStorage.getItem(localStorageKey);
    books = JSON.parse(data);
  }
}

function renderBooks() {
  const incompleteBooks = document.getElementById("incompleteBookList");
  const completeBooks = document.getElementById("completeBookList");

  incompleteBooks.innerHTML = "";
  completeBooks.innerHTML = "";

  const data = localStorage.getItem(localStorageKey);
  books = JSON.parse(data);
  for (let i = 0; i < books?.length; i++) {
    //listBooks
    const container = document.createElement("div");
    container.setAttribute("data-bookid", books[i].id);
    container.setAttribute("data-testid", "bookItem");

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.textContent = books[i].title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.textContent = `Penulis: ${books[i].author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.textContent = `Tahun: ${books[i].year}`;

    //buttons
    const buttonContainer = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeBtn.textContent = books[i].isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
    deleteBtn.textContent = "Hapus Buku";

    const editBtn = document.createElement("button");
    editBtn.setAttribute("data-testid", "bookItemEditButton");
    editBtn.textContent = "Edit Buku";

    container.append(title, author, year, buttonContainer);
    buttonContainer.append(completeBtn, deleteBtn, editBtn);

    if (books[i].isComplete === true) {
      completeBooks.appendChild(container);
    } else {
      incompleteBooks.appendChild(container);
    }

    completeBtn.addEventListener("click", function () {
      const getId = books[i].id;
      let selectBooks = books.find((book) => book.id === getId);
      selectBooks.isComplete = !selectBooks.isComplete;

      saveBooks();
      renderBooks();
    });

    deleteBtn.addEventListener("click", function () {
      const getId = books[i].id;
      books = books.filter((book) => book.id !== getId);

      saveBooks();
      renderBooks();
    });
  }
}

renderBooks();
const addBooks = document.getElementById("bookForm");
addBooks.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
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
