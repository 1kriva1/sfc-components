import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemePlayerBadgeComponent } from './sfc-scheme-player-badge.component';

describe('SfcSchemePlayerBadgeComponent', () => {
  let component: SfcSchemePlayerBadgeComponent;
  let fixture: ComponentFixture<SfcSchemePlayerBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemePlayerBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemePlayerBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
