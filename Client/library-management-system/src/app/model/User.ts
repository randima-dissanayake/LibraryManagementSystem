export interface User{
	id : number,
	firstName : string,
	lastName : string,
    studentId : number,
	username : string,
	password : string,
	roles : String,
	telephones : Telephone[],
	enable : false
}

export interface Role{
	role : String
}

export interface Telephone{
	number : String
}