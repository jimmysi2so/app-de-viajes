import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {

  data: Viaje = {
    cantidad: null,
    precio: null,
    id: null,
    horario: null,
  }

  constructor(private database: FirestoreService,
              private interaction: InteractionService) { }

  ngOnInit() {}

  crearNuevoViaje() {
    this.interaction.presentLoading('Guardando...')
    
    const path = 'Viajes'; 
    const id = this.database.getId();
    this.data.id = id;
    this.database.createDoc(this.data, path, id).then(() => {
      console.log('ola')
      this.interaction.closeLoading();
      this.interaction.presentToast('Guardado con exito')
    })
  }

}
