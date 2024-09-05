import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDocumentComponent } from './dialog-add-document.component';

describe('DialogAddDocumentComponent', () => {
  let component: DialogAddDocumentComponent;
  let fixture: ComponentFixture<DialogAddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
