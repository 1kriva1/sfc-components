import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import BaseAppComponent from "src/base-app.component";

@Component({
  selector: "chart-app",
  templateUrl: "./chart-app.component.html",
  styleUrls: ["../app/app.component.css"],
})
export class ChartAppComponent extends BaseAppComponent {

  // LINE
  public lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A", borderWidth: 1 },
  ];
  public lineChartData1: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A", borderWidth: 1 },
  ];
  public lineChartSeveralData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A", borderWidth: 1 },
    { data: [45, 19, 30, 61, 96, 75, 50], label: "Series B", borderWidth: 1 },
  ];
  public lineChartColorsData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A", borderWidth: 1 },
    { data: [45, 19, 30, 61, 96, 75, 50], label: "Series B", borderWidth: 1 },
    { data: [65, 39, 10, 41, 76, 55, 70], label: "Series С", borderWidth: 1 },
    { data: [95, 9, 40, 11, 46, 85, 100], label: "Series D", borderWidth: 1 },
    { data: [85, 19, 50, 21, 36, 75, 90], label: "Series E", borderWidth: 1 },
    { data: [75, 29, 60, 31, 46, 65, 80], label: "Series F", borderWidth: 1 },
    { data: [35, 69, 20, 71, 6, 25, 40], label: "Series G", borderWidth: 1 },
    { data: [15, 49, 40, 51, 26, 5, 20], label: "Series H", borderWidth: 1 },
    { data: [65, 9, 90, 1, 76, 55, 70], label: "Series J", borderWidth: 1 },
    { data: [35, 39, 60, 31, 46, 25, 40], label: "Series K", borderWidth: 1 }
  ];
  public lineChartLabels: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChartColors: any[] = [
    {
      backgroundColor: 'yellow',
      borderColor: 'red',
      pointBackgroundColor: 'green',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartOptions: any = {
    legend: { position: 'left' }
  };
  // END LINE

  // BAR
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  public barChartSeveralData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartColorsData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [65, 39, 10, 41, 76, 55, 70], label: "Series С" },
    { data: [95, 9, 40, 11, 46, 85, 100], label: "Series D" },
    { data: [85, 19, 50, 21, 36, 75, 90], label: "Series E" },
    { data: [75, 29, 60, 31, 46, 65, 80], label: "Series F" },
    { data: [35, 69, 20, 71, 6, 25, 40], label: "Series G" },
    { data: [15, 49, 40, 51, 26, 5, 20], label: "Series H" },
    { data: [65, 9, 90, 1, 76, 55, 70], label: "Series J" },
    { data: [35, 39, 60, 31, 46, 25, 40], label: "Series K" }
  ];
  public barChartOptions: any = {
    legend: { position: 'left' }
  };
  public barChartColors: any[] = [
    {
      backgroundColor: 'yellow',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  // END BAR

  // DOUGHNUT
  public doughnutChartLabels: string[] = ['Series A', 'Series B', 'Series C'];
  public doughnutChartData: any = [
    { data: [350, 450, 100] }
  ];
  public doughnutChartSeveralData: any = [
    { data: [350, 450, 100] },
    { data: [50, 150, 120] },
    { data: [250, 130, 70] }
  ];
  public doughnutChartColorsLabels: string[] = ['Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Series G', 'Series H', 'Series J', 'Series K'];
  public doughnutChartColorsData: any = [
    { data: [65, 59, 80, 81, 56, 55, 40, 11, 23, 76], borderWidth: 1 },
    { data: [28, 48, 40, 19, 86, 27, 90, 56, 12, 12], borderWidth: 1 },
    { data: [65, 39, 10, 41, 76, 55, 70, 87, 54, 15], borderWidth: 1 }
  ];
  public doughnutChartOptions: any = {
    legend: { position: 'left' }
  };
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ['yellow', 'green', 'red']
    }
  ];
  // END DOUGHNUT

  // RADAR
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' }
  ];
  public radarChartSeveralData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];
  public radarChartColorsLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Coding', 'Playing', 'Laying'];
  public radarChartColorsData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40, 12, 23, 45], label: 'Series A', borderWidth: 1 },
    { data: [28, 48, 40, 19, 96, 27, 100, 67, 12, 78], label: 'Series B', borderWidth: 1 },
    { data: [65, 39, 10, 41, 76, 55, 70, 67, 12, 15], label: "Series С", borderWidth: 1 },
    { data: [95, 9, 40, 11, 46, 85, 100, 97, 72, 45], label: "Series D", borderWidth: 1 },
    { data: [85, 19, 50, 21, 36, 75, 90, 17, 22, 98], label: "Series E", borderWidth: 1 },
    { data: [75, 29, 60, 31, 46, 65, 80, 27, 62, 18], label: "Series F", borderWidth: 1 },
    { data: [35, 69, 20, 71, 6, 25, 40, 37, 82, 68], label: "Series G", borderWidth: 1 },
    { data: [15, 49, 40, 51, 26, 5, 20, 87, 12, 48], label: "Series H", borderWidth: 1 },
    { data: [65, 9, 90, 1, 76, 55, 70, 17, 92, 38], label: "Series J", borderWidth: 1 },
    { data: [35, 39, 60, 31, 46, 25, 40, 37, 32, 78], label: "Series K", borderWidth: 1 }
  ];
  public radarChartOptions: any = {
    legend: { position: 'left' }
  };
  public radarChartColors: any[] = [
    {
      backgroundColor: 'yellow',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  // END RADAR

  // PIE
  public pieChartLabels: any[] = ['Downloads sales', 'In store sales', 'Mail Sales'];
  public pieChartData: any[] = [300];
  public pieChartSeveralData: any[] = [300, 500, 100];
  public pieChartColorsLabels: any[] = ['Eating1', 'Drinking2', 'Sleeping3', 'Designing4', 'Coding5', 'Cycling6', 'Running7', 'Coding8', 'Playing9', 'Laying10'];
  public pieChartColorsData: any[] = [300, 500, 100, 245, 231, 56, 431, 761, 123, 90];
  public pieChartColors = [
    {
      backgroundColor: ['yellow'],
    },
  ];
  public pieChartOptions: any = {
    legend: { position: 'left' }
  };
  // END PIE

  // POLAR
  public polarAreaChartLabels: string[] = ['Download Sales'];
  public polarAreaChartData: number[] = [300];
  public polarAreaChartSeveralData: number[] = [300, 500, 100, 40, 120];
  public polarAreaChartColorsLabels: any[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Coding', 'Playing', 'Laying'];
  public polarAreaChartColorsData: any[] = [300, 500, 100, 245, 231, 56, 431, 761, 123, 90];
  public polarAreaChartColors = [
    {
      backgroundColor: ['yellow'],
    },
  ];
  public polarAreaChartOptions: any = {
    legend: { position: 'left' }
  };
  // END POLAR

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    super(router, activatedRoute);
  }
}
