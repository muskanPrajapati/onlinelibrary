console.log("this is index");

//forming constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}

//display function to add
Display.prototype.add = function () {
  let tablebody = document.getElementById("tablebody");
  tablebody.innerHTML = null;
  let library = localStorage.getItem("library");
  if (library == null) {
    libObj = [];
  } else {
    libObj = JSON.parse(library);
  }
  // let tablebody = document.getElementById("tablebody");
  libObj.forEach(function (book, index) {
    let uistring = ` <tr>
                         <td>${book.name}</td>
                         <td>${book.author}</td>
                         <td>${book.type}</td>
                    </tr>`;
    tablebody.innerHTML += uistring;
  });
};

let display = new Display();
display.add();

//display function to clear
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

//alert message ,
Display.prototype.show = function (type, desmessage) {
  let message = document.getElementById("msg");
  if (type == "Success!!") {
    message.innerHTML = `<div class="alert-a">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    <strong>${type}</strong> ${desmessage}
  </div>`; //success -- green background
  } else {
    message.innerHTML = `<div class="alert-b">
                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                        <strong>${type}</strong> ${desmessage}
                      </div>`; // danger -- red background
  }
  setTimeout(() => {
    message.innerHTML = ``;
  }, 2500);
};

//submit event for form submission
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("you have submitted library form");
  let name = document.getElementById("bookname").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let science = document.getElementById("science");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (science.checked) {
    type = science.value;
  }

  let library = localStorage.getItem("library"); //local storage
  if (library == null) {
    libObj = [];
  } else {
    libObj = JSON.parse(library);
  }

  let display = new Display();

  if (name.length > 2 && author.length > 2) {
    let book = new Book(name, author, type);
    console.log(book);
    libObj.push(book);
    localStorage.setItem("library", JSON.stringify(libObj));
    display.add();
    display.clear();
    display.show("Success!!", "book has been added");
  } else {
    display.show("Danger!!", "Sorry , you can not add this book");
  }

  e.preventDefault();
}
