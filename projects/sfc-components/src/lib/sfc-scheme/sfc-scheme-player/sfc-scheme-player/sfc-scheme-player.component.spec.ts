import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemePlayerComponent } from './sfc-scheme-player.component';

describe('SfcSchemePlayerComponent', () => {
  let component: SfcSchemePlayerComponent;
  let fixture: ComponentFixture<SfcSchemePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
