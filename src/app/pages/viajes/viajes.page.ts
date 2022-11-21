import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  data: Viaje = {
    cantidad: null,
    precio: null,
    id: null,
    horario: null,
  }

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              private storage: AngularFireStorage) { }

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

  //async newImageUpload(event: any){

    //const path = 'Viajes';
    //const name = 'prueba';
    //const file = event.target.files[0];
    //const res = await this.firedtorage .uploadImage(file, path, name);
    //console.log('recibi res de  la promesa ', res);

    //console.log('fin de la funcion -> newImageUpload ');
  //}

}
