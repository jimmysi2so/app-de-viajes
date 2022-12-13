import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService,
              private alertController: AlertController,
              private interactionService: InteractionService) {}

  uid: string = null;
  info: Usuario = null;

  async ngOnInit() {
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

  //////////////////////////////////////editar contraceña
  async editAtributo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar ' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu' + name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Confirm Ok -> ', ev);
            this.saveAtributo(name, ev[name])
          }
        }
      ]
    });

    await alert.present();
  }

  async saveAtributo(name: string, input: any) {
    await this.interactionService.presentLoading('actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
    };
    updateDoc[name] = input;
    this.firestoreService.updateDoc(path, id, updateDoc).then(res => {
    this.interactionService.presentToast('contraceña actualizada')
    this.interactionService.closeLoading();
    })
  }
  //////////////////////////////////////editar contraceña
    
}
