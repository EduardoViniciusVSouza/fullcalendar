import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../interfaces/RegisterForms'
import { loginForm } from '../interfaces/LoginForms'

import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isLoggedIn = false;
  genderList: string[] = ["Homem", "Mulher", "Outro"];
  genderView: string

  // form com dados que o usuário botar, utiliza ngModel no html
  registerForm: RegisterForm = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confpassword: '',
    birth: null,
    gender: '',
  }

  // form com dados de login, utiliza ngModel no html
  loginForm: loginForm = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  eventSelection(event) {
    this.registerForm.birth = event
  }

  // é chamado quando o usuário clica em registrar-se, utiliza o authservice para realizar o post
  registerPost(): void {
    if (this.registerForm.password === this.registerForm.confpassword) {
      this.authService.register(this.registerForm.name, this.registerForm.email, this.registerForm.password)
        .subscribe()
        
    }
  }


  // é chamado quando o usuário clica em realizar login, utiliza o authService para realizar o post,
  // quando os dados são autenticados no servidor, salva-se o token na memória local,
  // para ser enviado posteriormente
  loginPost(): void {
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe(
      (res) => {
        if (res['token']) {
          localStorage.setItem('token', res['token'])
          this.router.navigate(['calendar'])
        }
      },
      err => { console.log(err) }
    )
  }

  reloadPage(): void {
    window.location.reload()
  }

}
