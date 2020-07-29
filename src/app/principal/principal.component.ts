import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import { Indicador } from '../core/services/dashboard/indicador.model';
import { IndicadoresService } from '../core/services/dashboard/indicadores.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  indicadores: Indicador[] = [];
  indicadoresAvance: Indicador[] = [];
  public error: { code: number, message: string } = null;
  constructor(
    private indicadoresService: IndicadoresService
  ) { }

  ngOnInit(): void {
    console.log('-->OnInit_principal');
    this.fetchIndicador();
    this.fetchIndicadorMeses();
  }

  fetchIndicador() {
    console.log('--->fetchIndicador<---');
    this.error = null;
    this.indicadoresService.getAllIndicadores()
      .subscribe(indicadores => {
        this.indicadores = indicadores.body;
      },
      error => {
        this.error = JSON.parse(error.error);
      });
  }

  fetchIndicadorMeses() {
    console.log('--->fetchIndicadorMeses<---');
    this.indicadoresService.getAllAvance()
      .subscribe(indicadores => {
        console.log('--->Sin error fetchIndicadorMeses<---');
        const mesesvalCal = [];
        const mesesvalIng = [];
        const mesesvalPpto = [];
        const mesesvalEje = [];

        const mesesvalCalAc = [];
        const mesesvalIngAc = [];
        const mesesvalPptoAc = [];
        const mesesvalEjeAc = [];

        let valCalAc = 0;
        let valIngAc = 0;
        let valPptoAc = 0;
        let valEjeAc = 0;
        console.log('***************');
        console.log(indicadores);
        this.indicadoresAvance = indicadores.body;

        this.indicadoresAvance.forEach(indicador => {
          switch (indicador.p_tipo) {
            case 'calendario':
              mesesvalCal.push(parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, '')));
              valCalAc += parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, ''))
              mesesvalCalAc.push(valCalAc);
              break;
            case 'ingresos':
              mesesvalIng.push(parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, '')));
              valIngAc += parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, ''))
              mesesvalIngAc.push(valIngAc);
              break;
            case 'presupuesto':
              mesesvalPpto.push(parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, '')));
              valPptoAc += parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, ''))
              mesesvalPptoAc.push(valPptoAc);
              break;
            case 'ejercido':
              mesesvalEje.push(parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, '')));
              valEjeAc += parseFloat(indicador.p_importe.replace(/[^0-9\.]+/g, ''))
              mesesvalEjeAc.push(valEjeAc);
              break;
          }
        });

        chartPresupuesto(mesesvalCal, 'card-chart1', 'Ppto calendario', 'line');
        chartPresupuesto(mesesvalIng, 'card-chart2', 'Ppto ingresos', 'line');
        chartPresupuesto(mesesvalPpto, 'card-chart3', 'Ppto proyectado', 'line');
        chartPresupuesto(mesesvalEje, 'card-chart4', 'Ppto ejercido', 'line');

        chartBarras(mesesvalCal,
          mesesvalIng,
          'Ppto calendarizado',
          'Ministraciones presupuesto',
          'rgba(50,31,219,1)',
          'rgba(46,184,92,1)',
          'canvas-1',
          'bar',
          false);
        chartBarras(mesesvalPpto,
          mesesvalEje,
          'Ppto proyectado',
          'Ppto ejercido',
          'rgba(50,31,219,1)',
          'rgba(229,83,83,1)',
          'canvas-2',
          'bar',
          false);
        // SEGUNDA FILA
        chartBarras(mesesvalCalAc,
          mesesvalIngAc,
          'Ppto calendarizado',
          'Ministraciones presupuesto',
          'rgba(50,31,219,1)',
          'rgba(46,184,92,1)',
          'canvas-3',
          'bar',
          false);
        chartBarras(mesesvalPptoAc,
          mesesvalEjeAc,
          'Ppto proyectado real',
          'Ppto ejercido',
          'rgba(50,31,219,1)',
          'rgba(229,83,83,1)',
          'canvas-4',
          'bar',
          false);

      },
      error => {
        this.error = JSON.parse(error.error);
      });
  }

}


function chartPresupuesto(mesesval, chart, title, tipo) {
  const cardChart = new Chart(document.getElementById(chart), {
    type: tipo,
    data: {
      labels: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
      datasets: [
        {
          label: `${title}`,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255,255,255,.55)',
          data: mesesval
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent'
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: 5,
            max: 400
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    }
  })
}


function chartBarras(mesesval1, mesesval2, serie1, serie2, bgcolor1, bgcolor2, chart, tipo, apilado) {

  const barChart = new Chart(document.getElementById(chart), {
    type: tipo,
    data: {
      labels: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."],
      datasets: [
        {
          label: serie1,
          backgroundColor: bgcolor1,
          borderColor: 'rgba(220, 220, 220, 0.8)',
          highlightFill: 'rgba(220, 220, 220, 0.75)',
          highlightStroke: 'rgba(220, 220, 220, 1)',
          data: mesesval1
        },
        {
          label: serie2,
          backgroundColor: bgcolor2,
          borderColor: 'rgba(151, 187, 205, 0.8)',
          highlightFill: 'rgba(151, 187, 205, 0.75)',
          highlightStroke: 'rgba(151, 187, 205, 1)',
          data: mesesval2
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{ stacked: apilado }],
        yAxes: [{ stacked: apilado }]
      }
    }
  });
  barChart;
}
