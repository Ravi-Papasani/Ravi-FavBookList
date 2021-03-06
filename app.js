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
       /* const storedBooks = [{
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                isbn: '11111'
            },
            {
                title: 'The Leader In You',
                author: 'Dale Carnegie',
                isbn: '22222'
            }
        ];

        //books variable to store the storedBooks
        const books = storedBooks; */

        //books variable to get storedBooks
        const books = Store.getBooks();

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
        <a href="#" class="delete">X</a>
        </td>
        `;

        //Append the row to the list
        list.appendChild(row);
    }


    //method to clear the input form text fields after submit event happened
    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }


    //delete book from the book-list
    static deleteBook(el){
        //checking if the click target has delete-book element(a href value = X)
      if(el.classList.contains('delete')){
          //el.(<td><a href>X</a></td>).(document.createElement('tr')).remove 
          //a href parent = <td>. <td> parent =tr  
          el.parentElement.parentElement.remove();

      }
    }

    //show text message for the UI actions 
     static showAlertMesssage(message){
        // creating div element using JS <div class="alert">Text Message</div>
        const div = document.createElement('div');
        div.className = 'alert';
        //inserting text in the div tag
        div.appendChild(document.createTextNode(message));
        //index.html line 12
        const container = document.querySelector('.container')
        //index.html line 14
        const form = document.querySelector("#book-form");
        //parent element container, insert div before form(right before the form ) 
         container.insertBefore(div, form);

         //clear the div class text message after three seconds
         setTimeout(()=> document.querySelector('.alert').remove(), 3000);

     }


    

}


//Storage class: used to store/retrive books
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []; //books list empty array if LocalStorage is null
        } else {
            books = JSON.parse(localStorage.getItem('books')); //parse the get books in JSON form
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks(); //getting all the stored books

        books.push(book); // pushing the book item to stored books

         //setting the books to array of books{using stringify method}
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(books.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



//Event: Display Books
//addEventListener for DOMContentLoaded then call Ui displaybook method
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event: Add a new Book
//DOM ID book-form addEventListener submit happened then trigger the arrow event function 
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent the actual sumbit event
    e.preventDefault();

    // Getting the form values for title,author,isbn
    // storing the DOM title value(input.value()) entered in the book form 
    const ipt_title = document.querySelector('#title').value;
    const ipt_author = document.querySelector('#author').value;
    const ipt_isbn = document.querySelector('#isbn').value;

    //validating the form fields
    if(ipt_title === '' || ipt_author === '' || ipt_isbn === '' ){
        //alert("Fill in all the field values");
        UI.showAlertMesssage("Fill in all the field values");
    } else {
    //Now instatiate above form value to Book constructor
    const book = new Book(ipt_title, ipt_author, ipt_isbn);

    //add the above book Object to UI 
    UI.addBookToList(book);

    //Add book to Store class
    Store.addBook(book);

    //Show Message{Book added}
    UI.showAlertMesssage("Book Added Successfully")

    //call the UI class clearFields method
    UI.clearFields();
    }  
});


//Event: Remove a Book from the list
//DOM Id book-list for click event
document.querySelector('#book-list').addEventListener('click', (e) => {
    //console.log(e.target);
    //Remove book from UI 
     UI.deleteBook(e.target);

     //Remove book from the Store class
     //el.target.(<td><a href>X</a></td>).(previousElementSibling{<td>${book.isbn}</td>}).(textContent{{book.isbn} isbn value}) 
          //a href parent = <td>. <td> previousElementSibling =<td> book.isbn 
     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show Message{Book Removed}
    UI.showAlertMesssage("Book Removed Successfully")

});