import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Document } from '../models/document.class';

interface DocumentType {
  name: string;
}

@Component({
  selector: 'app-dialog-add-document',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule,
    MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    MatInputModule,],
  templateUrl: './dialog-add-document.component.html',
  styleUrls: ['./dialog-add-document.component.scss']
})
export class DialogAddDocumentComponent {
  document: Document = new Document();
  documentControl = new FormControl<DocumentType | null>(null, Validators.required);
  userControl = new FormControl<any | null>(null, Validators.required);
  descriptionControl = new FormControl<string | null>('', Validators.required);
  amountControl = new FormControl<number | null>(0, Validators.required);
  documentType: DocumentType[] = [
    {name: 'Offer'},
    {name: 'Invoice'},
  ];
  users: any[] = [];

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddDocumentComponent>) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    onSnapshot(usersCollection, (snapshot) => {
      this.users = snapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

async createDocument() {
  try {
        if (this.documentControl.invalid || this.userControl.invalid || this.amountControl.invalid || this.descriptionControl.invalid) {
            return;
        }

        const selectedDocumentType = this.documentControl.value?.name;
        const selectedUser = this.userControl.value;
        const amount = this.amountControl.value; 
        const description = this.descriptionControl.value;
        const selectedCollection = selectedDocumentType === 'Offer' ? 'offers' : 'invoices';

        const newDocument = new Document({
            documentType: selectedDocumentType,
            amount: amount,
            userId: selectedUser.id,
            description: description,
        });

        console.log('Current document is', newDocument);

        const documentCollection = collection(this.firestore, selectedCollection);
        const result = await addDoc(documentCollection, newDocument.toJSON());

        console.log('Document added successfully to', selectedCollection, result);
        this.dialogRef.close();
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

}
