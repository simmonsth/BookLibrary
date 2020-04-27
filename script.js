let myLibrary = [];

if (localStorage.length > 0) {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary.forEach(book => render(book));  
}

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

const addBookToLibrary = function() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = Number(document.querySelector('#pages').value);
    let read = document.querySelector('#read').checked;
    if (read) {
        read = "Yes";
    } else if (!read) {
        read = "No";
    }
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    render(book);
}

function render(book) {
    let bookTable = document.querySelector('#bookTable').insertRow(1);
    let cell1 = bookTable.insertCell(0),
        cell2 = bookTable.insertCell(1),
        cell3 = bookTable.insertCell(2),
        cell4 = bookTable.insertCell(3),
        cell5 = bookTable.insertCell(4);
    cell1.innerHTML = book.title;
    cell2.innerHTML = book.author;
    cell3.innerHTML = book.pages;
    if (book.read === "Yes") {
        cell4.innerHTML = "Yes";
    } else {
        cell4.innerHTML = '<button class="read">Mark Read</button>';
    }
    cell5.innerHTML = `<button id="${book.title}" class="removeBtn">Remove</button>`;

    let removeBtn = document.querySelector('.removeBtn')
    removeBtn.addEventListener('click', b => {
        removeBook(removeBtn.id);
        removeBtn.parentNode.parentNode.remove();
    })

    let toggleBtn = document.querySelector('.read');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', read => {
            if (book.read === 'No') {
                book.read = 'Yes';
                cell4.textContent = book.read;
                localStorage.setItem('library', JSON.stringify(myLibrary));
            } 
        })
    }
    
}

function removeBook(title) {
    library = JSON.parse(localStorage.getItem('library'));
    library.forEach((b, i) => {
        if (b.title === title) {
            library.splice(i, 1);
            myLibrary = library;
        }
    });
    localStorage.setItem('library', JSON.stringify(library));
}

document.querySelector('#addBook-btn').addEventListener('click', function() {
    addBookToLibrary()
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#pages').value = ''
    document.querySelector('#read').checked = false;
});