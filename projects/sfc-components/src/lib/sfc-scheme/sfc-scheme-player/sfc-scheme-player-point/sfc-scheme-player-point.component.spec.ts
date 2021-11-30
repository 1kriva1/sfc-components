import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemePlayerPointComponent } from './sfc-scheme-player-point.component';

describe('SfcSchemePlayerPointComponent', () => {
  let component: SfcSchemePlayerPointComponent;
  let fixture: ComponentFixture<SfcSchemePlayerPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemePlayerPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemePlayerPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
