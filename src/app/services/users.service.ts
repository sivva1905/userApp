import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { users } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  url=" http://localhost:3000/users"


  getUsers()
  {
    return this.http.get<users[]>(this.url);
  
  }
  addUser(user: any): Observable<users[]> {
    return this.http.post<users[]>(this.url, user)
      
}
  
  deleteUser(id: string): Observable<users[]> {
    return this.http.delete<users[]>(`${this.url}/${id}`)
  }

  edituser(user: any): Observable<users[]> {
    const updateUrl = `${this.url}/${user.id}`;
    return this.http.put<users[]>(updateUrl, user);
  }
  

}

