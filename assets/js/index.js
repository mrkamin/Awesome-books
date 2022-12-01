/* || HTML Structure for Add Books */
const addEl2 = document.getElementById('sect__one__items__item2');
addEl2.innerHTML = `<hr>
<h1> Add a new book<h1>
<form id="form">
<p><input type="text" name="title" id="title" placeholder="BookTitle" required></p>
<p><input type="text" name="author" id="author" placeholder="BookAthor" required></p>
<button type="submit" id="add__btn">Add</button></form>
`;
/* ======================================================================== */

/* || Assign VARIABLES to access DOM IDs */
const booksContainer = document.querySelector('.sect__one__items__item1');
const newForm = document.querySelector('form');
/* ======================================================================== */

/* || DECLARE LOCAL EMPTY ARRAY */
let books = [];
/* ======================================================================== */

/* || Create Class Declaratyion for Books in Book Library */
class Books {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook = () => {
    books.push(this);
  };
}
/* ======================================================================== */

/* Function to Add Click Events to Remove Button  */
const addRemoveListener = (book) => {
  document.querySelector(`#del__btn__${book.id}`).addEventListener('click', (e) => {
    e.preventDefault();
    book.removeBook();
    localStorage.setItem('books', JSON.stringify(books));
    const bookID = document.querySelector(`#book__${book.id}`);
    if (bookID.parentNode) {
      bookID.parentNode.removeChild(bookID);
    }
  });
};
/* ======================================================================== */

/* || ADD HTML ElEMENTS */
const library = (book) => {
  if (booksContainer.innerHTML === 'No thing books here') {
    booksContainer.innerHTML = '';
  }
  const bookContent = document.createElement('p');
  bookContent.id = `book__${book.id}`;
  bookContent.className = 'book';
  const PEl = `
    <div class="book1"><p id="sect__one__item1__p1">${book.title} by ${book.author}</p>
    <button onclick="remove(${book.id})" id="del__btn__${book.id}" class="remove">REMOVE</button></div>
    `;
  bookContent.innerHTML = PEl;
  booksContainer.appendChild(bookContent);
};
/* ======================================================================== */

/* || FUNCTIONS TO ADD BOOKS TO THE LIB */
const getData = () => {
  books = JSON.parse(localStorage.getItem('metaData')) || [];
  if (books.length > 0) {
    booksContainer.innerHTML = '';
    books.forEach((element) => {
      library(element);
    });
  } else {
    booksContainer.innerHTML = 'No thing books here';
  }
};
/* ======================================================================== */

/* || Check If Local Storage Exist */
if (localStorage.getItem('books')) {
  const booksData = JSON.parse(localStorage.getItem('books'));
  booksData.forEach((element) => {
    const newBook = new Books(element.id, element.title, element.author);
    books.push(newBook);
    library(newBook);
    addRemoveListener(newBook);
  });
}
/* ======================================================================== */

/* || Add Submit Event Listener to Form to add Book to Local Storage and Dom */
newForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { title, author } = e.target;
  if (title.value === '' || author.value === '') {
    // eslint-disable-next-line no-alert
    alert('Please add a title or author');
  } else {
    const metaData = {
      id: books.length + 1,
      title: title.value,
      author: author.value,
    };
    books.push(metaData);
    localStorage.setItem('metaData', JSON.stringify(books));
    library(metaData);
    title.value = '';
    author.value = '';
  }
});
/* ======================================================================== */

/* || GET DATA FROM LOCAL STORAGE */
function remove(c) {
  const deletData = books.filter((element) => element.id !== c);
  localStorage.setItem('metaData', JSON.stringify(deletData));
  getData();
}
getData();
remove();
/* ======================================================================== */
