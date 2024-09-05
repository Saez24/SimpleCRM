import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { doc, Firestore, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { CommonModule, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule, MatMenuModule, NgIf],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  user: User | null = null;
  private unsubscribe: Unsubscribe | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      const userDoc = doc(this.firestore, `users/${this.userId}`);

      this.unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          this.user = doc.data() as User;
          console.log('User data:', this.user);
          this.cd.markForCheck(); // Informiere Angular, dass es die Ansicht überprüfen soll
        } else {
          console.log('No such document!');
        }
      }, (error) => {
        console.error('Error fetching document:', error);
      });
    }
  }

  ngOnDestroy(): void {
  if (this.unsubscribe) {
    this.unsubscribe();
  }
}

  editContactDialog() {
    if (this.userId && this.user) {
      this.dialog.open(DialogEditUserComponent, {
        data: { ...this.user, id: this.userId }
      });
    }
  }
}
