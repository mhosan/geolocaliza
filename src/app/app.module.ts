import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';

import { MapaComponent } from './mapa/mapa.component';
import { BarraNavegacionComponent } from './buscador/barra-navegacion/barra-navegacion.component';
import { BuscadorService } from './buscador/buscador.service';
import { GeolocaService } from './geoloca/geoloca.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UsaApiComponent } from './geoloca/usa-api/usa-api.component';
import { WebappComponent } from './webapp/webapp.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    MapaComponent,
    UsaApiComponent,
    WebappComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    BuscadorService,
    GeolocaService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
