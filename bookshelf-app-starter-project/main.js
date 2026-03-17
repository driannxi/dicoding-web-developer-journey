// Do your work here...
const localStorageKey = "BOOK_SHELF";
let books = [];

if (typeof Storage !== undefined) {
  localStorage.setItem(localStorageKey, JSON.stringify(books));
} else {
  console.log("Local Storage Tidak ditemukan");
}

const book = {
  id: 3657848524,
  title: "Harry Potter and the Philosopher's Stone",
  author: "J.K Rowling",
  year: 1997,
  isComplete: false,
};

// books.push(book);
localStorage.setItem(localStorageKey, JSON.stringify(books));
const data = JSON.parse(localStorage.getItem(localStorageKey));

const addBooks = document.getElementById("bookForm");

addBooks.addEventListener("submit", function (event) {
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = Number(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  document.getElementById('bookFormSubmit')
  event.preventDefault();
});
