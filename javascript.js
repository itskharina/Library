const myLibrary = [];

const arrayStorage = JSON.parse(localStorage.getItem('myLibrary', myLibrary));

let cardDisplay = document.querySelector('.cardDisplay');
let titleEl = document.querySelector('.title');
let authorEl = document.querySelector('.author');
let pagesEl = document.querySelector('.pages');
let submitBtn = document.querySelector('.submitBtn');
let newBook = document.querySelector('.newBook');
let formCard = document.querySelector('.formContainer');
let form = document.querySelector('.form');
let card = document.querySelector('.card');

let title = document.querySelector('#title-input');
let author = document.querySelector('#author-input');
let pages = document.querySelector('#pages-input');
let read = document.querySelector('#have-read');
let hasSubmit = false;

newBook.addEventListener('click', function () {
  if (formCard.style.display === 'none') {
    formCard.style.display = 'block';
  } else {
    formCard.style.display = 'none';
  }
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function renderBook(book, index) {
  let card = document.createElement('div');
  card.classList.add('card');

  let text = document.createElement('div');
  text.classList.add('text');

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');
  buttons.dataset.index = index;

  let titleDisplay = document.createElement('div');
  titleDisplay.classList.add('title');
  titleDisplay.textContent = book.title;

  let authorDisplay = document.createElement('div');
  authorDisplay.classList.add('author');
  authorDisplay.textContent = book.author;

  let pagesDisplay = document.createElement('div');
  pagesDisplay.classList.add('pages');
  pagesDisplay.textContent = `${book.pages} pages`;

  let readBtn = document.createElement('button');
  readBtn.classList.add('readBtn');

  let removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  removeBtn.textContent = 'Remove';

  card.append(text, buttons);
  text.append(titleDisplay, authorDisplay, pagesDisplay);
  buttons.append(readBtn, removeBtn);
  cardDisplay.append(card);

  if (read.checked) {
    readBtn.textContent = 'Read';
  } else {
    readBtn.textContent = 'Not Read';
  }

  readBtn.onclick = changeStatus;
  removeBtn.onclick = removeCard;
}

function addBookToLibrary() {
  let titleValue = title.value;
  let authorValue = author.value;
  let pagesValue = pages.value;
  let readValue = read.value;

  let newBook = new Book(titleValue, authorValue, pagesValue, readValue);
  myLibrary.push(newBook);

  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function changeStatus(e) {
  if (e.target.textContent === 'Read') {
    e.target.textContent = 'Not Read';
    e.target.style.boxShadow = 'none';
  } else if ((e.target.textContent = 'Not Read')) {
    e.target.textContent = 'Read';
  }
}

function removeCard(e) {
  let index = e.target.dataset.index;
  e.target.parentElement.parentElement.remove();
  myLibrary.splice(index, 1);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function submitPressed() {
  formCard.style.display = 'none';
  if (hasSubmit) {
    form.reset();
    hasSubmit = false;
  }
}

submitBtn.addEventListener('click', function (e) {
  hasSubmit = true;
  e.preventDefault();
  addBookToLibrary();
  renderBook();
  submitPressed();
});

// render books on page from local storage
if (arrayStorage) {
  arrayStorage.forEach((data) => {
    const book = new Book(data.title, data.author, data.pages, data.read);
    myLibrary.push(book);
    renderBook(data);
  });
}
