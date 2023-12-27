import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  dataSource = this.users;
  constructor(private userservice: UsersService,private fb:FormBuilder) {}
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website', 'company', 'actionEditDelete'];
  ngOnInit(): void {
    this.getUsers();
  }


getUsers() {
  this.userservice.getUsers().subscribe(data => {
    this.users = data;
    // this.totalPokemons = this.users.length;
    
    console.log(data);
  });
}
delete(id:string)
{
  this.userservice.deleteUser(id).subscribe(data=>{
    console.log(data);
  alert("User deleted");
    this.getUsers();
  })


}
isEditMode = false;

editdata = new FormGroup({
  "id": new FormControl(),                                
  "name": new FormControl(),
  "email": new FormControl(),
  "phone": new FormControl(),
  "website": new FormControl(),
  "company": new FormControl()
});

edit(user: any) {
  this.editdata.setValue(user);
  this.isEditMode=true;
}

updateuser()
{
this.userservice.edituser(this.editdata.value).subscribe((res)=>{
this.users=res;
alert("User Updated")
this.getUsers();

this.isEditMode=false;
})
}


closeForm(): void {

  this.isEditMode = false;
  
}

//ADD USER



regform=this.fb.group({
  name:['',[Validators.required]],
  id:['',[Validators.required]],
  email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]],
  PhoneNumber:['',[Validators.pattern("0-9"),Validators.minLength(10)]],
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

searchQuery:any;
searchbyname() {
  if(this.searchQuery == "")
  {
    this.ngOnInit();
  }
  else{
    this.users=this.users.filter(res=>{
  return res.name?.toLowerCase().match(this.searchQuery.toLocaleLowerCase());
})
}
}
searchQquery:any;
searchbyemail() {
  if(this.searchQquery == "")
  {
    this.ngOnInit();
  }
  else{
    this.users=this.users.filter(res=>{
  return res.email?.toLowerCase().match(this.searchQquery.toLocaleLowerCase());
})
 }
}
}
