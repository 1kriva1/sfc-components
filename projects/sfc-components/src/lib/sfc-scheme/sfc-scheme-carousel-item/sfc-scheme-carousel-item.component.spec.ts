import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcSchemeCarouselItemComponent } from './sfc-scheme-carousel-item.component';

describe('SfcSchemeCarouselItemComponent', () => {
  let component: SfcSchemeCarouselItemComponent;
  let fixture: ComponentFixture<SfcSchemeCarouselItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcSchemeCarouselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcSchemeCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
