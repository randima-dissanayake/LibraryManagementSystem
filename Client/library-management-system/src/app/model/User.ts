export interface User{
	id : number,
	firstName : string,
	lastName : string,
    universityId : number,
	username : string,
	password : string,
	roles : Role[],
	telephones : Telephone[],
	enable : false
}

export interface Role{
	role : String
}

export interface Telephone{
	number : String
}