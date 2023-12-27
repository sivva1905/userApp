import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  constructor(private userservice: UsersService,private fb: FormBuilder,){}

  regform=this.fb.group({
    name:['',[Validators.required]],
    id:['',[Validators.required]],
    email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]],
    phone: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10)]],
    company:['',[Validators.required]],
    website:['',[Validators.required]],
  
  });

  get namevalidator(){
    return this.regform.get('name')
  }
  get emailvalidator(){
    return  this.regform.get('email')
  }
  get idvalidator(){
    return  this.regform.get('id')
  }
  get phoneValidator(){
    return  this.regform.get('phone')
  }
  get websitevalidator(){
    return  this.regform.get('website')
  }
  get companyvalidator(){
    return  this.regform.get('company')
  }
  onSubmit() {
    console.log(this.regform.value);
    const usernameValue = this.regform.value.name;
  
    this.userservice.addUser(this.regform.value).subscribe(
      response => {
        console.log(response);
  
       alert("Welcome User App  '"+usernameValue)
  
       
        location.reload();
      },
      error => {
        console.error(error);
  
      });}
}
