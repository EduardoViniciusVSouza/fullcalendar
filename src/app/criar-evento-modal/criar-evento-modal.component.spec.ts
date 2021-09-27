import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEventoModalComponent } from './criar-evento-modal.component';

describe('CriarEventoModalComponent', () => {
  let component: CriarEventoModalComponent;
  let fixture: ComponentFixture<CriarEventoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEventoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEventoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
