// Do your work here...
const localStorageKey = "BOOK_SHELF";
let books = [];

function saveBooks() {
  localStorage.setItem(localStorageKey, JSON.stringify(books));
}

function loadBooks() {
  const data = localStorage.getItem(localStorageKey);
  books = JSON.parse(data);
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
});
