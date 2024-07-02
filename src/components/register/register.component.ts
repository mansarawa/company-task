
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, CommonModule, HttpClientModule,LoginComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  adminRegister: FormGroup;
  managerRegister:FormGroup;
  userRegister:FormGroup;
  company:string='company'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.adminRegister = this.fb.group({
      adminname: ['', Validators.required],
      companyname: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.managerRegister = this.fb.group({
      name: ['', Validators.required],
      userId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.userRegister = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      managerId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  adminSubmit() {
    if (this.adminRegister.valid) {
      console.log("first")
      this.companyService.createAdmin(this.adminRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('admin',JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['company'])
          this.adminRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  managerSubmit() {
   
    if (this.managerRegister.valid) {
console.log("first")
      this.companyService.createManager(this.managerRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('admin',JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['company'])
          this.managerRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  userSubmit() {
    if (this.userRegister.valid) {
      this.companyService.createUser(this.userRegister.value).subscribe(
        response => {
          console.log('Form Submitted', response);
          localStorage.setItem('admin',JSON.stringify(response.data))
          console.log(response.data)
          this.router.navigate(['company'])
          this.userRegister.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      this.name = name !== null ? name : '';
    });
  }
 
}
