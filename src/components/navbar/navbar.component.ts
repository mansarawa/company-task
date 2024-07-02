import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,LoginComponent,RegisterComponent,HomeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('admin') !== null || localStorage.getItem('manager') !== null ||localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('admin');
    localStorage.removeItem('manager');
    localStorage.removeItem('user');
    this.router.navigate(['/']); 
  }
  whoIn(): void {
    if (localStorage.getItem('admin')) {
     localStorage.removeItem('manager');
     localStorage.removeItem('user')
    } else if (localStorage.getItem('manager')) {
      localStorage.removeItem('admin');
      localStorage.removeItem('user')
    } else if (localStorage.getItem('user')) {
      localStorage.removeItem('manager');
      localStorage.removeItem('admin')
    } else {
      
      console.log('No valid user found in localStorage');
    }
  }
}
