import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemeCarouselDotComponent } from './sfc-scheme-carousel-dot.component';

describe('SfcSchemeCarouselDotComponent', () => {
  let component: SfcSchemeCarouselDotComponent;
  let fixture: ComponentFixture<SfcSchemeCarouselDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemeCarouselDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemeCarouselDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
