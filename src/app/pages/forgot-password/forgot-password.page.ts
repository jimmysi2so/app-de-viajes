import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers: [AuthService],
})
export class ForgotPasswordPage implements OnInit {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router : Router) { }

  ngOnInit() {
  }

  async onReset(){
    try{
      const email = this.userEmail.value;
      this.authSvc.resetPassword(email);
      //mensaje
      window.alert('Correo de recuperacion enviado!!!');
      //se redirige al login
      this.router.navigate(['/login']);
    }
    catch(error){console.log(error)};
    
  }
}
