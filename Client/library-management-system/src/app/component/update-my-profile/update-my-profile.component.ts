import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-my-profile',
  templateUrl: './update-my-profile.component.html',
  styleUrls: ['./update-my-profile.component.scss']
})
export class UpdateMyProfileComponent implements OnInit {

  title
  registerForm
  @Input() user
  submitted = false
  roles = [ 'USER', 'LIBRARIAN'];
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {

    this.title = "Edit User"
      this.registerForm = this.formBuilder.group({
        universityId : [this.user.universityId, Validators.required],
        firstName : [this.user.firstName, Validators.required],
        lastName : [this.user.lastName, Validators.required],
        username : [this.user.username, [Validators.required,Validators.email]],
        // password : [this.user.password, Validators.required],
        role : [JSON.parse(sessionStorage.getItem('user')).roles[0].role, Validators.required],
        telephone1 : [this.user.telephones[0].number, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
        telephone2 : [this.user.telephones[1].number,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
      });
  }

  get f() { return this.registerForm.controls; }

  addNewUser(data){
    this.submitted = true;
    if(this.title = "Edit User"){
    if (this.registerForm.valid) {
      let userData = {
        "id" : this.user.id,
        "firstName": this.f.firstName.value,
        "lastName": this.f.lastName.value,
        "username": this.f.username.value,
        "universityId": this.f.universityId.value,
        "password": JSON.parse(sessionStorage.getItem('user')).password,
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
        this.activeModal.close();
        this.registerForm.reset();
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Updated Successfully',
          showConfirmButton: true,
          timer: 5000
        })
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
    );
    
  } 
    }
}

}
