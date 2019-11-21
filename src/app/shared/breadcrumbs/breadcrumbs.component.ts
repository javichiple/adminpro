import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private router: Router,
              private title: Title, 
              private meta: Meta) {
   
    this.getDataRoute()
    .subscribe(data => {
      console.log(data);
      this.titulo = data.titulo;
      //Cambiamos el nombre del Titulo de la Pestaña en el navegador
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
      
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });

   }

  ngOnInit() {
  }

  getDataRoute () {
    
     //Cuando utilizamos el this.router.events, cuando ingresamos a la pantalla se activan eventos como ActivationEnd, ChildActivationEnd, Scroll, NavigationEnd, etc
    return this.router.events.pipe( //Retornamos un observable
      //Si es una instancia de ActivacionEnd lo va a dejar pasar
      filter(evento => evento instanceof ActivationEnd ),
      //Filtramos por el ActivationEnd que tenga el firstChild igual a null
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      //De todo lo que devuelve el ActivationEnd, con el map filtramos para que solo devuelva el valor de snapshot.data
      map((evento:ActivationEnd) => evento.snapshot.data)
      
    );
  }

}
