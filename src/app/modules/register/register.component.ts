import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formName: string = '';
  formLogin: string = '';
  formPassword: string = '';

  constructor(private http: HttpClient, private service: SharedService, private router: Router) { }

  onSubmit(): void {
    try {
      this.http.post<any>('https://my-vote-6-5.onrender.com/auth/register', { name: this.formName, login: this.formLogin, password: this.formPassword }).subscribe(
        (response) => {
          this.service.triggerShowAlert("User successfully registered!")
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1000);
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
