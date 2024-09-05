export class Document {
    id?: string;
    documentNo: number;
    documentType: string;
    documentDate: number;
    description: string;
    amount: number;
    userId: string; // Neue Eigenschaft für die Benutzer-ID

    constructor(obj?: any) {
        this.documentNo = obj && obj.documentNo ? obj.documentNo : this.generateDocumentNo(); // Stelle sicher, dass eine Nummer generiert wird
        this.documentType = obj ? obj.documentType : '';
        this.documentDate = obj && obj.documentDate ? obj.documentDate : Date.now(); // Stelle sicher, dass das aktuelle Datum gesetzt wird
        this.amount = obj && typeof obj.amount === 'number' ? obj.amount : 0;
        this.userId = obj ? obj.userId : ''; // Benutzer-ID wird übergeben
        this.description = obj ? obj.description : '';
    }

    // Methode zur Generierung einer Dokumentnummer: Jahr + zufällige 4-stellige Zahl
    private generateDocumentNo(): number {
        const year = new Date().getFullYear();
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return parseInt(`${year}${randomPart}`);
    }

    public toJSON() {
        return {
            documentNo: this.documentNo,
            documentType: this.documentType,
            documentDate: this.documentDate,
            amount: this.amount,
            userId: this.userId, // Benutzer-ID wird dem JSON hinzugefügt
            description : this.description,
        };
    }
}
