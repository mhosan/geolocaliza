import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuscadorService} from '../buscador.service';
import { IBuscador } from '../buscador.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  @Output() miEvento = new EventEmitter<string>();
  public respuestas: IBuscador[];
  vaciar: boolean;
  public contenido = "";
  public valorTexto = '';
  public contador: number = 0;
  vectorBusquedas: string[] = [];
  vectorBusquedasGuardadas: IBuscador[] = [];
  public linkError: string='';    
  public show: boolean = false;
  public errorDescrip: string = '';
  public error: boolean = false;
  

  constructor(private buscadorService: BuscadorService) { 
  }
  ngOnInit() {   
  }
  recargar() {
    location.reload();
  }
  /*============================================================================*/
  private handleError(error: HttpErrorResponse) {
  /*============================================================================*/  
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorDescrip= "Error Client-side o de red." + error.error.message;
      console.error('An error occurred:', error.error.message);
      this.errorDescrip="";
      this.show = true;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //alert('Error de certificado en: \n' + error.error.srcElement["__zone_symbol__xhrURL"]);
      this.linkError = error.error.srcElement["__zone_symbol__xhrURL"];
      this.errorDescrip="Error en el servidor.";
      this.show = true;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}, ` +
        `url: ${error.error.srcElement["__zone_symbol__xhrURL"]}`
        );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /*============================================================================*/
  tecla(event: any) {
  /*============================================================================*/
    this.contenido = event.target.value;                  // el texto ingresado
    if (this.contenido === "") {
      this.vaciar = true;
      this.respuestas = [];
    } else {
      this.vaciar = false;
      this.show = false;
      console.log("A buscar: " + this.contenido);         
      this.buscadorService.getData(this.contenido)        // llamar al servicio pasandole como param el texto ingresado y subscribirse a la respuesta
        .subscribe(salida => {                            // la respuesta viene en el parametro "salida" 
          console.log("el servicio respondió: " , salida);
          this.respuestas = salida;                       // guardar LAS respuestaS (los json's) en el vector "respuestas" y mostrar en la vista en una 
        },
        error => {
          this.error = error;
          // console.log("Error: ", this.error);
          this.handleError(error);
        });                                               // lista desplegable
    }
  }
  /*============================================================================*/
  atajarListaBuscar(event: any){
  /*============================================================================*/
    const textoSeleccionado = event.currentTarget.childNodes[0].data;
    const spliteado = textoSeleccionado.split(":");
    const spliteadoSinEspacios = spliteado[1].trim();     // extraer solo el NOMBRE de la selección del usuario de la lista desplegable
    let geometria: string = "";
    for (let elemento of this.respuestas){                //en el vector "respuestas" esta el json completo devuelto por el servicio
      if(elemento.nombre==spliteadoSinEspacios){          //buscar en el vector "respuestas" la seleccionada por el usuario
        geometria = elemento.geometry;
        // console.log("Tipo: ", elemento.categoria, ", Nombre:", elemento.nombre, ", SRC: ", elemento.epsg, ", Origen:", elemento.origin, ", Geometria: ", geometria);
        this.miEvento.emit(geometria);
        this.respuestas = [];
        this.valorTexto = '';
        this.contador = this.contador + 1;
        this.vectorBusquedas.push(elemento.categoria + ": " + elemento.nombre);   //ojo, en este vector se guarda solo el string seleccionado de la lista desplegable
        let unaRespuesta: IBuscador = { 
          epsg: elemento.epsg, 
          categoria: elemento.categoria, 
          origin: elemento.origin, 
          geometry: elemento.geometry,
          nombre: elemento.nombre
        };
        this.vectorBusquedasGuardadas.push(unaRespuesta);                         //en este vector se guarda el json de la respuesta seleccionada y mostrada en el mapa 
        console.log(this.vectorBusquedasGuardadas);
      }
    }
  }
  /*============================================================================*/
  busquedasGuardadas(event: any){
  /*============================================================================*/
    const textoSeleccionado = event.currentTarget.childNodes[0].data;
    const spliteado = textoSeleccionado.split(":");
    const nombreBusquedaGuardada = spliteado[1].trim();
    let geometria: string = "";
    for (let ocurrencia of this.vectorBusquedasGuardadas){
      if (ocurrencia.nombre==nombreBusquedaGuardada){
        geometria = ocurrencia.geometry;
        this.miEvento.emit(geometria);
      }
    }

  }
}
 