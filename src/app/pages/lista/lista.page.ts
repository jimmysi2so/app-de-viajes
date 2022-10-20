import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/models';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  viajes: Viaje[] = [];   

  constructor(private database: FirestoreService) { 
    
  }

  ngOnInit() {
    console.log('HOLA YA SE CREO LA VISTA');
    this.getViajes();
  }

  getViajes() {
    this.database.getCollection<Viaje>('Viajes').subscribe( res => {
      console.log('esta es la lectura', res);
      this.viajes = res;
    })
  }

  

}

