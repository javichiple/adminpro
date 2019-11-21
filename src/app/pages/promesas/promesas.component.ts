import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {



   
    this.contarTres().then(
      //Si sale todo bien, dentro de mensaje se guarda el 'OK!' que se envia en el resolve
      mensaje => console.log('Termino!', mensaje)
      )
      //Si se produce un error
      .catch( error =>console.error('Error en la promesa', error));

   }

  

  ngOnInit() {
  }

  contarTres():Promise<boolean> {

     //Toda promesa recibe una resolucion y un rechazo
     return new Promise((resolve, reject) => {
        
      let contador =0;

      //metemos el contador dentro de una variable para poder deternerla
      let intervalo = setInterval(() => { //Suma 1 a cada segundo
        contador += 1;
        console.log(contador);
        
        if(contador === 3){ //a los 3 segundos llama a la funcion resolve()
          resolve(true);
          // reject('Simplemente un error');
          
          //Limpiamos el intervalo para deternerlo
          clearInterval(intervalo);
        }
        
      },1000);
    });



  }

}
