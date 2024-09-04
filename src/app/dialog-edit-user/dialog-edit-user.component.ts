import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogContent, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditUserComponent {
  user$!: Observable<User>;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  user: { firstName: string; lastName: string; birthDate: number; street: string; zipCode: number; city: string; email: string; };
  formattedBirthDate: string;
formattedDate: any;

   constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = { ...data };

    // Umwandlung des Timestamps in tt.mm.jjjj
    const date = new Date(this.user.birthDate);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
     this.formattedBirthDate = `${year}-${month}-${day}`;     
  }

  // async editUser() {
  //   try {
  //       this.user.birthDate = this.birthDate.getTime();
  //       console.log('Current user is', this.user);

  //       const usersCollection = collection(this.firestore, 'users');
  //     const result = await addDoc(usersCollection, this.user.toJSON());
      
  //     console.log('User added successfully', result);
  //     this.dialogRef.close();
  //   } catch (error) {
  //       console.error('Error adding user:', error);
  //   }
  // }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
