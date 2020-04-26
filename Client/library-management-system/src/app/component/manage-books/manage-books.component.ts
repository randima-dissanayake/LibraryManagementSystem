import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../add-book/add-book.component';
import { AuthService } from 'src/app/service/auth.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  books: Array<Book>=[];
  p: number = 1;
  searchTerm;
  isAdmin
  constructor(private bookService: BookService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.fetchAllUsers();
    this.isAdmin = AuthService.isAdmin()
  }

  fetchAllUsers(){
    this.bookService.fetchAllBooks().subscribe(
      (data: any)=> {
        if(data!=null)
          this.books = data
        
      },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } 
        console.log("error", error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMsg,
          showConfirmButton: true,
          timer: 5500
        })
        console.log(error)
      }
    )
  }

  editBook(book){
    console.log("edit ",book)
    const modalRef = this.modalService.open(AddBookComponent,book);
    modalRef.componentInstance.book = book
  }

  deleteBook(book){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.bookService.delete(book.id).subscribe(
          (data: any)=> {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            window.location.reload()
          },
          (error)=>{
            let errorMsg = "Something went Wrong";
            if (error.status === 401) {
              errorMsg = "Unauthorized";
            } 
            console.log("error", error)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: errorMsg,
              showConfirmButton: true,
              timer: 5500
            })
            console.log(error)
          }
        )
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

  viewBook(book){
    localStorage.setItem('book', JSON.stringify(book));
    this.modalService.open(BookDetailsComponent);
  }

  

}
