import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,RegisterComponent,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   company:string="company";
   user:string="user";
   manager:string="manager";
  constructor(private router:Router){}
  navigateToRegister(){
    this.router.navigate(['register'])
  }
  navigateToURegister(){
    this.router.navigate(['uregister'])
  }
}
