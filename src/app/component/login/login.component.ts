import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef; // Utilizamos '!' para indicar que estará definido
  constructor(private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  username: string = ""
  password: string = ""
  mensaje: string = ""

  ngOnInit(): void {}

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      this.router.navigate(['components/home']);
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });
  }

  toggleContainer(active: boolean) {
    if (active) {
      this.container.nativeElement.classList.add('active');
    } else {
      this.container.nativeElement.classList.remove('active');
    }
  }
}
