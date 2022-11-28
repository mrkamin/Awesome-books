const addEl2 = document.getElementById('sect__one__items__item2');
addEl2.innerHTML = `
<form id="sect__one__item2__form">
<p><input type="text" name="title" id="sect__one__item1__input1" placeholder="BookTitle" required></p>
<p><input type="text" name="author" id="sect__one__item1__input2" placeholder="BookAthor" required></p>
<button type="submit" id="sect__one__item1__btn1">Add</button></form>
`;
/* ======================================================================== */

/* || VARIABLES AND FUNCTIONS */
const booksContainer = document.querySelector('.sect__one__items__item1');
const newForm = document.querySelector('form');

/* || EMPTY ARRAY */
let books = [];

/* || ADD HTML ElEMENTS */
const library = (book) => {
  if (booksContainer.innerHTML === 'No thing books here') {
    booksContainer.innerHTML = '';
  }
  const bookContent = document.createElement('div');
  const PEl = `
    <p id="sect__one__item1__p1">${book.title}</p>
    <p id="sect__one__item1__p2">${book.author}</p>
    <button onclick="remove(${book.id})" id="sect__one__item1__btn2-${book.id}">REMOVE</button>
    <hr>`;
  bookContent.innerHTML = PEl;
  booksContainer.appendChild(bookContent);
};

/* ============================================================================== */

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

/* ================================================================ */
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

/* || GET DATA FROM LOCAL STORAGE */
function remove(c) {
  const deletData = books.filter((element) => element.id !== c);
  localStorage.setItem('metaData', JSON.stringify(deletData));
  getData();
}
getData();
remove();