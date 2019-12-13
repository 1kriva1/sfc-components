import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SfcTabPanelComponent } from 'projects/sfc-components/src/lib/sfc-tab/sfc-tab-panel.component';
import { SfcTabComponent, SfcComponentsModule } from 'projects/sfc-components/src/public-api';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent,
    fixture: ComponentFixture<AppComponent>,
    el: DebugElement,
    tabPanel: DebugElement,
    modal: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[SfcComponentsModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    tabPanel = el.query(By.css('#tab-panel'));
    modal = el.query(By.css('#testModal'));

    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // tab test  

  // it('should find only one selected tab inside the tab container', () => {
  //   const tabs = tabPanel.queryAll(By.css('.tab'));
  //   expect(tabs).toBeTruthy();
  //   expect(tabs.length).toBe(1);
  // });

  // it('should find the Contact tab button marked as selected', () => {
  //   const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;
  //   expect(selectedButton).toBeTruthy();
  //   expect(selectedButton.textContent).toBe("Contact");
  // });

  // it('should display the Contact tab', () => {
  //   const contactEmail = tabPanel.query(By.css('.contact-email')).nativeElement;
  //   expect(contactEmail).toBeTruthy();
  // });

  // it('should switch to Login tab', () => {
  //   const tabButtons = tabPanel.queryAll(By.css('.tab-panel-buttons li'));
  //   tabButtons[0].nativeElement.click();
  //   fixture.detectChanges();

  //   const loginEmail = tabPanel.query(By.css('.login-email')).nativeElement;
  //   expect(loginEmail).toBeTruthy();

  //   const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;
  //   expect(selectedButton).toBeTruthy();
  //   expect(selectedButton.textContent).toBe("Login");
  // });


  // modal test

  it('should not add the modal to the page, if the modal is closed', async(() => {

    expect(modal).toBeFalsy();

  }));


  it('should open the modal when the test button is clicked', async(() => {

    fixture.nativeElement.querySelector("#testButton").click();

    fixture.detectChanges();

    const openedModal = fixture.nativeElement.querySelector("#testModal");


    expect(openedModal).toBeTruthy();

  }));
});
