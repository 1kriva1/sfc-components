import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SfcComponentsModule } from '../sfc-components.module';
import { ComponentTheme } from '../common/constants/common-constants';
import { By } from '@angular/platform-browser';
import { SfcChartComponent } from './sfc-chart.component';
import { ThemeService } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { ChartOptions } from 'chart.js';

describe('Component: SfcChartComponent', () => {

  let component: SfcChartComponent;
  let fixture: ComponentFixture<SfcChartComponent>;
  let el: DebugElement;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(async(() => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setColorschemesOptions', 'getColorschemesOptions']);
    themeServiceSpy.getColorschemesOptions.and.returnValue({});
    themeServiceSpy.colorschemesOptions = new BehaviorSubject<ChartOptions>({});

    TestBed.configureTestingModule({
      imports: [SfcComponentsModule],
      declarations: [],
      providers: [{ provide: ThemeService, useValue: themeServiceSpy }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SfcChartComponent);
      el = fixture.debugElement;
      component = el.componentInstance;
      fixture.detectChanges();
    });
  }));

  it("SfcChartComponent: Should create component", async(() => {
    expect(component).toBeTruthy();
  }));

  it("SfcChartComponent: main elements", async(() => {
    expect(fixture.nativeElement.querySelector('div.chart-container')).toBeDefined();
    expect(fixture.nativeElement.querySelector('canvas')).toBeDefined();
  }));

  it("Canvas (baseChart): attributes", async(() => {
    const canvasEl = el.query(By.css('canvas'));

    expect(canvasEl.attributes['ng-reflect-chart-type']).toEqual(component.type);
    expect(canvasEl.attributes['ng-reflect-legend']).toEqual('true');
  }));

  it("Properties: default", async(() => {
    expect(component.type).toEqual('line');
    expect(component.labels).toBeUndefined();
    expect(component.dataSets).toBeDefined();
    expect(component.data).toBeUndefined();
    expect(component.options).toEqual(component.DEFAULT_CHART_OPTIONS);
    expect(component.legend).toBeTruthy();
    expect(component.plugins).toBeUndefined();
    expect(component.colors).toBeUndefined();
    expect(component.size).toBeUndefined();
    expect(component.theme).toEqual(ComponentTheme.LIGHT);
    expect(component.gridLines).toBeTruthy();
    expect(component.tooltip).toBeTruthy();
    expect(component.ticks).toBeTruthy();
    expect(component.customColors).toBeFalsy();
  }));

  it("Size: default/custom values", async(() => {
    expect(component.chartSize).toBeNull();

    component.size = { width: 100, height: 50 };
    fixture.detectChanges();

    expect(component.chartSize).toEqual({ width: '100px', height: '50px' });
    expect(fixture.nativeElement.querySelector('div.chart-container').style.width).toEqual('100px');
    expect(fixture.nativeElement.querySelector('div.chart-container').style.height).toEqual('50px');
  }));

  it("Theme: not changed", async(() => {
    spyOn<any>(component, 'toggleTheme').and.callThrough();

    component.theme = ComponentTheme.LIGHT;
    fixture.detectChanges();

    expect(component['toggleTheme']).not.toHaveBeenCalled();
  }));

  it("Theme: changed", async(() => {
    spyOn<any>(component, 'toggleTheme').and.callThrough();

    component.theme = ComponentTheme.DARK;
    fixture.detectChanges();

    expect(component['toggleTheme']).toHaveBeenCalledTimes(1);
  }));

  it("Theme: changed for line chart", async(() => {
    spyOn<any>(component, 'toggleRadarChartTheme').and.callThrough();

    component.theme = ComponentTheme.DARK;
    fixture.detectChanges();

    expect(component['toggleRadarChartTheme']).not.toHaveBeenCalled();
    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledTimes(1);
    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledWith(component.DARK_MODE_GRID_STYLES);
  }));

  it("Theme: try to change from dark to light theme", async(() => {
    spyOn<any>(component, 'toggleRadarChartTheme').and.callThrough();

    component.theme = ComponentTheme.DARK;
    fixture.detectChanges();

    expect(component['toggleRadarChartTheme']).not.toHaveBeenCalled();
    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledTimes(1);
    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledWith(component.DARK_MODE_GRID_STYLES);

    component.theme = ComponentTheme.LIGHT;
    fixture.detectChanges();

    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledTimes(2);
    expect(themeServiceSpy.setColorschemesOptions).toHaveBeenCalledWith({});
  }));

  it("Theme: changed for radar chart", async(() => {
    spyOn<any>(component, 'toggleRadarChartTheme').and.callFake(() => null);

    component.type = 'radar'
    component.theme = ComponentTheme.DARK;
    fixture.detectChanges();

    expect(themeServiceSpy.setColorschemesOptions).not.toHaveBeenCalled();
    expect(component['toggleRadarChartTheme']).toHaveBeenCalledTimes(1);
  }));

  it("Theme: overrides after view init for radar and polarArea", async(() => {
    spyOn<any>(component, 'toggleRadarChartTheme').and.callFake(() => null);

    component.type = 'polarArea'
    component.theme = ComponentTheme.DARK;
    component.ngAfterViewInit()
    fixture.detectChanges();

    expect(themeServiceSpy.setColorschemesOptions).not.toHaveBeenCalled();
    expect(component['toggleRadarChartTheme']).toHaveBeenCalledTimes(2);
  }));

  it("Options: without value", async(() => {
    expect(component.options).toEqual(component.DEFAULT_CHART_OPTIONS);
  }));

  it("Options: with value", async(() => {
    component.options = { legend: { display: true } };
    component.ngOnInit();
    fixture.detectChanges();

    let assertValue = component.DEFAULT_CHART_OPTIONS;
    assertValue.legend.display = true;
    expect(component.options).toEqual(assertValue);
  }));

  it("Datasets: without value", async(() => {
    expect(component.dataSets[0].data.length).toEqual(0);
  }));

  it("Datasets: with value", async(() => {
    component.dataSets = [{ data: [1, 2, 3] }];
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.dataSets[0].data).toEqual([1, 2, 3]);
  }));

  it("Custom colors: false", async(() => {
    component.colors = [{ backgroundColor: 'red' }];
    fixture.detectChanges();

    expect(component.colors).toEqual([{ backgroundColor: 'red' }]);
  }));

  it("Custom colors: true(pie chart)", async(() => {
    component.type = 'pie';
    component.colors = [{ backgroundColor: 'red' }];
    component.customColors = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.colors).toEqual([{
      backgroundColor: component.DEFAULT_BACKGROUND_CUSTOM_COLORS
    }]);
  }));

  it("Custom colors: true(doughnut chart)", async(() => {
    component.type = 'doughnut';
    component.colors = [{ backgroundColor: 'red' }];
    component.customColors = true;
    component.ngOnInit();
    fixture.detectChanges();

    let assertValue = [];
    for (let index = 0; index < component.DEFAULT_BACKGROUND_CUSTOM_COLORS.length; index++) {
      assertValue.push({
        backgroundColor: component.DEFAULT_BACKGROUND_CUSTOM_COLORS
      });
    }

    expect(component.colors).toEqual(assertValue);
  }));

  it("Custom colors: true(line chart)", async(() => {
    component.type = 'line';
    component.colors = [{ backgroundColor: 'red' }];
    component.customColors = true;
    component.ngOnInit();
    fixture.detectChanges();

    let assertValue = [];
    component.DEFAULT_BACKGROUND_CUSTOM_COLORS.forEach((value, index) => {
      const borderColor = component.DEFAULT_BORDER_CUSTOM_COLORS[index];
      assertValue.push({
        backgroundColor: value,
        borderColor: borderColor,
        pointBackgroundColor: borderColor,
        pointHoverBorderColor: borderColor
      });
    });

    expect(component.colors).toEqual(assertValue);
  }));

  it("Grid lines: for charts: 'doughnut', 'radar', 'pie', 'polarArea'", async(() => {
    component.type = 'radar';
    component.gridLines = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.gridLines).toBeFalsy();
    component.options.scales.xAxes.forEach(x => expect(x.gridLines.display).toBeFalsy());
    component.options.scales.yAxes.forEach(y => expect(y.gridLines.display).toBeFalsy());
  }));

  it("Ticks: for charts: 'doughnut', 'radar', 'pie', 'polarArea'", async(() => {
    component.type = 'doughnut';
    component.ticks = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.ticks).toBeFalsy();
    component.options.scales.xAxes.forEach(x => expect(x.ticks.display).toBeFalsy());
    component.options.scales.yAxes.forEach(y => expect(y.ticks.display).toBeFalsy());
  }));

  it("Grid lines: for charts that can have grid lines", async(() => {
    component.type = 'line';
    component.gridLines = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.gridLines).toBeTruthy();
    component.options.scales.xAxes.forEach(x => expect(x.gridLines.display).toBeTruthy());
    component.options.scales.yAxes.forEach(y => expect(y.gridLines.display).toBeTruthy());

    component.gridLines = false;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.gridLines).toBeFalsy();
    component.options.scales.xAxes.forEach(x => expect(x.gridLines.display).toBeFalsy());
    component.options.scales.yAxes.forEach(y => expect(y.gridLines.display).toBeFalsy());
  }));

  it("Ticks: for charts that can have ticks", async(() => {
    component.type = 'bar';
    component.ticks = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.ticks).toBeTruthy();
    component.options.scales.xAxes.forEach(x => expect(x.ticks.display).toBeTruthy());
    component.options.scales.yAxes.forEach(y => expect(y.ticks.display).toBeTruthy());

    component.ticks = false;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.ticks).toBeFalsy();
    component.options.scales.xAxes.forEach(x => expect(x.ticks.display).toBeFalsy());
    component.options.scales.yAxes.forEach(y => expect(y.ticks.display).toBeFalsy());
  }));

  it("Tooltips: default", async(() => {
    expect(component.options.tooltips.enabled).toBeTruthy();
  }));

  it("Tooltips: swich OFF", async(() => {
    component.tooltip = false;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.options.tooltips.enabled).toBeFalsy();
  }));
});
