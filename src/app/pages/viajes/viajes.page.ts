import { Component, OnInit } from '@angular/core';
import { Usuario, Viaje } from 'src/app/models/models';
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


  isInputDisabled: boolean = false;

  isButtonDisabled: boolean = false;

  // cambia el estado del botón cuando se haga clic en otro botón
  toggleButton() {
    this.isButtonDisabled = true;
  }

  contactForm!: FormGroup;

  data: Viaje = {
    nconductor: null,
    cantidad: null,
    precio: null,
    id: null,
    fecha: null,
    hora: null,
  }

  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              private storage: AngularFireStorage,
              private readonly fb: FormBuilder,
              private firestoreService: FirestoreService) { }


  uid: string = null;
  info: Usuario = null;
  ///info usuario
  async ngOnInit() {
    this.contactForm = this.initForm();
    console.log('Aloha');
    this.getUid();
    this.authService.stateUser().subscribe( res => {
      console.log('en perfil estado de autenticacion -> ', res);
      this.getUid();
    });
    this.getUid();
    
  }
  
  async getUid() {
    const uid = await this.authService.getUid()
    if (uid) {
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser();
    }else{
      console.log('no existe uid');
    }

  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;  
    this.firestoreService.getDoc<Usuario>(path, id).subscribe( res => {
      if (res) {
        this.info = res;
      }
      console.log('datos son -> ', res);
    })
  }
  ///info usuario
  
  //boton
  toggleInput() {
    this.isInputDisabled = true;
  }
  //boton
  onSubmit() {
    console.log('Form ->');
  }
  
  initForm() : FormGroup {
    return this.fb.group({
      nconductor: ['', [Validators.required]],
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