import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-elements-dialog',
  templateUrl: './dialog-elements-dialog.component.html',
  styleUrls: ['./dialog-elements-dialog.component.css']
})
export class DialogElementsDialogComponent implements OnInit {

  public _name: string = "";
  place: number = 0;
  link: string = "";
  scoreText: string = "";
  positionText: string = "";
  responseText: string = "Opa, suas credencias estão erradas. Tente novamente";

  display = false;

  constructor(
    public dialogRef: MatDialogRef<DialogElementsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public snackBar: MatSnackBar, private userService: UserService) {

    this.userService.readByEmail(this.data.email).subscribe(response => {
      this.data = response['result'][0];

      this.scoreText = `Sua pontuação é: ${this.data.points}`;
      this.positionText = `Sua posição no rank é: ${this.data._rank}`;
      this.responseText = `Compartilhe este link, chame amigos e ganhe mais pontos!`;

      this.display = true;

      this.link = `http://localhost:4200?c=${this.data.friendCode}`;
    })
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyLink() {
    this.dialogRef.close();

    this.snackBar.open("Copiado com sucesso!", 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}