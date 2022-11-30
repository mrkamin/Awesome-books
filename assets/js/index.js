/* || HTML Structure for Add Books */

/* || Screen__Loader */
const screenLoadEl = document.getElementById('screen__loader');
screenLoadEl.innerHTML = `
<p id="loader" class="loader">
        <p></p><p></p>
      </p>
`;
/* ======================================================================== */

/* || Form */
const newForm = document.getElementById('sect__one__items__item2');
newForm.innerHTML = `
<h1> Add a new book<h1>
<form id="form">
<p><input type="text" name="title" id="title" placeholder="BookTitle" required></p>
<p><input type="text" name="author" id="author" placeholder="BookAthor" required></p>
<button type="submit" id="add__btn">Add</button></form>
`;
/* ======================================================================== */

/* || Contact */
const newContactEl = document.getElementById('sect__one__items__item3');
newContactEl.innerHTML = `
<h1>Contact Information</h1>
      <p>Do you have any Information or do you just want to say "Hello"? <br> You can reach out to us!</p>
      <ul>
        <li>Our e-mail: mrkamin2@gmail.com</li>
        <li>Our phone number: 009259904851</li>
        <li>Our address: Awesome Park, 22803 London, U.K</li>
      </ul>
`;
/* ======================================================================== */

/* || Function to generate random id's when called */

/* || Get all relevant elements from the DOM */
const newSectOne = document.querySelector('#sect__one');
const newLoad = document.querySelector('#screen__loader');
const newNavNew = document.querySelector('#nav__new');
const newLibrary = document.querySelector('#sect__one__items__item1');
const newNavList = document.querySelector('#nav__list');
const newContact = document.querySelector('#nav__contact');

/* ======================================================================== */

/* || Function to show Loading Screen */
const loader = () => {
  newSectOne.classList.add('hide');
  newLoad.classList.remove('hide');
  setTimeout(() => {
    newLoad.classList.add('hide');
    newSectOne.classList.remove('hide');
  }, 1000);
};
/* ======================================================================== */

/* || Add event listener to new button to show form */
newNavNew.addEventListener('click', () => {
  loader();

  if (newLibrary.classList.contains('show')) {
    newLibrary.classList.replace('show', 'hide');
    newNavList.classList.remove('active');
    newForm.classList.replace('hide', 'show');
    newSectOne.style.height = '90vh';
    newSectOne.classList.replace('screen__loader', 'add-back');
    newNavNew.classList.add('active');
  } else {
    newContactEl.classList.replace('show', 'hide');
    newContact.classList.remove('active');
    newForm.classList.replace('hide', 'show');
    newSectOne.style.height = '90vh';
    newSectOne.classList.replace('contact-back', 'add-back');
    newNavNew.classList.add('active');
  }
});
/* ======================================================================== */

/* || Add Evnt Listener to Contact Button to Show contact-Info */
newContact.addEventListener('click', () => {
  loader();
  if (newLibrary.classList.contains('show')) {
    newLibrary.classList.replace('show', 'hide');
    newNavList.classList.remove('active');
    newContactEl.classList.replace('hide', 'show');
    newSectOne.style.height = '90vh';
    newSectOne.classList.replace('screen__loader', 'contact-back');
    newContact.classList.add('active');
  } else {
    newNavList.classList.replace('show', 'hide');
    newNavNew.remove('active');
    newContactEl.classList.replace('hide', 'show');
    newSectOne.style.height = '90vh';
    newSectOne.classList.replace('add-back', 'contact-back');
    newContact.classList.add('active');
  }
});
/* ======================================================================== */

/* || Add Event Listener to List Button to Show Library */
newNavList.addEventListener('click', () => {
  loader();
  if (newForm.classList.contains('show')) {
    newForm.classList.replace('show', 'hide');
    newNavNew.classList.remove('active');
    newLibrary.classList.replace('hide', 'show');
    newSectOne.style.height = '';
    newSectOne.classList.replace('add-back', 'screen__loader');
    newSectOne.style.paddingBottom = '140px';
    newNavList.classList.add('active');
  } else {
    newContactEl.classList.replace('show', 'hide');
    newContact.classList.remove('active');
    newLibrary.classList.replace('hide', 'show');
    newSectOne.style.paddingBottom = '140px';
    newSectOne.classList.replace('contact-back', 'screen__loader');
    newNavList.classList.add('active');
  }
});

/* || Assign VARIABLES to access DOM IDs */
const booksContant = document.querySelector('.sect__one__items__item1');
booksContant.innerHTML = `
<h1>All Awesomm Books</h1>
<div id="sect__one__items__item" class="sect__one__items__item">
</div>`;
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
const booksContainer = document.querySelector('#sect__one__items__item');
/* || ADD HTML ElEMENTS */
const library = (book) => {
  if (booksContainer.innerHTML === '<p class="paragraph">No thing books here.<i class="fa-solid fa-book fa-1x"></i></p>') {
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
    booksContainer.innerHTML = '<p class="paragraph">No thing books here.<i class="fa-solid fa-book fa-1x"></i></p>';
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
  loader();
  if (newForm.classList.contains('show')) {
    newForm.classList.replace('show', 'hide');
    newNavNew.classList.remove('active');
    newLibrary.classList.replace('hide', 'show');
    newSectOne.style.paddingBottom = '140px';
    newNavList.classList.add('active');
  } else {
    newContactEl.classList.replace('show', 'hide');
    newContact.classList.remove('active');
    newLibrary.classList.replace('hide', 'show');
    newSectOne.style.paddingBottom = '140px';
    newNavList.classList.add('active');
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

/* || Function for Date And Time */
document.write(new Date().getFullYear());

function ondate() {
  document.querySelector(".time").innerHTML = Date();
}

ondate();