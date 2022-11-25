import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  [x: string]: any;

  contactForm!: FormGroup;

  data: Viaje = {
    cantidad: null,
    precio: null,
    id: null,
    fecha: null,
    hora: null,
  }

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              private storage: AngularFireStorage,
              private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.initForm();
  }

  onSubmit() {
    console.log('Form ->');
  }
  
  initForm() : FormGroup {
    return this.fb.group({
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]]
    })
  }

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

  updateDate(horario) {
    this.horario = this.firebaseService.formatDate(horario);
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
