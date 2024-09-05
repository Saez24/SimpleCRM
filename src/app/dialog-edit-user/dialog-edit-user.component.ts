import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditUserComponent {
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  user: User;
  formattedBirthDate: string;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, id: string }
  ) {
    this.user = new User(data);
    this.userId = data.id;

    // Umwandlung des Timestamps in yyyy-MM-dd
    const date = new Date(this.user.birthDate);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    this.formattedBirthDate = `${year}-${month}-${day}`;     
  }

  async saveUser() {
  try {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user, this.userId);
    const { id, ...userData } = this.user;

    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    
    await updateDoc(userDocRef, { ...userData });
    
    console.log('User updated successfully');
    this.dialogRef.close();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}


  
  closeDialog() {
    this.dialogRef.close();
  }
}
