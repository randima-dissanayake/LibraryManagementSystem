import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validators';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() public user; 
  registerForm;
  title;
  submitted = false
  roles = [ 'USER', 'LIBRARIAN'];
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private authService: AuthService, private userService:UserService) { 
    console.log("edit user", this.user)
  }

  ngOnInit(): void {
    if(this.user!=null){
      this.title = "Edit User"
      this.registerForm = this.formBuilder.group({
        universityId : [this.user.universityId, Validators.required],
        firstName : [this.user.firstName, Validators.required],
        lastName : [this.user.lastName, Validators.required],
        username : [this.user.username, [Validators.required,Validators.email]],
        password : [this.user.password, Validators.required],
        role : [this.user.roles[0].role, Validators.required],
        telephone1 : [this.user.telephones[0].number, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
        telephone2 : [this.user.telephones[1].number,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      });
    } else {
      this.title = "Add User"
      this.registerForm = this.formBuilder.group({
        universityId : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      username : ['',[Validators.required, Validators.email]],
      password : ['', [Validators.required,PasswordStrengthValidator]],
      role:['USER',Validators.required],
      telephone1 : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
      telephone2 : ['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")] 
    });
    }
  }

  get f() { return this.registerForm.controls; }

  addNewUser(data){
    this.submitted = true;
    if(this.title = "Add User"){
    if (this.registerForm.valid) {
      let userData = {
        "firstName": this.f.firstName.value,
        "lastName": this.f.lastName.value,
        "username": this.f.username.value,
        "universityId": this.f.universityId.value,
        "password": this.f.password.value,
        "telephones": [
          {"number":this.f.telephone1.value},
          {"number":this.f.telephone2.value} 
        ] ,
        "roles" : [
          {"role" : this.f.role.value}
        ],
        "enable" : false ,
        "locked" : false  
      }
    this.authService.save(userData).subscribe(
      (data: User)=>  {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Added Successfully',
          showConfirmButton: true,
          timer: 5500
        })
        this.activeModal.close();
        this.registerForm.reset();
        console.log(data)
      },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Username Password mismatch";
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
} else {
    if (this.registerForm.valid) {
      let userData = {
        "id" : this.user.universityId,
        "firstName": this.f.firstName.value,
        "lastName": this.f.lastName.value,
        "username": this.f.username.value,
        "universityId": this.f.universityId.value,
        "password": this.f.password.value,
        "telephones": [
          {"number":this.f.telephone1.value},
          {"number":this.f.telephone2.value} 
        ] ,
        "roles" : [
          {"role" : this.f.role.value}
        ],
        "enable" : false ,
        "locked" : false  
      }
    this.userService.updateUser(userData).subscribe(
      (data: User)=>  {
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Updated Successfully',
          showConfirmButton: true,
          timer: 5000
        })
        this.activeModal.close();
        window.location.reload()
      },
      (error)=>{
        let errorMsg = "Something went Wrong";
        if (error.status === 401) {
          errorMsg = "Username Password mismatch";
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
}

}
