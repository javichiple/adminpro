import { Component, OnInit } from '@angular/core';

/*Aca le decimos que inicie los plugins que estan inicializados en el index, esto es para que 
los plugins se inicialicen siempre
Es para llamar cualquier script que se encuentr fuera de angular en un archivo de javascript

Si esta declaracion no esta, cuando presionamos el boton ingresar en el Login y nos redireccionamos al dashboard,
en el dashboard no funcionan los items del sidebar*/
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
