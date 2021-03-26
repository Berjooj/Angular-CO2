import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { DialogElementsDialogComponent } from './../../components/dialog-elements-dialog/dialog-elements-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079 },
//   { position: 2, name: 'Helium', weight: 4.0026 },
//   { position: 3, name: 'Lithium', weight: 6.941 },
//   { position: 4, name: 'Beryllium', weight: 9.0122 },
//   { position: 5, name: 'Boron', weight: 10.811 },
//   { position: 6, name: 'Carbon', weight: 12.0107 },
//   { position: 7, name: 'Nitrogen', weight: 14.0067 },
//   { position: 8, name: 'Oxygen', weight: 15.9994 },
//   { position: 9, name: 'Fluorine', weight: 18.9984 },
//   { position: 10, name: 'Neon', weight: 20.1797 },
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'points'];

  isDisabled = true;

  dataSource: User[] = [{
    name: '',
    email: '',
    phone: '',
    friendCode: '',
    points: 0
  }];

  userSearch: User = this.dataSource[0];

  alertBar = DialogElementsDialogComponent;

  constructor(public dialog: MatDialog, private userService: UserService) {
    this.userService.read().subscribe(response => {
      this.dataSource = response['result'].slice(0, 10);
    })
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsDialogComponent, {
      width: '400px',
      data: { email: this.userSearch.email }
    });
  }

  verify(mail: string): void {
    this.userSearch.email = mail;

    if (mail.length >= 3) {
      this.isDisabled = false;
    }
  }
}