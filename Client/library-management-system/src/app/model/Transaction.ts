import { User } from './User';
import { Book } from './Book';

export interface Transaction{
    id : number,
    bookId : number,
	userId : number,
	checkin_date : Date,
	checkout_date : Date,
	renew_flag : number,
	fine : number,
	returned : boolean,
	user:User,
	book: Book
}