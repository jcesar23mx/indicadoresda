import { Component, OnInit } from '@angular/core';
import { core } from '@angular/compiler';
import { Router } from '@angular/router';

import { EmpleadosService } from '../core/services/empleados/empleados.service';
import { HorariosService } from '../core/services/horarios/horario.service';
import { EstudiosService } from '../core/services/estudios/estudio.service';

import { Empleado } from '../core/services/empleados/empleado.model';
import { Horario } from '../core/services/horarios/horario.model';
import { Estudio } from '../core/services/estudios/estudio.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})

export class PersonalComponent implements OnInit {

  empleados: Empleado[] = [];
  empleado: Empleado[] = [];
  horario: Horario[] = [];
  estudio: Estudio[] = [];

  public nombre: string;
  public numemp: string;
  public totmensual: number;
  public totmensualBruto: number;
  public totalhoras: number;
  public docente: boolean;
  constructor( 
    private empleadosService: EmpleadosService,
    private horarioService: HorariosService,
    private estudiosService: EstudiosService,
    private router: Router
   ) { }



  ngOnInit(): void {
    this.fetchEmpleados();

  }

  fetchEmpleados(){
    this.empleadosService.getAllEmpleados()
    .subscribe(empleados => {
      console.log('fetchEmpleados-->');
      this.empleados = empleados.body;
      console.log( this.empleados );
    });
  }

  fetchEmpleado(numemp: string){
    console.log("empleado-->");
    console.log(numemp);
    this.empleadosService.getEmpleado(numemp)
    .subscribe(empleado => {
        console.log('fetchEmpleado');
        const myDetails = new coreui.Modal(document.getElementById('vCard'));
        this.empleado = empleado.body;

        console.log(empleado.body);
        console.log(this.empleado);
        const totmensualneto = parseFloat(this.empleado[0].totmensualneto.replace(/[^0-9\.]+/g, ''));
        const compensacion =  parseFloat(this.empleado[0].compensacion.replace(/[^0-9\.]+/g, ''));
        // tslint:disable-next-line: max-line-length
        this.totmensual = totmensualneto + compensacion;
        // tslint:disable-next-line: max-line-length
        const totmensualb = parseFloat(this.empleado[0].totmenbruto.replace(/[^0-9\.]+/g, ''));
        this.totmensualBruto =  totmensualb + compensacion;
        myDetails.show();
    });
  }

  fetchEmpleadoBusqueda(){
    const nomemp = ((document.getElementById("nombreempleado") as HTMLInputElement).value).toUpperCase();
    console.log(`EmpleadosBusqueda--> ${nomemp}`);
    this.empleadosService.getEmpleado(nomemp)
    .subscribe(empleados => {
      console.log(empleados);
      this.empleados = empleados.body;
    });
  }

  fetchHorariosEmpleado(numemp: string, nombre: string){
    this.nombre = nombre;
    this.numemp = numemp;
    this.horarioService.getHorario(numemp)
    .subscribe(horario => {
      const mySchedule = new coreui.Modal(document.getElementById('vCardSchedule'));
      this.horario  = horario.body;
      //console.log(numemp);
      console.log(this.horario);
        // tslint:disable-next-line: radix
      this.totalhoras = this.horario[0].totalhoras;
      //console.log(this.totalhoras);
      mySchedule.show();
    });
  }

  fetchEstudioEmpleado(numemp: string, nombre: string) {
    this.nombre = nombre;
    this.numemp = numemp;
    this.estudiosService.getEstudio(numemp)
    .subscribe( estudio => {
      const myStudies = new coreui.Modal(document.getElementById('vCardStudies'));
      this.estudio = estudio.body;
      console.log(this.estudio);
      myStudies.show();
    } );
  }

  // ACTUALIZACIONES
  updateEmpleado(empleado: Empleado) {
    const empUpdate: Partial<Empleado> = {
      verificado: 1,
      observaciones: 'Obs' //empleado.observaciones
    };
    console.log(empUpdate);
    this.empleadosService.updateEmpleado(empleado.numemp, empUpdate)
    .subscribe( empleado => {
        console.log(empleado);
    } );

    this.removeEmpleado(empleado.numemp);
  }

  // OTRAS FUNCIONES //
  removeEmpleado(numemp) {
    console.log('Verificado');
    for(let i = 0; i < this.empleados.length; ++i){
      if (this.empleados[i].numemp === numemp) {
          this.empleados.splice(i,1);
      }
    }
  }

  removeHorario(idHora) {
    console.log(`Verificado $(idHora)`);
    console.log(idHora);
    console.log(this.horario);
    for(let i = 0; i < this.horario.length; ++i){
      if (this.horario[i].idhora === idHora) {
          this.horario.splice(i,1);
      }
    }
  }
}
