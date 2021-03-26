import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isActive = true;

  user: User = {
    name: "",
    email: "",
    phone: "",
    friendCode: ""
  }

  constructor(private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.user.friendCode = params['c'];
    });
  }

  ngOnInit(): void {
  }

  send() {
    if (this.contentIsViable()) {
      this.userService.create(this.user).subscribe(() => {
        this.userService.showMessage('Seja bem vindo!');
        this.route.navigate(['/home']);
      })
    } else {
      this.snackBar.open("Campos incorretos, tente novamente", 'X', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
  }

  private contentIsViable(): boolean {
    console.log(typeof this.user.phone);
    if ((this.user.phone.length != 0) &&
      (this.user.email.includes("@") && this.user.email.includes(".")) &&
      this.user.name.length > 0)
      return true;

    return false;
  }

}
