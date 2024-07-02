import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,ReactiveFormsModule,  HttpClientModule],
  providers:[CompanyService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
