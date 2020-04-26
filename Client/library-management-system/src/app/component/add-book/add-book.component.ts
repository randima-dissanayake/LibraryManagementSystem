import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';
import { FileUploader } from 'ng2-file-upload';
import Swal from 'sweetalert2';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  @Input() book;
  registerForm: any = FormGroup;
  public bookFile: File;
  title;
  submitted = false
  constructor(public activeModal: NgbActiveModal, private bookService: BookService, private formBuilder: FormBuilder) {
    
  }

  public uploader: FileUploader = new FileUploader({
    // url: URL,
    disableMultipart : false,
    // autoUpload: true,
    // method: 'post',
    // itemAlias: 'attachment',
    allowedFileType: ['image']


    });

  ngOnInit(): void {
    if(this.book == null){
      this.title = "Add Book"
      this.registerForm = this.formBuilder.group({
        title: ['',Validators.required],
        isbn: ['',Validators.required],
        author: ['',Validators.required],
        publisher: ['',Validators.required],
        year_of_publication: ['',Validators.required],
        location: ['',Validators.required],
        num_of_copies: 0,
        price: ['',Validators.required]
      });
    } else {
      this.title = "Edit Book"
      this.registerForm = this.formBuilder.group({
        title: [this.book.title,Validators.required],
        isbn: [this.book.isbn,Validators.required],
        author: [this.book.author,Validators.required],
        publisher: [this.book.publisher,Validators.required],
        year_of_publication: [this.book.year_of_publication,Validators.required],
        location: [this.book.location,Validators.required],
        num_of_copies: this.book.num_of_copies,
        price: [this.book.price,Validators.required]
      });
    }
  }

  get f() { return this.registerForm.controls; }

  addNewBook(data: FormGroup) {
    if(this.book ==null){
    const formData = new FormData();
    formData.append('book', JSON.stringify(data));
    formData.append('file', this.bookFile)

    this.bookService.save(formData).subscribe(
      (data: Book) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Book added Successfully',
          showConfirmButton: true,
          timer: 5000
        })
        this.registerForm.reset();
        this.activeModal.close();
        console.log(data)
        window.location.reload()
      },
      (error) => {
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          error = "Unauthorized";
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
    );
    } else {
     let bookData = {
       "id" : this.book.id,
        "title": this.f.title.value,
        "isbn": this.f.isbn.value,
        "author": this.f.author.value,
        "publisher": this.f.publisher.value,
        "year_of_publication": this.f.year_of_publication.value,
        "location": this.f.location.value,
        "num_of_copies": this.f.num_of_copies.value,
        "price": this.f.price.value
      }
      console.log("bookData" ,bookData)
      console.log("bookData             " ,this.book.book_image)
      const formData = new FormData();
    formData.append('book', JSON.stringify(bookData));
    formData.append('file', this.book.book_image)

    this.bookService.update(formData).subscribe(
      (data: Book) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Book Updated Successfully',
          showConfirmButton: true,
          timer: 5000
        })
        this.registerForm.reset();
        this.activeModal.close();
        console.log(data)
        window.location.reload()
      },
      (error) => {
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Unauthorized";
        } else if(error.status === 400){
          errorMsg = "Bad Request"
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
    );
    }
  }

  // onSelectFile(filelist:FileList) {
  //   // if (event.target.files.length > 0) {
  //     this.bookFile = filelist[0];
  //   console.log("onselect method image"+this.bookFile)
  //   // this.bookFile = file;
  //   // } else{
  //     // console.log("no any image")
  //   // }
  // }

  public onFileSelected(event: EventEmitter<File[]>) {
    const file : File = event[0];
    this.bookFile = file;
    console.log(this.bookFile);
  }

}
