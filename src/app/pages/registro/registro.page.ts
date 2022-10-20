import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: Usuario = {
    nombre: null,
    apellido: null,
    password: null,
    correo: null,
    uid: null,
    perfil: null,
  } 

  constructor(private auth: AuthService, 
              private interaction: InteractionService,
              private firestore: FirestoreService,
              private router: Router) { }

  ngOnInit() {
  }

  async registrar() {
    this.interaction.presentLoading('cargando...')
    console.log('datos -> ', this.datos)
    const res = await this.auth.registrarUsuario(this.datos).catch( error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Algo salio mal..')
      console.log('error');
    })
    if (res) {
      console.log('exito al crear usuario');
      const  path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.firestore.createDoc(this.datos, path, id)
      this.interaction.closeLoading();
      this.interaction.presentToast('exito al crear usuario')
      this.router.navigate(['/login'])
    }
  }

}
