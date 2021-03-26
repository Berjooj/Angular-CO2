import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.API}`;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  create(user: User): Observable<User> {
    let url = `${this.API}/user`;

    return this.httpClient.post<User>(url, user);
  }

  read(): Observable<User[]> {
    let url = `${this.API}/user`;
    let link = url;

    return this.httpClient.get<User[]>(link);
  }

  readByEmail(email: string): Observable<User> {
    let url = `${this.API}/user/${email}`;
    let link = url;

    return this.httpClient.get<User>(link);
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
