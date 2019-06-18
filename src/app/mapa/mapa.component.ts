import { Component, OnInit, Input } from '@angular/core';
import { LatitudLongitud } from './latlon.interface';

declare let L;
let miMapa;
declare let contextmenu;
declare let require: any;
let omnivore = require('@mapbox/leaflet-omnivore');

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public miCapa: any;

  constructor() { }

  ngOnInit() {
        const osm1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: 'mapbox.streets'});
        const openmap = L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
          attribution: 'terms and feedback'
        });
        const osm2 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20});
        const googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        detectRetina: true
        });
        const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        detectRetina: true
        });
        
        miMapa = L.map('map', {
          contextmenu: true,
          contextmenuWidth: 180,
          contextmenuItems: [
          {
            text: 'Ver las coordenadas',
            callback: this.verCoordenadas,
            icon: 'assets/images/coordenadas.png'
          }, {
            text: 'Centrar aqui',
            callback: this.centrarMapa,
            icon: 'assets/images/banderita.png'
          }, '-',
            {
            text: 'Acercar',
            callback: this.acercar,
            icon: 'assets/images/zoom-in.png'
          }, {
            text: 'Alejar',
            callback: this.alejar,
            icon: 'assets/images/zoom-out.png'
          }],
          center: [-34.921136, -57.954712],
          zoom: 13,
          zoomControl: false,
          maxZoom: 20
        }).addLayer(googleHybrid);
        L.control.scale().addTo(miMapa);
      const baseMaps = {
          /*"Google Hibrido": googleHibrido,
          "Google Callejero": googleCallejero,
          "Google Fisico": googleTerrain,
          "Google Satelital": googleSatelite, */
          "Open Street Map": osm2,
          "Mapbox": osm1,
          "ArcGis OnLine": openmap,
          "Google callejero ": googleMaps,
          "Google hibrido": googleHybrid
      };
      var overlayMaps = {
          //"Capa Cursos": capaCursos
          //"Industrias cuenca Riachuelo": layerJson,
          //"Centros y Organizaciones Sociales": layerJsonCtos,
          //"Centros educativos Pcia.Bs.As.":  layerEducacionJson,
          //"Escuelas": layerEscuelasJson,
          //"FFCC (Ign, cortesia @FerroviarioK)": layerFFCC
          //"FFCC versi�n @FerroviarioK": layerFFCCFerroviariok,
          //"FFCC marcadores": layerFFCCFerroviariokMarcadores
          //"Centros educativos Pcia. Bs.As.": layerJsonEdu
      };
      const controlLayers = L.control.layers(baseMaps, overlayMaps, {
          //position: 'bottomright',
      }).addTo(miMapa);


        /*let marcador = L.marker([ -34.921136, -57.954712 ], {
          icon: L.icon({
            iconSize: [ 40, 31 ],
            iconAnchor: [ 19, 31 ],
            iconUrl: 'assets/images/marker-green.png'
            // shadowUrl: 'assets/images/marcador01.png'
          })
        }).addTo(miMapa);*/
        // miMapa.on('click', this.onMapClick)
  }

  //=====================================================================================
  verCoordenadas (e) {
  //=====================================================================================
    const popupCoordenadas = L.popup();
    popupCoordenadas
      .setLatLng(e.latlng)
      .setContent('Coordenadas: ' + e.latlng)
      .openOn(miMapa);
  }

  //=====================================================================================
  centrarMapa (e) {
  //=====================================================================================
    miMapa.panTo(e.latlng);
  }

  //=====================================================================================
  acercar(e) {
  //=====================================================================================
    miMapa.zoomIn();
  }

  //=====================================================================================
  alejar(e) {
  //=====================================================================================
    miMapa.zoomOut();
  }

  //=====================================================================================
  agregarCapa(elWktParaAgregar: string): void {
  //=====================================================================================    
    if (miMapa.hasLayer(this.miCapa)) {
      miMapa.removeLayer(this.miCapa);
    }
    this.miCapa = L.geoJson(null, {
        style: function(feature) {
          //switch (feature.type) {
            // case 'MultiPolygon': return { color: '#ff0000', "weight": 8, "opacity": 0.45 };
            // case 'MultiLineString': return { color: '#00ff00', "weight": 10, "opacity": 0.45 };
            // case 'MultiPolygon': return { color: '#ff0000'};
            // case 'MultiLineString': return { color: '#00ff00'};
          //}
          return { color: '#ff0000', "weight": 8, "opacity": 0.45 };
        },
        onEachFeature: function(feature, layer){
          var popupContent = "<p>La geometría utilizada es del tipo: " +
            feature.type + "</p>";
          layer.bindPopup(popupContent);
        }
      });
      omnivore.wkt.parse(elWktParaAgregar, null, this.miCapa).addTo(miMapa);
      miMapa.fitBounds(this.miCapa.getBounds());
  }

  //=====================================================================================
  ponerMarcador(objetoLatLong : LatitudLongitud){
  //=====================================================================================  
    // alert("Estoy en el mapa, lat: " + objetoLatLong.lat + ", long: " + objetoLatLong.lon + ", texto: " + objetoLatLong.texto);
    let lasCoords = [];
    lasCoords[0] = objetoLatLong.lat;
    lasCoords[1] = objetoLatLong.lon;
    miMapa.setView(lasCoords, 17);

    let marca = L.marker(lasCoords, {
      icon: L.icon({
      iconSize: [ 35, 40 ],
      iconAnchor: [ 20, 40 ],
      // iconUrl: 'assets/images/marker-green.png'
      //iconUrl: 'assets/images/marker-end-icon.png'
      //iconUrl: 'assets/images/banderita.png'
      iconUrl: 'assets/images/location.png'
      //iconUrl: 'assets/images/m.png'
      //shadowUrl: 'assets/images/marcador01.png'
       })
    }).addTo(miMapa);

    const miPopup = L.popup({offset: L.point(-3 , -33)});
    miPopup.setContent("<h5><b>Ubicaci&oacute;n:</b></h5>"
      + "<hr>"
      + "<h6><p>" + objetoLatLong.texto + "</p></h6>"
      );
    miPopup.setLatLng(lasCoords);
    miPopup.openOn(miMapa);

    marca.bindPopup(miPopup);
  }
  
}
