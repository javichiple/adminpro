import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: "assets/css/colors/default.css",
    tema: 'default'
  };

  //Con la injeccion de @Inject(DOCUMENT) private _document en el constructor no da acceso a todo el DOM, y asi podemos modificar theme del archivo index
  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes () {
    // console.log("Guardado en el LocalStorage");

    /*Como en el Localstorage solo se permiten guardar string, y "ajustes" es un objeto, se pasa el objeto ajustes por el
    JSON.stringify para que lo convierta en un string y asi puede ser guardado en el localstorage*/
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes () {
    /*Si hay informacion guardada en el localstorage */
    if(localStorage.getItem('ajustes')) {

      //guardamos la info del localstorage en la variable ajustes, con JSON.parse la volvemos a convertir en un objeto
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log("Cargando del Localstorage");

      this.aplicarTema(this.ajustes.tema);

    } else {
      // console.log("Usando valores por defecto");
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string){
      /*Creamos una variable con la URL obtenida del Index y le agregamos que sea variable el nombre del archivo*/
    let url=`assets/css/colors/${ tema }.css`;
    
    /*Le mandamos el elemento id="tema" (que esta en el index.html) la nueva URL para el atributo "href" */ 
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaURL = url;

    this.guardarAjustes();
  }
}


interface Ajustes {
  temaURL: string;
  tema: string;
}