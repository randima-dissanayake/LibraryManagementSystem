import { SafeResourceUrl } from '@angular/platform-browser';

export interface Book {
    id: number,
    isbn:string,
    title:string,
    author:string,
    publisher:string,
    year_of_publication:string,
    location:string,
    num_of_copies:number,
    book_image : string | ArrayBuffer,
    file_name : string
    // image_url: SafeResourceUrl
}