import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemeModalBodyComponent } from './sfc-scheme-modal-body.component';

describe('SfcSchemeModalBodyComponent', () => {
  let component: SfcSchemeModalBodyComponent;
  let fixture: ComponentFixture<SfcSchemeModalBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemeModalBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemeModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
