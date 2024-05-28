import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: string = '';
  formPassword: string = '';

  constructor(private http: HttpClient, private router: Router, private service: SharedService) { }

  onSubmit(): void {
    try {
      this.http.post('https://my-vote-6-6.onrender.com/auth/login', { login: this.formLogin, password: this.formPassword }).subscribe(
        (response: any) => {
          sessionStorage.setItem('token', response.token);
          setTimeout(() => { this.router.navigate([response.redirect]) });
        },
        (error) => {
          this.service.triggerShowAlert('Something went wrong');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

}
