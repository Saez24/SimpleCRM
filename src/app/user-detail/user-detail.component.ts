import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { doc, Firestore } from '@angular/fire/firestore';
import { docData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user$!: Observable<User>;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      const userDoc = doc(this.firestore, `users/${this.userId}`);
      this.user$ = docData(userDoc);
    }
  }

  editContactDialog() {
  this.user$.subscribe(user => {
    this.dialog.open(DialogEditUserComponent, {
      data: user  
    });
  });
}

}
