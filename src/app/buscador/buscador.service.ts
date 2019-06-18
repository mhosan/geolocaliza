import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBuscador } from './buscador.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private http: HttpClient) { }

  getData(clave: string){
    const url: string = "http://geo.test.arba.gov.ar:8080/buscadorGeneral/getQuery/" + clave;
    return this.http.get<IBuscador[]>(url);
  }

}
