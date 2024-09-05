import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Document } from '../models/document.class';
import { User } from '../models/user.class';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { DecimalPipe } from '@angular/common';

registerLocaleData(localeDe);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
})
export class DashboardComponent {
  user: User = new User();
  offer: Document = new Document();
  invoice: Document = new Document();
  allUsers: any[] = [];
  allOffers: any[] = [];
  allInvoices: any[] = [];
  totalAmountInvoices: number = 0;
  totalAmountOffers: number = 0;


  firestore: Firestore = inject(Firestore);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

async ngOnInit(): Promise<void> {
  const offersCollection = collection(this.firestore, 'offers');
  const invoicesCollection = collection(this.firestore, 'invoices');
  const usersCollection = collection(this.firestore, 'users');

  onSnapshot(offersCollection, (snapshot) => {
    this.allOffers = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    this.calculateTotalAmount();
  });

  onSnapshot(invoicesCollection, (snapshot) => {
    this.allInvoices = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    this.calculateTotalAmount();
  });
    
  onSnapshot(usersCollection, (snapshot) => {
    this.allUsers = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    this.cdr.markForCheck();
  });
}

  calculateTotalAmount() {
    this.totalAmountInvoices = this.allInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
    this.totalAmountOffers = this.allOffers.reduce((sum, offer) => sum + (offer.amount || 0), 0);
    this.cdr.markForCheck();
  }
}