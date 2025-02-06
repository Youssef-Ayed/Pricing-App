import { RouterOutlet } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  public barChartOptions!: BarChartOptions;
  activeTab: string = 'fdm';
  constructor() {
    this.barChartOptions = {
      series: [
        {
          name: 'Duration',
          data: [2.3, 3.1],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + 'hours';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: ['Wall Time', 'Infill Time'],
        position: 'bottom',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + 'hours';
          },
        },
      },
      title: {
        text: 'Total Time',
        floating: false,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    };
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  // Define properties for form inputs
  preset_configuration: string = 'Standard 0.4mm';
  nozzle_diameter: number = 0.4;
  layer_height: number = 0.2;
  base_print_speed: number = 50;
  wall_speed_factor: number = 0.8;
  infill_speed_factor: number = 1.2;
  support_speed_factor: number = 1.2;
  material_cost_per_kg: number = 25;
  machine_cost_per_hour: number = 2;
  material_density: number = 1.24;

  // Part Parameters
  num_walls: number = 2;
  support_density: number = 0.2;
  setup_cost: number = 5;
  waste_factor: number = 0.1;
  part_preset: string = 'Small Part';
  volume: number = 10000;
  surface_area: number = 5000;
  support_volume: number = 1000;
  infill_ratio: number = 0.2;

  width = 68.5;
  height = 68.51;
  length = 25.55;
  average_time_per_layer = 12;
  manual_print_time_increase = 35;
  setup_fee = 15;
  resin_cost_per_ml = 0.15;
  resin_density = 1.1;
  machine_hourly_rate = 10;

  // Pricing logic (adjust based on actual formula)
  get totalPrice(): number {
    return 10;
  }
}
