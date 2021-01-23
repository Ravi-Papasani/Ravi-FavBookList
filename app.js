//Book Class: used to handle books

class Book {
    constructor(ipt_tile, ipt_author, ipt_isbn) {
        this.title = ipt_tile;
        this.author = ipt_author;
        this.isbn = ipt_isbn
    }
}


//UI Class: used to handle UI tasks

class UI {
    //displayBooks Method
    static displayBooks() {
      const storedBooks = [
          {title: 'The Alchemist',
           author: 'Paulo Coelho',
           isbn: '11111' },
           {title: 'The Leader In You',
           author: 'Dale Carnegie',
           isbn: '22222'}
      ];
      //books variable to store the storedBooks
      const books = storedBooks;
      
      //looping the books stored using foreach loop using array method and calling addBookToList method
      books.forEach((book) => UI.addBookToList(book));
    }
    
    //addBookToList Method
    static addBookToList(book) {
        
        //grabbing the DOM element #book-list and storing to list variable
        const list = document.querySelector('#book-list');

        //Creating a table row element
        const row = document.createElement('tr');
        
        //adding Html text using backsticks `` so that we can use variables inside the string
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
        <a href='#'>X</a>
        </td>
        `;

        //Append the row to the list
        list.appendChild(row);
    }

}

//Storage class: used to store/retrive books

//Event: Display Books

//addEventListener for DOMContentLoaded then call Ui displaybook method
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a new Book

//Event: Remove a Book from the list