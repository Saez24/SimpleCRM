import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [],
})
export class UserComponent implements OnInit {
  user: User = new User();
  allUsers: any[] = [];
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');


    onSnapshot(usersCollection, (snapshot) => {
      this.allUsers = snapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
