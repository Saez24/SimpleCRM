import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, NgIf, MatFormFieldModule, MatInputModule,
    MatDialogActions, MatDialogContent, MatIconModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    MatProgressBarModule, ReactiveFormsModule, ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date = new Date();
  loading = false;
  firestore: Firestore = inject(Firestore);

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  async saveUser() {
    try {
      if (this.birthDate) {
        this.user.birthDate = this.birthDate.getTime();
      }

      const usersCollection = collection(this.firestore, 'users');
      const result = await addDoc(usersCollection, this.user.toJSON());

      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}


