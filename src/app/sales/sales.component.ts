import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogAddDocumentComponent } from '../dialog-add-document/dialog-add-document.component';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Document } from '../models/document.class';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterLink, MatTabsModule, NgFor],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
})
export class SalesComponent {
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);
  offer: Document = new Document();
  invoice: Document = new Document();
  allOffers: any[] = [];
  allInvoices: any[] = [];
  users: any[] = [];

  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    const offersCollection = collection(this.firestore, 'offers');
    const invoicesCollection = collection(this.firestore, 'invoices');
    const usersCollection = collection(this.firestore, 'users');


  onSnapshot(offersCollection, (snapshot) => {
    this.allOffers = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
  });

  onSnapshot(invoicesCollection, (snapshot) => {
    this.allInvoices = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
  });
    
  onSnapshot(usersCollection, (snapshot) => {
    this.users = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    });  
  }
  
   getUserById(userId: string) {
    return this.users.find(user => user.id === userId);
  }

  openDialog() {
    this.dialog.open(DialogAddDocumentComponent);
  }
}
