import { User } from './User';
import { Book } from './Book';

export interface Transaction{
    id : number,
    bookId : number,
	userId : number,
	checkout_date : string,
	renew_flag : number,
	fine : number,
	user:User,
	book: Book
}