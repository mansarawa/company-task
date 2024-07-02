import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RegisterComponent,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  name: string='';
  adminForm:FormGroup;
  managerForm:FormGroup;
  userForm:FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute,private companyService:CompanyService){
    this.adminForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    this.managerForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    this.userForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  adminSubmit(){
    if(this.adminForm.valid)
      {
        console.log('Form Value:', this.adminForm.value);
        this.companyService.lAdmin(this.adminForm.value).subscribe(response=>{
          console.log("data submit",response)
          localStorage.setItem('admin',JSON.stringify(response.admin))
          this.router.navigate(['company']);

        })
      }
  }
  managerSubmit(){
    if(this.managerForm.valid)
      {
        this.companyService.lManager(this.managerForm.value).subscribe(response=>{
          console.log("data submit",response)
          localStorage.setItem('manager',JSON.stringify(response.manager))
          this.router.navigate(['commonview'], { queryParams: { type: 'manager' } });
        })
      }
  }
  userSubmit(){
    if(this.userForm.valid)
      {
        this.companyService.lUser(this.userForm.value).subscribe(response=>{
          console.log("data submit",response)
          localStorage.setItem('user',JSON.stringify(response.user))
          this.router.navigate(['commonview'], { queryParams: { type: 'user' } });
        })
      }
  }
  navigateToRegister(){
    this.router.navigate(['register'])
  }
   
   ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const name = params['name'];
            this.name = name !== null ? name : '';
        });
        
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