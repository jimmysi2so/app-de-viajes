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
  filterTerm: string="0";

  constructor(private database: FirestoreService) { 
    
  }

  ngOnInit() {
    
    this.getViajes();
    
  }

  getViajes() {
    this.database.getCollection<Viaje>('Viajes').subscribe( res => {
      
      this.viajes = res;
      
    })
  }

  OnClear(){
    this.filterTerm="";
  }
  

}

