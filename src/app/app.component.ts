import { RouterOutlet } from '@angular/router';
import {
  Component,
  ViewChild,
  Renderer2,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;
  public barChartOptions!: BarChartOptions;

  private inputListener!: () => void;

  activeTab: string = 'fdm';

  total_cost = 175.58333333333334;
  material_cost = 170.5;
  machine_cost = 0.08333333333333333;
  total_time = 0.041666666666666664;
  wall_time = 0.013888888888888888;
  infill_time = 0.00462962962962963;
  shell_ratio = 0.8;
  material_volume = 5500;
  material_flow_rate = 6.283185307179587;

  layers: number = 1371;
  print_time: number = 23989.080716589586;
  model_volume: number = 27525.21;
  waste_volume: number = 5505.042000000001;

  constructor(private http: HttpClient, private renderer: Renderer2) {
    this.updateCharts();
  }

  updateCharts() {
    this.barChartOptions = {
      series: [
        {
          name: 'Duration',
          data: [this.wall_time, this.infill_time],
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
        text: 'Total Time: ' + this.total_time,
        floating: false,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    };
    this.chartOptions = {
      series: [this.material_cost, this.machine_cost, this.setup_cost],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Material', 'Machine', 'Setup'],
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

  ngOnInit() {
    this.inputListener = this.renderer.listen('document', 'input', (event) => {
      console.log('change');

      this.calculateCost();
      this.calculateSlaCost();
    });
  }

  ngOnDestroy() {
    if (this.inputListener) {
      this.inputListener();
    }
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
    return this.total_cost;
  }

  calculateCost() {
    const apiUrl =
      'https://sm-backend-v2-dev-ms-fdm-sla-calculator-fdbud9drb4f0cuct.westeurope-01.azurewebsites.net/fdm-calculate/';

    const requestBody = {
      preset_configuration: this.preset_configuration,
      nozzle_diameter: this.nozzle_diameter,
      layer_height: this.layer_height,
      base_print_speed: this.base_print_speed,
      wall_speed_factor: this.wall_speed_factor,
      infill_speed_factor: this.infill_speed_factor,
      support_speed_factor: this.support_speed_factor,
      material_cost_per_kg: this.material_cost_per_kg,
      machine_cost_per_hour: this.machine_cost_per_hour,
      material_density: this.material_density,
      num_walls: this.num_walls,
      support_density: this.support_density,
      setup_cost: this.setup_cost,
      waste_factor: this.waste_factor,
      part_preset: this.part_preset,
      volume: this.volume,
      surface_area: this.surface_area,
      support_volume: this.support_volume,
      infill_ratio: this.infill_ratio,
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.total_cost = response.total_cost;
        this.material_cost = response.material_cost;
        this.machine_cost = response.machine_cost;
        this.total_time = response.total_time;
        this.wall_time = response.wall_time;
        this.infill_time = response.infill_time;
        this.shell_ratio = response.shell_ratio;
        this.material_volume = response.material_volume;
        this.material_flow_rate = response.material_flow_rate;
        this.updateCharts();
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }
  calculateSlaCost() {
    const apiUrl =
      'https://sm-backend-v2-dev-ms-fdm-sla-calculator-fdbud9drb4f0cuct.westeurope-01.azurewebsites.net/sla-calculate/';

    const requestBody = {
      width: this.width,
      height: this.height,
      length: this.length,
      volume: this.volume,
      surface_area: this.surface_area,
      layer_height: this.layer_height,
      average_time_per_layer: this.average_time_per_layer,
      manual_print_time_increase: this.manual_print_time_increase,
      setup_fee: this.setup_fee,
      resin_cost_per_ml: this.resin_cost_per_ml,
      resin_density: this.resin_density,
      machine_hourly_rate: this.machine_hourly_rate,
      waste_factor: this.waste_factor,
      support_density: this.support_density,
    };

    this.http.post<any>(apiUrl, requestBody).subscribe(
      (response) => {
        this.layers = response.layers;
        this.print_time = response.print_time;
        this.material_cost = response.material_cost;
        this.machine_cost = response.machine_cost;
        this.total_cost = response.total_cost;
        this.model_volume = response.model_volume;
        this.support_volume = response.support_volume;
        this.waste_volume = response.waste_volume;
        this.updateCharts();
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }
}
