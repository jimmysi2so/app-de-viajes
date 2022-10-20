import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  credenciales = {
    correo: null,
    password: null
  }

  constructor(private auth: AuthService, 
              private interaction: InteractionService,
              private router: Router) { }

  ngOnInit() {
  }

  async login() {
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales)
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch( error => {
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario o Contraceña erroneo')
    })
    if (res){
      console.log('res -> ', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Ingresado con exito')
      this.router.navigate(['/home'])
    }
  }

}
