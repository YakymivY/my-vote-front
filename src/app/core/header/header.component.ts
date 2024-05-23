import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  logged: boolean = false;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  logout(): void {
    sessionStorage.removeItem("token");
    this.logged = false;
    this.cdr.detectChanges();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
