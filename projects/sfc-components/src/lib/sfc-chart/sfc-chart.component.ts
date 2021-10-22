import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective, Color, Label, ThemeService } from "ng2-charts";
import { ComponentTheme } from "../common/constants/common-constants";
import ISize from "../common/interfaces/ISize";
import { CommonUtils } from "../common/utils/common-utils";
import { UIUtils } from "../common/utils/ui-utils";

@Component({
  selector: "sfc-chart",
  templateUrl: "./sfc-chart.component.html"
})
export class SfcChartComponent implements OnInit, AfterViewInit {

  // CONSTANTS
  readonly DEFAULT_BACKGROUND_CUSTOM_COLORS = ['#ED5565', '#FC6E51', '#FFCE54', '#A0D468', '#48CFAD', '#4FC1E9', '#5D9CEC', '#AC92EC', '#EC87C0', '#CCD1D9'];

  readonly DEFAULT_BORDER_CUSTOM_COLORS = ['#DA4453', '#E9573F', '#FCBB42', '#8CC152', '#37BC9B', '#3BAFDA', '#4A89DC', '#967ADC', '#D770AD', '#AAB2BD'];

  readonly CHARTS_WITH_OUT_GRID_LINES = ['doughnut', 'radar', 'pie', 'polarArea'];

  readonly CHARTS_DIRECT_UPDATED_BY_DARK_THEME = ['radar', 'polarArea'];

  readonly DARK_MODE_SCALE_OPTIONS = {
    angleLines: { color: '#656D78' },
    gridLines: { color: '#656D78' },
    pointLabels: { fontColor: '#F5F7FA' },
    ticks: { fontColor: '#F5F7FA', backdropColor: 'transparent' }
  }

  readonly DEFAULT_CHART_OPTIONS: ChartOptions = {
    responsive: true,
    legend: { labels: {} },
    scales: {
      xAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          display: true
        }
      }],
      yAxes: [{
        gridLines: {
          display: true
        },
        ticks: {
          display: true
        }
      }]
    },
    tooltips: { enabled: true }
  };

  readonly DARK_MODE_GRID_STYLES: ChartOptions = {
    legend: {
      labels: { fontColor: '#E6E9ED' }
    },
    scales: {
      xAxes: [{
        ticks: { fontColor: '#E6E9ED' },
        gridLines: { color: '#656D78' }
      }],
      yAxes: [{
        ticks: { fontColor: '#E6E9ED' },
        gridLines: { color: '#656D78' }
      }]
    }
  };
  // END CONSTANTS

  // line, bar, radar, doughnut, pie, polarArea, bubble, scatter
  @Input()
  type: ChartType = 'line';

  // has to contain the same amount of elements as the dataset with the most values.
  // these labels are used to label the index axis (default x axes).
  @Input()
  labels: Label;

  @Input('data-sets')
  dataSets: ChartDataSets[];

  @Input()
  data: any[];

  @Input()
  options: ChartOptions;

  @Input()
  legend: boolean = true;

  @Input()
  plugins: any[];

  @Input()
  colors: Color[];

  @Input()
  size: ISize;

  private _theme: ComponentTheme = ComponentTheme.LIGHT;

  @Input()
  public get theme() {
    return this._theme;
  }
  public set theme(value) {
    if (this._theme != value) {
      this.toggleTheme(value);
    }

    this._theme = value;
  }

  @Input('grid-lines')
  gridLines: boolean = true;

  @Input()
  tooltip: boolean = true;

  @Input()
  ticks: boolean = true;

  @Input('custom-colors')
  customColors: boolean = false;

  @ViewChild(BaseChartDirective, { static: false })
  private chartComponent: BaseChartDirective;

  get chartSize() {
    return this.size ?
      {
        width: UIUtils.getCssLikePx(this.size.width),
        height: UIUtils.getCssLikePx(this.size.height)
      }
      : null;
  }

  constructor(private themeService: ThemeService) { }

  ngAfterViewInit(): void {
    if (this.theme == ComponentTheme.DARK && this.CHARTS_DIRECT_UPDATED_BY_DARK_THEME.includes(this.type))
      this.toggleRadarChartTheme(this.theme);
  }

  ngOnInit(): void {
    if (!CommonUtils.isDefined(this.dataSets))
      this.dataSets = [{ data: [] }];

    this.options = CommonUtils.mergeDeep(this.options || {}, this.DEFAULT_CHART_OPTIONS);

    if (this.customColors) {
      this.initDefaultColors();
    }

    if (this.CHARTS_WITH_OUT_GRID_LINES.includes(this.type)) {
      this.gridLines = false;
      this.ticks = false;
    }

    if (!this.gridLines) {
      this.options.scales.xAxes.forEach(x => x.gridLines.display = false);
      this.options.scales.yAxes.forEach(y => y.gridLines.display = false);
    }

    if (!this.tooltip) {
      this.options.tooltips.enabled = false;
    }

    if (!this.ticks) {
      this.options.scales.xAxes.forEach(x => x.ticks.display = false);
      this.options.scales.yAxes.forEach(y => y.ticks.display = false);
    }
  }

  // COLORS

  initDefaultColors() {
    switch (this.type) {
      case 'pie':
      case 'polarArea':
        this.initPiePolarChartDefaultColors();
        break;
      case 'doughnut':
        this.initDoughnutChartDefaultColors();
        break;
      default:
        this.initChartDefaultColors();
        break;
    }
  }

  initChartDefaultColors() {
    this.colors = [];
    this.DEFAULT_BACKGROUND_CUSTOM_COLORS.forEach((value, index) => {
      const borderColor = this.DEFAULT_BORDER_CUSTOM_COLORS[index];
      this.colors.push({
        backgroundColor: value,
        borderColor: borderColor,
        pointBackgroundColor: borderColor,
        pointHoverBorderColor: borderColor
      });
    });
  }

  initPiePolarChartDefaultColors() {
    this.colors = [{
      backgroundColor: this.DEFAULT_BACKGROUND_CUSTOM_COLORS
    }];
  }

  initDoughnutChartDefaultColors() {
    this.colors = []
    for (let index = 0; index < this.DEFAULT_BACKGROUND_CUSTOM_COLORS.length; index++) {
      this.colors.push({
        backgroundColor: this.DEFAULT_BACKGROUND_CUSTOM_COLORS
      });
    }
  }

  // THEMES

  toggleTheme(newTheme: ComponentTheme) {
    switch (this.type) {
      case 'radar':
      case 'polarArea':
        this.toggleRadarChartTheme(newTheme);
        break;
      default:
        this.toggleChartTheme(newTheme);
        break;
    }
  }

  toggleChartTheme(newTheme: ComponentTheme) {
    const overrides: ChartOptions = newTheme === ComponentTheme.DARK
      ? this.DARK_MODE_GRID_STYLES
      : {};
    this.themeService.setColorschemesOptions(overrides);
  }

  toggleRadarChartTheme(newTheme: ComponentTheme) {
    if (!this.chartComponent)
      return;

    if (newTheme === ComponentTheme.DARK) {
      let overrides: ChartOptions = CommonUtils.mergeDeep({ scale: {} }, this.options);
      overrides.legend.labels.fontColor = this.DARK_MODE_GRID_STYLES.legend.labels.fontColor;
      overrides.scale = this.DARK_MODE_SCALE_OPTIONS;

      this.chartComponent.chart.options = overrides;
    } else {
      this.chartComponent.chart.options = this.options;
    }

    this.chartComponent.chart.update();
  }
}
