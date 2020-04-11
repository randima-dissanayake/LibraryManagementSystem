import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/Book';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  // @Input() name;
  checkoutForm: any = FormGroup;
  public bookFile: File;

  constructor(public activeModal: NgbActiveModal, private bookService: BookService, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      title: '',
      isbn: '',
      author: '',
      publisher: '',
      year_of_publication: '',
      location: '',
      num_of_copies: 0
    });
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
  }

  addNewBook(data: FormGroup) {
    const formData = new FormData();
    formData.append('book', JSON.stringify(data));
    formData.append('file', this.bookFile)

    this.bookService.save(formData).subscribe(
      (data: Book) => console.log(data),
      (error) => console.log(error)
    );
    this.checkoutForm.reset();
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
