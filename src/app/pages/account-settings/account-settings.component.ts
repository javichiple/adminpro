import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  
  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  /*en el parametro "tema" recibe el nombre del nuevo theme seleccionado, y en el "link" devuelve el elemento HTML del color seleccionado*/
  cambiarColor( tema:string, link: any) {
    
    this.aplicarCheck(link);

    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any){

      //La Clase 'working' es la clase que se agrega un check de seleccionado al color elegido

      //Creamos la variable selectores y la igualamos a todos los elementos que use el class="selector" del HTML      
      let selectores:any = document.getElementsByClassName('selector');
      
      for( let ref of selectores){
        //recorremos el arreglo selectores y le eliminamos la clase 'working' a todos
        ref.classList.remove('working');
      }
      //Le agregamos la clase 'working' al elemento seleccionado
      link.classList.add('working');

  }

  colocarCheck(){

    //Creamos la variable selectores y la igualamos a todos los elementos que use el class="selector" del HTML      
    let selectores:any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for( let ref of selectores){
      if (ref.getAttribute('data-theme') === tema)
      ref.classList.add('working');
      break;
    }

  }

}
