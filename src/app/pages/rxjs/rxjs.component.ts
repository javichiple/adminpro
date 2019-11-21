import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

    //Con "this.subscription = this....", hacemos una referencia al observable para poder destruirlo en el onDestroy

    this.subscription = this.regresaObservable().pipe(
      //El pipe retry() lo que hace es reintentar el observador x veces, el valor que esta dentro de los parentesis es la cantidad de veces que se va a reintentar, sino tiene nada es infinito
      retry(2) 
    )

    //Nos subcribimos al Observable para recibir su valor
    .subscribe(
      numero => console.log('Subs', numero), //aca se recibe cuando se llama un next()
      error => console.error('Error en el obs', error), //Cuando se recibe el error
      () => console.log('El observador termino') //Cuando finaliza el observador
    );

  }

  ngOnInit() {
  }

  //El ngOnDestroy se activa al momento de salir de la pagina
  ngOnDestroy(){
    console.log("La pagina se va a cerrar");
    //Destruimos la subscripcion
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        //Con next() estamos notificando al codigo cada ves que llegue info
        observer.next(salida); 

        //Cuando llegue a 3 el contador, detenemos el intervalo
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   //Informamos que el observador se completo
        //   observer.complete();
        // } 

        // if (contador === 2){
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!!');
        // }


      }, 1000);


    }).pipe(
      //recibo la respuesta en bruto en "resp"
      map(resp => {
          return resp.valor; //Retornamos el objeto "valor" de la salida 
      }), 
      //el filter recibe un valor que es la respuesta y un index que es el numero de veces que se llamo el filter
      filter( (valor, index) => {
        // console.log('Filter', valor, index);

        if((valor % 2)===1){ //Si la divicion es igual a 1, no se muestra, en este ejemplo el 2 no se muestra
          //impar
          return true;
        } else{
          //par
          return false;
        }

        // return true;
      })
      );
    // return obs;
  }

}
