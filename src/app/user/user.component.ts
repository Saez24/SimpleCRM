import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatTooltipModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',

})
export class UserComponent {
positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}
